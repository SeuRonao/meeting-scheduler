import { signOut } from "firebase/auth";
import { Alert, Button, Stack } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebaseInit";
import LoadingSpinner from "../common/LoadingSpinner";

export default function Profile() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.Profile",
  });
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  async function handleLogOut() {
    await signOut(auth);
    navigate("/");
  }

  if (error) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (user) {
    return (
      <Stack direction="horizontal" gap={2}>
        <span>{user.displayName || user.email}</span>
        <Button variant="outline-secondary" size="sm" onClick={handleLogOut}>
          {t("sign-out")}
        </Button>
      </Stack>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Link to="/sign-in" className="btn btn-outline-success">
      {t("sign-in")}
    </Link>
  );
}
