import { createContext, useContext, useEffect, useState } from "react";


const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading,setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        console.log("the useEffect runs : ",storedUser)
        if(storedUser){
            setIsLoggedIn(true);
            setUser(storedUser);
        }
        setLoading(false)
    },[])

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser({
            username: userData.username,
            isMfaActive: userData.isMfaActive,
            upiId: userData.upiId // Store upiId in user state
        });
        sessionStorage.setItem("user",JSON.stringify(userData));
    };

    const logout = (data) => {
        if(data) {
            setIsLoggedIn(false);
            setUser(null);
            sessionStorage.removeItem("user");
        }
    };
    
    return (
        <SessionContext.Provider value={{isLoggedIn,user,loading,login,logout}}>
            {children}
        </SessionContext.Provider>
    )

}
