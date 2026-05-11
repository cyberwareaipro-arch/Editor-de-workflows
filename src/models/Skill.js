import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: 'Other'
  },
  content: {
    type: String,
    required: true,
  },
  isShared: {
    type: Boolean,
    default: false
  },
  customId: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
