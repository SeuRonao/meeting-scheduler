import AddClient from "../components/AddClient/AddClient";
import ClientTable from "../components/ClientTable/ClientTable";

export default function Clients() {
  return (
    <>
      <h1 className="text-center my-3">Clients</h1>
      <AddClient />
      <ClientTable />
    </>
  );
}
