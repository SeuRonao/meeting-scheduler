import { Timestamp } from "firebase/firestore";

interface Client {
  // Client information
  name: { first: string; last: string };
  cpf: string;
  email?: string;
  phone?: string;
  // App information
  creationTimestamp: Timestamp;
  ownerID: string;
}

export type { Client };
