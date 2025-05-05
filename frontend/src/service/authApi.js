import api from "./api"
export const register = async (username, email, upiId, password) => {
    return await api.post("/auth/register",{
        username,
        email,
        upiId,
        password,
    });
};

export const loginUser = async (username,password) => {
    return await api.post("/auth/login",{
        username,
        password,
    },
    {
        withCredentials:true,
    }
);
};

export const authStatus = async () => {
    return await api.get("/auth/status",
    {
        withCredentials:true,
    }
);
};

export const logoutUser = () => {
    return api.post("/auth/logout");
};


export const setup2FA = async () => {
    return await api.post("/auth/2fa/setup",
    {},
    {
        withCredentials:true,
    }
);
};

export const verify2FA = async (token) => {
    return await api.post("/auth/2fa/verify",
    {token},
    {
        withCredentials:true,
    }
);
};

export const reset2FA = async () => {
    return await api.post("/auth/2fa/reset",
    {},
    {
        withCredentials:true,
    }
);
};
