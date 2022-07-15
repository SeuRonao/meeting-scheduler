import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Copyright() {
  const { t } = useTranslation();
  return (
    <Container>
      {t("Copyright")}{" "}
      <a target="_blank" rel="noreferrer" href="https://seuronao.github.io">
        Ronan Soares
      </a>
    </Container>
  );
}
