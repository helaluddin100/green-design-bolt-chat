'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Eye, Heart, Share2, Bed, Bath, Car, Ruler, Filter, Grid, List, Search, X, ChevronDown } from 'lucide-react'
import { designAPI, categoryAPI } from '../../lib/api'
import { useCart } from '../../contexts/CartContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import toast from 'react-hot-toast'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Houses() {
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [houses, setHouses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const [filters, setFilters] = useState({
    search: '',
    beds: '',
    baths: '',
    floors: '',
    garages: '',
    sqftMin: '',
    sqftMax: '',
    priceMin: '',
    priceMax: '',
    category: '',
    greenFeatures: []
  })
  
  const { addToCart } = useCart()
  const { formatPrice } = useCurrency()

  const greenFeatureOptions = ['Solar Ready', 'Energy Star', 'LEED Certified', 'Passive House', 'Net Zero', 'Geothermal']

  useEffect(() => {
    loadCategories()
    loadHouses()
  }, [])

  useEffect(() => {
    loadHouses()
  }, [filters, sortBy])

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getCategories()
      setCategories([{ id: '', name: 'All' }, ...response.data.data])
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadHouses = async (page = 1) => {
    try {
      setLoading(true)
      const params = {
        page,
        sort: sortBy,
        search: filters.search || undefined,
        bedrooms: filters.beds || undefined,
        bathrooms: filters.baths || undefined,
        floors: filters.floors || undefined,
        garages: filters.garages || undefined,
        price_min: filters.priceMin || undefined,
        price_max: filters.priceMax || undefined,
        square_feet_min: filters.sqftMin || undefined,
        square_feet_max: filters.sqftMax || undefined,
        category: filters.category || undefined,
        green_features: filters.greenFeatures.length > 0 ? filters.greenFeatures : undefined,
      }
      
      // Remove undefined values
      Object.keys(params).forEach(key => params[key] === undefined && delete params[key])
      
      const response = await designAPI.getDesigns(params)
      setHouses(response.data.data.data)
      setPagination(response.data.data)
    } catch (error) {
      console.error('Failed to load houses:', error)
      toast.error('Failed to load designs')
    } finally {
      setLoading(false)
    }
  }
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleFeatureToggle = (feature) => {
    setFilters(prev => ({
      ...prev,
      greenFeatures: prev.greenFeatures.includes(feature)
        ? prev.greenFeatures.filter(f => f !== feature)
        : [...prev.greenFeatures, feature]
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '', beds: '', baths: '', floors: '', garages: '',
      sqftMin: '', sqftMax: '', priceMin: '', priceMax: '',
      category: '', greenFeatures: []
    })
  }

  const handleAddToCart = async (designId) => {
    const result = await addToCart(designId)
    if (result.success) {
      toast.success('Added to cart!')
    }
  }
  const houses = [
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
      planNumber: 'GH-2024-001',
      description: 'A stunning eco-friendly home design featuring sustainable materials and energy-efficient systems.'
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
      planNumber: 'MGV-2024-002',
      description: 'Luxury meets sustainability in this modern villa with cutting-edge green technology.'
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
      isFeatured: false,
      isNew: false,
      greenFeatures: ['Solar Panels', 'Energy Efficient', 'Eco Materials'],
      planNumber: 'SFH-2024-003',
      description: 'Perfect for growing families, this home combines comfort with environmental responsibility.'
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
      isFeatured: false,
      isNew: true,
      greenFeatures: ['Passive Design', 'Green Roof', 'Natural Ventilation'],
      planNumber: 'GUL-2024-004',
      description: 'Urban living redefined with sustainable design principles and modern aesthetics.'
    },
    {
      id: 5,
      title: 'Solar Smart Home',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$349',
      beds: 4,
      baths: 3,
      garages: 2,
      sqft: '220 m²',
      floors: 2,
      isFeatured: false,
      isNew: true,
      greenFeatures: ['Solar Ready', 'Smart Systems', 'Energy Storage'],
      planNumber: 'SSH-2024-005',
      description: 'Revolutionary design featuring integrated solar panels and smart energy management.'
    },
    {
      id: 6,
      title: 'Passive House Design',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '$399',
      beds: 4,
      baths: 3,
      garages: 2,
      sqft: '200 m²',
      floors: 2,
      isFeatured: false,
      isNew: false,
      greenFeatures: ['Passive House', 'Net Zero', 'Ultra Efficient'],
      planNumber: 'PHD-2024-006',
      description: 'Ultra-efficient passive house design with net-positive energy production.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <MiniHeader />
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Green House Plans
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our complete collection of sustainable architectural designs, 
              each crafted to minimize environmental impact while maximizing comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search house plans..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Beds:</label>
              <select
                value={filters.beds}
                onChange={(e) => handleFilterChange('beds', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Baths:</label>
              <select
                value={filters.baths}
                onChange={(e) => handleFilterChange('baths', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Floors:</label>
              <select
                value={filters.floors}
                onChange={(e) => handleFilterChange('floors', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Garages:</label>
              <select
                value={filters.garages}
                onChange={(e) => handleFilterChange('garages', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              More Filters
              <ChevronDown className={`h-4 w-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {(filters.search || filters.beds || filters.baths || filters.floors || filters.garages || filters.category || filters.greenFeatures.length > 0) && (
              <button
                onClick={clearFilters}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Square Feet Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Square Feet (m²)</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.sqftMin}
                      onChange={(e) => handleFilterChange('sqftMin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.sqftMax}
                      onChange={(e) => handleFilterChange('sqftMax', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range ($)</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Green Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Green Features</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {greenFeatureOptions.map((feature) => (
                      <label key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.greenFeatures.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Header */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Showing {pagination.from || 0}-{pagination.to || 0} of {pagination.total || 0} results
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="size-small">Size: Small to Large</option>
                <option value="size-large">Size: Large to Small</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Houses Grid/List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}>
              {houses.map((house) => (
              <div 
                key={house.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                  <img 
                    src={house.primary_image?.url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                    alt={house.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {house.isFeatured && (
                      <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    )}
                    {house.isNew && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        New
                      </span>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-emerald-600 font-bold text-lg">{formatPrice(house.price)}</div>
                    {house.originalPrice && (
                      <div className="text-gray-500 text-sm line-through">{formatPrice(house.original_price)}</div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <Link href={`/house/${house.id}`} className="p-2 bg-white text-gray-800 rounded-full hover:bg-emerald-100 transition-colors">
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button className="p-2 bg-white text-gray-800 rounded-full hover:bg-red-100 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button className="p-2 bg-white text-gray-800 rounded-full hover:bg-blue-100 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {house.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">Plan #{house.plan_number}</p>
                    {viewMode === 'list' && (
                      <p className="text-gray-600 mb-3">{house.description}</p>
                    )}
                  </div>
                  
                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{house.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{house.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Car className="h-4 w-4 mr-1" />
                      <span>{house.garages} garage</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Ruler className="h-4 w-4 mr-1" />
                      <span>{house.square_feet} m²</span>
                    </div>
                  </div>

                  {/* Green Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {(house.green_features || []).slice(0, 2).map((feature, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {(house.green_features || []).length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{house.green_features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link href={`/house/${house.id}`} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 block text-center">
                      View Details
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(house.id)}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button 
                onClick={() => loadHouses(pagination.current_page - 1)}
                disabled={pagination.current_page <= 1}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 rounded-lg"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                const page = i + 1
                return (
                  <button 
                    key={page}
                    onClick={() => loadHouses(page)}
                    className={`px-3 py-2 rounded-lg ${
                      pagination.current_page === page 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
              
              <button 
                onClick={() => loadHouses(pagination.current_page + 1)}
                disabled={pagination.current_page >= pagination.last_page}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 rounded-lg"
              >
                Next
              </button>
            </nav>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}