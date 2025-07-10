import "./App.css";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import Layout from "./Components/Dashboard/Layout";
import PageLayout from "./Components/Loader/PageLayout";
import AddExpense from "./Components/AddExpense/AddExpense";
import Report from "./Components/Report/Report";
import Settings from "./Components/Settings/Settings";
import ViewInsights from "./Components/Chart/ViewInsights";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Signup />} />
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
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
          }
        />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addexpense" element={<AddExpense />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ViewInsights" element={<ViewInsights />} />
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
