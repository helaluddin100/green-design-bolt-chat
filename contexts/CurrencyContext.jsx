'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CurrencyContext = createContext({})

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

const currencies = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1,
    paymentMethods: ['stripe', 'paypal']
  },
  KES: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    rate: 130,
    paymentMethods: ['mpesa', 'airtel_money', 'stripe']
  }
}

// Function to detect user's country
const detectCountry = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.country_code
  } catch (error) {
    console.error('Failed to detect country:', error)
    return 'US' // Default to US
  }
}

export const CurrencyProvider = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState('USD')
  const [exchangeRates, setExchangeRates] = useState({ USD: 1, KES: 130 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeCurrency()
  }, [])

  const initializeCurrency = async () => {
    try {
      // Check for saved currency first
      const savedCurrency = localStorage.getItem('currency')
      
      if (savedCurrency && currencies[savedCurrency]) {
        setCurrentCurrency(savedCurrency)
      } else {
        // Auto-detect country and set currency
        const countryCode = await detectCountry()
        if (countryCode === 'KE') {
          setCurrentCurrency('KES')
          localStorage.setItem('currency', 'KES')
        } else {
          setCurrentCurrency('USD')
          localStorage.setItem('currency', 'USD')
        }
      }
      
      // Fetch latest exchange rates
      await fetchExchangeRates()
    } catch (error) {
      console.error('Currency initialization failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchExchangeRates = async () => {
    try {
      // You can integrate with a real exchange rate API here
      // For now, using static rates
      const rates = {
        USD: 1,
        KES: 130 // This should come from a real API
      }
      setExchangeRates(rates)
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error)
    }
  }

  const changeCurrency = (currencyCode) => {
    if (currencies[currencyCode]) {
      setCurrentCurrency(currencyCode)
      localStorage.setItem('currency', currencyCode)
    }
  }

  const formatPrice = (priceInUSD) => {
    if (!priceInUSD) return currencies[currentCurrency].symbol + '0'
    const currency = currencies[currentCurrency]
    const rate = exchangeRates[currentCurrency] || currency.rate
    const convertedPrice = priceInUSD * rate
    return `${currency.symbol}${convertedPrice.toLocaleString()}`
  }

  const convertPrice = (priceInUSD) => {
    const rate = exchangeRates[currentCurrency] || currencies[currentCurrency].rate
    return priceInUSD * rate
  }

  const convertToUSD = (priceInCurrentCurrency) => {
    const rate = exchangeRates[currentCurrency] || currencies[currentCurrency].rate
    return priceInCurrentCurrency / rate
  }

  const value = {
    currentCurrency,
    currencies,
    exchangeRates,
    isLoading,
    changeCurrency,
    formatPrice,
    convertPrice,
    convertToUSD,
    currency: currencies[currentCurrency],
    fetchExchangeRates
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}