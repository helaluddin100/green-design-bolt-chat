'use client'
import { Phone, MapPin, Mail } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export default function MiniHeader() {
  const { isDark } = useTheme()
  
  return (
    <div className="bg-gray-800 dark:bg-gray-950 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>123 Green Street, Eco City, EC 12345</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>info@greenbuild.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Follow us:</span>
            <div className="flex space-x-2">
              <a href="#" className="hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors">FB</a>
              <a href="#" className="hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors">TW</a>
              <a href="#" className="hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors">IG</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}