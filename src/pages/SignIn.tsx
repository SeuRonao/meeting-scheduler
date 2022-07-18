import { Col, Container, Image, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import SignInForm from "../components/Auth/SignIn";
import { auth } from "../utils/firebase/firebaseInit";

export default function SignIn() {
  const { t } = useTranslation("translation", { keyPrefix: "pages.SignIn" });
  const [user] = useAuthState(auth);
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1 className="my-3 text-center">{t("title")}</h1>
      <Container fluid>
        <Row>
          <Col xs={12} md={6}>
            <Image fluid src="/images/login.svg" alt="" />
          </Col>
          <Col xs={12} md={6}>
            <SignInForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}
