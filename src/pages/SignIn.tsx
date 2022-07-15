import { Image, Stack } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import SignInForm from "../components/Auth/SignIn";
import { auth } from "../utils/firebase/firebaseInit";

export default function SignIn() {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1 className="my-3 text-center">{t("SignIn.title")}</h1>
      <Stack direction="horizontal">
        <Image
          className="col-md-6 mx-auto"
          fluid
          src="/images/login.svg"
          alt=""
        />
        <SignInForm />
      </Stack>
    </>
  );
}
