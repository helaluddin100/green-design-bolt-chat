'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, Image, FileText, DollarSign, Tag, AlertCircle, CheckCircle } from 'lucide-react'
import { designAPI, categoryAPI } from '../../lib/api'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'
import ProtectedRoute from '../components/ProtectedRoute'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function UploadDesign() {
  const [step, setStep] = useState(1)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    price: '',
    original_price: '',
    tags: '',
    beds: '',
    baths: '',
    garages: '',
    sqft: '',
    floors: '',
    greenFeatures: [],
    images: [],
    planFiles: [],
    agreement: false
  })
  
  const { user, isAuthenticated, isDesigner } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || !isDesigner) {
      router.push('/login')
      return
    }
    loadCategories()
  }, [isAuthenticated, isDesigner])

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getCategories()
      setCategories(response.data.data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const greenFeatureOptions = [
    'Solar Ready', 'Energy Star', 'LEED Certified', 'Passive House', 'Net Zero', 
    'Geothermal Ready', 'Smart Home', 'Rainwater Collection', 'Green Roof', 
    'Natural Ventilation', 'Eco Materials', 'Energy Efficient'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      greenFeatures: prev.greenFeatures.includes(feature)
        ? prev.greenFeatures.filter(f => f !== feature)
        : [...prev.greenFeatures, feature]
    }))
  }

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...files]
    }))
  }

  const removeFile = (index, type) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
    } else {
      submitDesign()
    }
  }

  const submitDesign = async () => {
    setLoading(true)
    try {
      const submitData = new FormData()
      
      // Basic information
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('category_id', formData.category_id)
      submitData.append('price', formData.price)
      if (formData.original_price) {
        submitData.append('original_price', formData.original_price)
      }
      
      // Specifications
      submitData.append('bedrooms', formData.beds)
      submitData.append('bathrooms', formData.baths)
      submitData.append('garages', formData.garages || 0)
      submitData.append('floors', formData.floors)
      submitData.append('square_feet', formData.sqft)
      
      // Green features and tags
      submitData.append('green_features', JSON.stringify(formData.greenFeatures))
      if (formData.tags) {
        const tagsArray = formData.tags.split(',').map(tag => tag.trim())
        submitData.append('tags', JSON.stringify(tagsArray))
      }
      
      // Images
      formData.images.forEach((image, index) => {
        submitData.append(`images[${index}]`, image)
      })
      
      // Plan files
      formData.planFiles.forEach((file, index) => {
        submitData.append(`files[${index}]`, file)
      })
      
      await designAPI.uploadDesign(submitData)
      setStep(5) // Success step
      toast.success('Design uploaded successfully!')
      
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to upload design'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MiniHeader />
        <Header />
        
        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Design Submitted Successfully!</h1>
              <p className="text-gray-600 mb-6">
                Your design "{formData.title}" has been submitted for review. 
                We'll notify you within 2-3 business days about the approval status.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Go to Dashboard
                </Link>
                <button 
                  onClick={() => {
                    setStep(1)
                    setFormData({
                      title: '', description: '', category: '', price: '', tags: '',
                      beds: '', baths: '', garages: '', sqft: '', floors: '',
                      greenFeatures: [], images: [], planFiles: [], agreement: false
                    })
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Upload Another Design
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      <MiniHeader />
      <Header />

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/dashboard" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-20 h-1 mx-2 ${
                      step > stepNumber ? 'bg-emerald-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <div className="flex space-x-12 text-sm text-gray-600">
                <span className={step >= 1 ? 'text-emerald-600 font-medium' : ''}>Basic Info</span>
                <span className={step >= 2 ? 'text-emerald-600 font-medium' : ''}>Specifications</span>
                <span className={step >= 3 ? 'text-emerald-600 font-medium' : ''}>Files</span>
                <span className={step >= 4 ? 'text-emerald-600 font-medium' : ''}>Review</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Upload className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Design</h1>
                    <p className="text-gray-600">Share your green building design with our community</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Design Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., Modern Eco Villa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Describe your design, its features, and what makes it special..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category_id"
                        required
                        value={formData.category_id}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (USD) *
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        All prices are set in USD and will be converted to local currency for buyers
                      </p>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="price"
                          required
                          min="1"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="299"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price (USD - Optional)
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        Show a discount by setting a higher original price
                      </p>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="original_price"
                          min="1"
                          value={formData.original_price}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="399"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="modern, eco-friendly, solar, energy-efficient"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Specifications */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Design Specifications</h2>
                    <p className="text-gray-600">Provide detailed specifications for your design</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms *
                      </label>
                      <input
                        type="number"
                        name="beds"
                        required
                        min="1"
                        value={formData.beds}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bathrooms *
                      </label>
                      <input
                        type="number"
                        name="baths"
                        required
                        min="1"
                        step="0.5"
                        value={formData.baths}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Garages
                      </label>
                      <input
                        type="number"
                        name="garages"
                        min="0"
                        value={formData.garages}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Square Feet (m²) *
                      </label>
                      <input
                        type="number"
                        name="sqft"
                        required
                        min="1"
                        value={formData.sqft}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="240"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Floors *
                      </label>
                      <input
                        type="number"
                        name="floors"
                        required
                        min="1"
                        value={formData.floors}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Green Features
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {greenFeatureOptions.map((feature) => (
                        <label key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.greenFeatures.includes(feature)}
                            onChange={() => handleFeatureToggle(feature)}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: File Uploads */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Files</h2>
                    <p className="text-gray-600">Upload images and architectural plans for your design</p>
                  </div>

                  {/* Images Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Design Images * (At least 3 images required)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'images')}
                        className="hidden"
                        id="images-upload"
                      />
                      <label
                        htmlFor="images-upload"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        Choose Images
                      </label>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.images.map((file, index) => (
                          <div key={index} className="relative">
                            <div className="bg-gray-100 rounded-lg p-2">
                              <p className="text-sm text-gray-600 truncate">{file.name}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index, 'images')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Plan Files Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Architectural Plans * (PDF, DWG, or ZIP files)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload your architectural plans and documentation</p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.dwg,.zip"
                        onChange={(e) => handleFileUpload(e, 'planFiles')}
                        className="hidden"
                        id="plans-upload"
                      />
                      <label
                        htmlFor="plans-upload"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        Choose Files
                      </label>
                    </div>
                    {formData.planFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.planFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, 'planFiles')}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Submission</h2>
                    <p className="text-gray-600">Please review all information before submitting</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Design Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Title:</strong> {formData.title}</p>
                        <p><strong>Category:</strong> {formData.category}</p>
                        <p><strong>Price:</strong> ${formData.price}</p>
                        <p><strong>Bedrooms:</strong> {formData.beds}</p>
                        <p><strong>Bathrooms:</strong> {formData.baths}</p>
                      </div>
                      <div>
                        <p><strong>Garages:</strong> {formData.garages || 'None'}</p>
                        <p><strong>Square Feet:</strong> {formData.sqft} m²</p>
                        <p><strong>Floors:</strong> {formData.floors}</p>
                        <p><strong>Images:</strong> {formData.images.length} uploaded</p>
                        <p><strong>Plan Files:</strong> {formData.planFiles.length} uploaded</p>
                      </div>
                    </div>
                    {formData.greenFeatures.length > 0 && (
                      <div className="mt-4">
                        <p><strong>Green Features:</strong> {formData.greenFeatures.join(', ')}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">Review Process:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Your design will be reviewed within 2-3 business days</li>
                          <li>We'll check for quality, completeness, and compliance with green building standards</li>
                          <li>You'll receive an email notification about the approval status</li>
                          <li>Approved designs will be listed in our marketplace</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="agreement"
                      required
                      checked={formData.agreement}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      I agree to the <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">Terms and Conditions</Link> and 
                      confirm that this is my original work
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  disabled={step === 4 && !formData.agreement}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors ml-auto flex items-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : null}
                  {step === 4 ? (loading ? 'Uploading...' : 'Submit Design') : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </ProtectedRoute>
  )
}