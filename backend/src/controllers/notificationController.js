import nodemailer from 'nodemailer';

// Create a transporter using nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendFraudAlertEmail = async (req, res) => {
  try {
    const { email, transactionId, fraudScore, riskLevel, explanation } = req.body;
    
    if (!email || !transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Email and transaction ID are required'
      });
    }

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Fraud Alert: Transaction ${transactionId}`,
      html: `
        <h2>Fraud Detection Alert</h2>
        <p>Our system has analyzed transaction <strong>${transactionId}</strong>.</p>
        <p>Fraud Score: <strong>${fraudScore}/100</strong></p>
        <p>Risk Level: <strong style="color: ${riskLevel === 'High' ? 'red' : riskLevel === 'Medium' ? 'orange' : 'green'}">${riskLevel}</strong></p>
        <h3>Analysis:</h3>
        <p>${explanation}</p>
        <p>Please review this transaction and take appropriate action if needed.</p>
        <hr>
        <p><small>This is an automated message from your fraud detection system.</small></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Fraud alert email sent successfully'
    });
  } catch (error) {
    console.error('Error sending fraud alert email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send fraud alert email',
      error: error.message
    });
  }
};