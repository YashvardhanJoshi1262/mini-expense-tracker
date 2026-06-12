import { useState } from "react";

function BudgetForm({ budgets, setBudgets }) {
  const [category, setCategory] = useState("");

  const [amount, setAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!category || !amount) {
      return;
    }

    setBudgets({
      ...budgets,
      [category]: Number(amount),
    });

    setCategory("");
    setAmount("");
  };

  return (
    <div className="form-card">
      <h2>Set Budget</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <button type="submit">Save Budget</button>
      </form>
    </div>
  );
}

export default BudgetForm;
