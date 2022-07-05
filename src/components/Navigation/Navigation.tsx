import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";

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
