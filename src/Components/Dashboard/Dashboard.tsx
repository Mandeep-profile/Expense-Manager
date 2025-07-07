import { MonthsName } from "../../Utils/JsonData";
import styles from "./Dashboard.module.css";
import { tableData } from "../../Utils/JsonData";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from '@mui/icons-material/Edit';
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
          <section className={styles.expenseSec}>
            <div className={styles.tableHeader}>
              <ul className={styles.ullist}>
                <li>Name</li>
                <li>Category</li>
                <li>Date</li>
                <li>Amount</li>
              </ul>
            </div>

            <div className={styles.scrollableRows}>
              {tableData.map((field, index) => (
                <div className={styles.listdiv} key={index}>
                  <ul className={styles.ulist}>
                    <li>{field.name}</li>
                    <li>{field.category}</li>
                    <li>{field.date}</li>
                    <li className={styles.amountWithIcon}>
                      {field.amount}
                      <DeleteOutlineIcon className={styles.deleteIcon} />
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
