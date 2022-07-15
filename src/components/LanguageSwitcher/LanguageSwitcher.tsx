import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import languages from "../../i18n/languages/languages.json";

export default function LanguageSwitcher() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.LanguageSwitcher",
  });
  return (
    <Stack className="justify-content-center" direction="horizontal" gap={2}>
      <div>{t("available-in")}:</div>
      <div>
        {languages
          .filter((value) => {
            return i18n.language !== value.code;
          })
          .map((value, index) => {
            return (
              <a
                href="/"
                onClick={() => {
                  i18n.changeLanguage(value.code);
                }}
                key={index}
              >
                {value.name}
              </a>
            );
          })}
      </div>
    </Stack>
  );
}
