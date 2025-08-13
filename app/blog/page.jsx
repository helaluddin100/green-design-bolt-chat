import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Search, Filter } from 'lucide-react'
import { blogAPI } from '../../lib/api'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    loadBlogData()
  }, [])

  useEffect(() => {
    loadPosts()
  }, [searchQuery, selectedCategory])

  const loadBlogData = async () => {
    try {
      const [postsResponse, featuredResponse, categoriesResponse] = await Promise.all([
        blogAPI.getPosts(),
        blogAPI.getFeaturedPosts(),
        blogAPI.getCategories()
      ])
      
      setPosts(postsResponse.data.data.data)
      setFeaturedPosts(featuredResponse.data.data)
      setCategories([{ id: '', name: 'All' }, ...categoriesResponse.data.data])
    } catch (error) {
      console.error('Failed to load blog data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPosts = async () => {
    try {
      const params = {}
      if (searchQuery) params.search = searchQuery
      if (selectedCategory) params.category = selectedCategory
      
      const response = await blogAPI.getPosts(params)
      setPosts(response.data.data.data)
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  }

  const featuredPost = featuredPosts[0]

  return (
    <div className="min-h-screen">
      <MiniHeader />
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Green Building Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest trends, technologies, and insights 
              in sustainable architecture and green building design.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Article</h2>
            <div className="w-20 h-1 bg-emerald-600"></div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.featured_image || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {featuredPost.category?.name}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">{featuredPost.read_time} min read</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredPost.author?.full_name}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(featuredPost.published_at).toLocaleDateString()}</span>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Articles</h2>
            <div className="w-20 h-1 bg-emerald-600"></div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.featured_image || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category?.name}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.read_time} min read</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author?.full_name}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}