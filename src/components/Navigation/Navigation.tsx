import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Profile from "./Profile";

export default function Navigation() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.Navigation",
  });
  return (
    <Navbar bg="light" variant="light" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t("brand")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              {t("links.home")}
            </Nav.Link>
            <Nav.Link as={Link} to="/schedule">
              {t("links.schedule")}
            </Nav.Link>
            <Nav.Link as={Link} to="/clients">
              {t("links.clients")}
            </Nav.Link>
          </Nav>
          <Profile />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
