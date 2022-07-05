import React from "react";
import { signOut } from "firebase/auth";
import { Stack, Button, Alert } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebaseInit";
import LoadingSpinner from "../common/LoadingSpinner";

export default function Profile() {
  const { t } = useTranslation();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  if (error) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (user) {
    return (
      <Stack direction="horizontal" gap={2}>
        <span>{user.displayName || user.email}</span>
        <Button variant="outline-secondary" size="sm" onClick={handleLogOut}>
          {t("Profile.sign-out")}
        </Button>
      </Stack>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Button variant="outline-success" href="/sign-in">
      {t("Profile.sign-in")}
    </Button>
  );
}
