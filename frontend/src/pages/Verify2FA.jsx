import React from 'react'
import { useNavigate } from 'react-router-dom';
import TwoVerification from '../components/TwoVerification';

function Verify2FA() {
  const navigate = useNavigate();

  const handleVerification = async(data) => {
    if(data){
      navigate('/dashboard')
    }
  }

  const handle2FAReset = async(data) => {
    if(data){
      navigate('/setup-2fa')
    }
  }

  return <TwoVerification onVerifySuccess={handleVerification}
  onResetSuccess = {handle2FAReset} />
}

export default Verify2FA