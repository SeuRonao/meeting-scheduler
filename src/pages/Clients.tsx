import { useTranslation } from "react-i18next";
import AddClient from "../components/AddClient/AddClient";
import ClientTable from "../components/ClientTable/ClientTable";

export default function Clients() {
  const { t } = useTranslation("translation", { keyPrefix: "pages.Clients" });
  return (
    <>
      <h1 className="text-center my-3">{t("title")}</h1>
      <AddClient />
      <ClientTable />
    </>
  );
}
