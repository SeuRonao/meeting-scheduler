import { Alert, Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../../utils/firebase/firebaseInit";
import LoadingSpinner from "../common/LoadingSpinner";
import TableData from "./TableData";

export default function ClientTable() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.ClientTable",
  });
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {user && (
        <Table striped>
          <thead>
            <tr>
              <th>{t("edit")}</th>
              <th>{t("first-name")}</th>
              <th>{t("last-name")}</th>
              <th>{t("cpf")}</th>
              <th>{t("email")}</th>
              <th>{t("phone")}</th>
              <th>{t("appointment")}</th>
            </tr>
          </thead>
          <tbody>
            <TableData user={user} />
          </tbody>
        </Table>
      )}
    </>
  );
}
