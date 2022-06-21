import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import languages from "../../i18n/languages/languages.json";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  return (
    <div>
      <p>{t("LanguageSwitcher")}:</p>
      <ul>
        {languages
          .filter((value) => {
            return i18n.language !== value.code;
          })
          .map((value, index) => {
            return (
              <li key={index}>
                <a
                  href="/"
                  onClick={() => {
                    i18n.changeLanguage(value.code);
                  }}
                >
                  {value.name}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
