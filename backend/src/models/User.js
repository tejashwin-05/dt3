import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Email normalization using a setter
        set: v => v.toLowerCase()
    },
    upiId: {
        type: String,
        
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isMfaActive: {
        type: Boolean,
        required: false,
    },
    twoFactorSecret: {
        type: String,
    },
},
{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

export default User;
