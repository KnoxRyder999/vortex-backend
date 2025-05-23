const express = require('express');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/users', authRoutes);

module.exports = router;