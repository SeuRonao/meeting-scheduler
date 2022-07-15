import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return <h1 className="text-center my-3">{t("Home.title")}</h1>;
}
