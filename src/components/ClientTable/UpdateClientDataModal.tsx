import { useState, useEffect, SyntheticEvent } from "react";
import { Modal, Form, Alert, Button, Spinner } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import {
  getClientSnapshot,
  updateClient,
  removeClient,
} from "../../utils/firebase/clientFirebase";
import { auth } from "../../utils/firebase/firebaseInit";
import { Client } from "../../utils/types";

interface UpdateClientModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  clientCPF: string;
}

export default function UpdateClientModal(props: UpdateClientModalProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.UpdateClientDataModal",
  });
  const { show, setShow, clientCPF } = props;
  const [client, setClient] = useState<Client | null>(null);
  const [user] = useAuthState(auth);
  const [validated, setValidated] = useState<boolean | undefined>(undefined); // If undefined, the form shows no validation.
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // No need to fetch data if modal is not showing
      if (!show) return;

      if (!user) throw new Error(t("no-user-provided"));
      if (!clientCPF) throw new Error(t("no-cpf-provided"));

      const clientData = (
        await getClientSnapshot(user.uid, clientCPF)
      ).data() as Client;
      if (clientData) setClient(clientData);
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
    const nextAppointment = form.appointment.value as string;
    return { name, cpf, email, phone, nextAppointment };
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
          throw new Error(t("user-not-authenticated"));
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

  async function handleDelete() {
    try {
      if (user) {
        await removeClient(user.uid, clientCPF);
        setValidated(undefined);
        setError(null);
        setClient(null);
        setShow(false);
        setValidated(undefined); // Reset the validation style.
      } else {
        throw new Error(t("user-not-authenticated"));
      }
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
      } else {
        setError((error as Error).message);
      }
    }
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{t("client-info")}</Modal.Title>
      </Modal.Header>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="my-3" controlId="firstName">
            <Form.Label>{t("first-name")}</Form.Label>
            <Form.Control required defaultValue={client?.name.first} />
            <Form.Control.Feedback type="invalid">
              {t("first-name-required")}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="lastName">
            <Form.Label>{t("last-name")}</Form.Label>
            <Form.Control required defaultValue={client?.name.last} />
            <Form.Control.Feedback type="invalid">
              {t("last-name-required")}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="cpf">
            <Form.Label>{t("cpf-only-numbers")}</Form.Label>
            <Form.Control
              required
              minLength={11}
              maxLength={11}
              defaultValue={client?.cpf}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              {t("cpf-invalid")}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="email">
            <Form.Label>{t("email")}</Form.Label>
            <Form.Control type="email" defaultValue={client?.email} />
            <Form.Control.Feedback type="invalid">
              {t("email-invalid")}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="phone">
            <Form.Label>{t("phone")}</Form.Label>
            <Form.Control type="tel" defaultValue={client?.phone} />
            <Form.Control.Feedback type="invalid">
              {t("phone-invalid")}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="appointment">
            <Form.Label>{t("appointment")}</Form.Label>
            <Form.Control
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            <Form.Control.Feedback type="invalid">
              {t("appointment-invalid")}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="danger" onClick={handleDelete}>
            {t("delete-button")}
          </Button>
          <Button
            type="reset"
            variant="secondary"
            onClick={() => {
              setShow(false);
              setValidated(undefined); // Reset the validation style.
            }}
          >
            {t("close-button")}
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
              <span className="visually-hidden">{t("loading")}</span>
            </Button>
          ) : (
            <Button type="submit" variant="primary">
              {t("save-button")}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
