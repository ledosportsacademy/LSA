const WeeklyFee = require('../models/WeeklyFee');
const Member = require('../models/Member');

// Get all weekly fees
exports.getAllWeeklyFees = async (req, res) => {
  try {
    const weeklyFees = await WeeklyFee.find().sort({ 'memberName': 1 });
    res.status(200).json({
      success: true,
      count: weeklyFees.length,
      data: weeklyFees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get weekly fees for a specific member
exports.getMemberWeeklyFees = async (req, res) => {
  try {
    const { memberId } = req.params;
    const weeklyFee = await WeeklyFee.findOne({ memberId });
    
    if (!weeklyFee) {
      return res.status(404).json({
        success: false,
        error: 'Weekly fee record not found for this member'
      });
    }
    
    res.status(200).json({
      success: true,
      data: weeklyFee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new weekly fee record for a member
exports.createWeeklyFee = async (req, res) => {
  try {
    const { memberId, payments } = req.body;
    
    // Check if member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }
    
    // Check if weekly fee record already exists for this member
    const existingRecord = await WeeklyFee.findOne({ memberId });
    if (existingRecord) {
      return res.status(400).json({
        success: false,
        error: 'Weekly fee record already exists for this member'
      });
    }
    
    const weeklyFee = await WeeklyFee.create({
      memberId,
      memberName: member.name,
      payments
    });
    
    res.status(201).json({
      success: true,
      data: weeklyFee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a weekly fee record
exports.updateWeeklyFee = async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!weeklyFee) {
      return res.status(404).json({
        success: false,
        error: 'Weekly fee record not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: weeklyFee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add a payment to a member's weekly fee record
exports.addPayment = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { date, amount, status } = req.body;
    
    const weeklyFee = await WeeklyFee.findOne({ memberId });
    
    if (!weeklyFee) {
      return res.status(404).json({
        success: false,
        error: 'Weekly fee record not found for this member'
      });
    }
    
    weeklyFee.payments.push({
      date,
      amount,
      status
    });
    
    await weeklyFee.save();
    
    res.status(200).json({
      success: true,
      data: weeklyFee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { memberId, paymentId } = req.params;
    const { status } = req.body;
    
    const weeklyFee = await WeeklyFee.findOne({ memberId });
    
    if (!weeklyFee) {
      return res.status(404).json({
        success: false,
        error: 'Weekly fee record not found for this member'
      });
    }
    
    const payment = weeklyFee.payments.id(paymentId);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    
    payment.status = status;
    
    await weeklyFee.save();
    
    res.status(200).json({
      success: true,
      data: weeklyFee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get fees collection summary
exports.getFeesCollectionSummary = async (req, res) => {
  try {
    const weeklyFees = await WeeklyFee.find();
    
    let totalCollected = 0;
    let totalPending = 0;
    let totalOverdue = 0;
    
    weeklyFees.forEach(fee => {
      fee.payments.forEach(payment => {
        if (payment.status === 'paid') {
          totalCollected += payment.amount;
        } else if (payment.status === 'pending') {
          totalPending += payment.amount;
        } else if (payment.status === 'overdue') {
          totalOverdue += payment.amount;
        }
      });
    });
    
    res.status(200).json({
      success: true,
      data: {
        totalCollected,
        totalPending,
        totalOverdue
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};