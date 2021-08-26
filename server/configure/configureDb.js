import mongoose from "mongoose";

let dbClient = null; 

export default function configureDb () {
  const connectionString = "mongodb+srv://dbUser:dbPassword@cluster0.e8eb5.mongodb.net/hack-hxhero-quiz-db?retryWrites=true&w=majority";
  mongoose.connect(connectionString, { useNewUrlParser: true });

  const db = mongoose.connection

  db.once('open', _ => {
    console.log('Database connected:', connectionString)
  })
  
  db.on('error', err => {
    console.error('connection error:', err)
  })
}
