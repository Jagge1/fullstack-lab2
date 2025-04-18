import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONG_URI)
  .then(()=> 
    console.log('Connected'))
  .catch((err)=> console.error('Error: ' + err));

app.post('/api/employees', async (req, res)=>{
  
});

app.post('/api/projects', async (req, res)=> {

});

app.post('/api/project_assignments', async (req, res)=> {

});

app.get('/api/project_assignments', async (req, res)=> {

});

app.listen(port, ()=> console.log(`Server is listening to port ${port}`));

