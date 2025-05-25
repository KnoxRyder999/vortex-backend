const express = require('express');
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');

const router = express.Router();

router.use('/users', authRoutes);
router.use('/projects', projectRoutes);

module.exports = router;