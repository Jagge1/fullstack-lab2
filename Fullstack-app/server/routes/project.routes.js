//Importing packages
import express from 'express';
import Project from '../models/project.model.js';

//Creating a new route
const router = express.Router();

//Post endpoint to create a new project
router.post('/', async (req, res)=> {
  const {project_code, project_name, project_description} = req.body
  const pCount = await Project.countDocuments(); //Counting existing data in database 
  const newPCode = 'P'+ (pCount + 1); //Project code based on when a project was added P1, P2, P3....

  try {
    //Extracting project data from request body
    const projects = await Project.find({project_code: newPCode}); 
    if (projects.length > 0) {
      return res.status(409).json({message: 'Project already exists'})
    }
    //New project object
    const newProject = {
      project_code: newPCode,
      project_name,
      project_description
    }
    await Project.create(newProject);
    res.status(201).json({message: 'Project was created'})
    
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

//Exporting the router
export default router;
