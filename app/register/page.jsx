'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Leaf, Mail, Lock, User, Phone, Briefcase, Home } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer',
    agreeToTerms: false,
    subscribeNewsletter: true
  })
  
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    const result = await register({
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      user_type: formData.userType
    })
    
    if (result.success && result.needsVerification) {
      router.push(`/verify-email?email=${encodeURIComponent(result.email)}`)
    } else if (result.success) {
      router.push('/dashboard')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MiniHeader />
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="h-12 w-12 text-emerald-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Join GreenBuild</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Create your account to start building sustainably</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  I want to join as:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="userType"
                      value="buyer"
                      checked={formData.userType === 'buyer'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.userType === 'buyer'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}>
                      <div className="flex items-center">
                        <Home className="h-6 w-6 mr-3 text-emerald-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Buyer</p>
                          <p className="text-sm text-gray-500 dark:text-gray-300">Purchase green designs</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      name="userType"
                      value="designer"
                      checked={formData.userType === 'designer'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.userType === 'designer'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}>
                      <div className="flex items-center">
                        <Briefcase className="h-6 w-6 mr-3 text-emerald-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Designer</p>
                          <p className="text-sm text-gray-500 dark:text-gray-300">Sell your designs</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="First name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{' '}
                    <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="subscribeNewsletter"
                    name="subscribeNewsletter"
                    type="checkbox"
                    checked={formData.subscribeNewsletter}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="subscribeNewsletter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Subscribe to our newsletter for green building tips and updates
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Sign in
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