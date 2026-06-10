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

module.exports = {
  getExpenses,
  createExpense,
};