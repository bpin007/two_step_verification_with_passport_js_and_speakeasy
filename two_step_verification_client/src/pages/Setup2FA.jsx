import React from 'react'
import TwoFASetup from '../components/TwoFASetup'
import { useNavigate } from 'react-router-dom'

const Setup2FA = () => {

  const navigate = useNavigate()

  const onSetupComplete = () =>{
    navigate('/verify2FA')
  }

  return (
    <div>
      <TwoFASetup onSetupComplete={onSetupComplete}/>
    </div>
  )
}

export default Setup2FA