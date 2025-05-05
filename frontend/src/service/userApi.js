import api from "./api";

// Get the current user's profile
export const getUserProfile = async () => {
    return await api.get(
        "/users/profile",
        { withCredentials: true }
    );
};

// Update the user's profile
export const updateUserProfile = async (profileData) => {
    return await api.put(
        "/users/profile",
        profileData,
        { withCredentials: true }
    );
};