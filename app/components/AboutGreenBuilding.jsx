import { Leaf, Zap, Recycle, Shield } from 'lucide-react'

export default function AboutGreenBuilding() {
  const benefits = [
    {
      icon: Leaf,
      title: 'Eco-friendly',
      description: 'Sustainable materials and practices'
    },
    {
      icon: Zap,
      title: 'Energy Efficient',
      description: 'Reduced energy consumption'
    },
    {
      icon: Recycle,
      title: 'Sustainable',
      description: 'Renewable resources and waste reduction'
    },
    {
      icon: Shield,
      title: 'Healthy Living',
      description: 'Improved indoor air quality'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Building Tomorrow, Today
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Green building design focuses on creating structures that are environmentally responsible 
            and resource-efficient throughout their lifecycle. From planning to operation, these designs 
            minimize environmental impact while maximizing occupant health and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <benefit.icon className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}