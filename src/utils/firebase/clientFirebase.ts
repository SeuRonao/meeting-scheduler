import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { store } from "./firebaseInit";

async function getClientSnapshot(ownerId: string, cpf: string) {
  const clientRef = doc(store, "users", ownerId, "medical-record", cpf);
  const clientSnap = await getDoc(clientRef);
  return clientSnap;
}

async function createClient(
  firstName: string,
  lastName: string,
  cpf: string,
  ownerId: string,
  phone?: string,
  email?: string
) {
  const clientSnap = await getClientSnapshot(ownerId, cpf);
  if (clientSnap.exists()) {
    throw new Error("Existing Client with CPF: " + cpf);
  }
  const clientRef = doc(store, "users", ownerId, "medical-record", cpf);
  await setDoc(clientRef, {
    cpf,
    firstName,
    lastName,
    email,
    phone,
    creationDate: Timestamp.now(),
  });
}

export { getClientSnapshot, createClient };
