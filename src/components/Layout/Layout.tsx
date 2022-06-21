import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

interface Props {
  children?: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  const { t } = useTranslation();
  return (
    <div className="Layout">
      <header>
        <h1>{t("title")}</h1>
      </header>
      <main>{children}</main>
      <footer>
        <LanguageSwitcher />
      </footer>
    </div>
  );
}
