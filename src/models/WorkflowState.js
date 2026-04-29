import mongoose from 'mongoose';

const WorkflowStateSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String, // We'll store it as a JSON string to replicate localstorage easily
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  }
}, { timestamps: true });

WorkflowStateSchema.index({ userEmail: 1, key: 1 }, { unique: true });

// Check if model already exists to prevent Next.js API reload errors
export default mongoose.models.WorkflowState || mongoose.model('WorkflowState', WorkflowStateSchema);
