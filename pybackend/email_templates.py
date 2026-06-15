"""
Email template registry for event-driven emails.
Each event type maps to a template class that defines subject, body, and recipients.
"""
from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any


# ---------------------------------------------------------------------------
# Base template
# ---------------------------------------------------------------------------

@dataclass
class EmailTemplate(ABC):
    """Base class for all email templates. Subclass and implement the three
    abstract properties; everything else is handled by the registry."""

    event: dict[str, Any]

    @property
    @abstractmethod
    def subject(self) -> str: ...

    @property
    @abstractmethod
    def body(self) -> str:
        """Plain-text fallback (used when html_body is None)."""
        ...

    @property
    def html_body(self) -> str | None:
        """Override to send HTML emails. Falls back to `body` if None."""
        return None

    @property
    def recipients(self) -> list[str]:
        """Default: pull from event payload. Override for custom routing."""
        return [self.event["email"]]

    @property
    def cc(self) -> list[str]:
        return []

    @property
    def bcc(self) -> list[str]:
        return []


# ---------------------------------------------------------------------------
# Concrete templates  (add one class per event type)
# ---------------------------------------------------------------------------

@dataclass
class WelcomeTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"Welcome, {self.event.get('name', 'there')}!"

    @property
    def body(self) -> str:
        return (
            f"Hi {self.event.get('name', 'there')},\n\n"
            "Thanks for signing up. We're glad to have you!\n\n"
            "– The Team"
        )

    @property
    def html_body(self) -> str:
        name = self.event.get("name", "there")
        return f"""
        <h1>Welcome, {name}!</h1>
        <p>Thanks for signing up. We're glad to have you!</p>
        <p>– The Team</p>
        """


@dataclass
class PasswordResetTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return "Reset your password"

    @property
    def body(self) -> str:
        token = self.event.get("reset_token", "")
        return (
            f"Use the link below to reset your password (expires in 1 hour):\n\n"
            f"https://example.com/reset?token={token}\n\n"
            "If you didn't request this, ignore this email."
        )

    @property
    def html_body(self) -> str:
        token = self.event.get("reset_token", "")
        url = f"https://example.com/reset?token={token}"
        return f"""
        <p>Click below to reset your password (expires in 1 hour):</p>
        <p><a href="{url}">Reset Password</a></p>
        <p>If you didn't request this, ignore this email.</p>
        """


@dataclass
class OrderConfirmedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"Order #{self.event.get('order_id')} confirmed"

    @property
    def body(self) -> str:
        order_id = self.event.get("order_id")
        total = self.event.get("total", "0.00")
        return (
            f"Your order #{order_id} has been confirmed.\n"
            f"Total charged: ${total}\n\n"
            "You'll receive a shipping notification soon."
        )

    @property
    def html_body(self) -> str:
        order_id = self.event.get("order_id")
        total = self.event.get("total", "0.00")
        return f"""
        <h2>Order #{order_id} Confirmed</h2>
        <p>Total charged: <strong>${total}</strong></p>
        <p>You'll receive a shipping notification soon.</p>
        """


@dataclass
class AccountDeactivatedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return "Your account has been deactivated"

    @property
    def body(self) -> str:
        return (
            "Your account has been deactivated. "
            "Contact support@example.com if this was a mistake."
        )

    @property
    def bcc(self) -> list[str]:
        # Blind-copy the support team on all deactivations
        return ["support-log@example.com"]


# ---------------------------------------------------------------------------
# Ticket / comment templates
#
# Expected event payload fields:
#   ticket.created   – ticket_id, ticket_title, ticket_url, reporter_name, priority, email
#   ticket.updated   – ticket_id, ticket_title, ticket_url, updated_by, changes (list[str]), email
#   ticket.closed    – ticket_id, ticket_title, ticket_url, closed_by, resolution, email
#   comment.created  – ticket_id, ticket_title, ticket_url, commenter_name, comment_body, email
#   status.updated   – ticket_id, ticket_title, ticket_url, old_status, new_status, changed_by, email
# ---------------------------------------------------------------------------

def _ticket_url(event: dict[str, Any]) -> str:
    return event.get("ticket_url", f"https://example.com/tickets/{event.get('ticket_id', '')}")


@dataclass
class TicketCreatedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"[#{self.event.get('ticket_id')}] New ticket: {self.event.get('ticket_title')}"

    @property
    def body(self) -> str:
        e = self.event
        return (
            f"A new ticket has been created by {e.get('reporter_name', 'someone')}.\n\n"
            f"  Title    : {e.get('ticket_title')}\n"
            f"  ID       : #{e.get('ticket_id')}\n"
            f"  Priority : {e.get('priority', 'Normal')}\n\n"
            f"View it here: {_ticket_url(e)}"
        )

    @property
    def html_body(self) -> str:
        e = self.event
        url = _ticket_url(e)
        priority_color = {"high": "#e53e3e", "medium": "#dd6b20", "low": "#38a169"}.get(
            str(e.get("priority", "")).lower(), "#718096"
        )
        return f"""
        <h2 style="margin-bottom:4px;">New Ticket #{e.get('ticket_id')}</h2>
        <p style="color:#555;margin-top:0;">{e.get('ticket_title')}</p>
        <table style="border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:4px 12px 4px 0;color:#888;">Reporter</td>
              <td>{e.get('reporter_name', '—')}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888;">Priority</td>
              <td><span style="color:{priority_color};font-weight:600;">{e.get('priority','Normal')}</span></td></tr>
        </table>
        <p style="margin-top:16px;"><a href="{url}" style="background:#3182ce;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;">View Ticket</a></p>
        """


@dataclass
class TicketUpdatedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"[#{self.event.get('ticket_id')}] Ticket updated: {self.event.get('ticket_title')}"

    @property
    def body(self) -> str:
        e = self.event
        changes = e.get("changes", [])
        changes_text = "\n".join(f"  • {c}" for c in changes) if changes else "  (no details provided)"
        return (
            f"Ticket #{e.get('ticket_id')} was updated by {e.get('updated_by', 'someone')}.\n\n"
            f"Changes:\n{changes_text}\n\n"
            f"View it here: {_ticket_url(e)}"
        )

    @property
    def html_body(self) -> str:
        e = self.event
        url = _ticket_url(e)
        changes = e.get("changes", [])
        changes_html = "".join(f"<li>{c}</li>" for c in changes) or "<li>No details provided</li>"
        return f"""
        <h2 style="margin-bottom:4px;">Ticket #{e.get('ticket_id')} Updated</h2>
        <p style="color:#555;margin-top:0;">{e.get('ticket_title')}</p>
        <p style="color:#888;font-size:13px;">Updated by <strong>{e.get('updated_by','—')}</strong></p>
        <ul style="font-size:14px;padding-left:20px;">{changes_html}</ul>
        <p style="margin-top:16px;"><a href="{url}" style="background:#3182ce;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;">View Ticket</a></p>
        """


@dataclass
class TicketClosedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"[#{self.event.get('ticket_id')}] Ticket closed: {self.event.get('ticket_title')}"

    @property
    def body(self) -> str:
        e = self.event
        return (
            f"Ticket #{e.get('ticket_id')} has been closed by {e.get('closed_by', 'someone')}.\n\n"
            f"  Resolution: {e.get('resolution', 'No resolution note provided.')}\n\n"
            f"View it here: {_ticket_url(e)}"
        )

    @property
    def html_body(self) -> str:
        e = self.event
        url = _ticket_url(e)
        return f"""
        <h2 style="margin-bottom:4px;">✅ Ticket #{e.get('ticket_id')} Closed</h2>
        <p style="color:#555;margin-top:0;">{e.get('ticket_title')}</p>
        <p style="color:#888;font-size:13px;">Closed by <strong>{e.get('closed_by', '—')}</strong></p>
        <p style="background:#f0fff4;border-left:4px solid #38a169;padding:10px 14px;font-size:14px;">
          <strong>Resolution:</strong> {e.get('resolution', 'No resolution note provided.')}
        </p>
        <p style="margin-top:16px;"><a href="{url}" style="background:#3182ce;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;">View Ticket</a></p>
        """


@dataclass
class CommentCreatedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        return f"[#{self.event.get('ticket_id')}] New comment on: {self.event.get('ticket_title')}"

    @property
    def body(self) -> str:
        e = self.event
        return (
            f"{e.get('commenter_name', 'Someone')} left a comment on ticket #{e.get('ticket_id')}:\n\n"
            f"  \"{e.get('comment_body', '')}\"\n\n"
            f"View it here: {_ticket_url(e)}"
        )

    @property
    def html_body(self) -> str:
        e = self.event
        url = _ticket_url(e)
        return f"""
        <h2 style="margin-bottom:4px;">New Comment on #{e.get('ticket_id')}</h2>
        <p style="color:#555;margin-top:0;">{e.get('ticket_title')}</p>
        <p style="color:#888;font-size:13px;"><strong>{e.get('commenter_name', '—')}</strong> wrote:</p>
        <blockquote style="border-left:4px solid #cbd5e0;margin:0;padding:10px 14px;font-size:14px;color:#2d3748;background:#f7fafc;">
          {e.get('comment_body', '')}
        </blockquote>
        <p style="margin-top:16px;"><a href="{url}" style="background:#3182ce;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;">Reply</a></p>
        """


@dataclass
class StatusUpdatedTemplate(EmailTemplate):
    @property
    def subject(self) -> str:
        e = self.event
        return (
            f"[#{e.get('ticket_id')}] Status changed to "{e.get('new_status')}": "
            f"{e.get('ticket_title')}"
        )

    @property
    def body(self) -> str:
        e = self.event
        return (
            f"The status of ticket #{e.get('ticket_id')} was changed by {e.get('changed_by', 'someone')}.\n\n"
            f"  {e.get('old_status', '?')}  →  {e.get('new_status', '?')}\n\n"
            f"View it here: {_ticket_url(e)}"
        )

    @property
    def html_body(self) -> str:
        e = self.event
        url = _ticket_url(e)
        return f"""
        <h2 style="margin-bottom:4px;">Status Updated — #{e.get('ticket_id')}</h2>
        <p style="color:#555;margin-top:0;">{e.get('ticket_title')}</p>
        <p style="color:#888;font-size:13px;">Changed by <strong>{e.get('changed_by', '—')}</strong></p>
        <p style="font-size:15px;">
          <span style="background:#e2e8f0;padding:4px 10px;border-radius:4px;">{e.get('old_status','?')}</span>
          &nbsp;→&nbsp;
          <span style="background:#bee3f8;padding:4px 10px;border-radius:4px;font-weight:600;">{e.get('new_status','?')}</span>
        </p>
        <p style="margin-top:16px;"><a href="{url}" style="background:#3182ce;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;">View Ticket</a></p>
        """


# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------

_REGISTRY: dict[str, type[EmailTemplate]] = {
    "user.welcome":          WelcomeTemplate,
    "user.password_reset":   PasswordResetTemplate,
    "order.confirmed":       OrderConfirmedTemplate,
    "user.deactivated":      AccountDeactivatedTemplate,
    # Ticket / comment events
    "ticket.created":        TicketCreatedTemplate,
    "ticket.updated":        TicketUpdatedTemplate,
    "ticket.closed":         TicketClosedTemplate,
    "comment.created":       CommentCreatedTemplate,
    "status.updated":        StatusUpdatedTemplate,
}


def get_template(event: dict[str, Any]) -> EmailTemplate:
    """
    Resolve the correct EmailTemplate subclass for event["event_type"].

    Raises:
        KeyError: if the event_type has no registered template.
    """
    event_type: str = event["event_type"]
    template_cls = _REGISTRY.get(event_type)
    if template_cls is None:
        raise KeyError(
            f"No email template registered for event_type={event_type!r}. "
            f"Known types: {sorted(_REGISTRY)}"
        )
    return template_cls(event=event)


def register_template(event_type: str, template_cls: type[EmailTemplate]) -> None:
    """Dynamically register a new template (useful for plugins / tests)."""
    _REGISTRY[event_type] = template_cls
