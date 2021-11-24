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
  referralUrl: String,
  sessionId: String,
  archetype: String,
  scores: {
    action: Number,
    knowledge: Number,
    risk: Number, 
    price: Number
  }
})

export default mongoose.model('SessionResults', SessionResultsSchema);
