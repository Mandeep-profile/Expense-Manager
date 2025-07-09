import { useState, useEffect } from "react";
import { MonthsName } from "../../Utils/JsonData";
import styles from "./Dashboard.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpenChart from "../Chart/ExpenseChart";
import DashboardSidebar from "./DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense } from "../AddExpense/ExpenseSlice";

const Dashboard = () => {

  const expenses = useSelector((state) => state.expense.expensesList);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("userExpenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleDeleteExpenseData = (id:number) => {
    dispatch(deleteExpense(id));
  };

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
          <section className={styles.expenseDatasection}>
            <section className={styles.expenseSec}>
              <div className={styles.tableHeader}>
                <ul className={styles.ullist}>
                  <li>Name</li>
                  <li>Category</li>
                  <li>Date</li>
                  <li>Amount</li>
                </ul>
              </div>

              {expenses.length > 0 ? <div className={styles.scrollableRows}>
                {expenses.map((field) => (
                  <div className={styles.listdiv} key={field.id}>
                    <ul className={styles.ulist}>
                      <li>{field.name}</li>
                      <li>{field.category}</li>
                      <li>{field.date}</li>
                      <li className={styles.amountWithIcon}>
                        {field.amount}
                        <DeleteOutlineIcon
                          className={styles.deleteIcon}
                          onClick={() => handleDeleteExpenseData(field.id)}
                        />
                      </li>
                    </ul>
                  </div>
                ))}
              </div> : <h1 className={styles.noExpense}>No Expense Added</h1>}
            </section>
            <section className={styles.chartsection}>
              <ExpenChart />
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
