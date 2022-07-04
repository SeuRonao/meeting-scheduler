import React from "react";
import { Container, Stack } from "react-bootstrap";
import Copyright from "../Copyright/Copyright";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Navigation from "../Navigation/Navigation";

interface Props {
  children?: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  return (
    <Stack>
      <header>
        <Navigation />
      </header>
      <Container as="main">{children}</Container>
      <footer className="fixed-bottom">
        <LanguageSwitcher />
        <hr />
        <Copyright />
      </footer>
    </Stack>
  );
}
