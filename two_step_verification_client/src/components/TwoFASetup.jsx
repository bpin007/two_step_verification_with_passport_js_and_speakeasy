import React, { useEffect, useState } from 'react'
import { setup2FAApi } from '../services/authApi'

const TwoFASetup = ({onSetupComplete}) => {

  const [message, setMessage] = useState("")
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchQrCode = async () => {
    try {
      setLoading(true)
      setError("")
      const { data } = await setup2FAApi()
      console.log(data, "data")
      setResponse(data)
    } catch (err) {
      console.error("Error fetching QR code:", err)
      setError("Failed to load QR code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyClipBoard = async () => {
    try {
      if (response?.secret) {
        await navigator.clipboard.writeText(response.secret)
        setMessage("Secret code is copied")
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (err) {
      console.error("Failed to copy:", err)
      setMessage("Failed to copy secret code")
    }
  }

  const handleContinue = () => {
    if (onSetupComplete) {
      onSetupComplete()
    }
  }

  useEffect(() => {
    fetchQrCode()
  }, [])

  return (
    <div className='bg-white rounded-2xl shadow-md w-full max-w-sm mx-auto'>
      <div className='pt-6'>
        <h2 className='text-3xl text-center font-extralight'>
          Turn on 2FA Verification
        </h2>
      </div>

      <hr className='text-gray-200 mt-6 mb-6' />

      <p className='text-center text-gray-600 text-lg font-light pr-6 pl-6'>
        Scan the QR code below with your authenticator app
      </p>
      
      <div className='p-6'>
        {loading && (
          <div className='flex justify-center mb-4'>
            <div className='text-gray-600'>Loading QR code...</div>
          </div>
        )}
        
        {error && (
          <div className='flex justify-center mb-4'>
            <div className='text-red-600 text-sm'>{error}</div>
          </div>
        )}
        
        {!loading && !error && response?.qrCode && (
          <div className='flex justify-center'>
            <img 
              src={response.qrCode} 
              alt='2FA QR Code' 
              className='mb-4 border rounded-md'
              onError={(e) => {
                console.error("Image failed to load:", e)
                setError("Failed to display QR code")
              }}
            />
          </div>
        )}
        
        <div className='flex items-center mt-3 mb-3'>
          <div className='border-t border-2 border-gray-200 grow'></div>
          <div className='text-gray-600 text-sm font-light pr-2 pl-2'>
            OR Enter the code manually 
          </div>
          <div className='border-t border-2 border-gray-200 grow'></div>
        </div>
        
        <div className='mb-6'>
          {message && <p className='text-green-600 text-sm mb-3'>{message}</p>}
          <div className='flex'>
            <input 
              readOnly 
              value={response?.secret || ""} 
              className='w-full border rounded-l mt-2 text-xs text-gray-600 p-4 bg-gray-50'
              placeholder="Secret code will appear here"
            />
            <button 
              onClick={copyClipBoard}
              className='border border-l-0 rounded-r mt-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs'
              disabled={!response?.secret}
            >
              Copy
            </button>
          </div>
        </div>

        <button 
        onClick={handleContinue} 
        className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md disabled:opacity-50 cursor-pointer'
        disabled={loading || error || !response?.qrCode}
      >
        Continue Verification
      </button>
      </div>
      
      
    </div>
  )
}

export default TwoFASetup