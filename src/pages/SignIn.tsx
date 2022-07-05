import { Stack, Image } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import SignInForm from "../components/Auth/SignIn";
import { auth } from "../utils/firebase/firebaseInit";
export default function SignIn() {
  const [user] = useAuthState(auth);
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Stack direction="horizontal">
      <Image
        className="col-md-6 mx-auto"
        fluid
        src="/images/login.svg"
        alt=""
      />
      <SignInForm />
    </Stack>
  );
}
