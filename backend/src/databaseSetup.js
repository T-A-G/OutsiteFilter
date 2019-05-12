import mongoose from 'mongoose';

// Connect to MongoDB Endpoint
export const setupDatabase = async ()  => {
  mongoose.Promise = global.Promise;
  const url = process.env.DATABASE_ENDPOINT || 'mongodb+srv://test:test123@cluster0-twl2y.mongodb.net/test?retryWrites=true'
  mongoose.connect(url, { useNewUrlParser: true });
  mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}...`));
}
