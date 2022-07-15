import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";

export default function Navigation() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.Navigation",
  });
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">{t("brand")}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">{t("links.home")}</Nav.Link>
          <Nav.Link href="/schedule">{t("links.schedule")}</Nav.Link>
          <Nav.Link href="/clients">{t("links.clients")}</Nav.Link>
        </Nav>
        <Profile />
      </Container>
    </Navbar>
  );
}
