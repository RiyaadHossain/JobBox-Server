import { Schema, model } from 'mongoose';
import { ICandidate } from './interface';

const candidateSchema = new Schema<ICandidate>({
  name: { type: String, required: true, minlength: 3, maxlength: 16 },
  avatar: { type: String },
  banner: { type: String },
  about: { type: String },
  industry: { type: String },
  location: { type: String },
  phoneNumber: { type: String },
  skills: [{ type: String }],
  workExperience: [
    {
      timePeriod: String,
      position: String,
      company: String,
      details: String,
    },
  ],
  educationTraining: [
    {
      timePeriod: String,
      courseName: String,
      institution: String,
      details: String,
    },
  ],
});

const Candidate = model<ICandidate>('Candidate', candidateSchema);

export default Candidate;