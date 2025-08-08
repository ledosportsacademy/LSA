const Gallery = require('../models/Gallery');

// Get all gallery items
exports.getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get top 5 gallery items
exports.getTopFiveGalleryItems = async (req, res) => {
  try {
    const topFiveItems = await Gallery.find({ isTopFive: true })
      .sort({ order: 1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      count: topFiveItems.length,
      data: topFiveItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get gallery items by album
exports.getGalleryItemsByAlbum = async (req, res) => {
  try {
    const { album } = req.params;
    const galleryItems = await Gallery.find({ album }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single gallery item
exports.getGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new gallery item
exports.createGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.create(req.body);
    
    res.status(201).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a gallery item
exports.updateGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a gallery item
exports.deleteGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
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

// Update top five gallery items
exports.updateTopFiveItems = async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length !== 5) {
      return res.status(400).json({
        success: false,
        error: 'Exactly 5 items are required'
      });
    }
    
    // Reset all items to not be in top five
    await Gallery.updateMany({}, { isTopFive: false, order: 0 });
    
    // Update the selected items to be in top five with their order
    for (let i = 0; i < items.length; i++) {
      await Gallery.findByIdAndUpdate(items[i].id, {
        isTopFive: true,
        order: i + 1
      });
    }
    
    const updatedTopFive = await Gallery.find({ isTopFive: true }).sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      data: updatedTopFive
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};