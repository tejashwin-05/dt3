import User from "../models/User.js";

// Get the current user's profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -twoFactorSecret');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                upiId: user.upiId,
                isMfaActive: user.isMfaActive,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};

// Update the user's profile
export const updateUserProfile = async (req, res) => {
    try {
        const { username, email, upiId } = req.body;
        
        // Find the user
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Update fields if provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (upiId !== undefined) user.upiId = upiId;
        
        await user.save();
        
        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                upiId: user.upiId,
                isMfaActive: user.isMfaActive,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Error updating user profile", error: error.message });
    }
};