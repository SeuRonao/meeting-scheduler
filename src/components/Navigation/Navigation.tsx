import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
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
  const user = useUserAuth().user;
  if (user) {
    return <div>{user.displayName}</div>;
  } else {
    return (
      <Button variant="outline-success" href="/signIn">
        {t("Profile.use")}
      </Button>
    );
  }
}
