'use client'
import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'Green Building Solutions',
      subtitle: 'for a Sustainable Future',
      description: 'Discover innovative, eco-friendly architectural designs that reduce environmental impact while creating beautiful, energy-efficient spaces for modern living.',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'Explore Green Designs'
    },
    {
      id: 2,
      title: 'Energy Efficient Homes',
      subtitle: 'Built for Tomorrow',
      description: 'Experience the perfect blend of modern design and sustainable technology with our certified green building plans that reduce energy costs by up to 40%.',
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'View Energy Plans'
    },
    {
      id: 3,
      title: 'Sustainable Architecture',
      subtitle: 'Designed with Nature',
      description: 'Join thousands of homeowners who have chosen our eco-friendly designs to create healthier living spaces while protecting the environment.',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'Start Building Green'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-green-800/50"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {slide.title}
                <span className="block text-emerald-300">{slide.subtitle}</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                {slide.description}
              </p>
              
              <button className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                {slide.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-emerald-400 scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}