import React, { useState } from 'react'
import { reset2FAApi, verify2FAApi } from '../services/authApi'

const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTokenVerification = async (e) => { // Added 'e' parameter
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    console.log(otp,"otpotp");
    
    
    try {
      const {data} = await verify2FAApi({token:otp}) 
      onVerifySuccess(data)
      setMessage('OTP verified successfully!')
    } catch (err) {
      setOtp('')
      console.log("The err is", err.message);
      setError("Invalid OTP") // Fixed typo: "invaild" -> "Invalid"
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = async (e) => { // Added 'e' parameter
    e.preventDefault() // Prevent form submission
    setIsLoading(true)
    setError('')
    setMessage('')
    
    try {
      const {data} = await reset2FAApi()
      console.log(data,"data");
      onResetSuccess()
      setMessage('2FA reset successfully!')
    } catch (error) { // Fixed variable name: 'err' -> 'error'
      console.log("The err is", error.message);
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleTokenVerification}
        className='bg-white rounded-2xl shadow-md w-full max-w-sm mx-auto'
      >
        <div className='pt-6'>
          <h2 className='text-3xl text-center font-extralight'>
            Validate OTP
          </h2>
        </div>

        <hr className='text-gray-200 mt-6 mb-6' />

        <p className='text-center text-gray-600 text-lg font-light'>
          Please enter the 6-digit time based OTP to verify 2FA authentication
        </p>

        <div className='p-6'>
          {/* OTP Input */}
          <div className='mb-4'>
            <label className='text-gray-600 text-sm'>TOTP</label>
            <input
              type='text'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className='w-full p-2 border rounded mt-2'
              placeholder='Enter your OTP'
              disabled={isLoading}
              maxLength={6} // Added for 6-digit OTP
              pattern='[0-9]{6}' // Added pattern for validation
            />
          </div>

          {/* Error & Success Message */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-2">{message}</p>}

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white mb-3 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'} {/* Fixed typo and added loading text */}
          </button>
          
          <button
            type='button' // Changed from 'submit' to 'button'
            className='w-full bg-slate-600 text-white py-2 rounded-md hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleReset}
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset 2FA'} {/* Added loading text */}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TwoFAVerification