'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Leaf, ShoppingCart, User, Menu, X, Search, Trash2, Sun, Moon, Globe } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useCurrency } from '../../contexts/CurrencyContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCartDropdown, setShowCartDropdown] = useState(false)
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const { cartItems, cartCount, removeFromCart, getCartTotal } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const { currentCurrency, currencies, changeCurrency, formatPrice } = useCurrency()
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Leaf className="h-8 w-8 text-emerald-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">GreenBuild</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Home</Link>
            <Link href="/houses" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Browse Designs</Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">About</Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Blog</Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Contact</Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors"
              >
                <Globe className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">{currentCurrency}</span>
              </button>
              
              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-2">
                    {Object.values(currencies).map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          changeCurrency(currency.code)
                          setShowCurrencyDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          currentCurrency === currency.code
                            ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{currency.symbol} {currency.name}</span>
                          <span className="text-xs text-gray-500">{currency.code}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Search Icon */}
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <div className="relative">
              <button 
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors"
              >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              </button>
              
              {/* Cart Dropdown */}
              {showCartDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart ({cartCount})</h3>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.primary_image?.url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=100'} 
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</h4>
                            <p className="text-sm text-emerald-600 font-semibold">{formatPrice(item.price)} x {item.quantity}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-900 dark:text-white">Total:</span>
                      <span className="font-bold text-emerald-600 text-lg">
                        {formatPrice(getCartTotal())}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Link 
                        href="/cart" 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors block text-center"
                        onClick={() => setShowCartDropdown(false)}
                      >
                        View Cart
                      </Link>
                      <Link 
                        href="/checkout" 
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors block text-center"
                        onClick={() => setShowCartDropdown(false)}
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Login Button */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-emerald-600 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 font-medium transition-colors">Home</Link>
              <Link href="/houses" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 font-medium transition-colors">Browse Designs</Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 font-medium transition-colors">About</Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 font-medium transition-colors">Blog</Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 font-medium transition-colors">Contact</Link>
              {isAuthenticated ? (
                <div className="space-y-4">
                  <Link href="/dashboard" className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors w-fit">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors w-fit">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}