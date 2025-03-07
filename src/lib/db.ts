import mongoose from 'mongoose';
import { config } from '@/config/env';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(config.mongodb.uri, {
      ...config.mongodb.options,
      dbName: config.mongodb.dbName,
    });
    isConnected = true;
    console.log(`Connected to MongoDB in ${process.env.NODE_ENV} mode`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }
} 