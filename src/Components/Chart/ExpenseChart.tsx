import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const ExpenseChart = () => {
  const expenses = useSelector((state) => state.expense.expensesList);

  const groupedData = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(groupedData).map(([category, amount]) => ({
    category,
    amount,
  }));

  const getRandomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;

  const COLORS = pieData.map(() => getRandomColor());

  return (
    <div style={{ width: "100%", height: 350 }}>
      {pieData.length > 0 ? (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={110}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            color: "#999",
          }}
        >
          No expense data to display
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
