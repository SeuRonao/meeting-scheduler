import { Alert, Stack } from "react-bootstrap";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";
import { auth } from "../../utils/firebase/firebaseInit";
import LoadingSpinner from "../common/LoadingSpinner";

export default function SignInWithGoogle() {
  const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);

  if (loading) {
    return (
      <Stack className="my-3 align-self-center align-items-center">
        <LoadingSpinner />
      </Stack>
    );
  }
  return (
    <Stack className="my-3 align-self-center align-items-center">
      {error && <Alert variant="danger">{error.message}</Alert>}
      <GoogleButton onClick={() => signInWithGoogle()} />
    </Stack>
  );
}
