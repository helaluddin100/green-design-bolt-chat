'use client'
import { useState } from 'react'
import { Search, Filter, Bed, Bath, Car, Ruler, DollarSign } from 'lucide-react'

export default function FilterSection() {
  const [filters, setFilters] = useState({
    search: '',
    beds: '',
    baths: '',
    priceMin: '',
    priceMax: '',
    sqftMin: '',
    sqftMax: ''
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Handle search logic here
    console.log('Searching with filters:', filters)
  }

  return (
    <section className="py-12 bg-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Find Your Perfect Green Design
          </h2>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Use our advanced filters to discover sustainable home designs that match your exact requirements.
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Designs
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search by title, features..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Bed className="inline h-4 w-4 mr-1" />
                Bedrooms
              </label>
              <select
                value={filters.beds}
                onChange={(e) => handleFilterChange('beds', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Bath className="inline h-4 w-4 mr-1" />
                Bathrooms
              </label>
              <select
                value={filters.baths}
                onChange={(e) => handleFilterChange('baths', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Price Range
              </label>
              <div className="flex space-x-1">
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  placeholder="Min"
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  placeholder="Max"
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Square Feet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Ruler className="inline h-4 w-4 mr-1" />
                Size (m²)
              </label>
              <div className="flex space-x-1">
                <input
                  type="number"
                  value={filters.sqftMin}
                  onChange={(e) => handleFilterChange('sqftMin', e.target.value)}
                  placeholder="Min"
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                <input
                  type="number"
                  value={filters.sqftMax}
                  onChange={(e) => handleFilterChange('sqftMax', e.target.value)}
                  placeholder="Max"
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Designs
            </button>
            <button
              type="button"
              onClick={() => setFilters({ search: '', beds: '', baths: '', priceMin: '', priceMax: '', sqftMin: '', sqftMax: '' })}
              className="bg-white hover:bg-gray-50 text-emerald-600 font-semibold py-3 px-8 rounded-lg border-2 border-emerald-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}