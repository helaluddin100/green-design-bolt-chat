'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '../lib/api'
import toast from 'react-hot-toast'

const CartContext = createContext({})

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      const response = await cartAPI.getCart()
      setCartItems(response.data.data || [])
    } catch (error) {
      console.error('Failed to load cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (designId, quantity = 1) => {
    try {
      await cartAPI.addToCart({ design_id: designId, quantity })
      await loadCart()
      toast.success('Added to cart!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const updateCartItem = async (designId, quantity) => {
    try {
      await cartAPI.updateCart({ design_id: designId, quantity })
      await loadCart()
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const removeFromCart = async (designId) => {
    try {
      await cartAPI.removeFromCart(designId)
      await loadCart()
      toast.success('Removed from cart')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove from cart'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const clearCart = async () => {
    try {
      await cartAPI.clearCart()
      setCartItems([])
      toast.success('Cart cleared')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
    getCartTotal,
    getCartCount,
    cartCount: getCartCount(),
    cartTotal: getCartTotal(),
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}