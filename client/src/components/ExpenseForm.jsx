import { useState, useEffect } from "react";
import axios from "axios";

function ExpenseForm({ fetchExpenses, editingExpense, setEditingExpense }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const [error, setError] = useState("");

  // Populate form fields when editing an existing expense

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        note: editingExpense.note,
      });
    }
  }, [editingExpense]);

  // Update form state when user types in inputs

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data and create/update an expense

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    if (!formData.category.trim()) {
      setError("Category is required");
      return;
    }

    if (!formData.date) {
      setError("Date is required");
      return;
    }

    // Prevent users from adding expenses with future dates

    const selectedDate = new Date(formData.date);

    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setError("Future dates are not allowed");
      return;
    }

    if (!formData.note.trim()) {
      setError("Note is required");
      return;
    }

    try {
      if (editingExpense) {
        await axios.put(
          `http://localhost:5000/api/expenses/${editingExpense.id}`,
          {
            ...formData,
            amount: Number(formData.amount),
          },
        );

        setEditingExpense(null);
      } else {
        await axios.post("http://localhost:5000/api/expenses", {
          ...formData,
          amount: Number(formData.amount),
        });
      }

      fetchExpenses();

      setFormData({
        amount: "",
        category: "",
        date: "",
        note: "",
      });

      console.log("Expense added");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="form-card">
      <h2>{editingExpense ? "Update Expense" : "Add Expense"}</h2>

      {error && (
        <p
          style={{
            color: "#ff6b6b",
            marginBottom: "12px",
          }}
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
