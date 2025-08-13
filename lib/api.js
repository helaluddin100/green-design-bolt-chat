import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  verifyEmail: (data) => api.post('/verify-email', data),
  resendVerification: (data) => api.post('/resend-verification', data),
  logout: () => api.post('/logout'),
  forgotPassword: (email) => api.post('/forgot-password', { email }),
  resetPassword: (data) => api.post('/reset-password', data),
  getUser: () => api.get('/user'),
}

// Design API
export const designAPI = {
  getDesigns: (params) => api.get('/designs', { params }),
  getDesign: (id) => api.get(`/designs/${id}`),
  getFeaturedDesigns: () => api.get('/featured-designs'),
  getNewestDesigns: () => api.get('/newest-designs'),
  uploadDesign: (data) => api.post('/designs', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateDesign: (id, data) => api.put(`/designs/${id}`, data),
  deleteDesign: (id) => api.delete(`/designs/${id}`),
  getMyDesigns: (params) => api.get('/my-designs', { params }),
  downloadDesign: (id) => api.get(`/designs/${id}/download`, { responseType: 'blob' }),
}

// Category API
export const categoryAPI = {
  getCategories: () => api.get('/categories'),
}

// Order API
export const orderAPI = {
  getOrders: (params) => api.get('/orders', { params }),
  createOrder: (data) => api.post('/orders', data),
  getOrder: (id) => api.get(`/orders/${id}`),
  processPayment: (id, data) => api.post(`/orders/${id}/pay`, data),
  getPurchases: (params) => api.get('/purchases', { params }),
  getSales: (params) => api.get('/sales', { params }),
  initiateMpesaPayment: (id, data) => api.post(`/orders/${id}/mpesa`, data),
  checkPaymentStatus: (id) => api.get(`/orders/${id}/payment-status`),
}

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (data) => api.post('/cart/add', data),
  updateCart: (data) => api.put('/cart/update', data),
  removeFromCart: (designId) => api.delete(`/cart/remove/${designId}`),
  clearCart: () => api.delete('/cart/clear'),
}

// Review API
export const reviewAPI = {
  getReviews: (designId, params) => api.get(`/designs/${designId}/reviews`, { params }),
  createReview: (designId, data) => api.post(`/designs/${designId}/reviews`, data),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
}

// Message API
export const messageAPI = {
  getConversations: (params) => api.get('/conversations', { params }),
  createConversation: (data) => api.post('/conversations', data),
  getConversation: (id) => api.get(`/conversations/${id}`),
  sendMessage: (id, data) => api.post(`/conversations/${id}/messages`, data),
  markAsRead: (id) => api.put(`/conversations/${id}/read`),
}

// Blog API
export const blogAPI = {
  getPosts: (params) => api.get('/blog/posts', { params }),
  getPost: (slug) => api.get(`/blog/posts/${slug}`),
  getCategories: () => api.get('/blog/categories'),
  getFeaturedPosts: () => api.get('/blog/featured'),
}

// Community API
export const communityAPI = {
  getPosts: (params) => api.get('/community/posts', { params }),
  getPost: (id) => api.get(`/community/posts/${id}`),
  createPost: (data) => api.post('/community/posts', data),
  addComment: (postId, data) => api.post(`/community/posts/${postId}/comments`, data),
  likePost: (postId) => api.post(`/community/posts/${postId}/like`),
  likeComment: (commentId) => api.post(`/community/comments/${commentId}/like`),
  getCategories: () => api.get('/community/categories'),
}

// Withdrawal API
export const withdrawalAPI = {
  getWithdrawals: (params) => api.get('/withdrawals', { params }),
  createWithdrawal: (data) => api.post('/withdrawals', data),
  getWithdrawal: (id) => api.get(`/withdrawals/${id}`),
  getBalance: () => api.get('/balance'),
}

// User API
export const userAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  uploadAvatar: (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  getDashboardStats: () => api.get('/dashboard/stats'),
}

export default api