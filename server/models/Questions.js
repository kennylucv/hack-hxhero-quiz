import mongoose from 'mongoose';
const Schema = mongoose.Schema

const QuestionsSchema = new Schema({
  question: String,
  type: String,
  order: Number,
  isActive: Boolean,
})

export default mongoose.model('Questions', QuestionsSchema);
