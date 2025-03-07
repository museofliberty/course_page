import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState >= 1) return;

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
} 