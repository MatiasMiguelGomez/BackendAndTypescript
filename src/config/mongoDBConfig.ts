import mongoose from 'mongoose';
import { config } from './envs';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.log(`Error:${error}`);
  }
};
