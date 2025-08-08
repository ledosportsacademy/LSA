const Expense = require('../models/Expense');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get expenses by category
exports.getExpensesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const expenses = await Expense.find({ category }).sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single expense
exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    
    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get total expenses amount
exports.getTotalExpenses = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    const totalAmount = result.length > 0 ? result[0].total : 0;
    
    res.status(200).json({
      success: true,
      data: { totalAmount }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get expenses by category summary
exports.getExpensesByCategorySummary = async (req, res) => {
  try {
    const categorySummary = await Expense.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      count: categorySummary.length,
      data: categorySummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};