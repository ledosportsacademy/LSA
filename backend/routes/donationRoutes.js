const express = require('express');
const router = express.Router();
const { 
  getAllDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,
  getTotalDonations
} = require('../controllers/donationController');

router
  .route('/')
  .get(getAllDonations)
  .post(createDonation);

router
  .route('/total')
  .get(getTotalDonations);

router
  .route('/:id')
  .get(getDonation)
  .put(updateDonation)
  .delete(deleteDonation);

module.exports = router;