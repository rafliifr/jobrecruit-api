const express = require('express');
const {
  getAllCandidates,
  getCandidateById,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} = require('../controllers'); 
const candidateValidation = require('../middleware/validation/candidate-validation');
const authorization = require('../middleware/auth');

const router = express.Router();

router.get('/candidate', authorization, getAllCandidates);
router.get('/candidate/:id', authorization, getCandidateById);
router.post('/candidate', candidateValidation, addCandidate);
router.put('/candidate/:id', updateCandidate);
router.delete('/candidate/:id', deleteCandidate);

module.exports = router;
