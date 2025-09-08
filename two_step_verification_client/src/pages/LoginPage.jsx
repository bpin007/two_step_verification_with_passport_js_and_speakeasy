import React from 'react'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

const LoginPage = () => {

  const navigate = useNavigate()
  const {login} = useSession()

  const handleLoginSuccess = (userData) =>{
    login(userData)
      if(!userData.isFMAActive){
        navigate('/setup2FA')
      }else{
        navigate('/verify2FA')
      }
  }

  return (
    <div><LoginForm onLoginSuccess={handleLoginSuccess} /></div>
  )
}

export default LoginPage