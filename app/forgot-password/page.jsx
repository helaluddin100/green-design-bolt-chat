'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle, Leaf } from 'lucide-react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MiniHeader />
        <Header />
        
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h1>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="space-y-4">
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Try Different Email
                </button>
                <Link href="/login" className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors text-center">
                  Back to Login
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
            <div className="flex items-center justify-center mb-6">
              <Leaf className="h-12 w-12 text-emerald-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
            </div>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}