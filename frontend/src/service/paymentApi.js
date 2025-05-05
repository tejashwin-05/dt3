const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7001/api';

// Create a Razorpay order with better error handling
export const createRazorpayOrder = async (amount, description = "") => {
  console.log("Creating Razorpay order for amount:", amount);
  try {
    const response = await fetch(`${API_URL}/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        amount, 
        description,
        receipt: `receipt_${Date.now()}`
      }),
      credentials: 'include'
    });
    
    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      throw new Error(`Invalid response from server: ${await response.text()}`);
    }
    
    if (!response.ok) {
      console.error("Server error response:", responseData);
      throw new Error(responseData.message || responseData.error || `Failed to create order. Status: ${response.status}`);
    }
    
    if (!responseData.success) {
      console.error("API returned error:", responseData);
      throw new Error(responseData.message || responseData.error || "Failed to create order");
    }
    
    console.log("Order created successfully:", responseData);
    return { data: responseData };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (paymentData) => {
  console.log("Verifying Razorpay payment:", paymentData);
  try {
    const response = await fetch(`${API_URL}/payment/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
      credentials: 'include'
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      console.error("Server error response:", responseData);
      throw new Error(responseData.message || `Failed to verify payment. Status: ${response.status}`);
    }
    
    console.log("Payment verified successfully:", responseData);
    return { data: responseData };
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    throw error;
  }
};

// Get transaction history
export const getTransactionHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/payment/transactions`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP error! Status: ${response.status}`
      }));
      
      throw new Error(errorData.message || `Failed to fetch transaction history. Status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    throw error;
  }
};

// Check payment status
export const checkPaymentStatus = async (transactionId) => {
  try {
    const response = await fetch(`${API_URL}/payment/status/${transactionId}`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP error! Status: ${response.status}`
      }));
      
      throw new Error(errorData.message || `Failed to check payment status. Status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};

// Simulate payment success
export const simulatePaymentSuccess = async (transactionId) => {
  console.log("API call: simulatePaymentSuccess for ID:", transactionId);
  try {
    const response = await fetch(`${API_URL}/payment/simulate-success/${transactionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API response:", data);
    return { data };
  } catch (error) {
    console.error("API error in simulatePaymentSuccess:", error.message);
    throw error;
  }
};

// Simulate payment completion
export const simulatePaymentCompletion = async (transactionId) => {
  console.log("API call: simulatePaymentCompletion for ID:", transactionId);
  try {
    const response = await fetch(`${API_URL}/payment/simulate-completion/${transactionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API response:", data);
    return { data };
  } catch (error) {
    console.error("API error in simulatePaymentCompletion:", error.message);
    throw error;
  }
};






















