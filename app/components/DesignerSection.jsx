import Link from 'next/link'
import { Palette, DollarSign, Users, TrendingUp, Upload, Award, MessageCircle, Globe } from 'lucide-react'

export default function DesignerSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Money',
      description: 'Monetize your designs and earn up to 70% commission on every sale',
      highlight: 'Up to 70% Commission'
    },
    {
      icon: Users,
      title: 'Global Reach',
      description: 'Connect with thousands of buyers worldwide looking for green designs',
      highlight: '50,000+ Active Buyers'
    },
    {
      icon: TrendingUp,
      title: 'Growing Market',
      description: 'Tap into the rapidly expanding sustainable building market',
      highlight: '300% Market Growth'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Build your reputation and get featured as a top green designer',
      highlight: 'Featured Designer Program'
    }
  ]

  const features = [
    {
      icon: Upload,
      title: 'Easy Upload Process',
      description: 'Simple 4-step process to upload and sell your designs'
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'Connect directly with buyers for custom projects'
    },
    {
      icon: Globe,
      title: 'Marketing Support',
      description: 'We promote your designs across our platform and social media'
    },
    {
      icon: Palette,
      title: 'Creative Freedom',
      description: 'Maintain full creative control and ownership of your designs'
    }
  ]

  const stats = [
    { number: '$2.5M+', label: 'Paid to Designers' },
    { number: '1,200+', label: 'Active Designers' },
    { number: '15,000+', label: 'Designs Sold' },
    { number: '4.9/5', label: 'Designer Rating' }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-green-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Palette className="h-12 w-12 text-emerald-200 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Join Our Designer Community
            </h2>
          </div>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Turn your passion for sustainable design into a thriving business. 
            Join thousands of architects and designers earning money while building a greener future.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-emerald-200 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-emerald-100 mb-3 text-sm">
                {benefit.description}
              </p>
              <div className="bg-emerald-400 text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold">
                {benefit.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Everything You Need to Succeed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-full mb-3">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-emerald-100 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Story */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                "I've earned over $50,000 selling my green designs"
              </h3>
              <p className="text-emerald-100 mb-4">
                "GreenBuild has transformed my architecture practice. I now have a steady 
                passive income stream from my sustainable designs, and I've connected with 
                clients from around the world who share my passion for green building."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="text-white font-semibold">Sarah Chen</div>
                  <div className="text-emerald-200 text-sm">Sustainable Architect, Top Designer</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$50,000+</div>
              <div className="text-emerald-200 mb-4">Earned in 18 months</div>
              <div className="text-2xl font-bold text-white mb-2">127</div>
              <div className="text-emerald-200">Designs Sold</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Start Earning?
          </h3>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join our community of successful designers and start monetizing your 
            sustainable design expertise today. It's free to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center">
              <Upload className="h-5 w-5 mr-2" />
              Start Selling Today
            </Link>
            <Link href="/upload-design" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300">
              Upload Your First Design
            </Link>
          </div>
          <p className="text-emerald-200 text-sm mt-4">
            No setup fees • Keep 70% of sales • Get paid weekly
          </p>
        </div>
      </div>
    </section>
  )
}