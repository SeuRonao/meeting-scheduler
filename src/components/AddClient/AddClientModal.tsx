import { SyntheticEvent, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { createClient } from "../../utils/firebase/clientFirebase";
import { auth } from "../../utils/firebase/firebaseInit";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}

/** Modal that shows a form to create a client for the current user
 * @param {boolean} show - A boolean representing if the modal should be shown or hidden.
 * @param {(value: boolean) => void} setShow - a callback function that changes the value of shown.
 */
export default function AddClientModal(props: Props) {
  const { show, setShow } = props;
  const { t } = useTranslation("translation", {
    keyPrefix: "components.AddClientModal",
  });
  const [user] = useAuthState(auth);
  const [validated, setValidated] = useState<boolean | undefined>(undefined); // If undefined, the form shows no validation.
  const [error, setError] = useState<string | null>(null); // Error message from the form validation.
  const [saving, setSaving] = useState(false); // True if form is submitted and validated but not yet saved to the cloud.

  function getFormValues(form: HTMLFormElement) {
    const firstName = form.firstName.value as string;
    const lastName = form.lastName.value as string;
    const cpf = form.cpf.value as string;
    const email = form.email.value as string;
    const phone = form.phone.value as string;

    return { firstName, lastName, cpf, email, phone };
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
          await createClient(
            formValues.firstName,
            formValues.lastName,
            formValues.cpf,
            user.uid,
            formValues.email,
            formValues.phone
          );
          setShow(false);
          setValidated(undefined);
          setError(null);
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
        <Modal.Title>{t("title")}</Modal.Title>
      </Modal.Header>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="my-3" controlId="firstName">
            <Form.Label>{t("first-name")}</Form.Label>
            <Form.Control required />
            <Form.Control.Feedback type="invalid">
              {t("first-name-required")}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="lastName">
            <Form.Label>{t("last-name")}</Form.Label>
            <Form.Control required />
            <Form.Control.Feedback type="invalid">
              {t("last-name-required")}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="cpf">
            <Form.Label>{t("cpf-only-numbers")}</Form.Label>
            <Form.Control required minLength={11} maxLength={11} />
            <Form.Control.Feedback type="invalid">
              {t("cpf-invalid")}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="email">
            <Form.Label>{t("email")}</Form.Label>
            <Form.Control type="email" />
            <Form.Control.Feedback type="invalid">
              {t("email-invalid")}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="phone">
            <Form.Label>{t("phone")}</Form.Label>
            <Form.Control type="tel" />
            <Form.Control.Feedback type="invalid">
              {t("phone-invalid")}
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
