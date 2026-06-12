import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ expenses }) {
  const categoryTotals = expenses.reduce((result, expense) => {
    const category = expense.category;

    if (!result[category]) {
      result[category] = 0;
    }

    result[category] += Number(expense.amount);

    return result;
  }, {});

  const chartData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      amount,
    }),
  );

  return (
    <div className="summary-card">
      <h3>Expenses by Category</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
