import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import styles from "./ViewInsights.module.css";
import { useSelector } from "react-redux";

interface ExpenseItem {
  name: string;
  category: string;
  date: string;
  amount: number | string;
}

interface RootState {
  expense: {
    expensesList: ExpenseItem[];
  };
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#34d399",
  Transport: "#f87171",
  Entertainment: "#3b82f6",
  Other: "#a78bfa",
};

const ViewInsights = () => {
  const expenses = useSelector((state: RootState) => state.expense.expensesList);

  const barChartData = MONTHS.map((month) => {
    const monthlyExpenses = expenses.filter((item) => {
      const itemMonth = new Date(item.date).toLocaleString("default", { month: "short" });
      return itemMonth === month;
    });

    const totalExpenditure = monthlyExpenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    return {
      month,
      expenditure: totalExpenditure,
      earnings: 4000,
    };
  });

  const categoryTotals = expenses.reduce((acc: Record<string, number>, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name] || "#ccc",
  }));

  return (
    <motion.div
      className={styles.container}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Expenditure & Earnings</h3>
        <div className={styles.chartWithLegend}>
          <ResponsiveContainer width="75%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earnings" fill="#10b981" name="Earnings" />
              <Bar dataKey="expenditure" fill="#f97316" name="Expenditure" />
            </BarChart>
          </ResponsiveContainer>

          <div className={styles.legendColumn}>
            <div className={styles.legendItem}>
              <span className={styles.colorBox} style={{ backgroundColor: "#10b981" }} />
              <span>Earnings</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.colorBox} style={{ backgroundColor: "#f97316" }} />
              <span>Expenditure</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Expenditure by Category</h3>
        <div className={styles.chartWithLegend}>
          <ResponsiveContainer width="75%" height={275}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className={styles.legendColumn}>
            {pieChartData.map((entry, index) => (
              <div key={index} className={styles.legendItem}>
                <span
                  className={styles.colorBox}
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewInsights;
