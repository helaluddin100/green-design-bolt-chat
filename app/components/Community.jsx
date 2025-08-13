import { MessageCircle, Users, HelpCircle } from 'lucide-react'

export default function Community() {
  return (
    <section className="py-20 bg-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Green Community
          </h2>
          <p className="text-lg text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Connect with like-minded individuals, share your sustainable building journey, 
            and get expert advice from certified green building professionals. Together, 
            we're building a more sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
            <p className="text-emerald-100">Share experiences and learn from others</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Expert Support</h3>
            <p className="text-emerald-100">Get guidance from certified professionals</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Discussion</h3>
            <p className="text-emerald-100">Engage in meaningful conversations</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white hover:bg-gray-100 text-emerald-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Ask an Expert
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Visit Community
          </button>
        </div>
      </div>
    </section>
  )
}