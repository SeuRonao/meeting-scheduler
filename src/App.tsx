import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { UserAuthContextProvider } from "./contexts/Auth/UserAuthContext";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Layout></Layout>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
