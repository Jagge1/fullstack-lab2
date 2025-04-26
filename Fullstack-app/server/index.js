import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import employeeRoutes from './routes/employee.routes.js';
import projectRoutes from './routes/project.routes.js';
import assignmentRoutes from './routes/projectAssignment.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONG_URI)
  .then(()=> 
    console.log('Connected to database'))
  .catch((err)=> console.error('Error: ' + err));

app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project_assignments', assignmentRoutes);

app.listen(port, ()=> console.log(`Server is listening to port ${port}`));
