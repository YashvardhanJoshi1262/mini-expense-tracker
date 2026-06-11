function SummaryCard({ expenses }) {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div>
      <h2>Expense Summary</h2>

      <p>Total Expenses: ₹{totalExpenses}</p>

      <p>Total Records: {expenses.length}</p>
    </div>
  );
}

export default SummaryCard;