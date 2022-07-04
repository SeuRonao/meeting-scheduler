import React, { useState } from "react";
import { Alert, Button, Form, Image, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useUserAuth } from "../contexts/Auth/UserAuthContext";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();
  const { user } = useUserAuth();
  return (
    <>
      <h1 className="text-center">{t("Home.title")}</h1>
      {user ? <Welcome /> : <Login />}
    </>
  );
}

function Welcome() {
  const { t } = useTranslation();
  const { user } = useUserAuth();
  return (
    <div>
      {t("Home.welcome")} {user.displayName}
    </div>
  );
}

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  let navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleGoogleSignIn(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
              <Form.Label>{t("Login.email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("Login.enter-email")}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Form.Text>{t("Login.privacy")}</Form.Text>
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBasicPassword">
              <Form.Label>{t("Login.password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("Login.password")}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Stack
              className="mt-3 justify-content-around"
              direction="horizontal"
            >
              <a href="#!">{t("Login.forgot")}?</a>
            </Stack>
            <div className="d-grid mt-3">
              <Button variant="primary" type="submit" size="lg">
                {t("Login.sign-in").toUpperCase()}
              </Button>
            </div>
            <p className="small fw-bold mt-3">
              {t("Login.register")}{" "}
              <a href="/register" className="link-danger">
                {t("Login.register2")}
              </a>
            </p>
          </Form>
          <p className="text-center fw-bold text-muted my-3">
            {t("Login.or").toUpperCase()}
          </p>
          <div className="align-self-center">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </Stack>
      </Stack>
    </section>
  );
}
