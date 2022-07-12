import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { store } from "./firebaseInit";

async function getClientSnapshot(cpf: string) {
  const clientRef = doc(store, "clients", cpf);
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
  const clientSnap = await getClientSnapshot(cpf);
  if (clientSnap.exists()) {
    throw new Error("Existing Client with CPF: " + cpf);
  }
  const clientRef = doc(store, "clients", cpf);
  await setDoc(clientRef, {
    cpf,
    firstName,
    lastName,
    ownerId,
    email,
    phone,
    creationDate: Timestamp.now(),
  });
}

export { getClientSnapshot, createClient };
