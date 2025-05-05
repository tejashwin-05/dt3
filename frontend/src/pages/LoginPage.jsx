import React from 'react'
import LoginForm from '../components/LoginForm'
import { useSession } from '../context/SessionContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const {login} = useSession();

    const handleLoginSuccess = (userData) => {
        console.log("The logged in userdata : ",userData);
        login(userData);
        if(!userData.isMfaActive) navigate("/setup-2fa");
        else navigate("/verify-2fa");
    };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <LoginForm onLoginSuccess={handleLoginSuccess}/>
    </div>
  )
}

export default LoginPage
