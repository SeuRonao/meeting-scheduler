import { SyntheticEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function AddClientModal(props: Props) {
  const { show, setShow } = props;
  const [validated, setValidated] = useState<boolean | undefined>(undefined); // If undefined, the form shows no validation.

  function handleSubmit(event: SyntheticEvent<EventTarget>) {
    const target = event.target as HTMLFormElement;
    if (target.checkValidity()) {
      setValidated(true);
    } else {
      setValidated(false);
    }
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Client Information</Modal.Title>
      </Modal.Header>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
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
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
