'use client'

import React, { useState } from 'react'

// ============================================
// SIMPLE EVENT CALENDAR
// ============================================

interface Event {
  id: number
  title: string
  date: number
  month: number
  year: number
  type?: 'academic' | 'sports' | 'cultural' | 'holiday'
}

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Sample events
  const events: Event[] = [
    { id: 1, title: 'Sports Gala', date: 15, month: 2, year: 2024, type: 'sports' },
    { id: 2, title: 'Parent Meeting', date: 10, month: 2, year: 2024, type: 'academic' },
    { id: 3, title: 'Independence Day', date: 23, month: 2, year: 2024, type: 'cultural' },
    { id: 4, title: 'Science Exhibition', date: 5, month: 3, year: 2024, type: 'academic' },
    { id: 5, title: 'Spring Holidays', date: 25, month: 2, year: 2024, type: 'holiday' },
  ]

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  // Previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
    setSelectedDate(null)
  }

  // Next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
    setSelectedDate(null)
  }

  // Get events for a specific date
  const getEventsForDate = (day: number) => {
    return events.filter(
      e => e.date === day && e.month === currentMonth && e.year === currentYear
    )
  }

  // Get event type color
  const getEventColor = (type?: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-600'
      case 'sports': return 'bg-green-100 text-green-600'
      case 'cultural': return 'bg-purple-100 text-purple-600'
      case 'holiday': return 'bg-yellow-100 text-yellow-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              ←
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square p-1"></div>
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dayEvents = getEventsForDate(day)
            const hasEvents = dayEvents.length > 0
            const isSelected = selectedDate === day

            return (
              <div
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`
                  aspect-square p-1 border rounded-lg cursor-pointer transition-all
                  ${hasEvents ? 'hover:shadow-md' : 'hover:bg-gray-50'}
                  ${isSelected ? 'ring-2 ring-green-500 border-green-500' : 'border-gray-200'}
                `}
              >
                <div className="h-full flex flex-col">
                  <span className="text-sm font-medium text-gray-700">{day}</span>
                  {hasEvents && (
                    <div className="mt-auto flex gap-0.5">
                      {dayEvents.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`}
                          title={event.title}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-xs text-gray-400">+{dayEvents.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Events List for Selected Date */}
      {selectedDate && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-800 mb-2">
            Events on {monthNames[currentMonth]} {selectedDate}
          </h3>
          {getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map(event => (
                <div
                  key={event.id}
                  className={`p-2 rounded-lg ${getEventColor(event.type)}`}
                >
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs opacity-75 capitalize">{event.type}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No events scheduled</p>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================
// MINI CALENDAR (Compact)
// ============================================

export function MiniCalendar() {
  const [currentDate] = useState(new Date())
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <h3 className="text-sm font-medium mb-2">
        {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}
      </h3>
      <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <div key={d} className="font-medium text-gray-400 py-1">{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`e-${i}`} className="py-1"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => (
          <div
            key={i + 1}
            className="py-1 hover:bg-gray-100 rounded cursor-pointer"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// SIMPLE EVENT LIST
// ============================================

export function SimpleEventList() {
  const events = [
    { id: 1, title: 'Sports Gala', date: 'Mar 15', type: 'sports' },
    { id: 2, title: 'Parent Meeting', date: 'Mar 10', type: 'academic' },
    { id: 3, title: 'Holiday', date: 'Mar 23', type: 'holiday' },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sports': return 'bg-green-100 text-green-600'
      case 'academic': return 'bg-blue-100 text-blue-600'
      case 'holiday': return 'bg-yellow-100 text-yellow-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium mb-3">Upcoming Events</h3>
      <div className="space-y-2">
        {events.map(event => (
          <div key={event.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
            <div className={`w-2 h-2 rounded-full ${getTypeColor(event.type)}`}></div>
            <span className="text-sm flex-1">{event.title}</span>
            <span className="text-xs text-gray-400">{event.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// EVENT CALENDAR SKELETON
// ============================================

export function EventCalendarSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {[1,2,3,4,5,6,7].map(i => (
          <div key={i} className="h-4 bg-gray-200 rounded"></div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export {
  
  
  
}