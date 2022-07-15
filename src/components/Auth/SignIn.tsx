import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SignInWithEmailPassword from "./SignInWithEmailPassword";
import SignInWithGoogle from "./SignInWithGoogle";

export default function SignIn() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.SignIn",
  });
  return (
    <Stack>
      <SignInWithEmailPassword />
      <span className="text-center fw-bold text-muted">
        {t("or").toUpperCase()}
      </span>
      <SignInWithGoogle />
    </Stack>
  );
}
