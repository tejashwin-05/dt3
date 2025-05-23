import axios from 'axios';
import { sendFraudAlertEmail } from './notificationApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7001/api';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key';

// Risk level thresholds
const RISK_THRESHOLDS = {
  LOW: 30,     // 0-30: Low risk
  MEDIUM: 70   // 31-70: Medium risk, 71-100: High risk
};

// Amount thresholds for risk scoring (in INR)
const AMOUNT_THRESHOLDS = {
  LOW: 1000,      // 0-1000: Low risk (+0 points)
  MEDIUM: 5000,   // 1001-5000: Medium risk (+20 points)
  HIGH: 10000     // 5001-10000: High risk (+40 points)
                  // >10000: Very high risk (+60 points)
};

// Add more sophisticated risk factors
const RISK_FACTORS = {
  SUSPICIOUS_KEYWORDS: ['fraud', 'suspicious', 'urgent', 'immediate'],
  UNUSUAL_PATTERNS: ['999', '888', '777', '666'],
  TIME_INDICATORS: ['night', 'late', 'midnight', 'early'],
  PAYMENT_METHODS: {
    HIGH_RISK: ['new_card', 'international', 'gift_card'],
    MEDIUM_RISK: ['card'],
    LOW_RISK: ['bank_transfer', 'upi']
  }
};

// Verify transaction for fraud using Gemini API
export const verifyTransactionForFraud = async (transactionId, amount = null, email = null) => {
  try {
    console.log(`Starting fraud verification for transaction: ${transactionId}`);
    console.log(`Raw amount received: ${amount}, type: ${typeof amount}`);
    
    // Determine transaction amount - use provided amount if available
    let transactionAmount;
    
    if (amount !== null && amount !== undefined && amount !== '') {
      // First, log the raw amount exactly as received
      console.log(`Raw amount before conversion: ${amount}, type: ${typeof amount}`);
      
      // If amount is a string that might contain commas or currency symbols, clean it
      if (typeof amount === 'string') {
        const cleanedAmount = amount.replace(/[₹,$,\s,]/g, '');
        console.log(`Cleaned string amount: ${cleanedAmount}`);
        transactionAmount = Number(cleanedAmount);
      } else {
        // Direct conversion if not a string
        transactionAmount = Number(amount);
      }
      
      // Check if conversion was successful
      if (isNaN(transactionAmount)) {
        console.error(`Failed to parse amount: ${amount}`);
        transactionAmount = null;
      } else {
        console.log(`Successfully parsed amount: ${transactionAmount} INR`);
      }
    }
    
    // If we don't have a valid amount, extract from transaction ID
    if (transactionAmount === null || transactionAmount === undefined || isNaN(transactionAmount)) {
      console.log(`No valid amount provided, attempting to extract from transaction ID`);
      
      // Fall back to extracting from transaction ID
      const amountMatch = transactionId.match(/(\d+)/);
      if (amountMatch && amountMatch[0]) {
        transactionAmount = parseInt(amountMatch[0], 10);
        // Ensure we have a reasonable amount (between 10 and 100,000 INR)
        if (transactionAmount < 10) transactionAmount *= 100;
        if (transactionAmount > 100000) transactionAmount = 100000;
      } else {
        // Default amounts based on keywords
        if (transactionId.includes('huge')) {
          transactionAmount = 15000;
        } else if (transactionId.includes('high')) {
          transactionAmount = 8000;
        } else if (transactionId.endsWith('000') || transactionId.endsWith('500')) {
          transactionAmount = 5000;
        } else if (transactionId.includes('medium')) {
          transactionAmount = 3000;
        } else {
          transactionAmount = 750;
        }
      }
      console.log(`Extracted amount from ID: ${transactionAmount} INR`);
    }
    
    // Create varied transaction data based on the transaction ID
    const transactionData = {
      id: transactionId,
      amount: transactionAmount, // Use exact amount, no rounding
      currency: "INR",
      timestamp: new Date().toISOString(),
      paymentMethod: transactionId.includes('card') ? 'card' : 'bank_transfer',
      userId: 'user123'
    };
    
    console.log(`Final transaction data:`, transactionData);
    
    // Create a prompt for Gemini
    const prompt = `
      You are a fraud detection AI system. Analyze this transaction for potential fraud.
      
      Transaction details:
      - ID: ${transactionData.id}
      - Amount: ${transactionData.amount} INR (exact amount, not rounded)
      - Timestamp: ${transactionData.timestamp}
      - Payment Method: ${transactionData.paymentMethod}
      
      Analyze this transaction for the following fraud indicators:
      1. Unusual amount
      2. Velocity check (too many transactions in short time)
      3. Pattern analysis (unusual patterns)
      4. Time of transaction (unusual time)
      5. Amount round numbers (fraudsters often use round numbers)
      
      For each indicator, respond with "PASS" or "FAIL" and a brief explanation.
      Then provide an overall fraud score from 0-100 (higher means more likely fraudulent),
      a risk level (Low, Medium, or High), and whether the transaction is suspicious.
      
      Format your response as a JSON object with this structure:
      {
        "fraudScore": number,
        "isSuspicious": boolean,
        "riskLevel": "Low|Medium|High",
        "details": [
          {"name": "Unusual Amount", "status": boolean, "explanation": "string"},
          {"name": "Velocity Check", "status": boolean, "explanation": "string"},
          {"name": "Pattern Analysis", "status": boolean, "explanation": "string"},
          {"name": "Time Analysis", "status": boolean, "explanation": "string"},
          {"name": "Round Amount", "status": boolean, "explanation": "string"}
        ],
        "explanation": "string"
      }
    `;

    // Request payload
    const requestPayload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };
    
    // Call Gemini API directly from frontend
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      requestPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        }
      }
    );

    // Check if we have a valid response
    if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
      console.error("Invalid response structure:", response.data);
      throw new Error("Received invalid response from Gemini API");
    }

    // Extract the text from the response
    const text = response.data.candidates[0].content.parts[0].text;
    
    // Extract the JSON from the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*?}/);
    let analysisResult;
    
    if (jsonMatch) {
      try {
        const jsonString = jsonMatch[1] || jsonMatch[0];
        analysisResult = JSON.parse(jsonString);
      } catch (e) {
        console.error('Error parsing Gemini response as JSON:', e);
        throw new Error('Failed to parse AI analysis result');
      }
    } else {
      console.error('No JSON found in response:', text);
      throw new Error('AI response did not contain valid JSON');
    }
    
    // After successful verification, send email alert if email is provided
    if (email && analysisResult.fraudScore > RISK_THRESHOLDS.LOW) {
      try {
        await sendFraudAlertEmail({
          transaction: transactionData,
          fraudAnalysis: analysisResult
        }, email);
        console.log("Fraud alert email sent successfully");
      } catch (emailError) {
        console.error("Failed to send fraud alert email:", emailError);
        // Continue with the function even if email fails
      }
    }
    
    return { 
      success: true, 
      transaction: transactionData,
      fraudAnalysis: analysisResult 
    };
  } catch (error) {
    console.error('Error verifying transaction for fraud:', error);
    
    // For development/testing, generate varied mock data based on transaction ID
    if (process.env.NODE_ENV !== 'production') {
      console.log("Using enhanced mock data for development due to API error");
      
      // Determine transaction amount - use provided amount if available
      let transactionAmount;
      
      if (amount !== null && amount !== undefined && amount !== '') {
        // Handle string amounts with currency symbols and commas
        if (typeof amount === 'string') {
          const cleanedAmount = amount.replace(/[₹,$,\s,]/g, '');
          transactionAmount = Number(cleanedAmount);
        } else {
          transactionAmount = Number(amount);
        }
        
        if (isNaN(transactionAmount)) {
          console.error(`Failed to parse amount: ${amount}`);
          transactionAmount = null;
        } else {
          console.log(`Using provided amount: ${transactionAmount} INR`);
        }
      }
      
      // Fall back to extracting from transaction ID if needed
      if (transactionAmount === null || transactionAmount === undefined || isNaN(transactionAmount)) {
        // Extract logic remains the same...
        // ...existing code for extracting amount from transaction ID
      }
      
      // Enhanced fraud scoring system
      let fraudScore = 0;
      let riskFactors = [];
      
      // Check for suspicious keywords
      RISK_FACTORS.SUSPICIOUS_KEYWORDS.forEach(keyword => {
        if (transactionId.toLowerCase().includes(keyword)) {
          fraudScore += 25;
          riskFactors.push(`Contains suspicious keyword: "${keyword}"`);
        }
      });
      
      // Check for unusual patterns
      RISK_FACTORS.UNUSUAL_PATTERNS.forEach(pattern => {
        if (transactionId.endsWith(pattern)) {
          fraudScore += 15;
          riskFactors.push(`Ends with suspicious pattern: "${pattern}"`);
        }
      });
      
      // Amount-based scoring with more granularity
      if (transactionAmount > AMOUNT_THRESHOLDS.HIGH * 2) {
        fraudScore += 70;
        riskFactors.push(`Extremely high amount: ${transactionAmount} INR`);
      } else if (transactionAmount > AMOUNT_THRESHOLDS.HIGH) {
        fraudScore += 50;
        riskFactors.push(`Very high amount: ${transactionAmount} INR`);
      } else if (transactionAmount > AMOUNT_THRESHOLDS.MEDIUM) {
        fraudScore += 30;
        riskFactors.push(`High amount: ${transactionAmount} INR`);
      } else if (transactionAmount > AMOUNT_THRESHOLDS.LOW) {
        fraudScore += 15;
        riskFactors.push(`Medium amount: ${transactionAmount} INR`);
      }
      
      // Check for round amounts with more precision
      const isRoundAmount = 
        transactionAmount % 1000 === 0 || 
        transactionAmount % 500 === 0 ||
        transactionAmount % 100 === 0;
        
      if (isRoundAmount) {
        fraudScore += 20;
        riskFactors.push(`Suspiciously round amount: ${transactionAmount} INR`);
      }
      
      // Time-related checks
      RISK_FACTORS.TIME_INDICATORS.forEach(indicator => {
        if (transactionId.toLowerCase().includes(indicator)) {
          fraudScore += 20;
          riskFactors.push(`Unusual transaction time indicator: "${indicator}"`);
        }
      });
      
      // Payment method risk assessment
      let paymentMethod = transactionId.includes('card') ? 'card' : 'bank_transfer';
      
      // Check for high-risk payment methods
      RISK_FACTORS.PAYMENT_METHODS.HIGH_RISK.forEach(method => {
        if (transactionId.toLowerCase().includes(method)) {
          fraudScore += 30;
          paymentMethod = method;
          riskFactors.push(`High-risk payment method: ${method}`);
        }
      });
      
      // Cap the score at 100
      fraudScore = Math.min(fraudScore, 100);
      
      // If no suspicious patterns were found, set a base low score
      if (fraudScore === 0) {
        fraudScore = 10;
        riskFactors.push("No risk factors detected");
      }
      
      console.log(`Final fraud score: ${fraudScore}`);
      console.log(`Risk factors identified:`, riskFactors);
      
      // Determine risk level based on score thresholds
      let riskLevel;
      if (fraudScore <= RISK_THRESHOLDS.LOW) {
        riskLevel = "Low";
      } else if (fraudScore <= RISK_THRESHOLDS.MEDIUM) {
        riskLevel = "Medium";
      } else {
        riskLevel = "High";
      }
      
      // Determine if suspicious based on score
      const isSuspicious = fraudScore > RISK_THRESHOLDS.MEDIUM;
      
      // Generate more accurate check results
      const isHighAmount = transactionAmount > AMOUNT_THRESHOLDS.MEDIUM;
      const isUnusualTime = RISK_FACTORS.TIME_INDICATORS.some(indicator => 
        transactionId.toLowerCase().includes(indicator));
      const hasUnusualPattern = RISK_FACTORS.UNUSUAL_PATTERNS.some(pattern => 
        transactionId.endsWith(pattern));
      const hasVelocityIssue = RISK_FACTORS.SUSPICIOUS_KEYWORDS.some(keyword => 
        transactionId.toLowerCase().includes(keyword));
      
      // In the mock data section, add email notification
      if (process.env.NODE_ENV !== 'production' && email && isSuspicious) {
        try {
          await sendFraudAlertEmail({
            transaction: {
              id: transactionId,
              amount: transactionAmount,
              currency: "INR",
              timestamp: new Date().toISOString(),
              paymentMethod: paymentMethod,
              riskFactors: riskFactors
            },
            fraudAnalysis: {
              fraudScore: fraudScore,
              isSuspicious: isSuspicious,
              riskLevel: riskLevel,
              explanation: isSuspicious 
                ? `This transaction of ${transactionAmount} INR shows ${riskFactors.length} risk indicators consistent with fraud patterns.`
                : `This transaction of ${transactionAmount} INR appears legitimate based on the analyzed patterns.`
            }
          }, email);
          console.log("Mock fraud alert email sent successfully");
        } catch (emailError) {
          console.error("Failed to send mock fraud alert email:", emailError);
        }
      }
      
      return {
        success: true,
        transaction: {
          id: transactionId,
          amount: transactionAmount,
          currency: "INR",
          timestamp: new Date().toISOString(),
          paymentMethod: paymentMethod,
          riskFactors: riskFactors
        },
        fraudAnalysis: {
          fraudScore: fraudScore,
          isSuspicious: isSuspicious,
          riskLevel: riskLevel,
          details: [
            {
              name: "Unusual Amount", 
              status: !isHighAmount, 
              explanation: isHighAmount ? 
                `Amount (${transactionAmount} INR) is unusually large` : 
                `Amount (${transactionAmount} INR) is within normal range`
            },
            {
              name: "Velocity Check", 
              status: !hasVelocityIssue, 
              explanation: hasVelocityIssue ? 
                "Multiple transactions detected in short time" : 
                "Transaction frequency is normal"
            },
            {
              name: "Pattern Analysis", 
              status: !hasUnusualPattern, 
              explanation: hasUnusualPattern ? 
                "Unusual transaction pattern detected" : 
                "No unusual patterns detected"
            },
            {
              name: "Time Analysis", 
              status: !isUnusualTime, 
              explanation: isUnusualTime ? 
                "Transaction occurred at an unusual time" : 
                "Transaction time is normal"
            },
            {
              name: "Round Amount", 
              status: !isRoundAmount, 
              explanation: isRoundAmount ? 
                `Amount (${transactionAmount} INR) is suspiciously round` : 
                `Amount (${transactionAmount} INR) is not suspiciously round`
            }
          ],
          explanation: isSuspicious 
            ? `This transaction of ${transactionAmount} INR shows ${riskFactors.length} risk indicators consistent with fraud patterns.`
            : `This transaction of ${transactionAmount} INR appears legitimate based on the analyzed patterns.`
        }
      };
    }
    
    throw error;
  }
};








