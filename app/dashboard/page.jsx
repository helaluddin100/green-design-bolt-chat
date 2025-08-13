'use client'
import { useState } from 'react'
import Link from 'next/link'
import { User, Download, CreditCard, Settings, LogOut, FileText, Calendar, DollarSign, Upload, Eye, Trash2, Edit } from 'lucide-react'
import ProtectedRoute from '../components/ProtectedRoute'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const userStats = {
    totalPurchases: 12,
    totalSpent: 2847,
    activeDownloads: 8,
    accountBalance: 150
  }

  const recentPurchases = [
    {
      id: 1,
      title: 'The Eco Haven',
      planNumber: 'GH-2024-001',
      date: '2025-01-15',
      price: 299,
      status: 'completed',
      downloadUrl: '/downloads/eco-haven.zip'
    },
    {
      id: 2,
      title: 'Modern Green Villa',
      planNumber: 'MGV-2024-002',
      date: '2025-01-10',
      price: 449,
      status: 'completed',
      downloadUrl: '/downloads/modern-villa.zip'
    },
    {
      id: 3,
      title: 'Sustainable Family Home',
      planNumber: 'SFH-2024-003',
      date: '2025-01-05',
      price: 199,
      status: 'processing',
      downloadUrl: null
    }
  ]

  const uploadedDesigns = [
    {
      id: 1,
      title: 'Custom Eco Cottage',
      status: 'approved',
      uploadDate: '2025-01-12',
      sales: 5,
      earnings: 125
    },
    {
      id: 2,
      title: 'Solar Tiny House',
      status: 'pending',
      uploadDate: '2025-01-14',
      sales: 0,
      earnings: 0
    }
  ]

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'purchases', label: 'My Purchases', icon: FileText },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'uploads', label: 'My Designs', icon: Upload },
    { id: 'balance', label: 'Balance', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MiniHeader />
      <Header />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your account and green building designs</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Premium Member</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Purchases</p>
                          <p className="text-2xl font-bold text-gray-900">{userStats.totalPurchases}</p>
                        </div>
                        <FileText className="h-8 w-8 text-emerald-600" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Spent</p>
                          <p className="text-2xl font-bold text-gray-900">${userStats.totalSpent}</p>
                        </div>
                        <CreditCard className="h-8 w-8 text-emerald-600" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Active Downloads</p>
                          <p className="text-2xl font-bold text-gray-900">{userStats.activeDownloads}</p>
                        </div>
                        <Download className="h-8 w-8 text-emerald-600" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Account Balance</p>
                          <p className="text-2xl font-bold text-gray-900">${userStats.accountBalance}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Purchases</h2>
                    <div className="space-y-4">
                      {recentPurchases.slice(0, 3).map((purchase) => (
                        <div key={purchase.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">{purchase.title}</h3>
                            <p className="text-sm text-gray-500">Plan #{purchase.planNumber} • {purchase.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${purchase.price}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              purchase.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {purchase.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Purchases Tab */}
              {activeTab === 'purchases' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Purchase History</h2>
                  <div className="space-y-4">
                    {recentPurchases.map((purchase) => (
                      <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{purchase.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            purchase.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {purchase.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Plan #{purchase.planNumber} • {purchase.date}</span>
                          <span className="font-semibold text-gray-900">${purchase.price}</span>
                        </div>
                        {purchase.downloadUrl && (
                          <div className="mt-3">
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                              <Download className="h-4 w-4 inline mr-2" />
                              Download
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Downloads Tab */}
              {activeTab === 'downloads' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Downloads</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentPurchases.filter(p => p.downloadUrl).map((purchase) => (
                      <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{purchase.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">Plan #{purchase.planNumber}</p>
                        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                          <Download className="h-4 w-4 inline mr-2" />
                          Download Plans
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Uploads Tab */}
              {activeTab === 'uploads' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">My Designs</h2>
                      <Link href="/upload-design" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        <Upload className="h-4 w-4 inline mr-2" />
                        Upload New Design
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      {uploadedDesigns.map((design) => (
                        <div key={design.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{design.title}</h3>
                            <div className="flex items-center space-x-2">
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                design.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {design.status}
                              </span>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-red-400 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="block text-gray-900 font-medium">{design.sales}</span>
                              <span>Sales</span>
                            </div>
                            <div>
                              <span className="block text-gray-900 font-medium">${design.earnings}</span>
                              <span>Earnings</span>
                            </div>
                            <div>
                              <span className="block text-gray-900 font-medium">{design.uploadDate}</span>
                              <span>Upload Date</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Balance Tab */}
              {activeTab === 'balance' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Balance</h2>
                    <div className="text-center mb-6">
                      <p className="text-3xl font-bold text-emerald-600 mb-2">${userStats.accountBalance}</p>
                      <p className="text-gray-600">Available for withdrawal</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Link href="/withdraw" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Withdraw Funds
                      </Link>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors">
                        View History
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Design Sale - Custom Eco Cottage</p>
                          <p className="text-sm text-gray-500">January 14, 2025</p>
                        </div>
                        <span className="text-green-600 font-semibold">+$25.00</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Design Sale - Custom Eco Cottage</p>
                          <p className="text-sm text-gray-500">January 12, 2025</p>
                        </div>
                        <span className="text-green-600 font-semibold">+$25.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input type="text" defaultValue="John" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input type="text" defaultValue="Doe" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input type="email" defaultValue="john@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                          <span className="ml-2 text-sm text-gray-700">Email notifications for new designs</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                          <span className="ml-2 text-sm text-gray-700">Marketing emails</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                          <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </ProtectedRoute>
  )
}