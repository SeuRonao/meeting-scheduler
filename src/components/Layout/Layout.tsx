import { Container, Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Copyright from "../Copyright/Copyright";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Navigation from "../Navigation/Navigation";

export default function Layout() {
  return (
    <Stack>
      <header>
        <Navigation />
      </header>
      <Container as="main" fluid="lg">
        <Outlet />
      </Container>
      <footer className="fixed-bottom">
        <LanguageSwitcher />
        <hr />
        <Copyright />
      </footer>
    </Stack>
  );
}
