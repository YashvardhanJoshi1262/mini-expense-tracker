const expenseService = require("../services/expenseService");

const getExpenses = (req, res) => {
  const expenses = expenseService.getAllExpenses();

  res.status(200).json(expenses);
};

const createExpense = (req, res) => {
  const expenseData = req.body;

  const newExpense =
    expenseService.createExpense(expenseData);

  res.status(201).json(newExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const result =
    expenseService.deleteExpense(id);

  res.status(200).json(result);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const updatedData = req.body;

  const updatedExpense =
    expenseService.updateExpense(id, updatedData);

  res.status(200).json(updatedExpense);
};

const getExpenseSummary = (req, res) => {
  const summary =
    expenseService.getExpenseSummary();

  res.status(200).json(summary);
};

module.exports = {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenseSummary,
};