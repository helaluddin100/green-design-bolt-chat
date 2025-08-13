'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Gift } from 'lucide-react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'The Eco Haven',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 299,
      originalPrice: 399,
      quantity: 1,
      planNumber: 'GH-2024-001',
      type: 'Digital Plans'
    },
    {
      id: 2,
      title: 'Modern Green Villa',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 449,
      originalPrice: 549,
      quantity: 1,
      planNumber: 'MGV-2024-002',
      type: 'Digital Plans + 3D Models'
    }
  ])

  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'green20') {
      setAppliedPromo({ code: 'GREEN20', discount: 20 })
    } else if (promoCode.toLowerCase() === 'eco15') {
      setAppliedPromo({ code: 'ECO15', discount: 15 })
    } else {
      alert('Invalid promo code')
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0
  const total = subtotal - promoDiscount

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <MiniHeader />
        <Header />
        
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any green building plans to your cart yet.
            </p>
            <Link href="/houses" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Browse Designs
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MiniHeader />
      <Header />

      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Plan #{item.planNumber} • {item.type}
                          </p>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="text-lg font-bold text-emerald-600">
                              ${item.price}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Promo Code
                </h3>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">
                      ✓ Promo code "{appliedPromo.code}" applied! {appliedPromo.discount}% discount
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span className="font-medium">-${savings}</span>
                    </div>
                  )}
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount ({appliedPromo.discount}%)</span>
                      <span className="font-medium">-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-emerald-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center mb-4">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>

                <Link href="/houses" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors block text-center">
                  Continue Shopping
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">What's Included:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complete architectural drawings</li>
                    <li>• Detailed floor plans</li>
                    <li>• 12 months designer support</li>
                  </ul>
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