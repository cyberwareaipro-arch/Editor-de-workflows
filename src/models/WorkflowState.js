import mongoose from 'mongoose';

const WorkflowStateSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String, // We'll store it as a JSON string to replicate localstorage easily
    required: true,
  }
}, { timestamps: true });

// Check if model already exists to prevent Next.js API reload errors
export default mongoose.models.WorkflowState || mongoose.model('WorkflowState', WorkflowStateSchema);
