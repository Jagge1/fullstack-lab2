import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const employeeSchema = new Schema ({ 
  employee_id: String,
  full_name: String,
  email: String,
  hashed_password: String
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;