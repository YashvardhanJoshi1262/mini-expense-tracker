import { formatCurrency } from "../utils/formatCurrency";
function SummaryCard({ expenses }) {
  const totalExpenses = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

  const totalThisMonth = expenses
    .filter((expense) => {
      const expenseDate =
        new Date(expense.date);

      return (
        expenseDate.getMonth() ===
          currentMonth &&
        expenseDate.getFullYear() ===
          currentYear
      );
    })
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map(
            (expense) =>
              Number(expense.amount)
          )
        )
      : 0;

  const categoryTotals =
    expenses.reduce(
      (result, expense) => {
        const category =
          expense.category;

        if (!result[category]) {
          result[category] = 0;
        }

        result[category] += Number(
          expense.amount
        );

        return result;
      },
      {}
    );

  return (
    <div>
      <div className="summary-container">
        <div className="summary-card">
          <h3>Total Expenses</h3>

          <div className="summary-value">
            {formatCurrency(
  totalExpenses
)}
          </div>
        </div>

        <div className="summary-card">
          <h3>Total Records</h3>

          <div className="summary-value">
            {expenses.length}
          </div>
        </div>

        <div className="summary-card">
          <h3>This Month</h3>

          <div className="summary-value">
            {formatCurrency(
  totalThisMonth
)}
          </div>
        </div>

        <div className="summary-card">
          <h3>Highest Expense</h3>

          <div className="summary-value">
            {formatCurrency(
  highestExpense
)}
          </div>
        </div>
      </div>

      <div className="summary-card">
        <h3>Category Breakdown</h3>

        {Object.entries(
          categoryTotals
        ).map(
          ([category, amount]) => (
            <p key={category}>
              {category}:{" "}
{formatCurrency(amount)}
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default SummaryCard;