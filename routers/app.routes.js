const express = require('express');
const {
  getAllApplications,
  getApplicationById,
  addApplication,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers');

const validateApplication = require('../middleware/validation/app-validation'); 
const authorization = require('../middleware/auth');

const router = express.Router();

router.get('/application', authorization, getAllApplications);
router.get('/application/:id', authorization, getApplicationById);
router.post('/application', validateApplication, addApplication); 
router.put('/application/:id', updateApplicationStatus); 
router.delete('/application/:id', deleteApplication);

module.exports = router;
