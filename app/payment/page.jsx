'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, Mail, ArrowRight, CreditCard, Calendar, FileText } from 'lucide-react'
import { orderAPI } from '../../lib/api'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

function PaymentContent() {
  const [paymentStatus, setPaymentStatus] = useState('processing') // processing, success, failed
  const [orderDetails, setOrderDetails] = useState(null)
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')

  useEffect(() => {
    if (orderId) {
      loadOrderDetails()
    }
  }, [orderId])

  const loadOrderDetails = async () => {
    try {
      const response = await orderAPI.getOrder(orderId)
      setOrderDetails(response.data.data)
      setPaymentStatus('success')
    } catch (error) {
      console.error('Failed to load order:', error)
      setPaymentStatus('failed')
    }
  }

  if (!orderDetails && paymentStatus === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50">
        <MiniHeader />
        <Header />
        
        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-xl shadow-lg p-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-6"></div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading Order Details</h1>
              <p className="text-gray-600">Please wait while we load your order information...</p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  if (paymentStatus === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50">
        <MiniHeader />
        <Header />
        
        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-xl shadow-lg p-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-6"></div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Processing Your Payment</h1>
              <p className="text-gray-600 mb-6">
                Please wait while we securely process your payment. This may take a few moments.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <CreditCard className="h-4 w-4" />
                <span>Secure payment processing...</span>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50">
        <MiniHeader />
        <Header />
        
        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-xl shadow-lg p-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-red-600 text-2xl">✕</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Failed</h1>
              <p className="text-gray-600 mb-8">
                We were unable to process your payment. Please check your payment information and try again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/checkout" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Try Again
                </Link>
                <Link href="/contact" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <MiniHeader />
      <Header />
      
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <p className="text-sm text-gray-500">
              Order Number: <span className="font-mono font-semibold">{orderNumber}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>
              
              <div className="space-y-4 mb-6">
                {orderDetails?.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.design_title}</h3>
                      <p className="text-sm text-gray-500">Plan #{item.plan_number}</p>
                    </div>
                    <span className="font-semibold text-gray-900">${item.total}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${orderDetails?.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${orderDetails?.tax_amount}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span>Total Paid</span>
                  <span className="text-emerald-600">${orderDetails?.total_amount}</span>
                </div>
              </div>
            </div>

            {/* Download & Next Steps */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Downloads</h2>
              
              <div className="space-y-4 mb-6">
                {orderDetails?.items?.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{item.design_title}</h3>
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Plan #{item.plan_number}</p>
                    <Link 
                      href={`/api/designs/${item.design_id}/download`}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Plans
                    </Link>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <div className="flex items-center text-emerald-800 mb-2">
                  <Mail className="h-5 w-5 mr-2" />
                  <span className="font-medium">Email Confirmation Sent</span>
                </div>
                <p className="text-sm text-emerald-700">
                  We've sent download links and order details to {orderDetails?.billing_address?.email}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">What's Next?</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Download your architectural plans and documentation
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Review the included construction guidelines
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Contact our support team if you have questions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Get 12 months of designer support included
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Calendar className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">12 Months Support</h3>
              <p className="text-sm text-gray-600">
                Get expert help during your construction process
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Download className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Lifetime Downloads</h3>
              <p className="text-sm text-gray-600">
                Re-download your plans anytime from your account
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <FileText className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Complete Package</h3>
              <p className="text-sm text-gray-600">
                Order Number: <span className="font-mono font-semibold">{orderDetails?.order_number}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center">
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link href="/houses" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors">
                Browse More Designs
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function Payment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}