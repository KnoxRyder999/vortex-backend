const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const administrator = require('../middleware/administrator')

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', administrator, serviceController.createService);
router.put('/:id', administrator, serviceController.updateService);
router.delete('/:id', administrator, serviceController.deleteService);

module.exports = router;
