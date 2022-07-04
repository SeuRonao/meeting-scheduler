import React, { useState } from "react";
import { Alert, Button, Form, Image, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useUserAuth } from "../contexts/Auth/UserAuthContext";
import GoogleButton from "react-google-button";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();
  const { user } = useUserAuth();
  return (
    <>
      <h1 className="text-center my-3">{t("Home.title")}</h1>
      {user ? <Welcome /> : <Login />}
    </>
  );
}

function Welcome() {
  const { t } = useTranslation();
  const { user } = useUserAuth();
  return (
    <p>
      {t("Home.welcome")} {user.displayName || user.email}
    </p>
  );
}

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, googleSignIn } = useUserAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.pathname || "/";

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
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
        <Stack id="sign-in" className="justify-content-center">
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
            <Form.Group className="my-3" controlId="formBasicPassword">
              <Form.Label>{t("Login.password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("Login.password")}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Stack
              className="my-3 justify-content-around"
              direction="horizontal"
            >
              <a href="#!">{t("Login.forgot")}?</a>
            </Stack>
            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                {t("Login.sign-in").toUpperCase()}
              </Button>
            </div>
            <p className="my-3 small fw-bold">
              {t("Login.sign-up")}{" "}
              <a href="/sign-up" className="link-danger">
                {t("Login.sign-up2")}
              </a>
            </p>
          </Form>
          <span className="text-center fw-bold text-muted">
            {t("Login.or").toUpperCase()}
          </span>
          <div className="my-3 align-self-center">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </Stack>
      </Stack>
    </section>
  );
}
