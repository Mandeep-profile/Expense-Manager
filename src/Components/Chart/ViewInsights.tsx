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
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./ViewInsights.module.css";
import { useSelector } from "react-redux";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const CATEGORY_COLORS = {
  Food: "#34d399",
  Transport: "#f87171",
  Entertainment: "#3b82f6",
  Other: "#a78bfa",
};

const ViewInsights = () => {
  const expenses = useSelector((state) => state.expense.expensesList);

  const barChartData = MONTHS.map((month) => {
    const monthlyExpenses = expenses.filter((item) => {
      const itemMonth = new Date(item.date).toLocaleString("default", { month: "short" });
      return itemMonth === month;
    });
    const totalExpenditure = monthlyExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
    return {
      month,
      expenditure: totalExpenditure,
      earnings: 4000,
    };
  });

  const categoryTotals = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {} as Record<string, number>);

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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="earnings" fill="#10b981" name="Earnings" />
            <Bar dataKey="expenditure" fill="#f97316" name="Expenditure" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Expenditure by Category</h3>
        <ResponsiveContainer width="100%" height={275}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ViewInsights;
