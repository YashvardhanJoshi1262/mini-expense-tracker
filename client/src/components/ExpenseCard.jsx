import { formatCurrency } from "../utils/formatCurrency";
function ExpenseCard({
  expense,
  onDelete,
  onEdit,
}) {
  return (
    <div className="expense-card">
      <h3>
  {formatCurrency(
    expense.amount
  )}
</h3>

      <p>
        <strong>Category:</strong>{" "}
        {expense.category}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {expense.date}
      </p>

      <p>
        <strong>Note:</strong>{" "}
        {expense.note}
      </p>

      <div className="button-group">
        <button
          onClick={() => onEdit(expense)}
        >
          Edit
        </button>

        <button
          onClick={() =>
            onDelete(expense.id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseCard;