import { useTranslation } from "react-i18next";

export default function Schedule() {
  const { t } = useTranslation("translation", { keyPrefix: "pages.Schedule" });
  return <h1 className="text-center my-3">{t("title")}</h1>;
}
