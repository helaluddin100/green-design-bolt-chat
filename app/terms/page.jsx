import Link from 'next/link'
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen">
      <MiniHeader />
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Scale className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-600">
              Please read these terms carefully before using our services. 
              By using GreenBuild, you agree to these terms and conditions.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 15, 2025</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700">
                    These terms constitute a legally binding agreement between you and GreenBuild. 
                    Please read them carefully and contact us if you have any questions.
                  </p>
                </div>
              </div>
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the GreenBuild platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

            <h2>2. Description of Service</h2>
            <p>GreenBuild is an online marketplace that connects buyers with sellers of green building designs, architectural plans, and related services. We provide:</p>
            <ul>
              <li>A platform for browsing and purchasing building designs</li>
              <li>Tools for designers to upload and sell their work</li>
              <li>Communication tools between buyers and designers</li>
              <li>Educational content about green building practices</li>
            </ul>

            <h2>3. User Accounts</h2>
            
            <h3>Account Creation</h3>
            <p>To use certain features of our service, you must create an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3>Account Termination</h3>
            <p>We reserve the right to terminate or suspend accounts that violate these terms or engage in prohibited activities.</p>

            <h2>4. Purchases and Payments</h2>
            
            <h3>Pricing and Fees</h3>
            <ul>
              <li>All prices are displayed in USD and include applicable taxes</li>
              <li>Prices may change without notice, but changes won't affect existing orders</li>
              <li>We charge a service fee on transactions as disclosed during checkout</li>
            </ul>

            <h3>Payment Processing</h3>
            <ul>
              <li>Payments are processed through secure third-party providers</li>
              <li>You authorize us to charge your payment method for purchases</li>
              <li>Refunds are subject to our refund policy</li>
            </ul>

            <h2>5. Intellectual Property Rights</h2>
            
            <h3>Designer Content</h3>
            <p>Designers retain ownership of their uploaded designs but grant us a license to:</p>
            <ul>
              <li>Display and market their designs on our platform</li>
              <li>Process and deliver purchased content to buyers</li>
              <li>Use designs for promotional purposes with attribution</li>
            </ul>

            <h3>Buyer Rights</h3>
            <p>When you purchase a design, you receive:</p>
            <ul>
              <li>A non-exclusive license to use the design for your intended purpose</li>
              <li>The right to modify the design for your specific needs</li>
              <li>Access to support from the original designer (where applicable)</li>
            </ul>

            <h3>Platform Content</h3>
            <p>All content on our platform, including text, graphics, logos, and software, is owned by GreenBuild or our licensors and is protected by copyright and other intellectual property laws.</p>

            <h2>6. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Upload content that infringes on others' intellectual property rights</li>
              <li>Engage in fraudulent or deceptive practices</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to circumvent our security measures</li>
              <li>Use our platform for illegal activities</li>
              <li>Spam or send unsolicited communications</li>
            </ul>

            <h2>7. Content Guidelines</h2>
            
            <h3>For Designers</h3>
            <p>All uploaded designs must:</p>
            <ul>
              <li>Be original work or properly licensed</li>
              <li>Meet our quality standards</li>
              <li>Include accurate descriptions and specifications</li>
              <li>Comply with applicable building codes and regulations</li>
            </ul>

            <h3>Content Review</h3>
            <p>We reserve the right to review, approve, or reject any content uploaded to our platform.</p>

            <h2>8. Disclaimers and Limitations</h2>
            
            <h3>Service Availability</h3>
            <p>We strive to maintain continuous service availability but cannot guarantee uninterrupted access. We may suspend service for maintenance or other operational reasons.</p>

            <h3>Design Accuracy</h3>
            <p>While we encourage accurate and detailed designs, we do not warrant that any design will meet local building codes or regulations. Buyers are responsible for verifying compliance with local requirements.</p>

            <h3>Limitation of Liability</h3>
            <p>To the maximum extent permitted by law, GreenBuild shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p>

            <h2>9. Refund Policy</h2>
            <p>We offer refunds under the following conditions:</p>
            <ul>
              <li>Digital downloads: Within 7 days if files are corrupted or significantly different from description</li>
              <li>Custom designs: As agreed upon with the designer</li>
              <li>Service issues: When we fail to deliver promised services</li>
            </ul>

            <h2>10. Privacy</h2>
            <p>Your privacy is important to us. Please review our <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</Link> to understand how we collect, use, and protect your information.</p>

            <h2>11. Dispute Resolution</h2>
            <p>We encourage users to resolve disputes through our internal resolution process. For unresolved disputes, we may use binding arbitration as specified in our dispute resolution procedures.</p>

            <h2>12. Modifications to Terms</h2>
            <p>We may modify these terms at any time. Significant changes will be communicated through email or platform notifications. Continued use of our services after changes constitutes acceptance of the new terms.</p>

            <h2>13. Governing Law</h2>
            <p>These terms are governed by the laws of [Your Jurisdiction] without regard to conflict of law principles.</p>

            <h2>14. Contact Information</h2>
            <p>For questions about these terms, please contact us:</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Department</h4>
                  <p className="text-gray-600">legal@greenbuild.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">General Support</h4>
                  <p className="text-gray-600">support@greenbuild.com</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-8">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-emerald-800">Thank you for choosing GreenBuild</h4>
                  <p className="text-emerald-700">We're committed to providing you with the best green building design experience.</p>
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