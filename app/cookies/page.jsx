import Link from 'next/link'
import { Cookie, Settings, Eye, Shield } from 'lucide-react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Cookies() {
  return (
    <div className="min-h-screen">
      <MiniHeader />
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Cookie className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cookie Policy
            </h1>
            <p className="text-lg text-gray-600">
              Learn about how we use cookies and similar technologies to improve 
              your experience on our platform.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 15, 2025</p>
          </div>
        </div>
      </section>

      {/* Cookie Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">What Are Cookies?</h2>
              <p className="text-blue-700">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better, faster, and more personalized experience.
              </p>
            </div>

            <h2>1. Types of Cookies We Use</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Settings className="h-6 w-6 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold">Essential Cookies</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Required for basic website functionality, security, and user authentication. 
                  These cannot be disabled.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Eye className="h-6 w-6 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold">Analytics Cookies</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Help us understand how visitors interact with our website by collecting 
                  anonymous usage statistics.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold">Functional Cookies</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Remember your preferences and settings to provide a personalized 
                  experience across visits.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Cookie className="h-6 w-6 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold">Marketing Cookies</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Used to deliver relevant advertisements and track the effectiveness 
                  of our marketing campaigns.
                </p>
              </div>
            </div>

            <h2>2. Detailed Cookie Information</h2>
            
            <h3>Essential Cookies</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Cookie Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">session_id</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Maintains user session</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">csrf_token</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Security protection</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">auth_token</td>
                    <td className="px-4 py-3 text-sm text-gray-600">User authentication</td>
                    <td className="px-4 py-3 text-sm text-gray-600">30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Analytics Cookies</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Cookie Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">_ga</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Google Analytics - User identification</td>
                    <td className="px-4 py-3 text-sm text-gray-600">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">_gid</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Google Analytics - Session identification</td>
                    <td className="px-4 py-3 text-sm text-gray-600">24 hours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">_gat</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Google Analytics - Request throttling</td>
                    <td className="px-4 py-3 text-sm text-gray-600">1 minute</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>3. How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul>
              <li><strong>Authentication:</strong> To keep you logged in and secure your account</li>
              <li><strong>Preferences:</strong> To remember your settings and customizations</li>
              <li><strong>Analytics:</strong> To understand how our website is used and improve performance</li>
              <li><strong>Security:</strong> To protect against fraud and unauthorized access</li>
              <li><strong>Functionality:</strong> To enable features like shopping cart and favorites</li>
              <li><strong>Marketing:</strong> To show relevant content and measure campaign effectiveness</li>
            </ul>

            <h2>4. Third-Party Cookies</h2>
            <p>We may allow third-party services to set cookies on our website:</p>
            
            <div className="bg-gray-50 rounded-lg p-6 my-6">
              <h3 className="font-semibold text-gray-900 mb-4">Third-Party Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Google Analytics</h4>
                  <p className="text-sm text-gray-600">Website usage analytics</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Stripe</h4>
                  <p className="text-sm text-gray-600">Payment processing</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">PayPal</h4>
                  <p className="text-sm text-gray-600">Alternative payment method</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Social Media</h4>
                  <p className="text-sm text-gray-600">Social sharing features</p>
                </div>
              </div>
            </div>

            <h2>5. Managing Your Cookie Preferences</h2>
            
            <h3>Browser Settings</h3>
            <p>You can control cookies through your browser settings:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>

            <h3>Cookie Consent</h3>
            <p>When you first visit our website, you'll see a cookie consent banner. You can:</p>
            <ul>
              <li>Accept all cookies for the full website experience</li>
              <li>Customize your preferences by cookie category</li>
              <li>Reject non-essential cookies (some features may not work)</li>
              <li>Change your preferences at any time through our cookie settings</li>
            </ul>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 my-8">
              <h3 className="font-semibold text-emerald-800 mb-2">Cookie Settings</h3>
              <p className="text-emerald-700 mb-4">
                You can update your cookie preferences at any time by clicking the button below.
              </p>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Manage Cookie Preferences
              </button>
            </div>

            <h2>6. Impact of Disabling Cookies</h2>
            <p>If you disable cookies, some website features may not work properly:</p>
            <ul>
              <li>You may need to log in repeatedly</li>
              <li>Your preferences and settings won't be saved</li>
              <li>Shopping cart functionality may be limited</li>
              <li>Personalized content and recommendations won't be available</li>
              <li>Some security features may not function correctly</li>
            </ul>

            <h2>7. Updates to This Policy</h2>
            <p>We may update this cookie policy from time to time to reflect changes in our practices or for legal reasons. We'll notify you of significant changes through our website or email.</p>

            <h2>8. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us:</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Privacy Team</h4>
                  <p className="text-gray-600">privacy@greenbuild.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                  <p className="text-gray-600">support@greenbuild.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}