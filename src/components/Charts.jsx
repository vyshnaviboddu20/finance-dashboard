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

function Charts({ type }) {
  const lineData = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

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

  const COLORS = ["#6366f1", "#22c55e", "#ef4444", "#f59e0b"];

  if (type === "line") {
    return (
      <LineChart width={300} height={200} data={lineData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#6366f1" />
      </LineChart>
    );
  }

  if (type === "pie") {
    return (
      <PieChart width={300} height={200}>
        <Pie data={pieData} dataKey="value" outerRadius={80}>
          {pieData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
}

export default Charts;