import { DocumentData, QuerySnapshot } from "firebase/firestore";
import i18next from "i18next";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Stack } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "../components/common";
import correctDateForTimezone from "../utils/dateManipulation";
import {
  getMedicalRecords,
  removeAppointment,
} from "../utils/firebase/clientFirebase";
import { auth } from "../utils/firebase/firebaseInit";
import { Client } from "../utils/types";

export default function Schedule() {
  const { t } = useTranslation("translation", { keyPrefix: "pages.Schedule" });
  const [user, loading, error] = useAuthState(auth);
  const [loadingValues, setLoadingValues] = useState<boolean | null>(null);
  const [records, setRecords] = useState<QuerySnapshot<DocumentData> | null>(
    null
  );

  const fetchData = useCallback(async () => {
    if (user) {
      const medicalRecords = await getMedicalRecords(user?.uid);
      setRecords(medicalRecords);
    }
  }, [user]);

  useEffect(() => {
    setLoadingValues(true);
    fetchData();
    setLoadingValues(false);
  }, [fetchData, records]);

  return (
    <>
      <h1 className="text-center my-3">{t("title")}</h1>
      {loading && loadingValues && <LoadingSpinner />}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {user && (
        <>
          <h2>{t("next-2-weeks")}</h2>
          {records && records.docs === null && <p>{t("none")}</p>}
          {records && records.docs && (
            <Container>
              <Stack gap={3}>
                {records.docs.map((value, index) => {
                  const client = value.data() as Client;
                  return (
                    <Card key={index}>
                      <Card.Body>
                        <Card.Title>
                          {client.name.first + " " + client.name.last}
                        </Card.Title>
                        <Card.Text>
                          <Stack direction="horizontal" gap={2}>
                            {client.nextAppointment
                              ? correctDateForTimezone(
                                  new Date(client.nextAppointment)
                                ).toLocaleDateString(i18next.language)
                              : t("no-appointment")}
                            <Button
                              variant="danger"
                              onClick={() => {
                                removeAppointment(user.uid, client.cpf);
                              }}
                            >
                              {t("remove")}
                            </Button>
                            {client.phone && (
                              <Button href={"tel:" + client.phone}>
                                {t("call")}
                              </Button>
                            )}{" "}
                            {client.email && (
                              <Button href={"mailto:" + client.email}>
                                {t("email")}
                              </Button>
                            )}
                          </Stack>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Stack>
            </Container>
          )}
        </>
      )}
    </>
  );
}
