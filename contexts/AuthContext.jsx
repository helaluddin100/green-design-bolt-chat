'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../lib/api'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        const response = await authAPI.getUser()
        setUser(response.data.data)
      }
    } catch (error) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { user, token } = response.data.data
      
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      const { user, token } = response.data.data
      
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      
      toast.success('Registration successful!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      setUser(null)
      toast.success('Logged out successfully')
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated: !!user,
    isDesigner: user?.user_type === 'designer',
    isBuyer: user?.user_type === 'buyer',
    isAdmin: user?.user_type === 'admin',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}