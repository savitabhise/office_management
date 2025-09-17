const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  jobTitle: String,
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  supervisor: { type: Schema.Types.ObjectId, ref: 'Employee' }, // self reference
  country: String,
  state: String,
  city: String
}, { timestamps: true });

// add text index for searching name and email
employeeSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('Employee', employeeSchema);
