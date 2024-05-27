const express = require('express');

const { getAllJobs, getJobById, addJob, updateJob, deleteJob } = require('../controllers');
const jobValidation = require('../middleware/validation/job-validation');

const router = express.Router();

router.get('/job', getAllJobs);
router.get('/job/:id', getJobById);
router.post('/job', jobValidation, addJob);
router.put('/job/:id', updateJob);
router.delete('/job/:id', deleteJob);

module.exports = router;