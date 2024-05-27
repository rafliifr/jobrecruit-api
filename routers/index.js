const express = require('express');

const candidateRoutes = require('./candidate.routes');
const jobRoutes = require('./job.routes');
const appRoutes = require('./app.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.use('', candidateRoutes);
router.use('', jobRoutes);
router.use('', appRoutes);
router.use('', userRoutes);
router.use('', authRoutes);

module.exports = router;
