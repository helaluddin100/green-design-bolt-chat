'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, User, Mail, MessageCircle, Star, Award, Calendar } from 'lucide-react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ContactDesigner() {
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock designer data - in real app, this would come from URL params or API
  const designer = {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Sustainable Architecture Expert',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.9,
    reviews: 127,
    designs: 45,
    joinDate: 'March 2020',
    responseTime: '2 hours',
    bio: 'Passionate about creating beautiful, energy-efficient homes that minimize environmental impact. Specialized in LEED certified designs and passive house standards.',
    expertise: ['LEED Certification', 'Passive House Design', 'Solar Integration', 'Sustainable Materials'],
    recentDesigns: [
      {
        id: 1,
        title: 'The Eco Haven',
        image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=150',
        price: '$299'
      },
      {
        id: 2,
        title: 'Solar Smart Home',
        image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=150',
        price: '$349'
      }
    ]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MiniHeader />
        <Header />
        
        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="h-8 w-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h1>
              <p className="text-gray-600 mb-6">
                Your message has been sent to {designer.name}. They typically respond within {designer.responseTime}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/messages" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  View Messages
                </Link>
                <Link href={`/house/${designer.recentDesigns[0].id}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors">
                  View Their Designs
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MiniHeader />
      <Header />

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/houses" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Designs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Designer Profile */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="text-center mb-6">
                  <img 
                    src={designer.image} 
                    alt={designer.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-xl font-bold text-gray-900">{designer.name}</h2>
                  <p className="text-emerald-600 font-medium">{designer.title}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{designer.rating}</span>
                      <span className="text-gray-500 ml-1">({designer.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Designs</span>
                    <span className="font-semibold">{designer.designs}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold">{designer.joinDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold text-emerald-600">{designer.responseTime}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-600 text-sm">{designer.bio}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {designer.expertise.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Recent Designs</h3>
                  <div className="space-y-3">
                    {designer.recentDesigns.map((design) => (
                      <Link key={design.id} href={`/house/${design.id}`} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <img 
                          src={design.image} 
                          alt={design.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{design.title}</h4>
                          <p className="text-sm text-emerald-600 font-semibold">{design.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Contact {designer.name}
                  </h1>
                  <p className="text-gray-600">
                    Send a message to discuss your project requirements, ask questions about their designs, 
                    or request custom work.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="custom">Custom Design Request</option>
                      <option value="modification">Design Modification</option>
                      <option value="consultation">Design Consultation</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Describe your project, ask questions, or share your requirements..."
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Tips for better responses:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Be specific about your project requirements</li>
                      <li>• Include your budget range if requesting custom work</li>
                      <li>• Mention your timeline and location</li>
                      <li>• Ask specific questions about their designs</li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-gray-600">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm">
                      This message will be sent directly to {designer.name}. 
                      You'll receive a copy in your messages inbox.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}