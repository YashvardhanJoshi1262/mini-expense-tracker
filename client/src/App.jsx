import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import SummaryCard from "./components/SummaryCard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [editingExpense, setEditingExpense] =
  useState(null);

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

  const filteredExpenses = expenses.filter(
  (expense) =>
    expense.category
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||
    expense.note
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
);

  return (
    <div className="app">
      <h1>Mini Expense Tracker</h1>

      <input
  type="text"
  placeholder="Search expenses..."
  value={searchTerm}
  onChange={(event) =>
    setSearchTerm(event.target.value)
  }
/>

      <SummaryCard expenses={expenses} />

      <ExpenseForm
        fetchExpenses={fetchExpenses}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <ExpenseList
  expenses={filteredExpenses}
        fetchExpenses={fetchExpenses}
        onEdit={setEditingExpense}
      />
    </div>
  );
}

export default App;