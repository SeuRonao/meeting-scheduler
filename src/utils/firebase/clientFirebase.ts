import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { store } from "./firebaseInit";
import type { Client } from "../types";

async function getClientSnapshot(ownerID: string, cpf: string) {
  const clientRef = doc(store, "users", ownerID, "medical-record", cpf);
  const clientSnap = await getDoc(clientRef);
  return clientSnap;
}

async function createClient(
  firstName: string,
  lastName: string,
  cpf: string,
  ownerID: string,
  email?: string,
  phone?: string
) {
  const clientSnap = await getClientSnapshot(ownerID, cpf);
  if (clientSnap.exists()) {
    throw new Error("Existing Client with CPF: " + cpf);
  }
  const client: Client = {
    name: { first: firstName, last: lastName },
    cpf,
    email,
    phone,
    ownerID,
    creationTimestamp: Timestamp.now(),
  };
  const clientRef = doc(store, "users", ownerID, "medical-record", cpf);
  await setDoc(clientRef, client);
}

export { getClientSnapshot, createClient };
