import { useState } from "react";
import axios from "axios";

function ExpenseForm({ fetchExpenses }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    await axios.post(
  "http://localhost:5000/api/expenses",
  {
    ...formData,
    amount: Number(formData.amount),
  }
);

fetchExpenses();

setFormData({
  amount: "",
  category: "",
  date: "",
  note: "",
});

console.log("Expense added");
  } catch (error) {
    console.error(
      "Error adding expense:",
      error
    );
  }
};

  return (
    <div>
      <h2>Add Expense</h2>

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
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;