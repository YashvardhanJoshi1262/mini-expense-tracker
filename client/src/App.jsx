import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import SummaryCard from "./components/SummaryCard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import BudgetForm from "./components/BudgetForm";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [dateFilter, setDateFilter] = useState("All Time");

  const [searchTerm, setSearchTerm] = useState("");

  const [editingExpense, setEditingExpense] = useState(null);

  const [budgets, setBudgets] = useState({});

  // Load expenses from backend when the application starts

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Fetch all expenses from the backend API

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://mini-expense-tracker-api-l3hn.onrender.com/api/expenses",
      );

      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Apply search, category and date filters to expenses

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.note.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;

    let matchesDate = true;

    const expenseDate = new Date(expense.date);

    const today = new Date();

    if (dateFilter === "This Month") {
      matchesDate =
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear();
    }

    if (dateFilter === "Last Month") {
      const lastMonth = today.getMonth() - 1;

      matchesDate =
        expenseDate.getMonth() === lastMonth &&
        expenseDate.getFullYear() === today.getFullYear();
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  // Generate unique categories dynamically from expenses

  const categories = [
    "All",
    ...new Set(expenses.map((expense) => expense.category)),
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
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <SummaryCard expenses={expenses} budgets={budgets} />

      <ExpenseChart expenses={filteredExpenses} />

      {/* Export currently visible expenses as CSV */}
      <button
        onClick={() => {
          const headers = "Amount,Category,Date,Note\n";

          const rows = filteredExpenses
            .map(
              (expense) =>
                `${expense.amount},${expense.category},${expense.date},${expense.note}`,
            )
            .join("\n");

          const csvContent = headers + rows;

          const blob = new Blob([csvContent], {
            type: "text/csv",
          });

          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");

          link.href = url;

          link.download = "expenses.csv";

          link.click();

          window.URL.revokeObjectURL(url);
        }}
      >
        Export CSV
      </button>

      <ExpenseForm
        fetchExpenses={fetchExpenses}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <BudgetForm budgets={budgets} setBudgets={setBudgets} />

      <div className="filter-container">
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="filter-container">
        <button onClick={() => setDateFilter("All Time")}>All Time</button>

        <button onClick={() => setDateFilter("This Month")}>This Month</button>

        <button onClick={() => setDateFilter("Last Month")}>Last Month</button>
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
