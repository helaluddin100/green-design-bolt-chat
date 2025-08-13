import { Facebook, Twitter, Instagram, Linkedin, Leaf, Globe, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { useCurrency } from '../../contexts/CurrencyContext'

export default function Footer() {
  const { currencies, currentCurrency, changeCurrency } = useCurrency()
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-emerald-400 mr-2" />
              <span className="text-2xl font-bold">GreenBuild</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Leading the future of sustainable architecture with innovative green building 
              designs that harmonize with nature while maximizing energy efficiency and comfort.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/houses" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Browse Designs</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Contact</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>

          {/* Legal & Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Settings</h3>
            <ul className="space-y-2 mb-6">
              <li><Link href="/privacy" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Terms and Conditions</Link></li>
              <li><Link href="/cookies" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Cookie Policy</Link></li>
            </ul>
            
            {/* Language & Currency Switcher */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-gray-400 mr-2" />
                <select className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 text-sm">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                <select 
                  value={currentCurrency}
                  onChange={(e) => changeCurrency(e.target.value)}
                  className="bg-gray-800 dark:bg-gray-900 text-white border border-gray-700 dark:border-gray-600 rounded px-2 py-1 text-sm"
                >
                  {Object.values(currencies).map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © 2025 GreenBuild. All rights reserved. Building a sustainable future, one design at a time.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2 md:mt-0">
              All measurements in SI units (metric system)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}