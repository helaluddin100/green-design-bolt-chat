'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, Send, Search, User, Calendar, ArrowLeft, Paperclip } from 'lucide-react'
import { messageAPI } from '../../lib/api'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'
import ProtectedRoute from '../components/ProtectedRoute'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Messages() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      const response = await messageAPI.getConversations()
      setConversations(response.data.data.data)
    } catch (error) {
      console.error('Failed to load conversations:', error)
      toast.error('Failed to load conversations')
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (conversationId) => {
    try {
      const response = await messageAPI.getConversation(conversationId)
      setMessages(response.data.data.messages)
      setSelectedConversation(response.data.data)
      
      // Mark as read
      await messageAPI.markAsRead(conversationId)
    } catch (error) {
      console.error('Failed to load messages:', error)
      toast.error('Failed to load messages')
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    setSendingMessage(true)
    try {
      const response = await messageAPI.sendMessage(selectedConversation.id, {
        message: newMessage
      })
      
      setMessages(prev => [...prev, response.data.data])
      setNewMessage('')
      loadConversations() // Refresh conversation list
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send message'
      toast.error(message)
    } finally {
      setSendingMessage(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <MiniHeader />
        <Header />

        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600">Communicate with designers and buyers</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
              <div className="flex h-full">
                {/* Conversations List */}
                <div className="w-1/3 border-r border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-y-auto h-full">
                    {loading ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                      </div>
                    ) : conversations.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No conversations yet</p>
                        <Link href="/houses" className="text-emerald-600 hover:text-emerald-700 text-sm">
                          Browse designs to start a conversation
                        </Link>
                      </div>
                    ) : (
                      conversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          onClick={() => loadMessages(conversation.id)}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                            selectedConversation?.id === conversation.id ? 'bg-emerald-50 border-emerald-200' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                  {conversation.other_participant?.full_name}
                                </h3>
                                {conversation.unread_count > 0 && (
                                  <span className="bg-emerald-600 text-white text-xs rounded-full px-2 py-1">
                                    {conversation.unread_count}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 truncate">{conversation.subject}</p>
                              <p className="text-xs text-gray-500 truncate">
                                {conversation.latest_message?.message}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(conversation.last_message_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 flex flex-col">
                  {selectedConversation ? (
                    <>
                      {/* Conversation Header */}
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {selectedConversation.other_participant?.full_name}
                              </h3>
                              <p className="text-sm text-gray-600">{selectedConversation.subject}</p>
                            </div>
                          </div>
                          {selectedConversation.design && (
                            <Link 
                              href={`/house/${selectedConversation.design.id}`}
                              className="text-emerald-600 hover:text-emerald-700 text-sm"
                            >
                              View Design
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender_id === user.id
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.message}</p>
                              <p className={`text-xs mt-1 ${
                                message.sender_id === user.id ? 'text-emerald-200' : 'text-gray-500'
                              }`}>
                                {new Date(message.created_at).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-gray-200">
                        <form onSubmit={sendMessage} className="flex space-x-3">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            <Paperclip className="h-5 w-5" />
                          </button>
                          <button
                            type="submit"
                            disabled={sendingMessage || !newMessage.trim()}
                            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                          >
                            {sendingMessage ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Conversation Selected</h3>
                        <p className="text-gray-500">Choose a conversation to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}