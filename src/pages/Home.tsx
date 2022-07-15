import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("translation", { keyPrefix: "pages.Home" });
  return <h1 className="text-center my-3">{t("title")}</h1>;
}
