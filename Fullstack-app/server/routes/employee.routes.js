//Importing packages
import express from 'express';
import bcrypt from 'bcrypt';
import Employee from '../models/employee.model.js';

//Creating an express router
const router = express.Router();

//Post route for creating a new employee
router.post('/', async (req, res)=>{
  //Extracting data from request body
  const { employee_id, full_name, email, hashed_password } = req.body;

  //Genereating a hashed password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(hashed_password, salt);
  const eCount = await Employee.countDocuments();
  const newEId = 'E'+ (eCount + 1); //Employee id based on when an employee was added E1, E2, E3....

  try {
    //Checks if employee with genereated id already exsists 
    const employees = await Employee.find({employee_id: newEId})    
    if (employees.length > 0) {
      return res.status(409).json({message: 'Error: employee already exists!'})
    }
    //New employee object
    const newEmployee = {
      employee_id: newEId,
      full_name,
      email,
      hashed_password: hash
    }
    await Employee.create(newEmployee);
    res.status(201).json({message: 'Employee was created'});
    
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

export default router;
