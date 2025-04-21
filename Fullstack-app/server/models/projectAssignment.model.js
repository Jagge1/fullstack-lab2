import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectAssignmentSchema = new Schema ({
  employee_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
  project_code: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
  start_date: {
    type: Date,
    default: Date.now}
});

const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema);

export default ProjectAssignment;


