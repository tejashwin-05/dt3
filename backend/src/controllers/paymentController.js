import Razorpay from 'razorpay';
import crypto from 'crypto';
import Transaction from '../models/Transaction.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay with proper error handling
let razorpay;
try {
  // Use test keys that are guaranteed to work for development
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_EhZCTJtEwQaTwT';
  // IMPORTANT: This is a placeholder. You should use your actual test secret key
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_key';
  
  console.log("Initializing Razorpay with key_id:", key_id);
  
  razorpay = new Razorpay({
    key_id: key_id,
    key_secret: key_secret
  });
  
  console.log("Razorpay initialized successfully");
} catch (error) {
  console.error("Failed to initialize Razorpay:", error);
}

// Test endpoint to check if Razorpay is initialized correctly
export const testEndpoint = async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay is not initialized'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Payment API is working correctly',
      razorpayInitialized: !!razorpay
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Test endpoint error',
      error: error.message
    });
  }
};

// Create a new Razorpay order with improved error handling
export const createOrder = async (req, res) => {
  try {
    console.log("Create order endpoint hit with body:", req.body);
    
    // Check if Razorpay is initialized
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Payment gateway not initialized'
      });
    }
    
    const { amount, description, receipt } = req.body;
    
    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid amount'
      });
    }

    // Create order with proper error handling
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        description: description || 'Payment for services'
      }
    };

    console.log("Creating Razorpay order with options:", options);
    
    try {
      const order = await razorpay.orders.create(options);
      console.log("Razorpay order created:", order);
      
      // Save transaction in database (with error handling)
      try {
        const transaction = new Transaction({
          userId: req.user?.id || 'guest',
          transactionId: order.id,
          amount: amount,
          status: 'pending',
          paymentMethod: 'razorpay'
        });
        
        await transaction.save();
        console.log("Transaction saved to database:", transaction);
      } catch (dbError) {
        console.error("Database error:", dbError);
        // Continue even if DB save fails
      }

      return res.status(200).json({
        success: true,
        order
      });
    } catch (razorpayError) {
      console.error("Razorpay API error:", razorpayError);
      return res.status(500).json({
        success: false,
        message: 'Failed to create Razorpay order',
        error: razorpayError.message
      });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Verify Razorpay payment
export const verifyPayment = async (req, res) => {
  try {
    console.log("Verify payment endpoint hit with body:", req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification parameters'
      });
    }

    // Create signature and verify
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_test_secret_key')
      .update(body)
      .digest('hex');
    
    const isAuthentic = expectedSignature === razorpay_signature;
    
    if (isAuthentic) {
      // Update transaction status
      await Transaction.findOneAndUpdate(
        { transactionId: razorpay_order_id },
        { 
          status: 'completed',
          paymentId: razorpay_payment_id,
          updatedAt: Date.now()
        }
      );

      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        transaction: {
          id: razorpay_order_id,
          status: 'completed',
          paymentId: razorpay_payment_id
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message
    });
  }
};

// Get payment status
export const getPaymentStatus = async (req, res) => {
  try {
    console.log("Get payment status endpoint hit for ID:", req.params.transactionId);
    const { transactionId } = req.params;
    
    const transaction = await Transaction.findOne({ 
      $or: [
        { transactionId },
        { paymentId: transactionId }
      ]
    });
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    res.status(200).json({
      success: true,
      transaction
    });
  } catch (error) {
    console.error('Error getting payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get payment status',
      error: error.message
    });
  }
};

// Get transaction history
export const getTransactionHistory = async (req, res) => {
  try {
    console.log("Get transaction history endpoint hit");
    // Get user ID from request (if authenticated)
    const userId = req.user?.id || null;
    
    // Query parameters
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;
    
    // Build query - if userId is available, filter by user
    const query = userId ? { userId } : {};
    
    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const count = await Transaction.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count,
      transactions
    });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction history',
      error: error.message
    });
  }
};

// Test create order with minimal data
export const testCreateOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay is not initialized'
      });
    }
    
    // Create a simple test order
    const options = {
      amount: 50000, // 500 INR in paise
      currency: 'INR',
      receipt: `test_receipt_${Date.now()}`
    };
    
    console.log("Creating test Razorpay order with options:", options);
    
    try {
      const order = await razorpay.orders.create(options);
      console.log("Test Razorpay order created:", order);
      
      return res.status(200).json({
        success: true,
        order
      });
    } catch (razorpayError) {
      console.error("Razorpay API error:", razorpayError);
      return res.status(500).json({
        success: false,
        message: 'Failed to create test Razorpay order',
        error: razorpayError.message,
        stack: razorpayError.stack
      });
    }
  } catch (error) {
    console.error('Error creating test order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create test order',
      error: error.message,
      stack: error.stack
    });
  }
};






