import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';

// Function to seed sample transactions for a user
export const seedSampleTransactions = async (userId) => {
  try {
    // Check if user already has transactions
    const existingCount = await Transaction.countDocuments({ userId });
    
    if (existingCount > 0) {
      console.log(`User ${userId} already has ${existingCount} transactions. Skipping seed.`);
      return;
    }
    
    console.log(`Seeding sample transactions for user ${userId}`);
    
    // Sample transaction data
    const sampleTransactions = [
      {
        userId,
        transactionId: 'txn_' + Date.now() + '1',
        paymentId: 'pay_' + Date.now() + '1',
        amount: 1500,
        status: 'completed',
        paymentMethod: 'Razorpay',
        description: 'Premium subscription',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
      },
      {
        userId,
        transactionId: 'txn_' + Date.now() + '2',
        paymentId: 'pay_' + Date.now() + '2',
        amount: 500,
        status: 'completed',
        paymentMethod: 'Razorpay',
        description: 'Basic plan purchase',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
      },
      {
        userId,
        transactionId: 'txn_' + Date.now() + '3',
        paymentId: 'pay_' + Date.now() + '3',
        amount: 2000,
        status: 'pending',
        paymentMethod: 'Razorpay',
        description: 'Enterprise plan upgrade',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
      },
      {
        userId,
        transactionId: 'txn_' + Date.now() + '4',
        paymentId: 'pay_' + Date.now() + '4',
        amount: 750,
        status: 'failed',
        paymentMethod: 'Razorpay',
        description: 'Payment attempt',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
      },
      {
        userId,
        transactionId: 'txn_' + Date.now() + '5',
        paymentId: 'pay_' + Date.now() + '5',
        amount: 1000,
        status: 'completed',
        paymentMethod: 'Razorpay',
        description: 'Standard plan renewal',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      }
    ];
    
    // Insert the sample transactions
    await Transaction.insertMany(sampleTransactions);
    
    console.log(`Successfully seeded ${sampleTransactions.length} sample transactions`);
    
    return sampleTransactions.length;
  } catch (error) {
    console.error('Error seeding transactions:', error);
    throw error;
  }
};

// Export a function to run the seeding from another file
export const runTransactionSeeding = async (userId) => {
  if (!userId) {
    console.error('User ID is required for seeding transactions');
    return;
  }
  
  try {
    const count = await seedSampleTransactions(userId);
    return count;
  } catch (error) {
    console.error('Failed to seed transactions:', error);
    return 0;
  }
};