import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";

/** Adds a copyright notice to be used in the footer of the page */
export default function Copyright() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.Copyright",
  });
  return (
    <Container className="d-flex justify-content-center align-itens-center">
      {t("made-with-love")}{" "}
      <a target="_blank" rel="noreferrer" href="https://seuronao.github.io">
        Ronan Soares
      </a>{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/SeuRonao/meeting-scheduler"
      >
        <FaGithub />
        <span className="visually-hidden">Source Code</span>
      </a>
    </Container>
  );
}
