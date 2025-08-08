const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['upcoming', 'recent', 'active'],
    default: 'upcoming'
  },
  type: {
    type: String,
    required: true,
    enum: ['match', 'event', 'training', 'trial', 'tournament', 'workshop'],
    default: 'event'
  },
  priority: {
    type: String,
    required: true,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  redirectUrl: {
    type: String,
    default: '',
    trim: true
  },
  openNewTab: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);