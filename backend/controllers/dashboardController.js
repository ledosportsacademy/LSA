const Member = require('../models/Member');
const Activity = require('../models/Activity');
const Donation = require('../models/Donation');
const Expense = require('../models/Expense');
const Experience = require('../models/Experience');
const WeeklyFee = require('../models/WeeklyFee');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total members count
    const totalMembers = await Member.countDocuments();
    
    // Get total activities count
    const totalActivities = await Activity.countDocuments();
    
    // Get total donations amount
    const donationsResult = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    const totalDonations = donationsResult.length > 0 ? donationsResult[0].total : 0;
    
    // Get total expenses amount
    const expensesResult = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    const totalExpenses = expensesResult.length > 0 ? expensesResult[0].total : 0;
    
    // Calculate net balance
    const netBalance = totalDonations - totalExpenses;
    
    // Get total experiences count
    const totalExperiences = await Experience.countDocuments();
    
    // Get weekly fees statistics
    const weeklyFees = await WeeklyFee.find();
    
    let weeklyFeesCollected = 0;
    let pendingFees = 0;
    let overdueFees = 0;
    
    weeklyFees.forEach(fee => {
      fee.payments.forEach(payment => {
        if (payment.status === 'paid') {
          weeklyFeesCollected += payment.amount;
        } else if (payment.status === 'pending') {
          pendingFees += payment.amount;
        } else if (payment.status === 'overdue') {
          overdueFees += payment.amount;
        }
      });
    });
    
    // Get recent activities
    const recentActivities = await Activity.find({ status: 'recent' })
      .sort({ date: -1 })
      .limit(5);
    
    // Get upcoming activities
    const upcomingActivities = await Activity.find({ status: 'upcoming' })
      .sort({ date: 1 })
      .limit(5);
    
    // Get expense categories summary
    const expenseCategories = await Expense.aggregate([
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
    
    // Get monthly financial data for charts
    const currentYear = new Date().getFullYear();
    const monthlyFinancialData = await getMonthlyFinancialData(currentYear);
    
    res.status(200).json({
      success: true,
      data: {
        totalMembers,
        totalActivities,
        totalDonations,
        totalExpenses,
        netBalance,
        totalExperiences,
        weeklyFeesCollected,
        pendingFees,
        overdueFees,
        recentActivities,
        upcomingActivities,
        expenseCategories,
        monthlyFinancialData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Helper function to get monthly financial data
async function getMonthlyFinancialData(year) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthlyData = [];
  
  for (let i = 0; i < 12; i++) {
    const startDate = new Date(year, i, 1);
    const endDate = new Date(year, i + 1, 0);
    
    // Get donations for the month
    const monthlyDonations = await Donation.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    // Get expenses for the month
    const monthlyExpenses = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    const donationsAmount = monthlyDonations.length > 0 ? monthlyDonations[0].total : 0;
    const expensesAmount = monthlyExpenses.length > 0 ? monthlyExpenses[0].total : 0;
    
    monthlyData.push({
      month: months[i],
      donations: donationsAmount,
      expenses: expensesAmount,
      balance: donationsAmount - expensesAmount
    });
  }
  
  return monthlyData;
}