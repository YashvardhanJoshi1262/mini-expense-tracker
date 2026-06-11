import axios from "axios";
import ExpenseCard from "./ExpenseCard";

function ExpenseList({
  expenses,
  fetchExpenses,
}) {
  const deleteExpense = async (id) => {
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
        />
      ))}
    </div>
  );
}

export default ExpenseList;