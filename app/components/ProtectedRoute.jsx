'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute({ children, requireAuth = true, redirectTo = '/login' }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && requireAuth && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, loading, requireAuth, redirectTo, router])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  // If auth is required but user is not authenticated, show nothing (redirect will happen)
  if (requireAuth && !isAuthenticated) {
    return null
  }

  return children
}