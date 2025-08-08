const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  joinDate: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);