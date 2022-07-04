import React, { useState } from "react";
import { Alert, Button, Form, Image, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useUserAuth } from "../contexts/Auth/UserAuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1 className="text-center my-3">{t("SignUp.title")}</h1>
      <section>
        {error && <Alert variant="danger">{error}</Alert>}
        <Stack direction="horizontal">
          <Image
            className="col-md-6 mx-auto"
            fluid
            src="/images/login.svg"
            alt=""
          />
          <Stack id="enter" className="justify-content-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>{t("SignUp.email")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("SignUp.enter-email")}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                <Form.Text>{t("SignUp.privacy")}</Form.Text>
              </Form.Group>
              <Form.Group className="my-3" controlId="formBasicPassword">
                <Form.Label>{t("SignUp.password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("SignUp.password")}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg">
                  {t("SignUp.title").toUpperCase()}
                </Button>
              </div>
            </Form>
          </Stack>
        </Stack>
      </section>
    </div>
  );
}
