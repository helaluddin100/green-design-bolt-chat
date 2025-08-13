import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'

export default function GreenNews() {
  const articles = [
    {
      id: 1,
      title: '2025 Green Building Trends: What to Expect',
      excerpt: 'Discover the latest innovations in sustainable architecture and how they\'re shaping the future of construction.',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Sarah Johnson',
      date: 'January 15, 2025',
      category: 'Trends',
      slug: '2025-green-building-trends'
    },
    {
      id: 2,
      title: 'Solar Panel Integration in Modern Home Design',
      excerpt: 'Learn how to seamlessly incorporate solar panels into your home design without compromising aesthetics.',
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Michael Chen',
      date: 'January 12, 2025',
      category: 'Technology',
      slug: 'solar-panel-integration-modern-design'
    },
    {
      id: 3,
      title: 'The Economics of Green Building: ROI Analysis',
      excerpt: 'Understand the long-term financial benefits of investing in sustainable building practices and materials.',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Emily Rodriguez',
      date: 'January 10, 2025',
      category: 'Finance',
      slug: 'economics-green-building-roi-analysis'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Green Building News & Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, technologies, and best practices 
            in sustainable architecture and green building design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {article.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{article.date}</span>
                  </div>
                </div>
                
                <Link href={`/blog/${article.slug}`} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}