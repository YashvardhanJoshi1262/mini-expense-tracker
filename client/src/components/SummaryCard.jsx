function SummaryCard({ expenses }) {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
  <div className="summary-container">
    <div className="summary-card">
      <h3>Total Expenses</h3>
      <div className="summary-value">
        ₹{totalExpenses}
      </div>
    </div>

    <div className="summary-card">
      <h3>Total Records</h3>
      <div className="summary-value">
        {expenses.length}
      </div>
    </div>
  </div>
);
}

export default SummaryCard;