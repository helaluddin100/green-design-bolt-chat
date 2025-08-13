'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Share2, Download, ShoppingCart, Bed, Bath, Car, Ruler, Zap, Leaf, Award, CheckCircle, Star, User, Calendar } from 'lucide-react'
import { designAPI, reviewAPI } from '../../../lib/api'
import { useCart } from '../../../contexts/CartContext'
import { useAuth } from '../../../contexts/AuthContext'
import toast from 'react-hot-toast'
import MiniHeader from '../../components/MiniHeader'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function HouseDetail({ params }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedImage, setSelectedImage] = useState(0)
  const [house, setHouse] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  
  const { addToCart } = useCart()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    loadHouseDetails()
    loadReviews()
  }, [params.id])

  const loadHouseDetails = async () => {
    try {
      const response = await designAPI.getDesign(params.id)
      setHouse(response.data.data)
    } catch (error) {
      console.error('Failed to load house details:', error)
      toast.error('Failed to load design details')
    } finally {
      setLoading(false)
    }
  }

  const loadReviews = async () => {
    try {
      const response = await reviewAPI.getReviews(params.id)
      setReviews(response.data.data.data)
    } catch (error) {
      console.error('Failed to load reviews:', error)
    }
  }

  const handleAddToCart = async () => {
    const result = await addToCart(house.id)
    if (result.success) {
      toast.success('Added to cart!')
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('Please login to submit a review')
      return
    }
    
    setReviewLoading(true)
    try {
      await reviewAPI.createReview(house.id, newReview)
      setNewReview({ rating: 5, comment: '' })
      loadReviews()
      toast.success('Review submitted successfully!')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit review'
      toast.error(message)
    } finally {
      setReviewLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <MiniHeader />
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!house) {
    return (
      <div className="min-h-screen">
        <MiniHeader />
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">Design not found</h1>
          <Link href="/houses" className="text-emerald-600 hover:text-emerald-700 mt-4 inline-block">
            Back to designs
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <MiniHeader />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/houses" className="text-gray-500 hover:text-gray-700">House Plans</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{house.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4">
                <img 
                  src={house.images?.[selectedImage]?.url || house.primary_image?.url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                  alt={house.title}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <button className="absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(house.images || []).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      selectedImage === index ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={`View ${index + 1}`}
                      className="w-full h-20 object-cover hover:opacity-80 transition-opacity"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {['overview', 'specifications', 'floor-plans', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{house.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Green Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(house.green_features || []).map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(house.files || []).map((file, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                          <span className="text-gray-700">{file.description || file.original_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Total Living Area:</span>
                        <span className="text-gray-600">{house.square_feet} m²</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Bedrooms:</span>
                        <span className="text-gray-600">{house.bedrooms}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Bathrooms:</span>
                        <span className="text-gray-600">{house.bathrooms}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Floors:</span>
                        <span className="text-gray-600">{house.floors}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Garages:</span>
                        <span className="text-gray-600">{house.garages}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Lot Size:</span>
                        <span className="text-gray-600">{house.lot_size || 'Flexible'} m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'floor-plans' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Floor Plans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(house.floor_plans || []).map((plan, index) => (
                      <div key={index} className="bg-white border rounded-lg overflow-hidden">
                        <img 
                          src={plan.url} 
                          alt={plan.original_name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900">{plan.original_name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {house.rating > 0 && (
                          <>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-5 w-5 ${i < Math.floor(house.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </>
                        )}
                      </div>
                      <span className="text-gray-600">({house.total_reviews} reviews)</span>
                    </div>
                  </div>
                  
                  {/* Add Review Form */}
                  {isAuthenticated && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Write a Review</h4>
                      <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                                className={`p-1 ${newReview.rating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                <Star className="h-6 w-6 fill-current" />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                          <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Share your experience with this design..."
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={reviewLoading}
                          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          {reviewLoading ? 'Submitting...' : 'Submit Review'}
                        </button>
                      </form>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="font-medium text-gray-900">{review.user?.full_name}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(review.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{house.title}</h1>
                <p className="text-gray-600 mb-2">Plan #{house.planNumber}</p>
                <p className="text-gray-600">Designed by {house.architect}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-emerald-600">${house.price}</span>
                    {house.original_price && (
                      <span className="text-lg text-gray-500 line-through ml-2">${house.original_price}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {house.rating > 0 && (
                      <>
                        <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{house.rating}</span>
                        <span className="text-gray-500 ml-1">({house.total_reviews})</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{house.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{house.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{house.garages} garage</span>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{house.square_feet} m²</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Leaf className="h-4 w-4 mr-1" />
                    Eco-Friendly
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    Energy Star
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    LEED Ready
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  Download Sample
                </button>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Save
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Have questions about this design? Our experts are here to help.
                </p>
                <Link href={`/contact-designer?designer=${house.user?.id}&design=${house.id}`} className="w-full bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-2 px-4 rounded-lg transition-colors block text-center">
                  Contact Designer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}