const express = require('express');
const router = express.Router();
const { 
  getAllHeroSlides,
  getHeroSlide,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide
} = require('../controllers/heroController');

router
  .route('/')
  .get(getAllHeroSlides)
  .post(createHeroSlide);

router
  .route('/:id')
  .get(getHeroSlide)
  .put(updateHeroSlide)
  .delete(deleteHeroSlide);

module.exports = router;