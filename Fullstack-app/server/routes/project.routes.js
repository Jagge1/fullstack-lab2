import express from 'express';
import Project from '../models/project.model.js';

const router = express.Router();

router.post('/', async (req, res)=> {
  const {project_code, project_name, project_description} = req.body
  const pCount = await Project.countDocuments();
  const newPCode = 'P'+ (pCount + 1);

  try {
    const projects = await Project.find({project_code: newPCode}); 
    if (projects.length > 0) {
      return res.status(409).json({message: 'Project already exists'})
    }
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

export default router;
