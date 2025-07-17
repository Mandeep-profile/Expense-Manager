import { useState, useEffect } from "react";
import { MonthsName } from "../../Utils/JsonData";
import styles from "./Dashboard.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import DashboardSidebar from "./DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense } from "../AddExpense/ExpenseSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const expenses = useSelector((state) => state.expense.expensesList);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("userExpenses", JSON.stringify(expenses));
  }, [expenses]);

  const getFilteredData = () => {
  if(search.trim() !== "") return filteredData
  if(activeTab ===  "today") return todayexpenses
  return expenses
  }

  const handleDeleteExpenseData = (id: number) => {
    dispatch(deleteExpense(id));
    toast.info("Expense Deleted");
  };

  const handleViewInsights = () => {
    navigate("/ViewInsights");
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const searchData = expenses.filter((item) =>
      item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(searchData);
  }, [search, expenses]);

  const date = new Date();
  const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}}`

  const todayexpenses = expenses.filter((item) => {
    const date = new Date(item.date);
    const isFormattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}}`
    return formattedDate === isFormattedDate
  })

  return (
    <>
      <div className={styles.wrapper}>
        <DashboardSidebar />
        <div className={styles.rightMenu}>
          <div className={styles.dashtopdiv}>
            <div className={styles.headerLeft}>
              <h2 className={styles.dasheading}>Dashboard</h2>
              <p className={styles.dashSubheading}>
                Welcome back! Here's your financial overview
              </p>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.searchContainer}>
                <SearchIcon className={styles.searchIcon} />
                <input
                  className={styles.expenseInput}
                  type="text"
                  placeholder="Search expenses..."
                  value={search}
                  onChange={handleSearchInput}
                />
              </div>
              <button className={styles.filterButton}>
                <FilterListIcon />
                Filter
              </button>
            </div>
          </div>

          {/* Balance Summary Section */}
          <div className={styles.balanceContainer}>
            <div className={styles.balanceHeader}>
              <div className={styles.balanceHeaderLeft}>
                <h2 className={styles.balanceTitle}>
                  <AccountBalanceWalletIcon className={styles.balanceIcon} />
                  Balance Summary
                </h2>
                <p className={styles.balanceSubtitle}>
                  Track your financial health
                </p>
              </div>
              <div className={styles.balanceTabs}>
                <button
                  className={`${styles.tab} ${
                    activeTab === "today" ? styles.activeTab : ""
                  }`}
                  onClick={() => handleTabClick("today")}
                >
                  Today
                </button>
                <button
                  className={`${styles.tab} ${
                    activeTab === "week" ? styles.activeTab : ""
                  }`}
                  onClick={() => handleTabClick("week")}
                >
                  This Week
                </button>
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
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <AccountBalanceWalletIcon />
                  </div>
                  <div className={styles.cardTrend}>
                    <TrendingUpIcon className={styles.trendUp} />
                    <span>+2.5%</span>
                  </div>
                </div>
                <h3>Net Balance</h3>
                <p className={styles.cardAmount}>₹ 5,000</p>
                <span className={styles.cardSubtext}>Available balance</span>
              </div>

              <div className={`${styles.card} ${styles.expense}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <TrendingDownIcon />
                  </div>
                  <div className={styles.cardTrend}>
                    <TrendingDownIcon className={styles.trendDown} />
                    <span>-5.2%</span>
                  </div>
                </div>
                <h3>Current Month Expenditure</h3>
                <p className={styles.cardAmount}>₹ 1,000</p>
                <span className={styles.cardSubtext}>
                  Total spent this month
                </span>
              </div>

              <div className={`${styles.card} ${styles.income}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <TrendingUpIcon />
                  </div>
                  <div className={styles.cardTrend}>
                    <TrendingUpIcon className={styles.trendUp} />
                    <span>+8.1%</span>
                  </div>
                </div>
                <h3>Current Month Earnings</h3>
                <p className={styles.cardAmount}>₹ 4,000</p>
                <span className={styles.cardSubtext}>
                  Total earned this month
                </span>
              </div>
            </div>

            <div className={styles.insightsButtonContainer}>
              <button
                className={styles.insightsButton}
                onClick={handleViewInsights}
              >
                <VisibilityIcon className={styles.buttonIcon} />
                View Detailed Insights
              </button>
            </div>
          </div>

          {/* Expense Table Section */}
          <section className={styles.expenseTableSection}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>Recent Transactions</h3>
              <div className={styles.tableActions}>
                <span className={styles.recordCount}>
                  {expenses.length} records
                </span>
              </div>
            </div>

            <div className={styles.expenseTableHeader}>
              <ul className={styles.expenseTableHeadRow}>
                <li>Name</li>
                <li>Category</li>
                <li>Date</li>
                <li>Amount</li>
                <li>Actions</li>
              </ul>
            </div>

            {getFilteredData().length > 0 ? (
              <div className={styles.expenseTableBody}>
                {getFilteredData().map((field, index) => (
                  <ul
                    className={`${styles.expenseTableRow} ${
                      index % 2 === 0 ? styles.evenRow : ""
                    }`}
                    key={field.id}
                  >
                    <li className={styles.nameCell}>
                      <div className={styles.nameContainer}>
                        <div className={styles.nameInitial}>
                          {field.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{field.name}</span>
                      </div>
                    </li>
                    <li>
                      <span className={styles.categoryBadge}>
                        {field.category}
                      </span>
                    </li>
                    <li className={styles.dateCell}>{field.date}</li>
                    <li className={styles.amountCell}>₹ {field.amount}</li>
                    <li className={styles.actionCell}>
                      <div className={styles.actionButtons}>
                        <button className={styles.editButton}>
                          <EditNoteIcon />
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteExpenseData(field.id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📊</div>
                <h3>No Expenses Yet</h3>
                <p>Start tracking your expenses to see them here</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
