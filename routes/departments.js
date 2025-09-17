const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departmentsController');

router.get('/', departmentsController.listDepartments);
router.get('/new', departmentsController.renderNewForm);
router.post('/', departmentsController.createDepartment);
router.get('/:id/edit', departmentsController.renderEditForm);
router.put('/:id', departmentsController.updateDepartment);
router.delete('/:id', departmentsController.deleteDepartment);

module.exports = router;
