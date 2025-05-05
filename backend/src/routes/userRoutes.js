import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";

const router = Router();

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
};

// Get user profile
router.get("/profile", isAuthenticated, getUserProfile);

// Update user profile
router.put("/profile", isAuthenticated, updateUserProfile);

export default router;