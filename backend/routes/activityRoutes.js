const express = require('express');
const router = express.Router();
const { 
  getAllActivities,
  getActivitiesByStatus,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activityController');

router
  .route('/')
  .get(getAllActivities)
  .post(createActivity);

router
  .route('/status/:status')
  .get(getActivitiesByStatus);

router
  .route('/:id')
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = router;