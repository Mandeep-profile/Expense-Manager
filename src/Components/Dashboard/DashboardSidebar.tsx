import PersonIcon from "@mui/icons-material/Person";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import ExpansoLogo from "../../assets/Expanso_Logo.png"
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./DashboardSidebar.module.css"

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("currentuser");
    navigate("/login");
  };

   const user = JSON.parse(localStorage.getItem("currentuser") || "{}");

  return (
    <div className={styles.leftMenu}>
      <div className={styles.logo}>
        <img src={ExpansoLogo} className={styles.logoImg} />
        <span className={styles.logoName}>Expanso</span>
      </div>
      <div>
        <ul className={styles.items}>
          <li
            className={`${
              location.pathname === "/dashboard"
                ? styles.selected
                : styles.unSelected
            }`}
          >
            <GridViewOutlinedIcon />
            Dashboard
          </li>
          <li
            className={`${
              location.pathname === "/addexpense"
                ? styles.selected
                : styles.unSelected
            }`}
          >
            <AddCardOutlinedIcon />
            Add Expenses
          </li>
          <li
            className={`${
              location.pathname === "report"
                ? styles.selected
                : styles.unSelected
            }`}
          >
            <SummarizeOutlinedIcon />
            Report
          </li>
          <li
            className={`${
              location.pathname === "/settings"
                ? styles.selected
                : styles.unSelected
            }`}
          >
            <SettingsSuggestOutlinedIcon />
            Settings
          </li>
        </ul>
      </div>
      <div className={styles.userName}>
        <PersonIcon /> {user.name}
      </div>
      <div className={styles.logout} onClick={handleLogOut}>
        <LogoutOutlinedIcon />
        Logout
      </div>
    </div>
  );
};

export default DashboardSidebar;
