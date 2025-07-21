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
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart as PieChartIcon,
  BarChart3,
  Calendar,
  Target,
} from "lucide-react";
import styles from "./ViewInsights.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  Food: "#10b981",
  Transport: "#f59e0b",
  Entertainment: "#3b82f6",
  Other: "#8b5cf6",
};

const CATEGORY_ICONS: Record<string, string> = {
  Food: "🍽️",
  Transport: "🚗",
  Entertainment: "🎮",
  Other: "📦",
};

const monthlyEarnings = JSON.parse(
    localStorage.getItem("userDetails") || " "
  );


const ViewInsights = () => {
  const expenses = useSelector((state: RootState) => state.expense.expensesList);
  const navigate = useNavigate()

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
      earnings: totalExpenditure !== 0 ? monthlyEarnings.income : "",
    };
  });

  const categoryTotals = expenses.reduce((acc: Record<string, number>, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name] || "#64748b",
    icon: CATEGORY_ICONS[name] || "📦",
  }));

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalEarnings = 25000; // Mock data
  const savingsRate = ((monthlyEarnings.income - totalExpenses) / totalEarnings * 100).toFixed(1);

  const trendData = barChartData.slice(-6).map((item, index) => ({
    ...item,
    trend: index > 0 ? item.expenditure - barChartData[barChartData.indexOf(item) - 1].expenditure : 0
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <BarChart3 size={28} />
          </div>
          <div>
            <h1 className={styles.pageTitle}>Financial Insights</h1>
            <p className={styles.pageSubtitle}>Comprehensive analysis of your spending patterns</p>
          </div>
        </div>
        <div className={styles.dateRange} onClick={handleBackToDashboard}>
          <Calendar size={16} />
          <div className={styles.backbtn}>Back to Dashboard</div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <motion.div 
          className={`${styles.statCard} ${styles.totalExpenses}`}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.statIcon}>
            <TrendingDown size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Total Expenses</h3>
            <p className={styles.statValue}>₹{totalExpenses.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div 
          className={`${styles.statCard} ${styles.totalEarnings}`}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.statIcon}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Total Earnings</h3>
            <p className={styles.statValue}>₹{monthlyEarnings.income.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div 
          className={`${styles.statCard} ${styles.savingsRate}`}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.statIcon}>
            <Target size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Savings Rate</h3>
            <p className={styles.statValue}>{savingsRate}%</p>
          </div>
        </motion.div>
      </div>

      <div className={styles.chartsGrid}>
        {/* Bar Chart */}
        <motion.div 
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.chartHeader}>
            <div className={styles.chartTitleSection}>
              <div className={styles.chartIcon}>
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 className={styles.chartTitle}>Monthly Overview</h3>
                <p className={styles.chartSubtitle}>Earnings vs Expenditure comparison</p>
              </div>
            </div>
          </div>
          
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="expenditureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="earnings" 
                  fill="url(#earningsGradient)" 
                  name="Earnings"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expenditure" 
                  fill="url(#expenditureGradient)" 
                  name="Expenditure"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ backgroundColor: "#10b981" }} />
              <span>Earnings</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ backgroundColor: "#f59e0b" }} />
              <span>Expenditure</span>
            </div>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div 
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.chartHeader}>
            <div className={styles.chartTitleSection}>
              <div className={styles.chartIcon}>
                <PieChartIcon size={20} />
              </div>
              <div>
                <h3 className={styles.chartTitle}>Expense Categories</h3>
                <p className={styles.chartSubtitle}>Breakdown by spending category</p>
              </div>
            </div>
          </div>

          <div className={styles.pieChartContainer}>
            <div className={styles.pieChartWrapper}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <defs>
                    {pieChartData.map((entry, index) => (
                      <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={entry.color} stopOpacity={0.8}/>
                        <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.categoryLegend}>
              {pieChartData.map((entry, index) => (
                <motion.div 
                  key={index} 
                  className={styles.categoryItem}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.categoryIcon}>
                    <span>{entry.icon}</span>
                  </div>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryName}>{entry.name}</span>
                    <span className={styles.categoryAmount}>₹{entry.value.toLocaleString()}</span>
                    <span className={styles.categoryPercentage}>
                      {((entry.value / totalExpenses) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div 
                    className={styles.categoryColor}
                    style={{ backgroundColor: entry.color }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViewInsights;