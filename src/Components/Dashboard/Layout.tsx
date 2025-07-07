import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css"

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <DashboardSidebar />
      <div className={styles.rightContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
