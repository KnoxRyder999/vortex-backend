const express = require('express');
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const serviceRouter = require('./serviceRoutes')

const router = express.Router();

router.use('/users', authRoutes);
router.use('/services', serviceRouter);
router.use('/projects', projectRoutes);

module.exports = router;