const Experience = require('../models/Experience');

// Get all experiences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single experience
exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new experience
exports.createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    
    res.status(201).json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update an experience
exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete an experience
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience not found'
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