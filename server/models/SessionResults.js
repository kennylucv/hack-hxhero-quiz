import mongoose from 'mongoose';
const Schema = mongoose.Schema

const SessionResultsSchema = new Schema({
  createdAt: String,
  submittedAt: String,
  answers: [{
    questionId: String,
    answerId: String,
  }],
  email: String,
  sessionId: String,
  archetype: String,
})

export default mongoose.model('SessionResults', SessionResultsSchema);
