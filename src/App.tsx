import "./App.css";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import Layout from "./Components/Dashboard/Layout";
import PageLayout from "./Components/Loader/PageLayout";
import AddExpense from "./Components/AddExpense/AddExpense";
import Settings from "./Components/Settings/Settings";
import ViewInsights from "./Components/Chart/ViewInsights";
import UserSetup from "./Components/User_Setup/UserSetup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ErrorPage from "./Components/Error/ErrorPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/login"
          element={
            <PageLayout>
              <Login />
            </PageLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireAuth={true} requireSetup={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup"
          element={
            <ProtectedRoute requireAuth={true}>
              <UserSetup />
            </ProtectedRoute>
          }
        />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/addexpense"
            element={
              <ProtectedRoute requireAuth={true} requireSetup={true}>
                <AddExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ViewInsights"
            element={
              <ProtectedRoute requireAuth={true} requireSetup={true}>
                <ViewInsights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                requireAuth={true}
                requireSetup={true}
              ><Settings /></ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
