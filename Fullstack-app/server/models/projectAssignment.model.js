import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectAssignmentSchema = new Schema ({
  employee_id: String,
  project_code: String,
  start_date: Date
});

const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema);

export default ProjectAssignment;


