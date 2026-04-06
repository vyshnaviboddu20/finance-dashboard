import { transactions } from "../data/transactions";
import TransactionTable from "../components/TransactionTable";
import Insights from "../components/Insights";
import Charts from "../components/Charts";
import { useState } from "react";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";

function Dashboard() {
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200"
      }`}
    >
      <div className="max-w-6xl mx-auto p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Finance Dashboard</h1>

          <div className="flex gap-4 mt-4 md:mt-0">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-3 py-2 rounded-lg border text-black"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-black text-white"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p>Total Balance</p>
                <h2 className="text-2xl font-bold">₹{balance}</h2>
              </div>
              <FaWallet size={28} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p>Income</p>
                <h2 className="text-2xl font-bold">₹{income}</h2>
              </div>
              <FaArrowUp size={28} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p>Expenses</p>
                <h2 className="text-2xl font-bold">₹{expense}</h2>
              </div>
              <FaArrowDown size={28} />
            </div>
          </div>

        </div>

        {/* Charts */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h2 className="mb-4 font-semibold">Spending Trend</h2>
            <Charts type="line" />
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h2 className="mb-4 font-semibold">Expense Breakdown</h2>
            <Charts type="pie" />
          </div>

        </div>

        {/* Insights */}
        <div className="mt-10 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <Insights />
        </div>

        {/* Transactions */}
        <div className="mt-10 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <TransactionTable role={role} />
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-sm opacity-70">
          © 2026 Finance Dashboard • Built by Vyshnavi
        </div>

      </div>
    </div>
  );
}

export default Dashboard;