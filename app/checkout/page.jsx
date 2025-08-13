'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Shield, CheckCircle, User, Mail, Phone, MapPin } from 'lucide-react'
import { Elements } from '@stripe/react-stripe-js'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { orderAPI } from '../../lib/api'
import stripePromise from '../../lib/stripe'
import toast from 'react-hot-toast'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Checkout() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Billing Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    
    // Billing Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Method
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Additional Options
    newsletter: true,
    terms: false
  })
  
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const { formatPrice, currentCurrency, currency } = useCurrency()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    if (cartItems.length === 0) {
      router.push('/cart')
      return
    }
    
    // Pre-fill user data
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
      }))
    }
  }, [isAuthenticated, cartItems, user])

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      processOrder()
    }
  }

  const processOrder = async () => {
    setLoading(true)
    try {
      const orderData = {
        items: cartItems.map(item => ({
          design_id: item.id,
          quantity: item.quantity
        })),
        billing_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
        },
        payment_method: formData.paymentMethod,
      }
      
      const response = await orderAPI.createOrder(orderData)
      const order = response.data.data
      
      // Process payment
      const paymentResult = await orderAPI.processPayment(order.id, {
        payment_details: {
          card_number: formData.cardNumber,
          expiry_date: formData.expiryDate,
          cvv: formData.cvv,
          card_name: formData.cardName,
        }
      })
      
      if (paymentResult.data.success) {
        await clearCart()
        router.push(`/payment?order=${order.id}`)
      }
      
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to process order'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MiniHeader />
      <Header />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/cart" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-20 h-1 mx-2 ${
                      step > stepNumber ? 'bg-emerald-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <div className="flex space-x-16 text-sm text-gray-600">
                <span className={step >= 1 ? 'text-emerald-600 font-medium' : ''}>Billing Info</span>
                <span className={step >= 2 ? 'text-emerald-600 font-medium' : ''}>Payment</span>
                <span className={step >= 3 ? 'text-emerald-600 font-medium' : ''}>Review</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                {/* Step 1: Billing Information */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <User className="h-6 w-6 mr-2" />
                      Billing Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Billing Address
                    </h3>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <CreditCard className="h-6 w-6 mr-2" />
                      Payment Method
                    </h2>

                    <div className="mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="relative">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                          }`}>
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-2" />
                              <span className="font-medium">Credit/Debit Card</span>
                            </div>
                          </div>
                        </label>
                        <label className="relative">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === 'paypal' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                          }`}>
                            <div className="flex items-center">
                              <span className="font-bold text-blue-600 mr-2">PayPal</span>
                            </div>
                          </div>
                        </label>
                        
                        {/* M-Pesa for Kenyan users */}
                        {currentCurrency === 'KES' && (
                          <label className="relative">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="mpesa"
                              checked={formData.paymentMethod === 'mpesa'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.paymentMethod === 'mpesa' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-600'
                            }`}>
                              <div className="flex items-center">
                                <div className="w-6 h-6 bg-green-600 rounded mr-2"></div>
                                <span className="font-medium">M-Pesa</span>
                              </div>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div>
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            required
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              required
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              required
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            required
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === 'mpesa' && (
                      <div>
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            M-Pesa Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="mpesaPhone"
                            required
                            placeholder="254712345678"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                          <p className="text-green-800 dark:text-green-300 text-sm">
                            You'll receive an M-Pesa prompt on your phone to complete the payment.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Review Order */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                    
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Billing Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                          <p><strong>Email:</strong> {formData.email}</p>
                          <p><strong>Phone:</strong> {formData.phone}</p>
                        </div>
                        <div>
                          <p><strong>Address:</strong> {formData.address}</p>
                          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                          <p>{formData.country}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
                      <p className="text-sm">
                        {formData.paymentMethod === 'card' ? 
                          `Credit Card ending in ${formData.cardNumber.slice(-4)}` : 
                          'PayPal'
                        }
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="terms"
                          required
                          checked={formData.terms}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          I agree to the <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">Terms and Conditions</Link>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Subscribe to our newsletter for green building tips
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors ml-auto flex items-center"
                  >
                    {loading && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    )}
                    {step === 3 ? (loading ? 'Processing...' : 'Complete Order') : 'Continue'}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">Plan #{item.plan_number}</p>
                      </div>
                      <span className="font-medium">${item.price} x {item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-emerald-600">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center text-emerald-800">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}