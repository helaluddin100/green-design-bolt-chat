import Link from 'next/link'
import { Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MiniHeader />
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Last updated: January 15, 2025</p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-emerald-800 mb-3">Quick Summary</h2>
              <ul className="text-emerald-700 space-y-2">
                <li>• We collect only necessary information to provide our services</li>
                <li>• We never sell your personal data to third parties</li>
                <li>• You have full control over your data and can request deletion</li>
                <li>• We use industry-standard security measures to protect your information</li>
              </ul>
            </div>

            <h2>1. Information We Collect</h2>
            
            <h3>Personal Information</h3>
            <p>When you create an account or make a purchase, we collect:</p>
            <ul>
              <li>Name and contact information (email, phone, address)</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Account preferences and settings</li>
              <li>Communication history with our support team</li>
            </ul>

            <h3>Usage Information</h3>
            <p>We automatically collect certain information about your use of our services:</p>
            <ul>
              <li>Device information (browser type, operating system)</li>
              <li>Usage patterns and preferences</li>
              <li>IP address and location data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Process transactions and deliver purchased content</li>
              <li>Communicate with you about your account and our services</li>
              <li>Personalize your experience on our platform</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information. We may share information in these limited circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted partners who help us operate our platform</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We implement comprehensive security measures including:</p>
            <ul>
              <li>SSL encryption for all data transmission</li>
              <li>Secure data storage with regular backups</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Employee training on data protection practices</li>
            </ul>

            <h2>5. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correct:</strong> Update or correct inaccurate information</li>
              <li><strong>Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze site usage and improve performance</li>
              <li>Provide personalized content and recommendations</li>
              <li>Enable social media features</li>
            </ul>
            <p>You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.</p>

            <h2>7. Third-Party Services</h2>
            <p>Our platform integrates with third-party services including:</p>
            <ul>
              <li><strong>Payment Processors:</strong> Stripe, PayPal for secure payment processing</li>
              <li><strong>Analytics:</strong> Google Analytics for usage statistics</li>
              <li><strong>Email Services:</strong> For transactional and marketing emails</li>
              <li><strong>Cloud Storage:</strong> For secure file storage and delivery</li>
            </ul>

            <h2>8. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.</p>

            <h2>9. Children's Privacy</h2>
            <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately.</p>

            <h2>10. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of significant changes by email or through our platform. Your continued use of our services after changes become effective constitutes acceptance of the updated policy.</p>

            <h2>11. Contact Us</h2>
            <p>If you have questions about this privacy policy or our data practices, please contact us:</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-emerald-600 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">privacy@greenbuild.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-emerald-600 mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
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