const Activity = require('../models/Activity');

// Get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get activities by status
exports.getActivitiesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const activities = await Activity.find({ status }).sort({ date: 1 });
    
    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single activity
exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new activity
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    
    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update an activity
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete an activity
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found'
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