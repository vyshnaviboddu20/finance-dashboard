import { useState } from "react";
import { transactions } from "../data/transactions";

function TransactionTable({ role }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredData = transactions.filter((t) => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : t.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mt-8 bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {/* Admin Button */}
      {role === "admin" && (
        <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
          Add Transaction
        </button>
      )}

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        
        <input
          type="text"
          placeholder="Search by category..."
          className="border p-2 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

      </div>

      {/* Table */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((t) => (
            <tr key={t.id} className="border-b">
              <td>{t.date}</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
              <td
                className={
                  t.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {t.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {filteredData.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">
          No transactions found
        </p>
      )}
    </div>
  );
}

export default TransactionTable;