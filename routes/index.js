const express = require('express');
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const serviceRouter = require('./serviceRoutes')
const checkout = require('./checkoutRoute');

const router = express.Router();

router.use('/users', authRoutes);
router.use('/services', serviceRouter);
router.use('/projects', projectRoutes);
router.use('/create-checkout-session', checkout)

module.exports = router;