import { useState } from "react";
import { transactions } from "../data/transactions";

function TransactionTable({ role }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filteredData = transactions.filter((t) => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : t.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {/* Admin Button */}
      {role === "admin" && (
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Transaction
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
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
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
              <td className={t.type === "income" ? "text-green-600" : "text-red-600"}>
                {t.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No transactions found 😕
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="mb-4 font-bold">Add Transaction</h2>

            <input className="border p-2 w-full mb-2" placeholder="Category" />
            <input className="border p-2 w-full mb-2" placeholder="Amount" />

            <select className="border p-2 w-full mb-4">
              <option>income</option>
              <option>expense</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;