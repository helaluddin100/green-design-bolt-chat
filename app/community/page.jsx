'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, MessageCircle, Heart, Eye, User, Calendar, Search, Filter, TrendingUp, Users, Award, Pin } from 'lucide-react'
import { communityAPI } from '../../lib/api'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'
import ProtectedRoute from '../components/ProtectedRoute'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Community() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    loadCommunityData()
  }, [])

  useEffect(() => {
    loadPosts()
  }, [selectedCategory, searchQuery, sortBy])

  const loadCommunityData = async () => {
    try {
      const [postsResponse, categoriesResponse] = await Promise.all([
        communityAPI.getPosts(),
        communityAPI.getCategories()
      ])
      
      setPosts(postsResponse.data.data.data)
      setCategories([{ id: '', name: 'All Categories' }, ...categoriesResponse.data.data])
    } catch (error) {
      console.error('Failed to load community data:', error)
      toast.error('Failed to load community data')
    } finally {
      setLoading(false)
    }
  }

  const loadPosts = async () => {
    try {
      const params = {}
      if (searchQuery) params.search = searchQuery
      if (selectedCategory) params.category = selectedCategory
      if (sortBy) params.sort = sortBy
      
      const response = await communityAPI.getPosts(params)
      setPosts(response.data.data.data)
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  }

  const handleLikePost = async (postId) => {
    if (!isAuthenticated) {
      toast.error('Please login to like posts')
      return
    }
    
    try {
      await communityAPI.likePost(postId)
      loadPosts() // Refresh posts to update like count
    } catch (error) {
      toast.error('Failed to like post')
    }
  }

  const communityStats = [
    { label: 'Active Members', value: '2,847', icon: Users },
    { label: 'Total Posts', value: '1,234', icon: MessageCircle },
    { label: 'Expert Designers', value: '156', icon: Award },
    { label: 'Monthly Views', value: '45.2K', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MiniHeader />
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Designer Community
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Connect with fellow designers, share your work, get feedback, and collaborate on sustainable building projects. 
              Join our thriving community of green building professionals.
            </p>
            {isAuthenticated && (
              <Link href="/community/create-post" className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                Create New Post
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-3">
                  <stat.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search community posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
                <option value="most_liked">Most Liked</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Community Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {isAuthenticated && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Link href="/community/create-post" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Post
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Posts */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        {/* Post Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{post.user?.full_name}</h3>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                <span className="mx-2">•</span>
                                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs">
                                  {post.category?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                          {post.is_pinned && (
                            <Pin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                          )}
                        </div>

                        {/* Post Content */}
                        <Link href={`/community/post/${post.id}`}>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                            {post.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                          </p>
                        </Link>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-gray-500 dark:text-gray-400 text-xs">+{post.tags.length - 3} more</span>
                            )}
                          </div>
                        )}

                        {/* Post Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-6">
                            <button
                              onClick={() => handleLikePost(post.id)}
                              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                              <Heart className="h-5 w-5" />
                              <span className="text-sm">{post.likes_count}</span>
                            </button>
                            <Link href={`/community/post/${post.id}`} className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                              <MessageCircle className="h-5 w-5" />
                              <span className="text-sm">{post.comments_count}</span>
                            </Link>
                            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                              <Eye className="h-5 w-5" />
                              <span className="text-sm">{post.views}</span>
                            </div>
                          </div>
                          <Link href={`/community/post/${post.id}`} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm">
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                  {posts.length === 0 && !loading && (
                    <div className="text-center py-20">
                      <MessageCircle className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Be the first to start a conversation in the community!
                      </p>
                      {isAuthenticated && (
                        <Link href="/community/create-post" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                          Create First Post
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}