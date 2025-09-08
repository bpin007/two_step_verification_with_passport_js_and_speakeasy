import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import { logoutUser } from '../services/authApi'

const Home = () => {

  const navigate = useNavigate()

  const {user,logout} = useSession()

  const handleLogout = async()=>{
    try{
      const {data} = await logoutUser()
      logout(data)
      navigate('/login')
    }catch(error){
      console.log("error", error.message)
    }
  }

  return (
    <div className='p-9 bg-white rounded-lg shadow-md mx-w-md mx-auto mt-1'>
      <h2 className='text-xl font-semibold mb-4'>Welcome,{user?.username}</h2>
      <p>You have successfully logged In and verified your 2FA</p>
      <button type='button' className='mt-4 bg-red-500 text-white px-4 py-2 rounded' onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Home