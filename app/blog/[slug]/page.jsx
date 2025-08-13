import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Tag } from 'lucide-react'
import { blogAPI } from '../../../lib/api'
import MiniHeader from '../../components/MiniHeader'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function BlogDetail({ params }) {
  const [article, setArticle] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArticle()
  }, [params.slug])

  const loadArticle = async () => {
    try {
      const response = await blogAPI.getPost(params.slug)
      setArticle(response.data.data.post)
      setRelatedArticles(response.data.data.related_posts || [])
    } catch (error) {
      console.error('Failed to load article:', error)
    } finally {
      setLoading(false)
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

  if (!article) {
    return (
      <div className="min-h-screen">
        <MiniHeader />
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
          <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 mt-4 inline-block">
            Back to blog
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/blog" className="text-gray-500 hover:text-gray-700">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{article.title}</span>
          </div>
        </div>
      </div>

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
               {article.category?.name}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <img 
                  src={article.author?.avatar_url || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                  alt={article.author?.full_name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <User className="h-4 w-4 mr-1" />
                    <span className="font-medium">{article.author?.full_name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{new Date(article.published_at).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.read_time} min read</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 text-sm">Share:</span>
                <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <Facebook className="h-4 w-4" />
                </button>
                <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                  <Twitter className="h-4 w-4" />
                </button>
                <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </button>
                <button className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img 
             src={article.featured_image || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'} 
              alt={article.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="h-5 w-5 text-gray-400 mr-2" />
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-700 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <div className="flex items-start">
              <img 
               src={article.author?.avatar_url || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'} 
               alt={article.author?.full_name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
               <h3 className="text-xl font-semibold text-gray-900 mb-2">About {article.author?.full_name}</h3>
                <p className="text-gray-600 mb-3">
                 {article.author?.bio || 'Passionate about sustainable architecture and green building design.'}
                </p>
                <div className="flex space-x-3">
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium">Follow</button>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((related) => (
              <Link key={related.id} href={`/blog/${related.slug}`} className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <img 
                    src={related.featured_image || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300'} 
                    alt={related.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{new Date(related.published_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}