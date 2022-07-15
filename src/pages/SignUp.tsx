import React, { useState } from "react";
import { Alert, Button, Form, Image, Stack } from "react-bootstrap";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { auth } from "../utils/firebase/firebaseInit";

export default function SignUp() {
  const { t } = useTranslation("translation", { keyPrefix: "pages.SignUp" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setValidated(true);
      await createUserWithEmailAndPassword(email, password);
    }
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className="text-center my-3">{t("title")}</h1>
      <section>
        <Stack direction="horizontal">
          <Image
            className="col-md-6 mx-auto"
            fluid
            src="/images/login.svg"
            alt=""
          />
          <Stack id="enter" className="justify-content-center">
            {error && <Alert variant="danger">{error.message}</Alert>}
            <Form validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>{t("email")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("enter-email")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                />
                <Form.Text>{t("privacy")}</Form.Text>
              </Form.Group>
              <Form.Group className="my-3" controlId="formBasicPassword">
                <Form.Label>{t("password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("password")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                  minLength={6}
                />
                <Form.Control.Feedback type="invalid">
                  {t("password-not-empty")}
                </Form.Control.Feedback>
              </Form.Group>
              <Stack className="align-items-center">
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <Button variant="primary" type="submit" size="lg">
                    {t("title").toUpperCase()}
                  </Button>
                )}
              </Stack>
            </Form>
          </Stack>
        </Stack>
      </section>
    </>
  );
}
