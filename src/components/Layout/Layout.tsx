import React from "react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Navigation from "../Navigation/Navigation";

interface Props {
  children?: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  return (
    <div className="Layout">
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <footer>
        <LanguageSwitcher />
      </footer>
    </div>
  );
}
