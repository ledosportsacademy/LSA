const Donation = require('../models/Donation');

// Get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single donation
exports.getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    
    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a donation
exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a donation
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found'
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

// Get total donations amount
exports.getTotalDonations = async (req, res) => {
  try {
    const result = await Donation.aggregate([
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