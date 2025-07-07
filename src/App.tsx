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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
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
            <PageLayout>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </PageLayout>
          }
        />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addexpense" element={<AddExpense />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
