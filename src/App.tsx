import "./App.css";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import PageLayout from "./Components/Loader/PageLayout";
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
      </Routes>
    </Router>
  );
}

export default App;
