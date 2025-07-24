import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth: boolean;
  requireSetup: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = false,
  requireSetup = false,
}) => {
  const location = useLocation();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const currentuser = JSON.parse(localStorage.getItem("currentuser") || "{}");
  const isSetupCompleted = currentuser?.setupCompleted === true;

  // Redirect to login if not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirect to setup if setup not completed
  if (requireSetup && (!isAuthenticated || !isSetupCompleted)) {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/setup" replace />;
  }

  // Prevent accessing login/setup when already done
  if (
    isAuthenticated &&
    isSetupCompleted &&
    ["/", "/login", "/setup"].includes(location.pathname)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  // Prevent accessing dashboard if setup is not done
  if (isAuthenticated && !isSetupCompleted && location.pathname === "/dashboard") {
    return <Navigate to="/setup" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
