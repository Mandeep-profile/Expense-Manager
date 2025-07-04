import { MonthsName } from "../../Utils/JsonData";
import styles from "./Dashboard.module.css";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {

  return (
    <>
      <div className={styles.wrapper}>
        <DashboardSidebar />
        <div className={styles.rightMenu}>
          <div className={styles.dashtopdiv}>
            <h2 className={styles.dasheading}>Dashboard</h2>
            <input
              className={styles.expenseInput}
              type="text"
              placeholder="Search expenses..."
            />
          </div>
          <div className={styles.balancesummarydiv}>
            <h1 className={styles.balanceSummary}>Balance Summary</h1>
            <div className={styles.tabs}>
              <span className={styles.buttontabs}>Today</span>
              <span className={styles.buttontabs}>This Week</span>
              <select className={styles.buttontabs}>
                {MonthsName.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.expenseMaindiv}>
            <div className={styles.expensesubdiv}>
              Total Balance <span className={styles.showAmount}>$ 5000.00</span>
            </div>
            <div className={styles.expensesubdiv}>
              This Month's Expense{" "}
              <span className={styles.showAmount}>$ 3000</span>
            </div>
            <div className={styles.expensesubdiv}>
              This Month's Income{" "}
              <span className={styles.showAmount}>$ 4000</span>
            </div>
          </div>
          <section className={styles.expenseSection}></section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
