'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, MessageCircle, Heart, Eye, User, Calendar, Search, TrendingUp, Award } from 'lucide-react'
import { communityAPI } from '../../../lib/api'
import { useAuth } from '../../../contexts/AuthContext'
import toast from 'react-hot-toast'

export default function DashboardCommunity() {
  const [posts, setPosts] = useState([])
  const [myPosts, setMyPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('feed')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    loadCommunityData()
  }, [])

  const loadCommunityData = async () => {
    try {
      const [postsResponse] = await Promise.all([
        communityAPI.getPosts({ limit: 10 })
      ])
      
      setPosts(postsResponse.data.data.data)
      
      // Load user's posts if they're a designer
      if (user?.user_type === 'designer') {
        // This would be a separate API call to get user's posts
        // setMyPosts(myPostsResponse.data.data.data)
      }
    } catch (error) {
      console.error('Failed to load community data:', error)
      toast.error('Failed to load community data')
    } finally {
      setLoading(false)
    }
  }

  const handleLikePost = async (postId) => {
    try {
      await communityAPI.likePost(postId)
      loadCommunityData() // Refresh posts to update like count
    } catch (error) {
      toast.error('Failed to like post')
    }
  }

  const quickStats = [
    { label: 'Your Posts', value: myPosts.length, icon: MessageCircle },
    { label: 'Total Likes', value: '234', icon: Heart },
    { label: 'Community Rank', value: '#42', icon: Award },
    { label: 'This Month', value: '+12', icon: TrendingUp }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Community</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect with fellow designers and share your work</p>
        </div>
        <Link href="/community/create-post" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'feed', label: 'Community Feed' },
              { id: 'my-posts', label: 'My Posts' },
              { id: 'trending', label: 'Trending' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'feed' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search community posts..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Posts */}
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{post.user?.full_name}</h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(post.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs">
                              {post.category?.name}
                            </span>
                          </div>
                          <Link href={`/community/post/${post.id}`}>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                              {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                            </p>
                          </Link>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikePost(post.id)}
                              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                              <Heart className="h-4 w-4" />
                              <span className="text-sm">{post.likes_count}</span>
                            </button>
                            <Link href={`/community/post/${post.id}`} className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span className="text-sm">{post.comments_count}</span>
                            </Link>
                            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                              <Eye className="h-4 w-4" />
                              <span className="text-sm">{post.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center">
                <Link href="/community" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
                  View All Community Posts →
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'my-posts' && (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Start sharing your knowledge with the community</p>
              <Link href="/community/create-post" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Create Your First Post
              </Link>
            </div>
          )}

          {activeTab === 'trending' && (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trending Posts</h3>
              <p className="text-gray-600 dark:text-gray-400">Most popular posts this week</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}