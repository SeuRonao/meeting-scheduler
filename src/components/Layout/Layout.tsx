import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Copyright from "../Copyright/Copyright";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Navigation from "../Navigation/Navigation";

export default function Layout() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <header>
        <Navigation />
      </header>
      <Container as="main" fluid="lg">
        <Outlet />
      </Container>
      <footer className="mt-auto">
        <LanguageSwitcher />
        <hr />
        <Copyright />
      </footer>
    </div>
  );
}
