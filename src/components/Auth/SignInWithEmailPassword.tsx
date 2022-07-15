import { FormEvent, useState } from "react";
import { Alert, Button, Form, Stack } from "react-bootstrap";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../../utils/firebase/firebaseInit";

export default function SignInWithEmailPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, , , error] =
    useSignInWithEmailAndPassword(auth);
  const { t } = useTranslation();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
  }

  return (
    <Stack id="sign-in" className="justify-content-center">
      {error && (
        <Alert className="my-3" variant="danger">
          {error.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3" controlId="formBasicEmail">
          <Form.Label>{t("SignIn.email")}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t("SignIn.enter-email")}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Form.Text>{t("SignIn.privacy")}</Form.Text>
        </Form.Group>
        <Form.Group className="my-3" controlId="formBasicPassword">
          <Form.Label>{t("SignIn.password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("SignIn.password")}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Stack className="my-3">
          <Button variant="primary" type="submit" size="lg">
            {t("SignIn.sign-in").toUpperCase()}
          </Button>
        </Stack>
        <p className="my-3 small fw-bold">
          {t("SignIn.sign-up")}{" "}
          <a href="/sign-up" className="link-danger">
            {t("SignIn.sign-up-link")}
          </a>
        </p>
      </Form>
    </Stack>
  );
}
