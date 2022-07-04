import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserAuthContextProvider } from "./contexts/Auth/UserAuthContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import Clients from "./pages/Clients";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="clients" element={<Clients />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
