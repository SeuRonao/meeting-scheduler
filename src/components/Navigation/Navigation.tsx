import React from "react";
import { useTranslation } from "react-i18next";

export default function Navigation() {
  const { t } = useTranslation();
  return (
    <nav>
      <Brand to="/" text={t("Navigation.brand")} />
      <Link to="/" text={t("Navigation.links.home")} />
      <Link to="/schedule" text={t("Navigation.links.schedule")} />
      <Link to="/clients" text={t("Navigation.links.clients")} />
    </nav>
  );
}

interface LinkProps {
  to: string;
  text: string;
}

function Link(props: LinkProps) {
  const { to, text } = props;
  return <a href={to}>{text}</a>;
}

interface BrandProps {
  to: string;
  text?: string;
}

function Brand(props: BrandProps) {
  const { to, text } = props;
  return <a href={to}>{text}</a>;
}
