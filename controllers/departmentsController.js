const Department = require('../models/Department');

exports.listDepartments = async (req, res) => {
  const departments = await Department.find();
  res.render('departments/index', { departments });
};

exports.renderNewForm = (req, res) => {
  res.render('departments/new');
};

exports.createDepartment = async (req, res) => {
  await Department.create(req.body);
  res.redirect('/departments');
};

exports.renderEditForm = async (req, res) => {
  const department = await Department.findById(req.params.id);
  res.render('departments/edit', { department });
};

exports.updateDepartment = async (req, res) => {
  await Department.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/departments');
};

exports.deleteDepartment = async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.redirect('/departments');
};
