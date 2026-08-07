#!/usr/bin/env python3
"""
Fetch Jira comments for every issue found in exported CSV(s), and write
a structured, migration-friendly "comments" CSV per input file.

Output shape (one row per comment, order preserved via Comment Sequence):
    Issue key, Comment Sequence, Comment ID, Author Display Name,
    Author Account ID, Created, Comment Body

This is a "child table" keyed by Issue key -- the standard shape for
migrating comment threads into another system.

Usage:
    python fetch_jira_comments.py

Edit the CONFIG section below before running.
"""

import csv
import glob
import os
import time
import requests
from getpass import getpass

# ---------------------- CONFIG ----------------------
BASE_URL = "https://yourcompany.atlassian.net"   # no trailing slash
USERNAME = "you@company.com"                     # Cloud: your email. Server/DC: your username
API_VERSION = "2"                                # "2" = plain text body (recommended for migration)
                                                  # "3" = ADF (structured rich text) body

CSV_FOLDER = "."                                 # folder containing your exported issue CSVs
CSV_GLOB_PATTERN = "*.csv"                       # narrow this if the folder has unrelated CSVs
ISSUE_KEY_COLUMN = "Issue key"                   # column name in your existing CSVs

OUTPUT_SUFFIX = "_comments"                      # e.g. ABC-1-ABC-50_comments.csv
SLEEP_BETWEEN_REQUESTS = 0.1                     # seconds; raise if you hit 429 rate limits
MAX_RETRIES = 3
# ------------------------------------------------------

PASSWORD = getpass("Jira password / API token: ")
SESSION = requests.Session()
SESSION.auth = (USERNAME, PASSWORD)

COMMENT_FIELDNAMES = [
    "Issue key",
    "Comment Sequence",
    "Comment ID",
    "Author Display Name",
    "Author Account ID",
    "Created",
    "Comment Body",
]


def extract_plain_text(body):
    """Body is already a plain string on API v2. On v3 it's ADF (dict) --
    walk it and pull out text nodes so the output stays flat/plain text."""
    if isinstance(body, str):
        return body

    if isinstance(body, dict):
        parts = []

        def walk(node):
            if isinstance(node, dict):
                if node.get("type") == "text":
                    parts.append(node.get("text", ""))
                for child in node.get("content", []) or []:
                    walk(child)
            elif isinstance(node, list):
                for item in node:
                    walk(item)

        walk(body)
        return "".join(parts)

    return str(body) if body is not None else ""


def get_comments(issue_key):
    """Fetch all comments for an issue, paginating if needed.
    Jira returns comments in chronological order by default, which is
    what we want -- we also stamp an explicit sequence number so order
    survives any downstream sorting/filtering."""
    url = f"{BASE_URL}/rest/api/{API_VERSION}/issue/{issue_key}/comment"
    all_comments = []
    start_at = 0
    max_results = 100

    while True:
        params = {"startAt": start_at, "maxResults": max_results, "orderBy": "created"}
        for attempt in range(1, MAX_RETRIES + 1):
            resp = SESSION.get(url, params=params)
            if resp.status_code == 200:
                break
            if resp.status_code == 429 and attempt < MAX_RETRIES:
                wait = int(resp.headers.get("Retry-After", 2))
                print(f"  rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
        data = resp.json()

        batch = data.get("comments", [])
        all_comments.extend(batch)

        total = data.get("total", len(all_comments))
        start_at += len(batch)
        if start_at >= total or not batch:
            break

    return all_comments


def rows_for_issue(issue_key, comments):
    rows = []
    for i, c in enumerate(comments, start=1):
        author = c.get("author", {}) or {}
        rows.append({
            "Issue key": issue_key,
            "Comment Sequence": i,
            "Comment ID": c.get("id", ""),
            "Author Display Name": author.get("displayName", ""),
            "Author Account ID": author.get("accountId", author.get("name", "")),
            "Created": c.get("created", ""),
            "Comment Body": extract_plain_text(c.get("body", "")),
        })
    return rows


def process_csv(filepath):
    with open(filepath, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        issue_keys = [row[ISSUE_KEY_COLUMN] for row in reader if row.get(ISSUE_KEY_COLUMN)]

    all_rows = []
    for issue_key in issue_keys:
        try:
            comments = get_comments(issue_key)
            rows = rows_for_issue(issue_key, comments)
            all_rows.extend(rows)
            print(f"{issue_key}: {len(rows)} comments")
        except requests.exceptions.RequestException as e:
            print(f"{issue_key}: FAILED - {e}")
            all_rows.append({
                "Issue key": issue_key,
                "Comment Sequence": "",
                "Comment ID": "",
                "Author Display Name": "",
                "Author Account ID": "",
                "Created": "",
                "Comment Body": f"ERROR_FETCHING: {e}",
            })
        time.sleep(SLEEP_BETWEEN_REQUESTS)

    base, ext = os.path.splitext(filepath)
    out_path = f"{base}{OUTPUT_SUFFIX}{ext}"
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=COMMENT_FIELDNAMES)
        writer.writeheader()
        writer.writerows(all_rows)

    print(f"Wrote {out_path} ({len(all_rows)} comment rows)\n")


def main():
    csv_files = sorted(glob.glob(os.path.join(CSV_FOLDER, CSV_GLOB_PATTERN)))
    # skip any comment files from a previous run
    csv_files = [f for f in csv_files if not f.endswith(f"{OUTPUT_SUFFIX}.csv")]

    if not csv_files:
        print("No CSV files found -- check CSV_FOLDER / CSV_GLOB_PATTERN.")
        return

    print(f"Found {len(csv_files)} issue CSV(s) to process.\n")
    for path in csv_files:
        print(f"--- Processing {path} ---")
        process_csv(path)


if __name__ == "__main__":
    main()
