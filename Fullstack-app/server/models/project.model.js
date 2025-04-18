import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectSchema = new Schema ({
  project_code: String,
  project_name: String,
  project_description: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

