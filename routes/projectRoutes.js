const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const administrator = require('../middleware/administrator')

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', administrator, projectController.createProject);
router.put('/:id', administrator, projectController.updateProject);
router.delete('/:id', administrator, projectController.deleteProject);

module.exports = router;
