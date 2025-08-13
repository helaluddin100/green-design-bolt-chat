'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, HelpCircle, Building } from 'lucide-react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Contact form submitted:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@greenbuild.com', 'support@greenbuild.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Green Street', 'Eco City, EC 12345'],
      description: 'Visit our design studio'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-4PM'],
      description: 'Closed Sundays'
    }
  ]

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'support', label: 'Technical Support', icon: HelpCircle },
    { value: 'custom', label: 'Custom Design', icon: Building },
    { value: 'partnership', label: 'Partnership', icon: Building }
  ]

  return (
    <div className="min-h-screen">
      <MiniHeader />
      <Header />

      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about our green building designs? Need custom solutions? 
              We're here to help you build a sustainable future.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <info.icon className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">{detail}</p>
                      ))}
                      <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-emerald-600 font-semibold">f</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-emerald-600 font-semibold">t</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-emerald-600 font-semibold">in</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-emerald-600 font-semibold">ig</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {inquiryTypes.map((type) => (
                      <label key={type.value} className="relative">
                        <input
                          type="radio"
                          name="inquiryType"
                          value={type.value}
                          checked={formData.inquiryType === type.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.inquiryType === type.value
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center">
                            <type.icon className={`h-5 w-5 mr-2 ${
                              formData.inquiryType === type.value ? 'text-emerald-600' : 'text-gray-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              formData.inquiryType === type.value ? 'text-emerald-900' : 'text-gray-700'
                            }`}>
                              {type.label}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Brief subject line"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Tell us more about your project or question..."
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Studio</h2>
            <p className="text-lg text-gray-600">
              Come see our sustainable design showcase and meet our team of experts.
            </p>
          </div>
          
          <div className="bg-gray-300 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map would be integrated here</p>
              <p className="text-sm text-gray-500">123 Green Street, Eco City, EC 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our green building designs.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does it take to receive my plans after purchase?",
                answer: "Digital plans are available for immediate download after purchase. Physical plans are shipped within 1-2 business days."
              },
              {
                question: "Can I modify the plans to suit my needs?",
                answer: "Yes! All our plans can be customized. We offer modification services or you can work with your local architect using our plans as a base."
              },
              {
                question: "Are your designs suitable for all climates?",
                answer: "Our designs are optimized for various climate zones. Each plan includes climate-specific recommendations and can be adapted for your location."
              },
              {
                question: "Do you provide construction support?",
                answer: "We offer 12 months of designer support with every purchase, including answering questions during construction and clarifying plan details."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}