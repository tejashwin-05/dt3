import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

// Connect to database
dbConnect().catch(err => {
  console.error("Database connection error:", err);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/payment', paymentRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Server is running correctly' });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: err.message
  });
});

export default app;


