// Simple test script to verify backend routes
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Test routes
app.get('/api/test', (req, res) => {
  console.log('Test route hit');
  res.status(200).json({ message: 'Server is running correctly' });
});

app.post('/api/payment/record', (req, res) => {
  console.log('Payment record route hit with body:', req.body);
  res.status(201).json({
    success: true,
    message: 'Transaction recorded successfully',
    transaction: {
      ...req.body,
      id: 'test-id'
    }
  });
});

app.get('/api/payment/status/:transactionId', (req, res) => {
  console.log('Payment status route hit for ID:', req.params.transactionId);
  res.status(200).json({
    success: true,
    status: 'completed',
    transaction: {
      id: req.params.transactionId,
      status: 'completed'
    }
  });
});

// Start server
const PORT = 7001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/api/test`);
  console.log(`Payment record URL: http://localhost:${PORT}/api/payment/record`);
});