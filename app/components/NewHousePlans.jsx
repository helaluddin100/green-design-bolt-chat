import Link from 'next/link'
import { Sparkles, Eye, Calendar, Bed, Bath, Car, Ruler } from 'lucide-react'

export default function NewHousePlans() {
  const newPlans = [
    {
      id: 1,
      title: 'The Solar Sanctuary',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$349',
      beds: 4,
      baths: 3,
      garages: 2,
      sqft: '220 m²',
      floors: 2,
      dateAdded: '2025-01-15',
      planNumber: 'SS-2025-001',
      description: 'A revolutionary design featuring integrated solar panels and smart energy management systems.'
    },
    {
      id: 2,
      title: 'Eco Minimalist Retreat',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$189',
      beds: 2,
      baths: 2,
      garages: 1,
      sqft: '95 m²',
      floors: 1,
      dateAdded: '2025-01-12',
      planNumber: 'EMR-2025-002',
      description: 'Minimalist design focused on natural materials and passive energy efficiency.'
    },
    {
      id: 3,
      title: 'Smart Green Family Home',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$279',
      beds: 3,
      baths: 2,
      garages: 2,
      sqft: '165 m²',
      floors: 1,
      dateAdded: '2025-01-10',
      planNumber: 'SGFH-2025-003',
      description: 'Perfect blend of family functionality with cutting-edge green technology.'
    },
    {
      id: 4,
      title: 'Passive House Plus',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$399',
      beds: 4,
      baths: 3,
      garages: 2,
      sqft: '200 m²',
      floors: 2,
      dateAdded: '2025-01-08',
      planNumber: 'PHP-2025-004',
      description: 'Ultra-efficient passive house design with net-positive energy production.'
    },
    {
      id: 5,
      title: 'Urban Green Townhouse',
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$229',
      beds: 3,
      baths: 2,
      garages: 1,
      sqft: '140 m²',
      floors: 3,
      dateAdded: '2025-01-05',
      planNumber: 'UGT-2025-005',
      description: 'Vertical living solution optimized for urban lots with green roof systems.'
    },
    {
      id: 6,
      title: 'Net-Zero Cottage',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$159',
      beds: 2,
      baths: 1,
      garages: 1,
      sqft: '85 m²',
      floors: 1,
      dateAdded: '2025-01-03',
      planNumber: 'NZC-2025-006',
      description: 'Compact cottage design achieving net-zero energy consumption year-round.'
    }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              New House Plans
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our latest green building designs featuring the most innovative 
            sustainable technologies and architectural trends for 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newPlans.map((plan) => (
            <div 
              key={plan.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={plan.image} 
                  alt={plan.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* New Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    New
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-emerald-600 font-bold text-lg">{plan.price}</div>
                </div>

                {/* View Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/house/${plan.id}`} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors">
                    <Eye className="h-4 w-4 mr-2" />
                    Quick View
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {plan.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Added {formatDate(plan.dateAdded)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                  <p className="text-xs text-gray-500">Plan #{plan.planNumber}</p>
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
                
                <Link href={`/house/${plan.id}`} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 block text-center">
                  View Plan Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/houses" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            View All New Plans
          </Link>
        </div>
      </div>
    </section>
  )
}