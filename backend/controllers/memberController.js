const Member = require('../models/Member');

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single member
exports.getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new member
exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    
    res.status(201).json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a member
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a member
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
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

// Search members
exports.searchMembers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const members = await Member.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { role: { $regex: query, $options: 'i' } },
        { contact: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } }
      ]
    }).sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};