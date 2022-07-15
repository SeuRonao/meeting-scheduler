import { SyntheticEvent, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { createClient } from "../../utils/firebase/clientFirebase";
import { auth } from "../../utils/firebase/firebaseInit";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function AddClientModal(props: Props) {
  const { show, setShow } = props;
  const [user] = useAuthState(auth);
  const [validated, setValidated] = useState<boolean | undefined>(undefined); // If undefined, the form shows no validation.
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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
        <Modal.Title>Client Information</Modal.Title>
      </Modal.Header>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="my-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required />
            <Form.Control.Feedback type="invalid">
              First name is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required />
            <Form.Control.Feedback type="invalid">
              Last name is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="cpf">
            <Form.Label>CPF (only numbers)</Form.Label>
            <Form.Control required minLength={11} maxLength={11} />
            <Form.Control.Feedback type="invalid">
              Invalid CPF.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" />
            <Form.Control.Feedback type="invalid">
              Invalid Email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" />
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
