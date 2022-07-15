import { useState } from "react";
import { Button } from "react-bootstrap";
import AddClientModal from "./AddClientModal";

export default function AddClient() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        + Add new Client
      </Button>
      <AddClientModal show={show} setShow={setShow} />
    </>
  );
}
