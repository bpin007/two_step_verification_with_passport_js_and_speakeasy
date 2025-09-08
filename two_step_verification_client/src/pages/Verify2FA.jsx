import React from 'react'
import TwoFAVerification from '../components/TwoFAVerification'
import { useNavigate } from 'react-router-dom'

const Verify2FA = () => {

  const navigate = useNavigate()

  const handleVerification = async(data) =>{
    if(data){
      navigate('/')
    }
  }

  const handle2FAReset =async()=>{
      navigate('/setup2FA')
  }

  return (
    <div><TwoFAVerification onVerifySuccess={handleVerification} onResetSuccess={handle2FAReset} /></div>
  )
}

export default Verify2FA