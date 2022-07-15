import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation("translation", { keyPrefix: "pages.NotFound" });
  return <h1 className="text-center my-3">{t("title")}</h1>;
}
