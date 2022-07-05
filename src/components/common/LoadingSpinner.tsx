import React from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function LoadingSpinner({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <Spinner className={className} animation="border" role="status">
      <span className="visually-hidden">{t("LoadingSpinner.loading")}</span>
    </Spinner>
  );
}
