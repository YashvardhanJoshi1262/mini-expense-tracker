import "./App.css";
import SummaryCard from "./components/SummaryCard";
import ExpenseList from "./components/ExpenseList";

function App() {
  return (
    <div className="app">
      <h1>Mini Expense Tracker</h1>

      <SummaryCard />

      <ExpenseList />
    </div>
  );
}

export default App;