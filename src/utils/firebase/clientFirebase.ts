import { deleteDoc, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { store } from "./firebaseInit";
import type { Client } from "../types";

const USERS_COLLECTION = "users";
const MEDICAL_RECORDS = "medical-records";

async function getClientSnapshot(ownerID: string, cpf: string) {
  const clientRef = doc(store, USERS_COLLECTION, ownerID, MEDICAL_RECORDS, cpf);
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
  const clientRef = doc(store, USERS_COLLECTION, ownerID, MEDICAL_RECORDS, cpf);
  await setDoc(clientRef, client);
}

async function updateClient(
  ownerId: string,
  cpf: string,
  client: Partial<Client>
) {
  const clientRef = doc(store, USERS_COLLECTION, ownerId, MEDICAL_RECORDS, cpf);
  await setDoc(clientRef, client, { merge: true });
}

async function removeClient(ownerID: string, cpf: string) {
  const clientRef = doc(store, USERS_COLLECTION, ownerID, MEDICAL_RECORDS, cpf);
  await deleteDoc(clientRef);
}

export { getClientSnapshot, createClient, updateClient, removeClient };
