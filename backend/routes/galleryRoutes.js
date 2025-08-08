const express = require('express');
const router = express.Router();
const { 
  getAllGalleryItems,
  getTopFiveGalleryItems,
  getGalleryItemsByAlbum,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  updateTopFiveItems
} = require('../controllers/galleryController');

router
  .route('/')
  .get(getAllGalleryItems)
  .post(createGalleryItem);

router
  .route('/top-five')
  .get(getTopFiveGalleryItems)
  .put(updateTopFiveItems);

router
  .route('/album/:album')
  .get(getGalleryItemsByAlbum);

router
  .route('/:id')
  .get(getGalleryItem)
  .put(updateGalleryItem)
  .delete(deleteGalleryItem);

module.exports = router;