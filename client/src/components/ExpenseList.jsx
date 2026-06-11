import { useEffect, useState } from "react";
import axios from "axios";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/expenses"
      );

      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div>
      <h2>Expense List</h2>

      {expenses.map((expense) => (
        <div key={expense.id}>
          <p>Amount: ₹{expense.amount}</p>
          <p>Category: {expense.category}</p>
          <p>Note: {expense.note}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;