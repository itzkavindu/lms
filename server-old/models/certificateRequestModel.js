import mongoose from 'mongoose'; // Import mongoose for MongoDB interactions
import { v4 as uuidv4 } from 'uuid';  // Import uuidv4 to generate unique request IDs

const certificateRequestSchema = new mongoose.Schema({     // Define the collection of certificate request schema)
  request_id: { type: String, required: true, unique: true, default: uuidv4 }, // Unique ID for the certificate request 
  user_id: { type: String, required: true },   
  course_id: { type: String, required: true },
  student_name: { type: String, required: true }, 
  start_date: { type: Date, required: true },  
  end_date: { type: Date, required: true }, 
  submission_date: { type: Date, default: Date.now }, 
  progress: { type: mongoose.Types.Decimal128, required: true }, 
  certificate_issued: { type: Boolean, default: false } 
});
// Create the model or reuse it if already created (to avoid overwrite errors in development)
const CertificateRequest = mongoose.models.CertificateRequest || mongoose.model('CertificateRequest', certificateRequestSchema);
export default CertificateRequest; // Export the model for use in other parts of the application
