import mongoose from 'mongoose';
const Schema = mongoose.Schema

const QuestionAnswersSchema = new Schema({
  questionId: String,
  answer: String,
  imgUrl: String,
  points: {
    risk: Number,
    knowledge: Number,
    action: Number,
    price: Number,
  }
})

export default mongoose.model('QuestionAnswers', QuestionAnswersSchema);
