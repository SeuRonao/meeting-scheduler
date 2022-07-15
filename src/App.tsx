import { useAuthState } from "react-firebase-hooks/auth";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Layout from "./components/Layout/Layout";
import Clients from "./pages/Clients";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/Schedule";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { auth } from "./utils/firebase/firebaseInit";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="schedule" element={<Schedule />} />
              <Route path="clients" element={<Clients />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// eslint-disable-next-line no-undef
function ProtectedRoute() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  return <Outlet />;
}
