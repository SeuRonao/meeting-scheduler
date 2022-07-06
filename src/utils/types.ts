interface Client {
  // Client information
  name: { first: string; last: string };
  cpf: string;
  rg: string;
  birthDate: Date;
  sex: "Male" | "Female" | "Other";
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
  };
  profession?: string;
  // App information
  creationTimestamp: Date;
  ownerID: string;
  readPermissions: string[]; // Other userIDs that have read permission on the file
}

export type { Client };
