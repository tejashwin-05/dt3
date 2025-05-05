import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import "./config/passportConfig.js"

dotenv.config();
dbConnect();

const app = express();

//Middleware
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(session({
    secret: process.env.SESSION_SECRET  || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60
    },
}));
app.use(passport.initialize());
app.use(passport.session());

// Debug middleware
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);


// Test route
app.get('/api/test', (req, res) => {
    console.log("Test route hit");
    res.status(200).json({ message: 'Server is running correctly' });
});

// 404 handler
app.use((req, res) => {
    console.log(`404 Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
});

export default app;
