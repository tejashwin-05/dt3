import express from 'express';
import { sendFraudAlertEmail } from '../controllers/notificationController.js';

const router = express.Router();

// Send fraud alert email
router.post('/fraud-alert', sendFraudAlertEmail);

export default router;