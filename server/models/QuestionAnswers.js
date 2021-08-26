import mongoose from 'mongoose';
const Schema = mongoose.Schema

const QuestionAnswersSchema = new Schema({
  questionId: String,
  answer: String,
  imgUrl: String,
  points: [{
    archetype: String,
    amount: Number,
  }]
})

export default mongoose.model('QuestionAnswers', QuestionAnswersSchema);
