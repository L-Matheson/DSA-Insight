# tests/routes/relay/test_relay_projects_permissions.py

from sqlmodel import select
import pytest

from app.models.relay_project import RelayProject


PROJECT_PAYLOAD = {
    "name": "Permission Test Project",
    "description": "Created during pytest",
}


def authenticate(client, user):
    """
    Helper so every test doesn't duplicate authentication logic.
    Replace this with whatever your project uses.
    """
    client.authenticate(user)


def create_user_with_role(
    user_factory,
    role_assignment_factory,
    role: str,
):
    """
    Creates a user and assigns a Relay role.
    """
    user = user_factory()

    role_assignment_factory(
        user_id=user.id,
        role=role,
        app="relay",
    )

    return user


@pytest.mark.parametrize(
    "role,expected_status",
    [
        ("admin", 200),
        ("maintainer", 200),
        ("reporter", 403),
        ("planner", 403),
        ("auditor", 403),
    ],
)
def test_post_relay_project_permissions(
    client,
    db_session,
    user_factory,
    role_assignment_factory,
    role,
    expected_status,
):
    """
    Verify only users with WRITE_BASIC_PROJECT_DETAIL
    can create Relay projects.
    """

    user = create_user_with_role(
        user_factory,
        role_assignment_factory,
        role,
    )

    authenticate(client, user)

    response = client.post(
        "/relay/projects/",
        json=PROJECT_PAYLOAD,
    )

    assert response.status_code == expected_status

    project = db_session.exec(
        select(RelayProject).where(
            RelayProject.name == PROJECT_PAYLOAD["name"]
        )
    ).first()

    if expected_status == 200:
        assert project is not None
        assert project.name == PROJECT_PAYLOAD["name"]

    else:
        assert project is None


def test_user_without_role_cannot_create_project(
    client,
    db_session,
    user_factory,
):
    """
    A user with no Relay role should be forbidden.
    """

    user = user_factory()

    authenticate(client, user)

    response = client.post(
        "/relay/projects/",
        json=PROJECT_PAYLOAD,
    )

    assert response.status_code == 403

    project = db_session.exec(
        select(RelayProject).where(
            RelayProject.name == PROJECT_PAYLOAD["name"]
        )
    ).first()

    assert project is None


def test_unauthenticated_user_cannot_create_project(
    client,
):
    """
    Endpoint should reject anonymous requests.
    """

    response = client.post(
        "/relay/projects/",
        json=PROJECT_PAYLOAD,
    )

    assert response.status_code in (401, 403)
