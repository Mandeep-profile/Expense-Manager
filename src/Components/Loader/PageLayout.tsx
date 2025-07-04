import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ExpenseLoader from "./ExpenseLoader";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(3px)",
          }}
        >
          <ExpenseLoader />
        </div>
      )}
      <div style={{ filter: loading ? "blur(3px)" : "none", transition: "0.3s" }}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
