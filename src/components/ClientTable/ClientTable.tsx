import { User } from "firebase/auth";
import { collection } from "firebase/firestore";
import { Alert, Button, Modal, Table, Form, Spinner } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, store } from "../../utils/firebase/firebaseInit";
import { Client } from "../../utils/types";
import { MdEditNote } from "react-icons/md";
import LoadingSpinner from "../common/LoadingSpinner";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  getClientSnapshot,
  updateClient,
} from "../../utils/firebase/clientFirebase";

export default function ClientTable() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {user && (
        <Table striped>
          <thead>
            <tr>
              <th>Edit</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>CPF</th>
              <th>email</th>
              <th>phone</th>
              <th>appointment</th>
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

function TableData({ user }: { user: User }) {
  const [show, setShow] = useState(false);
  const [clientCPF, setClientCPF] = useState<string | null>(null);
  const [value, loading, error] = useCollection(
    collection(store, "users", user.uid, "medical-records")
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
          <td>
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
              <td>{client.nextAppointment?.getDate()}</td>
            </tr>
          );
        })}
    </>
  );
}

interface UpdateClientModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  clientCPF: string;
}

function UpdateClientModal(props: UpdateClientModalProps) {
  const { show, setShow, clientCPF } = props;
  const [client, setClient] = useState<Client | null>(null);
  const [user] = useAuthState(auth);
  const [validated, setValidated] = useState<boolean | undefined>(undefined); // If undefined, the form shows no validation.
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (user && clientCPF) {
        const clientData = (
          await getClientSnapshot(user.uid, clientCPF)
        ).data() as Client;
        if (clientData) setClient(clientData);
      } else {
        if (!user) {
          throw new Error("No user provided");
        }
        if (!clientCPF) {
          throw new Error("No Client CPF provided");
        }
      }
    }
    fetchData();
  });

  function getFormValues(form: HTMLFormElement) {
    const name = {
      first: form.firstName.value as string,
      last: form.lastName.value as string,
    };
    const cpf = form.cpf.value as string;
    const email = form.email.value as string;
    const phone = form.phone.value as string;

    return { name, cpf, email, phone };
  }

  async function handleSubmit(event: SyntheticEvent<EventTarget>) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLFormElement;
    if (!target.checkValidity()) {
      setValidated(false);
    } else {
      setValidated(true);
      const formValues = getFormValues(target);
      try {
        if (user) {
          setSaving(true);
          await updateClient(user.uid, formValues.cpf, formValues);
          setShow(false);
          setValidated(undefined);
          setError(null);
          setClient(null);
        } else {
          throw new Error("User not Authenticated.");
        }
      } catch (error) {
        if (typeof error === "string") {
          setError(error);
        } else {
          setError((error as Error).message);
        }
      } finally {
        setSaving(false);
      }
    }
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Client Information</Modal.Title>
      </Modal.Header>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="my-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required defaultValue={client?.name.first} />
            <Form.Control.Feedback type="invalid">
              First name is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required defaultValue={client?.name.last} />
            <Form.Control.Feedback type="invalid">
              Last name is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="cpf">
            <Form.Label>CPF (only numbers)</Form.Label>
            <Form.Control
              required
              minLength={11}
              maxLength={11}
              defaultValue={client?.cpf}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              Invalid CPF.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" defaultValue={client?.email} />
            <Form.Control.Feedback type="invalid">
              Invalid Email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" defaultValue={client?.phone} />
            <Form.Control.Feedback type="invalid">
              Invalid Phone.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="reset"
            variant="secondary"
            onClick={() => {
              setShow(false);
              setValidated(undefined); // Reset the validation style.
            }}
          >
            Close
          </Button>
          {saving ? (
            <Button disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </Button>
          ) : (
            <Button type="submit" variant="primary">
              Save
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
