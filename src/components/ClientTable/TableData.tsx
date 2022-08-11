import { User } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import i18next from "i18next";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useCollection } from "react-firebase-hooks/firestore";
import { MdEditNote } from "react-icons/md";
import { store } from "../../utils/firebase/firebaseInit";
import { Client } from "../../utils/types";
import LoadingSpinner from "../common/LoadingSpinner";
import UpdateClientModal from "./UpdateClientDataModal";

export default function TableData({ user }: { user: User }) {
  const [show, setShow] = useState(false);
  const [clientCPF, setClientCPF] = useState<string | null>(null);
  const [value, loading, error] = useCollection(
    query(
      collection(store, "users", user.uid, "medical-records"),
      where("ownerID", "==", user.uid)
    )
  );

  function handleClick(clientCPF: string) {
    setClientCPF(clientCPF);
    setShow(true);
  }

  return (
    <>
      <UpdateClientModal
        show={show}
        setShow={setShow}
        clientCPF={clientCPF as string}
      />
      {loading && (
        <tr>
          <td align="center" colSpan={7}>
            <LoadingSpinner />
          </td>
        </tr>
      )}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {value &&
        value.docs.map((doc, index) => {
          const client = doc.data() as Client;
          return (
            <tr key={index}>
              <td>
                <Button onClick={() => handleClick(client.cpf)}>
                  <MdEditNote />
                </Button>
              </td>
              <td>{client.name.first}</td>
              <td>{client.name.last}</td>
              <td>{client.cpf}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                {client.nextAppointment
                  ?.toDate()
                  .toLocaleDateString(i18next.language)}
              </td>
            </tr>
          );
        })}
    </>
  );
}
