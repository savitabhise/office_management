const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router.get('/', employeesController.listEmployees);            // list (API + view)
router.get('/new', employeesController.renderNewForm);        // render form
router.post('/', employeesController.createEmployee);         // create
router.get('/:id', employeesController.showEmployee);         // view single
router.get('/:id/edit', employeesController.renderEditForm);  // render edit
router.put('/:id', employeesController.updateEmployee);       // update
router.delete('/:id', employeesController.deleteEmployee);    // delete

module.exports = router;
