const Employee = require('../models/Employee');
const Department = require('../models/Department');

// List employees with pagination, search, filters
exports.listEmployees = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const search = req.query.search || '';
    const department = req.query.department || null;
    const jobTitle = req.query.jobTitle || null;

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (department) filter.department = department;
    if (jobTitle) filter.jobTitle = jobTitle;

    const total = await Employee.countDocuments(filter);
    const employees = await Employee.find(filter)
      .populate('department', 'name')
      .populate('supervisor', 'name')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (req.accepts('json') && !req.accepts('html')) {
      return res.json({
        employees,
        page,
        totalPages: Math.ceil(total / limit),
        total
      });
    }

    res.render('employees/index', {
      employees,
      page,
      totalPages: Math.ceil(total / limit),
      total,
      query: req.query
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Render new employee form
exports.renderNewForm = async (req, res) => {
  const departments = await Department.find();
  const employeesList = await Employee.find();
  res.render('employees/new', { departments, employeesList });
};

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    if (req.body.supervisor && req.body.supervisor === req.body._id) {
      return res.status(400).send('Employee cannot supervise themselves');
    }
    await Employee.create(req.body);
    res.redirect('/employees');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating employee');
  }
};

// Show employee
exports.showEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('department')
      .populate('supervisor');
    if (!employee) return res.status(404).send('Employee not found');
    res.render('employees/show', { employee });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching employee');
  }
};

// Render edit form
exports.renderEditForm = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const departments = await Department.find();
    const employeesList = await Employee.find();
    res.render('employees/edit', { employee, departments, employeesList });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading form');
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    if (req.body.supervisor && req.body.supervisor === req.params.id) {
      return res.status(400).send('Employee cannot supervise themselves');
    }
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/employees');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating employee');
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/employees');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting employee');
  }
};
