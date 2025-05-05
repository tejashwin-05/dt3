import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/payment-app';
    console.log("Connecting to MongoDB at:", MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

export default dbConnect;
