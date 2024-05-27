const express = require('express');

const { getAllUsers, register } = require('../controllers');

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/user', register);

module.exports = router;