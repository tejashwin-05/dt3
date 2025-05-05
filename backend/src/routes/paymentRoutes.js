import express from 'express';
import { 
  createOrder, 
  verifyPayment, 
  getPaymentStatus,
  getTransactionHistory,
  testEndpoint,
  testCreateOrder
} from '../controllers/paymentController.js';

const router = express.Router();

// Test endpoints
router.get('/test', testEndpoint);
router.get('/test-create-order', testCreateOrder);

// Create a new Razorpay order
router.post('/create-order', createOrder);

// Verify Razorpay payment
router.post('/verify-payment', verifyPayment);

// Get payment status
router.get('/status/:transactionId', getPaymentStatus);

// Get transaction history
router.get('/transactions', getTransactionHistory);

export default router;


