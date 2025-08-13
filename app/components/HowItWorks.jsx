import { Search, Download, UserCheck } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Browse or Request Designs',
      description: 'Explore our collection of green building designs or request a custom solution tailored to your needs.',
      step: '01'
    },
    {
      icon: Download,
      title: 'Buy & Download Files',
      description: 'Purchase your chosen design and instantly download all architectural files and documentation.',
      step: '02'
    },
    {
      icon: UserCheck,
      title: 'Connect with Designer',
      description: 'Get post-purchase support and connect directly with the designer for questions and modifications.',
      step: '03'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting your dream green building design is simple. Follow these three easy steps 
            to start your sustainable building journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-lg">
                {step.step}
              </div>
              
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 text-white rounded-full mb-6">
                <step.icon className="h-10 w-10" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-200 transform translate-x-6"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}