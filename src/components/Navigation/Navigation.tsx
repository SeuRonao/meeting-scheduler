import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
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
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  if (user) {
    return (
      <div>
        <div>{user.displayName}</div>
        <Button variant="outline-secondary" size="sm" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    );
  } else {
    return (
      <Button variant="outline-success" href="/#enter">
        {t("Profile.use")}
      </Button>
    );
  }
}
