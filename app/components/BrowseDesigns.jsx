import Link from 'next/link'
import { Eye, Home, Layers } from 'lucide-react'

export default function BrowseDesigns() {
  const designs = [
    {
      id: 1,
      title: 'Modern Eco Villa',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=500',
      size: '240 m²',
      rooms: 4,
      floors: 2,
      isGreenApproved: true,
      price: '$299'
    },
    {
      id: 2,
      title: 'Sustainable Family Home',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=500',
      size: '180 m²',
      rooms: 3,
      floors: 1,
      isGreenApproved: true,
      price: '$199'
    },
    {
      id: 3,
      title: 'Green Urban Loft',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500',
      size: '120 m²',
      rooms: 2,
      floors: 1,
      isGreenApproved: true,
      price: '$149'
    },
    {
      id: 4,
      title: 'Eco Cottage Retreat',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=500',
      size: '95 m²',
      rooms: 2,
      floors: 1,
      isGreenApproved: true,
      price: '$129'
    },
    {
      id: 5,
      title: 'Solar Smart Home',
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=500',
      size: '210 m²',
      rooms: 3,
      floors: 2,
      isGreenApproved: true,
      price: '$249'
    },
    {
      id: 6,
      title: 'Passive House Design',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=500',
      size: '165 m²',
      rooms: 3,
      floors: 1,
      isGreenApproved: true,
      price: '$179'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Featured Green Designs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of sustainable architectural designs, 
            each carefully crafted to minimize environmental impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design) => (
            <div 
              key={design.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={design.image} 
                  alt={design.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {design.isGreenApproved && (
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Green Approved
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-bold">
                  {design.price}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {design.title}
                </h3>
                
                <div className="flex items-center justify-between text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    <span className="text-sm">{design.size}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{design.rooms} rooms</span>
                  </div>
                  <div className="flex items-center">
                    <Layers className="h-4 w-4 mr-1" />
                    <span className="text-sm">{design.floors} floor{design.floors > 1 ? 's' : ''}</span>
                  </div>
                </div>
                
                <Link href={`/house/${design.id}`} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center group">
                  <Eye className="h-4 w-4 mr-2" />
                  View Design
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/houses" className="bg-white hover:bg-gray-50 text-emerald-600 font-semibold py-3 px-8 rounded-lg border-2 border-emerald-600 hover:border-emerald-700 transition-all duration-300">
            View All Designs
          </Link>
        </div>
      </div>
    </section>
  )
}