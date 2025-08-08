const express = require('express');
const router = express.Router();
const { 
  getAllWeeklyFees,
  getMemberWeeklyFees,
  createWeeklyFee,
  updateWeeklyFee,
  addPayment,
  updatePaymentStatus,
  getFeesCollectionSummary
} = require('../controllers/weeklyFeeController');

router
  .route('/')
  .get(getAllWeeklyFees)
  .post(createWeeklyFee);

router
  .route('/summary')
  .get(getFeesCollectionSummary);

router
  .route('/member/:memberId')
  .get(getMemberWeeklyFees);

router
  .route('/:id')
  .put(updateWeeklyFee);

router
  .route('/:id/payment')
  .post(addPayment);

router
  .route('/:id/payment/:paymentId')
  .put(updatePaymentStatus);

module.exports = router;