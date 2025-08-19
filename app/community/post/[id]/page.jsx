'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, MessageCircle, Eye, User, Calendar, Reply, Send, Pin } from 'lucide-react'
import { communityAPI } from '../../../../lib/api'
import { useAuth } from '../../../../contexts/AuthContext'
import toast from 'react-hot-toast'
import MiniHeader from '../../../components/MiniHeader'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function CommunityPostDetail({ params }) {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyContent, setReplyContent] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    loadPost()
  }, [params.id])

  const loadPost = async () => {
    try {
      const response = await communityAPI.getPost(params.id)
      setPost(response.data.data)
      setComments(response.data.data.comments || [])
    } catch (error) {
      console.error('Failed to load post:', error)
      toast.error('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const handleLikePost = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like posts')
      return
    }
    
    try {
      await communityAPI.likePost(post.id)
      loadPost() // Refresh to update like count
    } catch (error) {
      toast.error('Failed to like post')
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('Please login to comment')
      return
    }

    setSubmittingComment(true)
    try {
      await communityAPI.addComment(post.id, { content: newComment })
      setNewComment('')
      loadPost() // Refresh to show new comment
      toast.success('Comment added successfully!')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add comment'
      toast.error(message)
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleSubmitReply = async (commentId) => {
    if (!isAuthenticated) {
      toast.error('Please login to reply')
      return
    }

    try {
      await communityAPI.addComment(post.id, { 
        content: replyContent, 
        parent_id: commentId 
      })
      setReplyContent('')
      setReplyingTo(null)
      loadPost() // Refresh to show new reply
      toast.success('Reply added successfully!')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add reply'
      toast.error(message)
    }
  }

  const handleLikeComment = async (commentId) => {
    if (!isAuthenticated) {
      toast.error('Please login to like comments')
      return
    }
    
    try {
      await communityAPI.likeComment(commentId)
      loadPost() // Refresh to update like count
    } catch (error) {
      toast.error('Failed to like comment')
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

  if (!post) {
    return (
      <div className="min-h-screen">
        <MiniHeader />
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post not found</h1>
          <Link href="/community" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mt-4 inline-block">
            Back to community
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MiniHeader />
      <Header />

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/community" className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Community
          </Link>

          {/* Post */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.user?.full_name}</h3>
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
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <Pin className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Pinned</span>
                </div>
              )}
            </div>

            {/* Post Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLikePost}
                  className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>{post.likes_count} likes</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments_count} comments</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Eye className="h-5 w-5" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add Comment */}
          {isAuthenticated && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add a Comment</h3>
              <form onSubmit={handleSubmitComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-4"
                  placeholder="Share your thoughts..."
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingComment || !newComment.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center"
                  >
                    {submittingComment ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {submittingComment ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Comments */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{comment.user?.full_name}</h4>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{comment.likes_count}</span>
                        </button>
                        {isAuthenticated && (
                          <button
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                          >
                            <Reply className="h-4 w-4" />
                            <span className="text-sm">Reply</span>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{comment.content}</p>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-3"
                          placeholder="Write your reply..."
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyContent.trim()}
                            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-gray-900 dark:text-white text-sm">{reply.user?.full_name}</h5>
                                <button
                                  onClick={() => handleLikeComment(reply.id)}
                                  className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                  <Heart className="h-3 w-3" />
                                  <span className="text-xs">{reply.likes_count}</span>
                                </button>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{reply.content}</p>
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {new Date(reply.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No comments yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}