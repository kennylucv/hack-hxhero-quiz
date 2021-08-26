import mongoose from 'mongoose';
const Schema = mongoose.Schema

const AnswersSchema = new Schema({
  timestamp: String,
  answers: [{
    questionId: String,
    answerId: String,
  }],
})

export default mongoose.model('Answers', AnswersSchema);
