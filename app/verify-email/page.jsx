'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, CheckCircle, XCircle, RefreshCw, Leaf, Hash } from 'lucide-react'
import { authAPI } from '../../lib/api'
import toast from 'react-hot-toast'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

function VerifyEmailContent() {
  const [verificationStatus, setVerificationStatus] = useState('verifying') // verifying, success, failed
  const [isResending, setIsResending] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [showCodeInput, setShowCodeInput] = useState(false)
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      verifyWithCode(code)
    } else {
      setShowCodeInput(true)
      setVerificationStatus('waiting')
    }
  }, [])

  const verifyWithCode = async (code) => {
    try {
      await authAPI.verifyEmail({ code })
      setVerificationStatus('success')
      toast.success('Email verified successfully!')
    } catch (error) {
      setVerificationStatus('failed')
      toast.error('Verification failed')
    }
  }

  const handleCodeSubmit = (e) => {
    e.preventDefault()
    if (verificationCode.length === 6) {
      setVerificationStatus('verifying')
      verifyWithCode(verificationCode)
    }
  }

  const handleResendEmail = async () => {
    setIsResending(true)
    try {
      await authAPI.resendVerification({ email })
      toast.success('Verification code sent!')
    } catch (error) {
      toast.error('Failed to send verification code')
    } finally {
      setIsResending(false)
    }
  }

  if (showCodeInput && verificationStatus === 'waiting') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <MiniHeader />
        <Header />
        
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <Hash className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Enter Verification Code</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We've sent a 6-digit verification code to your email address.
              </p>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <form onSubmit={handleCodeSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength="6"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                     className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="000000"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={verificationCode.length !== 6}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Verify Email
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <button 
                    onClick={handleResendEmail}
                    disabled={isResending}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    {isResending ? 'Sending...' : 'Resend Code'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  if (verificationStatus === 'verifying') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <MiniHeader />
        <Header />
        
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-6"></div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Verifying Your Email</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your email address...
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50">
        <MiniHeader />
        <Header />
        
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Verified!</h1>
              <p className="text-gray-600 mb-8">
                Your email address has been successfully verified. You can now access all features of your GreenBuild account.
              </p>
              <div className="space-y-4">
                <Link href="/dashboard" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors block text-center">
                  Go to Dashboard
                </Link>
                <Link href="/" className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors block text-center">
                  Browse Designs
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MiniHeader />
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <XCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification Failed</h1>
            <p className="text-gray-600 mb-8">
              We couldn't verify your email address. The verification link may have expired or is invalid.
            </p>
            <div className="space-y-4">
              <button 
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {isResending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </button>
              <Link href="/contact" className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors block text-center">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}