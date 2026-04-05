import { transactions } from "../data/transactions";

function Insights() {
  const expenses = transactions.filter(t => t.type === "expense");

  const totalExpense = expenses.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const highest = expenses.reduce(
    (max, t) => (t.amount > max.amount ? t : max),
    expenses[0]
  );

  return (
    <div className="mt-8 bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Insights</h2>

      <p className="mb-2">
        Total Expenses: <span className="font-semibold">₹{totalExpense}</span>
      </p>

      <p>
        Highest Expense:{" "}
        <span className="font-semibold">
          ₹{highest.amount} ({highest.category})
        </span>
      </p>
    </div>
  );
}

export default Insights;