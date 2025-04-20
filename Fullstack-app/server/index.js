import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Employee from './models/employee.model.js'
import ProjectAssignment from './models//projectAssignment.model.js'
import Project from './models//project.model.js'
import bcrypt from 'bcrypt';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONG_URI)
  .then(()=> 
    console.log('Connected to database'))
  .catch((err)=> console.error('Error: ' + err));

app.post('/api/employees', async (req, res)=>{
  const { employee_id, full_name, email, hashed_password } = req.body;

  //Using bcrypt to hash userpassword
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(hashed_password, salt);
  const count = await Employee.countDocuments();
  const newId = 'E'+ (count + 1);

  try {
    const employees = await Employee.find({employee_id: newId})    
    if (employees.length > 0) {
      return res.status(409).json({message: 'Error: employee already exists!'})
    }
    //New Employee with hashed password
    const newEmployee = {
      employee_id: newId,
      full_name,
      email,
      hashed_password: hash //The password that was hashed
    }
    //The new employee get created
    await Employee.create(newEmployee);
    res.status(201).json({message: 'Employee was created'})
    
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

app.post('/api/projects', async (req, res)=> {

});

app.post('/api/project_assignments', async (req, res)=> {

});

app.get('/api/project_assignments', async (req, res)=> {

});

app.listen(port, ()=> console.log(`Server is listening to port ${port}`));

