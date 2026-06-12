const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./src/routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Expense Tracker API Running",
  });
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});