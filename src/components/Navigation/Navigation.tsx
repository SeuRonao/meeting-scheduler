import React from "react";
import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/Auth/UserAuthContext";

export default function Navigation() {
  const { t } = useTranslation();
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">{t("Navigation.brand")}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">{t("Navigation.links.home")}</Nav.Link>
          <Nav.Link href="/schedule">{t("Navigation.links.schedule")}</Nav.Link>
          <Nav.Link href="/clients">{t("Navigation.links.clients")}</Nav.Link>
        </Nav>
        <Profile />
      </Container>
    </Navbar>
  );
}

function Profile() {
  const { t } = useTranslation();
  const { user, signOut } = useUserAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  if (user) {
    return (
      <Stack direction="horizontal" gap={2}>
        <span>{user.displayName || user.email}</span>
        <Button variant="outline-secondary" size="sm" onClick={handleLogOut}>
          Log Out
        </Button>
      </Stack>
    );
  } else {
    return (
      <Button variant="outline-success" href="/#sign-in">
        {t("Profile.use")}
      </Button>
    );
  }
}
