"""
Query a Metabase saved question ("Card") by ID, filtered with MBQL.

Metabase lets you use any saved question as a virtual table for a new MBQL
query by setting `"source-table": "card__<id>"`. This posts that query to
/api/dataset, so you get the question's results with your own filter
applied on top.

IMPORTANT for aggregated questions (e.g. "Sum of Quantity" grouped by
"Created At: Month"): the result columns are computed, not raw table
fields. A filter clause referencing them MUST use the exact technical
`name` from the card's result_metadata plus a matching `base-type` --
guessing the display name, or using a numeric field id, will 400. Run
print_card_columns() first to see the real names.

Auth (env vars):
    METABASE_URL        e.g. https://metabase.example.com
    METABASE_API_KEY    OR METABASE_SESSION (X-Metabase-Session token)
"""

from __future__ import annotations

import os
from typing import Any

import httpx


def _headers() -> dict[str, str]:
    if api_key := os.environ.get("METABASE_API_KEY"):
        return {"x-api-key": api_key}
    if session := os.environ.get("METABASE_SESSION"):
        return {"X-Metabase-Session": session}
    raise RuntimeError("Set METABASE_API_KEY or METABASE_SESSION")


def _base_url() -> str:
    return os.environ["METABASE_URL"].rstrip("/")


def print_card_columns(card_id: int) -> None:
    """Debug helper: print the real name / display_name / base_type for each
    column in a card's results, and its database_id."""
    resp = httpx.get(f"{_base_url()}/api/card/{card_id}", headers=_headers(), timeout=30.0)
    if resp.status_code != 200:
        print(f"GET /api/card/{card_id} -> {resp.status_code}: {resp.text}")
        return
    card = resp.json()
    print(f"Card: {card.get('name')!r}  database_id={card.get('database_id')}")
    for col in card.get("result_metadata") or []:
        print(f"  name={col.get('name')!r}  display_name={col.get('display_name')!r}  "
              f"base_type={col.get('base_type')!r}")


def query_trend_card(
    card_id: int,
    database_id: int,
    created_at_month: str | None = None,
    quantity_op: str | None = None,
    quantity_value: int | None = None,
) -> dict[str, Any]:
    """
    One route for the "Created At: Month" / "Sum of Quantity" trend card.

    Filters are optional and independent -- pass either, both, or neither.
    If both are given they're combined with AND.

    created_at_month: a month value as "YYYY-MM-01", e.g. "2024-05-01".
                       Matches the CREATED_AT column, which the card has
                       already bucketed to month -- do NOT add a
                       temporal-unit here, that would double-bucket it.

    quantity_op:       one of "=", "!=", ">", ">=", "<", "<=", "between"
    quantity_value:    the number to compare "sum" (Sum of Quantity) against.
                        For "between", pass a (low, high) tuple instead.
    """
    clauses: list[Any] = []

    if created_at_month is not None:
        clauses.append(
            ["=", ["field", "CREATED_AT", {"base-type": "type/DateTime"}], created_at_month]
        )

    if quantity_op is not None:
        sum_field = ["field", "sum", {"base-type": "type/BigInteger"}]
        if quantity_op == "between":
            low, high = quantity_value  # type: ignore[misc]
            clauses.append(["between", sum_field, low, high])
        else:
            clauses.append([quantity_op, sum_field, quantity_value])

    if not clauses:
        mbql_filter = None
    elif len(clauses) == 1:
        mbql_filter = clauses[0]
    else:
        mbql_filter = ["and", *clauses]

    return query_card(card_id, database_id, mbql_filter)


def query_card(card_id: int, database_id: int, mbql_filter: list[Any] | None) -> dict[str, Any]:
    """
    Lower-level route: run a saved question, optionally filtered with a raw
    MBQL filter clause. query_trend_card() builds that clause for you for
    this specific card; call this directly if you need a different clause.

    card_id:      ID of the saved question to filter
    database_id:  ID of the database the card queries against
                  (see print_card_columns, or GET /api/card/:id -> "database_id")
    mbql_filter:  a raw MBQL filter clause, or None to run the card unfiltered.
    """
    query: dict[str, Any] = {"source-table": f"card__{card_id}"}
    if mbql_filter is not None:
        query["filter"] = mbql_filter

    payload = {"type": "query", "database": database_id, "query": query}

    resp = httpx.post(
        f"{_base_url()}/api/dataset",
        json=payload,
        headers=_headers(),
        timeout=30.0,
    )
    if resp.status_code != 200:
        # Surface Metabase's actual error body instead of a bare HTTPStatusError.
        raise RuntimeError(f"{resp.status_code} error from /api/dataset: {resp.text}")
    return resp.json()


if __name__ == "__main__":
    CARD_ID = 1  # <-- put your card's id here
    DATABASE_ID = 1  # <-- from print_card_columns() output above

    print_card_columns(CARD_ID)

    # Example: only filter by month
    result = query_trend_card(CARD_ID, DATABASE_ID, created_at_month="2024-05-01")

    # Example: only filter by quantity
    # result = query_trend_card(CARD_ID, DATABASE_ID, quantity_op=">", quantity_value=100)

    # Example: both, combined with AND
    # result = query_trend_card(
    #     CARD_ID, DATABASE_ID,
    #     created_at_month="2024-05-01",
    #     quantity_op=">", quantity_value=100,
    # )

    print([c["name"] for c in result["data"]["cols"]])
    for row in result["data"]["rows"][:10]:
        print(row)
