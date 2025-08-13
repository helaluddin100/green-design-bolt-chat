'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, DollarSign, CreditCard, Building, AlertCircle, CheckCircle } from 'lucide-react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Withdraw() {
  const [withdrawMethod, setWithdrawMethod] = useState('bank')
  const [amount, setAmount] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const availableBalance = 150.00
  const minimumWithdraw = 25.00

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MiniHeader />
        <Header />
        
        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Withdrawal Request Submitted</h1>
              <p className="text-gray-600 mb-6">
                Your withdrawal request for ${amount} has been submitted successfully. 
                We'll process it within 3-5 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Back to Dashboard
                </Link>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Make Another Withdrawal
                </button>
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

      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/dashboard" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <DollarSign className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Withdraw Funds</h1>
              <p className="text-gray-600">Transfer your earnings to your preferred account</p>
            </div>

            {/* Balance Info */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700">Available Balance</p>
                  <p className="text-2xl font-bold text-emerald-800">${availableBalance.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-emerald-700">Minimum Withdrawal</p>
                  <p className="text-lg font-semibold text-emerald-800">${minimumWithdraw.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Withdrawal Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Withdrawal Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="withdrawMethod"
                      value="bank"
                      checked={withdrawMethod === 'bank'}
                      onChange={(e) => setWithdrawMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      withdrawMethod === 'bank' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center">
                        <Building className="h-6 w-6 mr-3 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Bank Transfer</p>
                          <p className="text-sm text-gray-500">3-5 business days</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      name="withdrawMethod"
                      value="paypal"
                      checked={withdrawMethod === 'paypal'}
                      onChange={(e) => setWithdrawMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      withdrawMethod === 'paypal' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center">
                        <CreditCard className="h-6 w-6 mr-3 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">PayPal</p>
                          <p className="text-sm text-gray-500">1-2 business days</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min={minimumWithdraw}
                    max={availableBalance}
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    onClick={() => setAmount(minimumWithdraw.toString())}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    Min: ${minimumWithdraw}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount(availableBalance.toString())}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    Max: ${availableBalance}
                  </button>
                </div>
              </div>

              {/* Bank Details (if bank transfer selected) */}
              {withdrawMethod === 'bank' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Bank Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Bank of America"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="1234567890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Routing Number
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="123456789"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal Details (if PayPal selected) */}
              {withdrawMethod === 'paypal' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PayPal Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="your@paypal.com"
                  />
                </div>
              )}

              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Important Information:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Withdrawals are processed within 3-5 business days for bank transfers</li>
                      <li>PayPal withdrawals are typically processed within 1-2 business days</li>
                      <li>A processing fee of 2.5% applies to all withdrawals</li>
                      <li>Minimum withdrawal amount is ${minimumWithdraw}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Summary */}
              {amount && parseFloat(amount) >= minimumWithdraw && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Withdrawal Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Withdrawal Amount:</span>
                      <span className="font-medium">${parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee (2.5%):</span>
                      <span className="font-medium">${(parseFloat(amount) * 0.025).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-1">
                      <span className="font-medium">You'll Receive:</span>
                      <span className="font-bold text-emerald-600">
                        ${(parseFloat(amount) - parseFloat(amount) * 0.025).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!amount || parseFloat(amount) < minimumWithdraw || parseFloat(amount) > availableBalance}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Submit Withdrawal Request
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}