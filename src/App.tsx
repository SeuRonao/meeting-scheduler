import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./contexts/Auth/UserAuthContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import Clients from "./pages/Clients";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
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
