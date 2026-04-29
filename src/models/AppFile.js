import mongoose from 'mongoose';

const AppFileSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
  contentBase64: {
    type: String,
    required: true,
  },
  rutaAGuardar: {
    type: String,
    required: true,
  },
  publicUrl: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.AppFile || mongoose.model('AppFile', AppFileSchema);
