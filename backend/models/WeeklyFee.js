const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['paid', 'pending', 'overdue'],
    default: 'pending'
  }
});

const weeklyFeeSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  memberName: {
    type: String,
    required: true,
    trim: true
  },
  payments: [paymentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('WeeklyFee', weeklyFeeSchema);