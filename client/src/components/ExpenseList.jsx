import axios from "axios";
import ExpenseCard from "./ExpenseCard";

function ExpenseList({
  expenses,
  fetchExpenses,
  onEdit,
}) {
  const deleteExpense = async (id) => {
    const confirmed = window.confirm(
  "Are you sure you want to delete this expense?"
);

if (!confirmed) {
  return;
}
    try {
      await axios.delete(
        `http://localhost:5000/api/expenses/${id}`
      );

      fetchExpenses();
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error
      );
    }
  };

  return (
    <div>
      <h2>Expense List</h2>

      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={deleteExpense}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ExpenseList;