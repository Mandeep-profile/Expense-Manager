import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { tableData } from "../../Utils/JsonData";

const groupedData = tableData.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + item.amount;
  return acc;
}, {} as Record<string, number>);

const pieData = Object.entries(groupedData).map(([category, amount]) => ({
  category,
  amount,
}));

const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;

const COLORS = pieData.map(() => getRandomColor());

const ExpenseChart = () => {
  return (
    <div style={{ width: "100%", height: 350 }}>
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
            label={({ percent, category }) =>
              `${category}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
