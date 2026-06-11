import { useEffect, useState } from "react";
import axios from "axios";

function SummaryCard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/expenses/summary"
      );

      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  if (!summary) {
    return <p>Loading summary...</p>;
  }

  return (
    <div>
      <h2>Expense Summary</h2>

      <p>Total Expenses: ₹{summary.totalExpenses}</p>

      <p>Total Records: {summary.expenseCount}</p>
    </div>
  );
}

export default SummaryCard;