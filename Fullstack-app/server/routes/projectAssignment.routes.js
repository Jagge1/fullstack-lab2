//Importing packages
import express from 'express';
import Employee from '../models/employee.model.js';
import Project from '../models/project.model.js';
import ProjectAssignment from '../models/projectAssignment.model.js';

const router = express.Router();

//Post endpoint to assign an employee to a project
router.post('/', async (req, res)=> {
  //Extracting data from the request body
  const {employee_id, project_code, start_date} = req.body;

  try {
    const employee = await Employee.findOne({employee_id});
    const project = await Project.findOne({project_code});

    //If either employee or project is not found, return 404
    if (!employee || !project) {
      return res.status(404).json({message: 'Employee or Project not found'});
    }
    //New project assignment object by linking employee and project
    const newProjectAssignment = {
      employee_id: employee._id,
      project_code: project._id,
      start_date
    }   
    await ProjectAssignment.create(newProjectAssignment);
    res.status(201).json({message: 'Project has been assigned'}); 

  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

//Get endpoint to retrieve all project assignments
router.get('/', async (req, res)=> {
  try {
    const projectAssignments = await ProjectAssignment.find({})
    //Populate with the entire objects
    .populate('employee_id')
    .populate('project_code')
    res.status(200).json(projectAssignments);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

export default router;
