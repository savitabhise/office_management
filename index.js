require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const Department = require('./models/Department');
const Employee = require('./models/Employee');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/main');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

// routes
const departmentRoutes = require('./routes/departments');
const employeeRoutes = require('./routes/employees');
app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);

app.get('/test-db', async (req, res) => {
  try {
    // create department if none exist
    let dept = await Department.findOne();
    if (!dept) {
      dept = await Department.create({ name: 'IT', description: 'Tech Department' });
    }

    // create employee if none exist
    let emp = await Employee.findOne();
    if (!emp) {
      emp = await Employee.create({
        name: 'John Doe',
        email: 'john@example.com',
        jobTitle: 'Developer',
        department: dept._id,
        country: 'India',
        state: 'Maharashtra',
        city: 'Pune'
      });
    }

    // fetch employees with department populated
    const employees = await Employee.find().populate('department');
    res.json({
      departments: await Department.find(),
      employees
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('DB test failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
