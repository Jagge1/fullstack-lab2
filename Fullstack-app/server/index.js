//Importing packages
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//importing routes
import employeeRoutes from './routes/employee.routes.js';
import projectRoutes from './routes/project.routes.js';
import assignmentRoutes from './routes/projectAssignment.routes.js';

//Reads from env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cors());

//Database connection
mongoose.connect(process.env.MONG_URI)
  .then(()=> 
    console.log('Connected to database'))
  .catch((err)=> console.error('Error: ' + err));

//Api endpoints
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project_assignments', assignmentRoutes);

app.listen(port, ()=> console.log(`Server is listening to port ${port}`));
