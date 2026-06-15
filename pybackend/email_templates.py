"""
Email template registry.
- HTML lives in templates/email/<event_type>.html (body fragment)
- templates/email/_base.html is the shared layout wrapper
- Each class defines only: subject and template_body (the token context)
"""
from __future__ import annotations

import re
from abc import ABC, abstractmethod
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Any

TEMPLATE_DIR = Path(__file__).parent / "templates" / "email"


# ---------------------------------------------------------------------------
# Loader + renderer
# ---------------------------------------------------------------------------

@lru_cache(maxsize=None)
def _load(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _render(template_str: str, context: dict[str, str]) -> str:
    return re.sub(
        r"\{\{(.+?)\}\}",
        lambda m: context[m.group(1).strip()],
        template_str,
    )


def render_email(event_type: str, context: dict[str, str]) -> str:
    body_html = _render(_load(TEMPLATE_DIR / f"{event_type}.html"), context)
    return _render(_load(TEMPLATE_DIR / "_base.html"), {**context, "body": body_html})


# ---------------------------------------------------------------------------
# Base
# ---------------------------------------------------------------------------

@dataclass
class EmailTemplate(ABC):
    event: dict[str, Any]

    @property
    @abstractmethod
    def subject(self) -> str: ...

    @property
    @abstractmethod
    def template_body(self) -> dict[str, str]:
        """Token values for every {{placeholder}} in the event's HTML file."""
        ...

    @property
    def html(self) -> str:
        return render_email(self.event["event_type"], {"subject": self.subject, **self.template_body})

    @property
    def recipients(self) -> list[str]:
        return [self.event["email"]]


# ---------------------------------------------------------------------------
# Templates
# ---------------------------------------------------------------------------

@dataclass
class TicketCreatedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"[#{self.event.get('ticket_id')}] New ticket: {self.event.get('ticket_title')}"

    @property
    def template_body(self) -> dict[str, str]:
        e = self.event
        return {
            "ticket_id":     str(e.get("ticket_id", "")),
            "ticket_title":  str(e.get("ticket_title", "")),
            "reporter_name": str(e.get("reporter_name", "Someone")),
            "priority":      str(e.get("priority", "Normal")),
            "ticket_url":    str(e.get("ticket_url", f"/tickets/{e.get('ticket_id')}")),
        }


@dataclass
class TicketUpdatedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"[#{self.event.get('ticket_id')}] Ticket updated: {self.event.get('ticket_title')}"

    @property
    def template_body(self) -> dict[str, str]:
        e = self.event
        return {
            "ticket_id":    str(e.get("ticket_id", "")),
            "ticket_title": str(e.get("ticket_title", "")),
            "updated_by":   str(e.get("updated_by", "Someone")),
            "changes_list": "".join(f"<li>{c}</li>" for c in e.get("changes", [])) or "<li>No details provided</li>",
            "ticket_url":   str(e.get("ticket_url", f"/tickets/{e.get('ticket_id')}")),
        }


@dataclass
class TicketClosedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"[#{self.event.get('ticket_id')}] Closed: {self.event.get('ticket_title')}"

    @property
    def template_body(self) -> dict[str, str]:
        e = self.event
        return {
            "ticket_id":    str(e.get("ticket_id", "")),
            "ticket_title": str(e.get("ticket_title", "")),
            "closed_by":    str(e.get("closed_by", "Someone")),
            "resolution":   str(e.get("resolution", "No resolution provided.")),
            "ticket_url":   str(e.get("ticket_url", f"/tickets/{e.get('ticket_id')}")),
        }


@dataclass
class CommentCreatedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"[#{self.event.get('ticket_id')}] New comment: {self.event.get('ticket_title')}"

    @property
    def template_body(self) -> dict[str, str]:
        e = self.event
        return {
            "ticket_id":      str(e.get("ticket_id", "")),
            "ticket_title":   str(e.get("ticket_title", "")),
            "commenter_name": str(e.get("commenter_name", "Someone")),
            "comment_body":   str(e.get("comment_body", "")),
            "ticket_url":     str(e.get("ticket_url", f"/tickets/{e.get('ticket_id')}")),
        }


@dataclass
class StatusUpdatedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        e = self.event
        return f"[#{e.get('ticket_id')}] Status → {e.get('new_status')}: {e.get('ticket_title')}"

    @property
    def template_body(self) -> dict[str, str]:
        e = self.event
        return {
            "ticket_id":    str(e.get("ticket_id", "")),
            "ticket_title": str(e.get("ticket_title", "")),
            "changed_by":   str(e.get("changed_by", "Someone")),
            "old_status":   str(e.get("old_status", "?")),
            "new_status":   str(e.get("new_status", "?")),
            "ticket_url":   str(e.get("ticket_url", f"/tickets/{e.get('ticket_id')}")),
        }


# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------

_REGISTRY: dict[str, type[EmailTemplate]] = {
    "ticket.created":  TicketCreatedTemplate,
    "ticket.updated":  TicketUpdatedTemplate,
    "ticket.closed":   TicketClosedTemplate,
    "comment.created": CommentCreatedTemplate,
    "status.updated":  StatusUpdatedTemplate,
}


def get_template(event: dict[str, Any]) -> EmailTemplate:
    event_type: str = event["event_type"]
    cls = _REGISTRY.get(event_type)
    if cls is None:
        raise KeyError(f"No template for event_type={event_type!r}. Known: {sorted(_REGISTRY)}")
    return cls(event=event)
