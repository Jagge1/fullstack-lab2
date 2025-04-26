import express from 'express';
import bcrypt from 'bcrypt';
import Employee from '../models/employee.model.js';

const router = express.Router();

router.post('/', async (req, res)=>{
  const { employee_id, full_name, email, hashed_password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(hashed_password, salt);
  const eCount = await Employee.countDocuments();
  const newEId = 'E'+ (eCount + 1);

  try {
    const employees = await Employee.find({employee_id: newEId})    
    if (employees.length > 0) {
      return res.status(409).json({message: 'Error: employee already exists!'})
    }
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
