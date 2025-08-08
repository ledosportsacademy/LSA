const express = require('express');
const router = express.Router();
const { 
  getAllExpenses,
  getExpensesByCategory,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getTotalExpenses,
  getExpensesByCategorySummary
} = require('../controllers/expenseController');

router
  .route('/')
  .get(getAllExpenses)
  .post(createExpense);

router
  .route('/total')
  .get(getTotalExpenses);

router
  .route('/category/:category')
  .get(getExpensesByCategory);

router
  .route('/category-summary')
  .get(getExpensesByCategorySummary);

router
  .route('/:id')
  .get(getExpense)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;