import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { transactions } from "../data/transactions";

function Charts() {
  // Line chart data
  const lineData = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  // Pie chart data
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ff7f7f", "#ffc658"];

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-4">Spending Trend</h2>
        <LineChart width={300} height={200} data={lineData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-4">Expense Breakdown</h2>
        <PieChart width={300} height={200}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

    </div>
  );
}

export default Charts;