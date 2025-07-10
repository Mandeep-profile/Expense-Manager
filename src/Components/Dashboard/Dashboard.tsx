import { useEffect } from "react";
import { MonthsName } from "../../Utils/JsonData";
import styles from "./Dashboard.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DashboardSidebar from "./DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense } from "../AddExpense/ExpenseSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const expenses = useSelector((state) => state.expense.expensesList);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("userExpenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleDeleteExpenseData = (id: number) => {
    dispatch(deleteExpense(id));
    toast.info("Expense Deleted");
  };

  const handleViewInsights = () => {
    navigate("/ViewInsights")
  }

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

          <div className={styles.balanceContainer}>
            <div className={styles.balanceHeader}>
              <h2 className={styles.balanceTitle}>Balance Summary</h2>
              <div className={styles.balanceTabs}>
                <button className={styles.tab}>Today</button>
                <button className={styles.tab}>This Week</button>
                <select className={styles.monthSelect}>
                  {MonthsName.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.cardsContainer}>
              <div className={`${styles.card} ${styles.total}`}>
                <h3>Net Balance</h3>
                <p>₹ 5000.00</p>
              </div>
              <div className={`${styles.card} ${styles.expense}`}>
                <h3>Current Month Expenditure</h3>
                <p>₹ 1000</p>
              </div>
              <div className={`${styles.card} ${styles.income}`}>
                <h3>Current Month Earnings</h3>
                <p>₹ 4000</p>
              </div>
            </div>

            <div className={styles.insightsButtonContainer}>
              <button
                className={styles.insightsButton}
                onClick={handleViewInsights}
              >
               View Insights
              </button>
            </div>
          </div>

          <section className={styles.expenseTableSection}>
            <div className={styles.expenseTableHeader}>
              <ul className={styles.expenseTableHeadRow}>
                <li>Name</li>
                <li>Category</li>
                <li>Date</li>
                <li>Amount</li>
                <li>Action</li>
              </ul>
            </div>

            {expenses.length > 0 ? (
              <div className={styles.expenseTableBody}>
                {expenses.map((field) => (
                  <ul className={styles.expenseTableRow} key={field.id}>
                    <li>{field.name}</li>
                    <li>{field.category}</li>
                    <li>{field.date}</li>
                    <li>₹ {field.amount}</li>
                    <li>
                      <EditNoteIcon />
                      <DeleteOutlineIcon
                        className={styles.deleteIcon}
                        onClick={() => handleDeleteExpenseData(field.id)}
                      />
                    </li>
                  </ul>
                ))}
              </div>
            ) : (
              <p className={styles.noExpense}>No Expense Added</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
