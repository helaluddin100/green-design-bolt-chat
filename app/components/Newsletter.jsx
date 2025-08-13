'use client'
import { useState } from 'react'
import { Mail, CheckCircle, Leaf, Zap, Award } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  const benefits = [
    {
      icon: Leaf,
      text: 'Latest green building trends and innovations'
    },
    {
      icon: Zap,
      text: 'Energy efficiency tips and case studies'
    },
    {
      icon: Award,
      text: 'Exclusive access to new plan releases'
    }
  ]

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12">
            <CheckCircle className="h-16 w-16 text-emerald-200 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to the Green Community!
            </h2>
            <p className="text-emerald-100 text-lg mb-6">
              Thank you for subscribing! You'll receive our next newsletter with the latest 
              green building insights and exclusive content.
            </p>
            <button 
              onClick={() => setIsSubscribed(false)}
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Subscribe Another Email
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-green-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-emerald-200 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Sign Up for Our Newsletter
              </h2>
            </div>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              Stay ahead of the curve with the latest sustainable building trends, 
              energy-efficient design tips, and exclusive access to new green home plans.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-emerald-100">
                <benefit.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </form>

          <p className="text-emerald-200 text-sm text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}