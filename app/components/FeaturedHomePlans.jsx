import Link from 'next/link'
import { Eye, Heart, Share2, Bed, Bath, Car, Ruler, Award } from 'lucide-react'

export default function FeaturedHomePlans() {
  const featuredPlans = [
    {
      id: 1,
      title: 'The Eco Haven',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$299',
      originalPrice: '$399',
      beds: 4,
      baths: 3,
      garages: 2,
      sqft: '240 m²',
      floors: 2,
      isFeatured: true,
      isNew: false,
      greenFeatures: ['Solar Ready', 'Energy Star', 'LEED Certified'],
      planNumber: 'GH-2024-001'
    },
    {
      id: 2,
      title: 'Modern Green Villa',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$449',
      originalPrice: '$549',
      beds: 5,
      baths: 4,
      garages: 3,
      sqft: '320 m²',
      floors: 2,
      isFeatured: true,
      isNew: true,
      greenFeatures: ['Geothermal', 'Smart Home', 'Rainwater Collection'],
      planNumber: 'MGV-2024-002'
    },
    {
      id: 3,
      title: 'Sustainable Family Home',
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$199',
      originalPrice: '$249',
      beds: 3,
      baths: 2,
      garages: 2,
      sqft: '180 m²',
      floors: 1,
      isFeatured: true,
      isNew: false,
      greenFeatures: ['Solar Panels', 'Energy Efficient', 'Eco Materials'],
      planNumber: 'SFH-2024-003'
    },
    {
      id: 4,
      title: 'Green Urban Loft',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$149',
      originalPrice: '$199',
      beds: 2,
      baths: 2,
      garages: 1,
      sqft: '120 m²',
      floors: 1,
      isFeatured: true,
      isNew: true,
      greenFeatures: ['Passive Design', 'Green Roof', 'Natural Ventilation'],
      planNumber: 'GUL-2024-004'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Home Plans
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our most popular and award-winning green building designs, carefully selected 
            for their exceptional sustainability features and architectural excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPlans.map((plan) => (
            <div 
              key={plan.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={plan.image} 
                  alt={plan.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {plan.isFeatured && (
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  )}
                  {plan.isNew && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      New
                    </span>
                  )}
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-emerald-600 font-bold text-lg">{plan.price}</div>
                  {plan.originalPrice && (
                    <div className="text-gray-500 text-sm line-through">{plan.originalPrice}</div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    <button className="p-2 bg-white text-gray-800 rounded-full hover:bg-emerald-100 transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-white text-gray-800 rounded-full hover:bg-red-100 transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-white text-gray-800 rounded-full hover:bg-blue-100 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-sm text-gray-500">Plan #{plan.planNumber}</p>
                </div>
                
                {/* Specifications */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{plan.beds} beds</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{plan.baths} baths</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Car className="h-4 w-4 mr-1" />
                    <span>{plan.garages} garage</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Ruler className="h-4 w-4 mr-1" />
                    <span>{plan.sqft}</span>
                  </div>
                </div>

                {/* Green Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {plan.greenFeatures.slice(0, 2).map((feature, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {plan.greenFeatures.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{plan.greenFeatures.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <Link href={`/house/${plan.id}`} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 block text-center">
                  View Plan Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/houses" className="bg-white hover:bg-gray-50 text-emerald-600 font-semibold py-3 px-8 rounded-lg border-2 border-emerald-600 hover:border-emerald-700 transition-all duration-300">
            View All Featured Plans
          </Link>
        </div>
      </div>
    </section>
  )
}