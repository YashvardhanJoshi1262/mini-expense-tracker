function ExpenseCard({ expense, onDelete }) {
  return (
    <div>
      <p>Amount: ₹{expense.amount}</p>
      <p>Category: {expense.category}</p>
      <p>Note: {expense.note}</p>

      <button
        onClick={() => onDelete(expense.id)}
      >
        Delete
      </button>

      <hr />
    </div>
  );
}

export default ExpenseCard;