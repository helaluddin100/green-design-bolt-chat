import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { CurrencyProvider } from '../contexts/CurrencyContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GreenBuild - Sustainable Architecture & Green Building Designs',
  description: 'Green building solutions for sustainable architecture. Discover eco-friendly designs, energy-efficient homes, and sustainable building practices.',
  keywords: 'green building, sustainable architecture, eco-friendly homes, energy efficient design, LEED certified, sustainable construction',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <CurrencyProvider>
            <AuthProvider>
              <CartProvider>
                {children}
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#10B981',
                      color: '#fff',
                    },
                  }}
                />
              </CartProvider>
            </AuthProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}