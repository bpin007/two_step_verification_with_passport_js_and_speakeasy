import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginApi, registerApi } from '../services/authApi'

const LoginForm = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const { data } = await loginApi({ username, password })
      setMessage(`Welcome back, ${username}!`)
      console.log('Login successful:', data)
      onLoginSuccess(data)
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.")
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!username || !password || !confirmPassword) {
      setError("All fields are required")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const { data } = await registerApi({ username, password })
      setMessage(`Account created for ${username}!`)
      setTimeout(() => {
        setIsRegister(false)
        setMessage("")
        setPassword("")
        setConfirmPassword("")
      }, 2000)
      console.log('Registration successful:', data)
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
      console.error('Registration error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = (e) => {
    e.preventDefault()
    setIsRegister(!isRegister)
    setError("")
    setMessage("")
    setPassword("")
    setConfirmPassword("")
    setUsername("")
  }

  return (
    <form 
      onSubmit={isRegister ? handleRegister : handleLogin} 
      className='bg-white rounded-2xl shadow-md w-full max-w-sm mx-auto'
    >
      <div className='pt-6'>
        <h2 className='text-3xl text-center font-extralight'>
          {isRegister ? "Create Account" : "Login"}
        </h2>
      </div>

      <hr className='text-gray-200 mt-6 mb-6' />

      <p className='text-center text-gray-600 text-lg font-light'>
        {isRegister ? "Looks like you are new here" : "We are glad to see you again"}
      </p>

      <div className='p-6'>
        {/* Username */}
        <div className='mb-4'>
          <label className='text-gray-600 text-sm'>Username</label>
          <input 
            type='text' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className='w-full p-2 border rounded mt-2' 
            placeholder='Enter your Username'
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div className='mb-4'>
          <label className='text-gray-600 text-sm'>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='w-full p-2 border rounded mt-2' 
            placeholder='Enter your Password'
            disabled={isLoading}
          />
        </div>

        {/* Confirm Password (only in Register mode) */}
        {isRegister && (
          <div className='mb-4'>
            <label className='text-gray-600 text-sm'>Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className='w-full p-2 border rounded mt-2' 
              placeholder='Re-enter your Password'
              disabled={isLoading}
            />
          </div>
        )}

        {/* Error & Success Message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-2">{message}</p>}

        {/* Submit Button */}
        <button 
          type='submit' 
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : (isRegister ? "Register" : "Login")}
        </button>

        {/* Toggle Register/Login */}
        <div className="pt-4 text-center text-gray-600 text-sm">
          <p>
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <Link 
              to="" 
              onClick={toggleMode}
              className="text-blue-500 hover:underline"
            >
              {isRegister ? "Login" : "Create Account"}
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}

export default LoginForm