import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AddClientModal from "./AddClientModal";

/** Creates a Button to open a Modal form to create a new client */
export default function AddClient() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.AddClient",
  });
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        {t("new-client-button")}
      </Button>
      <AddClientModal show={show} setShow={setShow} />
    </>
  );
}
