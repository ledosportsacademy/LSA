const HeroSlide = require('../models/HeroSlide');

// Get all hero slides
exports.getAllHeroSlides = async (req, res) => {
  try {
    const heroSlides = await HeroSlide.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: heroSlides.length,
      data: heroSlides
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single hero slide
exports.getHeroSlide = async (req, res) => {
  try {
    const heroSlide = await HeroSlide.findById(req.params.id);
    
    if (!heroSlide) {
      return res.status(404).json({
        success: false,
        error: 'Hero slide not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: heroSlide
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new hero slide
exports.createHeroSlide = async (req, res) => {
  try {
    const heroSlide = await HeroSlide.create(req.body);
    
    res.status(201).json({
      success: true,
      data: heroSlide
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a hero slide
exports.updateHeroSlide = async (req, res) => {
  try {
    const heroSlide = await HeroSlide.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!heroSlide) {
      return res.status(404).json({
        success: false,
        error: 'Hero slide not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: heroSlide
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a hero slide
exports.deleteHeroSlide = async (req, res) => {
  try {
    const heroSlide = await HeroSlide.findByIdAndDelete(req.params.id);
    
    if (!heroSlide) {
      return res.status(404).json({
        success: false,
        error: 'Hero slide not found'
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