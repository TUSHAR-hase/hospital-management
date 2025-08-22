import mongoose from "mongoose";
const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: false, trim: true },
  resume_url: { type: String, required: true },
  portfolio_url: { type: String, required: false },  
  Cover_latter: { type: String, required: false },
  id: { type: String, required: true },
  title: { type: String, required: false },
  organization: { type: String, required: false },
  status: { type: String, default: 'applied' },
  applied_at: { type: Date, default: Date.now },
});
const Application= mongoose.models.Application||mongoose.model('Application', ApplicationSchema);
export default Application