const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const expensesFilePath = path.join(
  __dirname,
  "../data/expenses.json"
);

const getAllExpenses = () => {
  const data = fs.readFileSync(expensesFilePath, "utf-8");
  return JSON.parse(data);
};

const createExpense = (expenseData) => {
  const expenses = getAllExpenses();

  const newExpense = {
    id: uuidv4(),
    ...expenseData,
  };

  expenses.push(newExpense);

  fs.writeFileSync(
    expensesFilePath,
    JSON.stringify(expenses, null, 2)
  );

  return newExpense;
};

const deleteExpense = (id) => {
  const expenses = getAllExpenses();

  const filteredExpenses = expenses.filter(
    (expense) => expense.id !== id
  );

  fs.writeFileSync(
    expensesFilePath,
    JSON.stringify(filteredExpenses, null, 2)
  );

  return {
    success: true,
    message: "Expense deleted successfully",
  };
};

const updateExpense = (id, updatedData) => {
  const expenses = getAllExpenses();

  const updatedExpenses = expenses.map((expense) => {
    if (expense.id === id) {
      return {
        ...expense,
        ...updatedData,
      };
    }

    return expense;
  });

  fs.writeFileSync(
    expensesFilePath,
    JSON.stringify(updatedExpenses, null, 2)
  );

  const updatedExpense = updatedExpenses.find(
    (expense) => expense.id === id
  );

  return updatedExpense;
};

const getExpenseSummary = () => {
  const expenses = getAllExpenses();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryBreakdown = expenses.reduce(
    (result, expense) => {
      const category = expense.category;

      if (!result[category]) {
        result[category] = 0;
      }

      result[category] += expense.amount;

      return result;
    },
    {}
  );

  return {
    totalExpenses,
    expenseCount: expenses.length,
    categoryBreakdown,
  };
};

module.exports = {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenseSummary,
};