import { transactions } from "../data/transactions";
import TransactionTable from "../components/TransactionTable";
import Insights from "../components/Insights";
import Charts from "../components/Charts";
import { useState } from "react";

function Dashboard() {
  const [role, setRole] = useState("viewer");

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Finance Dashboard</h1>

      {/* Role Selector */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Total Balance</p>
          <h2 className="text-2xl font-bold">₹{balance}</h2>
        </div>

        <div className="bg-green-100 rounded-xl p-5">
          <p className="text-gray-600">Income</p>
          <h2 className="text-2xl font-bold text-green-700">₹{income}</h2>
        </div>

        <div className="bg-red-100 rounded-xl p-5">
          <p className="text-gray-600">Expenses</p>
          <h2 className="text-2xl font-bold text-red-700">₹{expense}</h2>
        </div>

      </div>

      {/* Charts */}
      <Charts />

      <Insights />

      {/* Table with role */}
      <TransactionTable role={role} />

    </div>
  );
}

export default Dashboard;