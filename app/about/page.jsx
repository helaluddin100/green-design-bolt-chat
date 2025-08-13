import { Leaf, Users, Award, Target, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Green Designs' },
    { number: '50+', label: 'Countries Served' },
    { number: '95%', label: 'Customer Satisfaction' }
  ]

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability First',
      description: 'Every design prioritizes environmental responsibility and resource efficiency.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Building a global community of environmentally conscious homeowners and builders.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Delivering award-winning designs that meet the highest standards of green building.'
    },
    {
      icon: Target,
      title: 'Innovation Driven',
      description: 'Continuously pushing the boundaries of sustainable architecture and design.'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Sustainable architecture expert with 15+ years of experience in green building design.'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Architect',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'LEED certified architect specializing in energy-efficient residential designs.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Sustainability Director',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Environmental engineer focused on renewable energy integration in home design.'
    }
  ]

  return (
    <div className="min-h-screen">
      <MiniHeader />
      <Header />

      <section className="relative py-20 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Building a Sustainable Future
              <span className="block text-emerald-700 dark:text-emerald-400">One Design at a Time</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              At GreenBuild, we're passionate about creating beautiful, energy-efficient homes 
              that minimize environmental impact while maximizing comfort and livability.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2015, GreenBuild emerged from a simple yet powerful vision: to make 
                sustainable architecture accessible to everyone. Our founder, Sarah Johnson, 
                recognized the growing need for environmentally responsible building designs 
                that didn't compromise on style or functionality.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                What started as a small team of passionate architects has grown into a global 
                platform serving thousands of customers worldwide. We've helped families build 
                energy-efficient homes, reduced carbon footprints, and created healthier living 
                spaces for communities around the world.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                  <span className="text-gray-700">LEED certified designs</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Energy Star qualified plans</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Passive House standards</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Green building design" 
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-6 rounded-lg">
                <div className="text-2xl font-bold">9 Years</div>
                <div className="text-emerald-100">of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from design conception to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse team of architects, engineers, and sustainability experts 
              work together to create exceptional green building designs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Green?
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who have chosen sustainable living. 
            Browse our collection of green building designs today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/houses" className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
              Browse Designs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}