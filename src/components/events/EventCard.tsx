'use client'

import React from 'react'
import Link from 'next/link'

// ============================================
// SIMPLE EVENT CARD
// ============================================

interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  type: 'academic' | 'sports' | 'cultural' | 'holiday' | 'meeting'
  description?: string
}

interface EventCardProps {
  event?: Event
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const DEFAULT_EVENT: Event = {
  id: '1',
  title: 'Sports Gala 2024',
  date: '2024-03-15',
  time: '09:00 AM - 05:00 PM',
  venue: 'School Sports Ground',
  type: 'sports',
  description: 'Annual sports competition with various games including cricket, football, athletics and more.'
}

export default function EventCard({ 
  event = DEFAULT_EVENT,
  onView,
  onEdit,
  onDelete 
}: EventCardProps) {

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-600'
      case 'sports': return 'bg-green-100 text-green-600'
      case 'cultural': return 'bg-purple-100 text-purple-600'
      case 'holiday': return 'bg-yellow-100 text-yellow-600'
      case 'meeting': return 'bg-orange-100 text-orange-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return '📚'
      case 'sports': return '⚽'
      case 'cultural': return '🎭'
      case 'holiday': return '🎉'
      case 'meeting': return '🤝'
      default: return '📅'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-PK', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header with type color */}
      <div className={`h-2 ${getTypeColor(event.type).split(' ')[0]}`}></div>
      
      <div className="p-4">
        {/* Title and Type */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900">{event.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(event.type)}`}>
            {getTypeIcon(event.type)} {event.type}
          </span>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
        )}

        {/* Event Details */}
        <div className="space-y-2 text-sm mb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-lg">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-lg">⏰</span>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-lg">📍</span>
            <span>{event.venue}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          {onView && (
            <button
              onClick={() => onView(event.id)}
              className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded hover:bg-blue-100"
            >
              View
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(event.id)}
              className="flex-1 px-3 py-1.5 bg-yellow-50 text-yellow-600 text-sm rounded hover:bg-yellow-100"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(event.id)}
              className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded hover:bg-red-100"
            >
              Delete
            </button>
          )}
        </div>

        {/* View Details Link (if no actions) */}
        {!onView && !onEdit && !onDelete && (
          <Link
            href={`/dashboard/events/${event.id}`}
            className="block text-center mt-3 text-sm text-green-600 hover:text-green-700"
          >
            View Details →
          </Link>
        )}
      </div>
    </div>
  )
}

// ============================================
// COMPACT EVENT CARD
// ============================================

export function CompactEventCard({ 
  event = DEFAULT_EVENT 
}: { 
  event?: Event 
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm">
      <div className="flex items-center gap-3">
        {/* Date Box */}
        <div className="w-12 h-12 bg-green-100 rounded-lg flex flex-col items-center justify-center text-green-600">
          <span className="text-xs font-medium">
            {new Date(event.date).toLocaleDateString('en-PK', { month: 'short' })}
          </span>
          <span className="text-lg font-bold">
            {new Date(event.date).getDate()}
          </span>
        </div>

        {/* Event Info */}
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{event.title}</h4>
          <p className="text-xs text-gray-500">{event.time} • {event.venue}</p>
        </div>

        {/* Type Icon */}
        <div className="text-2xl opacity-50">📅</div>
      </div>
    </div>
  )
}

// ============================================
// MINIMAL EVENT CARD
// ============================================

export function MinimalEventCard({ 
  title = 'Sports Gala',
  date = 'Mar 15',
  time = '09:00 AM'
}: { 
  title?: string
  date?: string
  time?: string
}) {
  return (
    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
      <div className="w-10 h-10 bg-green-100 rounded flex flex-col items-center justify-center text-green-600">
        <span className="text-xs">{date.split(' ')[0]}</span>
        <span className="text-sm font-bold">{date.split(' ')[1]}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}

// ============================================
// EVENT GRID (Multiple Cards)
// ============================================

export function EventGrid() {
  const events: Event[] = [
    {
      id: '1',
      title: 'Sports Gala 2024',
      date: '2024-03-15',
      time: '09:00 AM',
      venue: 'Sports Ground',
      type: 'sports'
    },
    {
      id: '2',
      title: 'Parent-Teacher Meeting',
      date: '2024-03-10',
      time: '02:00 PM',
      venue: 'Auditorium',
      type: 'meeting'
    },
    {
      id: '3',
      title: 'Independence Day',
      date: '2024-03-23',
      time: '08:00 AM',
      venue: 'Main Ground',
      type: 'cultural'
    },
    {
      id: '4',
      title: 'Science Exhibition',
      date: '2024-04-05',
      time: '10:00 AM',
      venue: 'Science Lab',
      type: 'academic'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

// ============================================
// UPCOMING EVENTS LIST
// ============================================

export function UpcomingEvents() {
  const events = [
    { id: '1', title: 'Sports Gala', date: 'Mar 15', time: '9:00 AM' },
    { id: '2', title: 'Parent Meeting', date: 'Mar 10', time: '2:00 PM' },
    { id: '3', title: 'Holiday', date: 'Mar 23', time: 'All Day' },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium mb-3">Upcoming Events</h3>
      <div className="space-y-2">
        {events.map(event => (
          <div key={event.id} className="flex justify-between items-center text-sm">
            <span className="text-gray-900">{event.title}</span>
            <span className="text-gray-400">{event.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// EVENT CARD SKELETON
// ============================================

export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="h-2 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 h-8 bg-gray-200 rounded"></div>
        <div className="flex-1 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export {
  
  
  
  
  
}