import PersonIcon from "@mui/icons-material/Person";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import ExpansoLogo from "../../assets/Expanso_Logo.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./DashboardSidebar.module.css";

const DashboardSidebar = () => {
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
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? styles.selected : styles.unSelected
            }
          >
            <GridViewOutlinedIcon />
            Dashboard
          </NavLink>
          <NavLink
            to="/addexpense"
            className={({ isActive }) =>
              isActive ? styles.selected : styles.unSelected
            }
          >
            <AddCardOutlinedIcon />
            Add Expense
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive ? styles.selected : styles.unSelected
            }
          >
            <SummarizeOutlinedIcon />
            Report
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? styles.selected : styles.unSelected
            }
          >
            <SettingsSuggestOutlinedIcon />
            Settings
          </NavLink>
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
