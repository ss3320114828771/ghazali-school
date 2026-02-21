'use client'

import { useState } from 'react'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  venue: string
  type: 'academic' | 'sports' | 'cultural' | 'holiday'
  status: 'upcoming' | 'ongoing' | 'completed'
  image?: string
}

export default function EventsPage() {
  const [selectedMonth, setSelectedMonth] = useState('March')
  const [selectedType, setSelectedType] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState<number | null>(null)

  const [events] = useState<Event[]>([
    {
      id: 1,
      title: 'Sports Gala 2024',
      description: 'Annual sports competition with various games including cricket, football, athletics and more.',
      date: '2024-03-15',
      time: '09:00 AM - 05:00 PM',
      venue: 'School Sports Ground',
      type: 'sports',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      description: 'Quarterly meeting with parents to discuss student progress.',
      date: '2024-03-10',
      time: '02:00 PM - 05:00 PM',
      venue: 'School Auditorium',
      type: 'academic',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Independence Day Celebration',
      description: 'Celebration of Pakistan Independence Day with cultural performances.',
      date: '2024-03-23',
      time: '08:00 AM - 12:00 PM',
      venue: 'Main Ground',
      type: 'cultural',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Mid-Term Examinations',
      description: 'Mid-term examinations for all classes.',
      date: '2024-02-20',
      time: '09:00 AM onwards',
      venue: 'Respective Classrooms',
      type: 'academic',
      status: 'ongoing'
    },
    {
      id: 5,
      title: 'Spring Holidays',
      description: 'Spring break holidays.',
      date: '2024-01-25',
      time: 'All Day',
      venue: 'N/A',
      type: 'holiday',
      status: 'completed'
    }
  ])

  const filteredEvents = events.filter(event => {
    if (selectedType !== 'all' && event.type !== selectedType) return false
    return true
  })

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'academic': return 'bg-blue-500/20 text-blue-300'
      case 'sports': return 'bg-green-500/20 text-green-300'
      case 'cultural': return 'bg-purple-500/20 text-purple-300'
      case 'holiday': return 'bg-yellow-500/20 text-yellow-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming': return 'bg-yellow-500/20 text-yellow-300'
      case 'ongoing': return 'bg-green-500/20 text-green-300'
      case 'completed': return 'bg-gray-500/20 text-gray-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Events Calendar</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-500 hover:to-red-600 transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white mb-2">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                <option key={month} className="bg-gray-800">{month}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">Event Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="all" className="bg-gray-800">All Types</option>
              <option value="academic" className="bg-gray-800">Academic</option>
              <option value="sports" className="bg-gray-800">Sports</option>
              <option value="cultural" className="bg-gray-800">Cultural</option>
              <option value="holiday" className="bg-gray-800">Holiday</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-500 hover:to-pink-600">
              <i className="fas fa-calendar-alt mr-2"></i>
              Calendar View
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div 
            key={event.id} 
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setShowDetailsModal(event.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <i className="fas fa-calendar-day text-white text-xl"></i>
              </div>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(event.type)}`}>
                  {event.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
            <p className="text-white/60 text-sm mb-4 line-clamp-2">{event.description}</p>
            
            <div className="space-y-2">
              <p className="text-white/80 text-sm">
                <i className="fas fa-calendar w-5 text-orange-300"></i>
                {event.date}
              </p>
              <p className="text-white/80 text-sm">
                <i className="fas fa-clock w-5 text-green-300"></i>
                {event.time}
              </p>
              <p className="text-white/80 text-sm">
                <i className="fas fa-map-marker-alt w-5 text-red-300"></i>
                {event.venue}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-orange-900 rounded-3xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Event</h2>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-white mb-2">Event Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Description</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                  placeholder="Enter event description"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400" 
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Time</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                    placeholder="e.g., 09:00 AM - 05:00 PM"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Venue</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                    placeholder="Enter venue"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Event Type</label>
                  <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option className="bg-gray-800">Academic</option>
                    <option className="bg-gray-800">Sports</option>
                    <option className="bg-gray-800">Cultural</option>
                    <option className="bg-gray-800">Holiday</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-xl font-bold hover:from-orange-500 hover:to-red-600">
                  Create Event
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-red-500/20 text-red-300 py-3 rounded-xl font-bold hover:bg-red-500/30">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Event Details</h2>
              <button onClick={() => setShowDetailsModal(null)} className="text-white/60 hover:text-white">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            {events.find(e => e.id === showDetailsModal) && (
              <div>
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {events.find(e => e.id === showDetailsModal)?.title}
                  </h3>
                  <div className="flex space-x-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(events.find(e => e.id === showDetailsModal)?.type || '')}`}>
                      {events.find(e => e.id === showDetailsModal)?.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(events.find(e => e.id === showDetailsModal)?.status || '')}`}>
                      {events.find(e => e.id === showDetailsModal)?.status}
                    </span>
                  </div>
                  <p className="text-white/80 text-lg mb-6">
                    {events.find(e => e.id === showDetailsModal)?.description}
                  </p>
                </div>
                
                <div className="space-y-4 bg-white/5 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-calendar text-2xl text-orange-300 w-8"></i>
                    <div>
                      <p className="text-white/60 text-sm">Date</p>
                      <p className="text-white text-lg">{events.find(e => e.id === showDetailsModal)?.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-clock text-2xl text-green-300 w-8"></i>
                    <div>
                      <p className="text-white/60 text-sm">Time</p>
                      <p className="text-white text-lg">{events.find(e => e.id === showDetailsModal)?.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-map-marker-alt text-2xl text-red-300 w-8"></i>
                    <div>
                      <p className="text-white/60 text-sm">Venue</p>
                      <p className="text-white text-lg">{events.find(e => e.id === showDetailsModal)?.venue}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-6">
                  <button className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-3 rounded-xl font-bold hover:from-blue-500 hover:to-purple-600">
                    <i className="fas fa-edit mr-2"></i>
                    Edit Event
                  </button>
                  <button className="flex-1 bg-red-500/20 text-red-300 py-3 rounded-xl font-bold hover:bg-red-500/30">
                    <i className="fas fa-trash mr-2"></i>
                    Delete Event
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}