import mongoose from 'mongoose';

const WorkflowSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nodes: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: [],
  },
  edges: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: [],
  }
}, { timestamps: true });

export default mongoose.models.Workflow || mongoose.model('Workflow', WorkflowSchema);
