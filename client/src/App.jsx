import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import SummaryCard from "./components/SummaryCard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [selectedCategory, setSelectedCategory] =
  useState("All");

  const [dateFilter, setDateFilter] =
  useState("All Time");

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
  (expense) => {
    const matchesSearch =
      expense.category
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      expense.note
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category ===
        selectedCategory;

    let matchesDate = true;

    const expenseDate =
      new Date(expense.date);

    const today = new Date();

    if (
      dateFilter === "This Month"
    ) {
      matchesDate =
        expenseDate.getMonth() ===
          today.getMonth() &&
        expenseDate.getFullYear() ===
          today.getFullYear();
    }

    if (
      dateFilter === "Last Month"
    ) {
      const lastMonth =
        today.getMonth() - 1;

      matchesDate =
        expenseDate.getMonth() ===
          lastMonth &&
        expenseDate.getFullYear() ===
          today.getFullYear();
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDate
    );
  }
);

const categories = [
  "All",
  ...new Set(
    expenses.map(
      (expense) => expense.category
    )
  ),
];

  return (
    <div className="app">
      <div className="dashboard-header">
  <h1>Mini Expense Tracker</h1>
</div>

      <input
      className="search-bar"
  type="text"
  placeholder="Search expenses..."
  value={searchTerm}
  onChange={(event) =>
    setSearchTerm(event.target.value)
  }
/>

      <SummaryCard expenses={expenses} />

      <ExpenseChart
  expenses={filteredExpenses}
/>

      <ExpenseForm
        fetchExpenses={fetchExpenses}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <div className="filter-container">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() =>
        setSelectedCategory(category)
      }
    >
      {category}
    </button>
  ))}
</div>

<div className="filter-container">
  <button
    onClick={() =>
      setDateFilter("All Time")
    }
  >
    All Time
  </button>

  <button
    onClick={() =>
      setDateFilter("This Month")
    }
  >
    This Month
  </button>

  <button
    onClick={() =>
      setDateFilter("Last Month")
    }
  >
    Last Month
  </button>
</div>

      <ExpenseList
  expenses={filteredExpenses}
        fetchExpenses={fetchExpenses}
        onEdit={setEditingExpense}
      />
    </div>
  );
}

export default App;