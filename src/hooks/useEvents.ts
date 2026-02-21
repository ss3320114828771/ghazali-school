'use client'

import { useState, useEffect, useCallback } from 'react'

// ============================================
// TYPES
// ============================================

export type EventType = 'academic' | 'sports' | 'cultural' | 'holiday' | 'meeting' | 'workshop' | 'competition' | 'other'
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'postponed'
export type EventPriority = 'low' | 'medium' | 'high'

export interface Event {
  id: string
  title: string
  description: string
  type: EventType
  priority: EventPriority
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  allDay: boolean
  venue: string
  organizer: string
  organizerContact?: string
  expectedAttendees?: number
  status: EventStatus
  featured: boolean
  image?: string
  createdAt: string
  updatedAt: string
}

export interface EventParticipant {
  id: string
  eventId: string
  name: string
  email?: string
  phone?: string
  role: 'organizer' | 'speaker' | 'participant' | 'volunteer' | 'guest'
  status: 'registered' | 'confirmed' | 'attended' | 'cancelled'
  registeredAt: string
}

export interface EventFilters {
  type?: EventType
  status?: EventStatus
  priority?: EventPriority
  fromDate?: string
  toDate?: string
  search?: string
  featured?: boolean
}

export interface EventStatistics {
  totalEvents: number
  upcomingEvents: number
  ongoingEvents: number
  completedEvents: number
  cancelledEvents: number
  byType: Record<EventType, number>
  byMonth: Record<string, number>
  totalParticipants: number
  averageAttendance: number
}

export interface UseEventsReturn {
  events: Event[]
  loading: boolean
  error: string | null
  getEvent: (id: string) => Event | undefined
  getUpcomingEvents: (limit?: number) => Event[]
  getOngoingEvents: () => Event[]
  getCompletedEvents: () => Event[]
  getFeaturedEvents: () => Event[]
  getEventsByType: (type: EventType) => Event[]
  getEventsByDate: (date: string) => Event[]
  getEventsByMonth: (month: number, year: number) => Event[]
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>
  updateEvent: (id: string, updates: Partial<Event>) => Promise<boolean>
  deleteEvent: (id: string) => Promise<boolean>
  refreshEvents: () => void
  searchEvents: (query: string) => Event[]
  filterEvents: (filters: EventFilters) => Event[]
  getEventParticipants: (eventId: string) => EventParticipant[]
  addParticipant: (participant: Omit<EventParticipant, 'id'>) => Promise<boolean>
  updateParticipantStatus: (id: string, status: EventParticipant['status']) => Promise<boolean>
  removeParticipant: (id: string) => Promise<boolean>
  getEventStatistics: () => EventStatistics
  getUpcomingReminders: (days?: number) => Event[]
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Sports Gala 2024',
    description: 'Annual sports competition with various games including cricket, football, athletics and more. All students are encouraged to participate.',
    type: 'sports',
    priority: 'high',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    startTime: '09:00',
    endTime: '17:00',
    allDay: false,
    venue: 'School Sports Ground',
    organizer: 'Sports Department',
    organizerContact: '0300-1234567',
    expectedAttendees: 500,
    status: 'upcoming',
    featured: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    description: 'Quarterly meeting with parents to discuss student progress and address concerns.',
    type: 'meeting',
    priority: 'high',
    startDate: '2024-03-10',
    endDate: '2024-03-10',
    startTime: '14:00',
    endTime: '17:00',
    allDay: false,
    venue: 'School Auditorium',
    organizer: 'Academic Department',
    organizerContact: '0300-2345678',
    expectedAttendees: 200,
    status: 'upcoming',
    featured: false,
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '3',
    title: 'Independence Day Celebration',
    description: 'Celebration of Pakistan Independence Day with flag hoisting, national songs, and cultural performances.',
    type: 'cultural',
    priority: 'high',
    startDate: '2024-03-23',
    endDate: '2024-03-23',
    startTime: '08:00',
    endTime: '12:00',
    allDay: false,
    venue: 'Main Ground',
    organizer: 'Cultural Committee',
    organizerContact: '0300-3456789',
    expectedAttendees: 1000,
    status: 'upcoming',
    featured: true,
    createdAt: '2024-02-10T11:45:00Z',
    updatedAt: '2024-02-10T11:45:00Z'
  },
  {
    id: '4',
    title: 'Science Exhibition',
    description: 'Students showcase their science projects and innovations. Includes robotics, chemistry experiments, and physics demonstrations.',
    type: 'academic',
    priority: 'medium',
    startDate: '2024-04-05',
    endDate: '2024-04-06',
    startTime: '10:00',
    endTime: '16:00',
    allDay: false,
    venue: 'Science Lab',
    organizer: 'Science Department',
    organizerContact: '0300-4567890',
    expectedAttendees: 300,
    status: 'upcoming',
    featured: true,
    createdAt: '2024-02-20T14:20:00Z',
    updatedAt: '2024-02-20T14:20:00Z'
  },
  {
    id: '5',
    title: 'Spring Holidays',
    description: 'Spring break holidays for all students and staff.',
    type: 'holiday',
    priority: 'low',
    startDate: '2024-03-25',
    endDate: '2024-04-01',
    allDay: true,
    venue: 'N/A',
    organizer: 'School Administration',
    expectedAttendees: 0,
    status: 'upcoming',
    featured: false,
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-05T08:00:00Z'
  },
  {
    id: '6',
    title: 'Career Counseling Workshop',
    description: 'Workshop for Class 10 students on career choices and future planning.',
    type: 'workshop',
    priority: 'medium',
    startDate: '2024-02-28',
    endDate: '2024-02-28',
    startTime: '10:00',
    endTime: '13:00',
    allDay: false,
    venue: 'Auditorium',
    organizer: 'Guidance Department',
    organizerContact: '0300-5678901',
    expectedAttendees: 150,
    status: 'completed',
    featured: false,
    createdAt: '2024-01-20T13:30:00Z',
    updatedAt: '2024-02-28T13:30:00Z'
  },
  {
    id: '7',
    title: 'Quran Competition',
    description: 'Annual Quran recitation and memorization competition.',
    type: 'cultural',
    priority: 'high',
    startDate: '2024-03-05',
    endDate: '2024-03-07',
    startTime: '09:00',
    endTime: '16:00',
    allDay: false,
    venue: 'School Mosque',
    organizer: 'Islamic Studies Department',
    organizerContact: '0300-6789012',
    expectedAttendees: 200,
    status: 'ongoing',
    featured: true,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-05T09:00:00Z'
  }
]

const MOCK_PARTICIPANTS: EventParticipant[] = [
  {
    id: 'p1',
    eventId: '1',
    name: 'Ali Ahmed',
    email: 'ali.ahmed@student.edu.pk',
    phone: '0300-1234567',
    role: 'participant',
    status: 'registered',
    registeredAt: '2024-02-15T10:30:00Z'
  },
  {
    id: 'p2',
    eventId: '1',
    name: 'Bilal Hassan',
    email: 'bilal.hassan@student.edu.pk',
    phone: '0300-2345678',
    role: 'participant',
    status: 'confirmed',
    registeredAt: '2024-02-16T14:20:00Z'
  },
  {
    id: 'p3',
    eventId: '1',
    name: 'Prof. Ahmad Raza',
    email: 'ahmad.raza@teacher.edu.pk',
    phone: '0300-3456789',
    role: 'organizer',
    status: 'confirmed',
    registeredAt: '2024-02-10T09:00:00Z'
  },
  {
    id: 'p4',
    eventId: '3',
    name: 'Sara Fatima',
    email: 'sara.fatima@student.edu.pk',
    phone: '0300-4567890',
    role: 'participant',
    status: 'registered',
    registeredAt: '2024-03-01T11:45:00Z'
  },
  {
    id: 'p5',
    eventId: '7',
    name: 'Hafiz Usman',
    email: 'usman@student.edu.pk',
    phone: '0300-5678901',
    role: 'participant',
    status: 'attended',
    registeredAt: '2024-02-20T08:30:00Z'
  }
]

// ============================================
// MAIN HOOK
// ============================================

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([])
  const [participants, setParticipants] = useState<EventParticipant[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Load data on mount
  useEffect(() => {
    loadEvents()
    loadParticipants()
  }, [])

  // Load events
  const loadEvents = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setEvents(MOCK_EVENTS)
    } catch (err) {
      setError('Failed to load events')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Load participants
  const loadParticipants = async (): Promise<void> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      setParticipants(MOCK_PARTICIPANTS)
    } catch (err) {
      console.error('Failed to load participants', err)
    }
  }

  // Get single event by ID
  const getEvent = (id: string): Event | undefined => {
    return events.find(event => event.id === id)
  }

  // Get upcoming events
  const getUpcomingEvents = (limit?: number): Event[] => {
    const today = new Date().toISOString().split('T')[0]
    const upcoming = events
      .filter(event => event.startDate >= today && event.status === 'upcoming')
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
    
    return limit ? upcoming.slice(0, limit) : upcoming
  }

  // Get ongoing events
  const getOngoingEvents = (): Event[] => {
    const today = new Date().toISOString().split('T')[0]
    return events.filter(event => 
      event.startDate <= today && 
      event.endDate >= today && 
      event.status === 'ongoing'
    )
  }

  // Get completed events
  const getCompletedEvents = (): Event[] => {
    const today = new Date().toISOString().split('T')[0]
    return events.filter(event => event.endDate < today || event.status === 'completed')
  }

  // Get featured events
  const getFeaturedEvents = (): Event[] => {
    return events.filter(event => event.featured === true)
  }

  // Get events by type
  const getEventsByType = (type: EventType): Event[] => {
    return events.filter(event => event.type === type)
  }

  // Get events by date
  const getEventsByDate = (date: string): Event[] => {
    return events.filter(event => 
      event.startDate <= date && event.endDate >= date
    )
  }

  // Get events by month
  const getEventsByMonth = (month: number, year: number): Event[] => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate)
      return eventDate.getMonth() + 1 === month && eventDate.getFullYear() === year
    })
  }

  // Add new event
  const addEvent = async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> => {
    try {
      setLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const now = new Date().toISOString()
      const newEvent: Event = {
        ...event,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      }
      
      setEvents(prev => [...prev, newEvent])
      return true
    } catch (err) {
      setError('Failed to add event')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Update existing event
  const updateEvent = async (id: string, updates: Partial<Event>): Promise<boolean> => {
    try {
      setLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setEvents(prev => 
        prev.map(event => 
          event.id === id 
            ? { 
                ...event, 
                ...updates, 
                updatedAt: new Date().toISOString() 
              } 
            : event
        )
      )
      
      return true
    } catch (err) {
      setError('Failed to update event')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete event
  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setEvents(prev => prev.filter(event => event.id !== id))
      // Also delete associated participants
      setParticipants(prev => prev.filter(p => p.eventId !== id))
      
      return true
    } catch (err) {
      setError('Failed to delete event')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Refresh events
  const refreshEvents = (): void => {
    loadEvents()
  }

  // Search events
  const searchEvents = (query: string): Event[] => {
    if (!query.trim()) return events
    
    const lowerQuery = query.toLowerCase()
    
    return events.filter(event => 
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description.toLowerCase().includes(lowerQuery) ||
      event.venue.toLowerCase().includes(lowerQuery) ||
      event.organizer.toLowerCase().includes(lowerQuery)
    )
  }

  // Filter events
  const filterEvents = useCallback((filters: EventFilters): Event[] => {
    return events.filter(event => {
      if (filters.type && event.type !== filters.type) return false
      if (filters.status && event.status !== filters.status) return false
      if (filters.priority && event.priority !== filters.priority) return false
      if (filters.featured !== undefined && event.featured !== filters.featured) return false
      if (filters.fromDate && event.endDate < filters.fromDate) return false
      if (filters.toDate && event.startDate > filters.toDate) return false
      if (filters.search) {
        const search = filters.search.toLowerCase()
        return (
          event.title.toLowerCase().includes(search) ||
          event.description.toLowerCase().includes(search) ||
          event.venue.toLowerCase().includes(search)
        )
      }
      return true
    })
  }, [events])

  // Get event participants
  const getEventParticipants = (eventId: string): EventParticipant[] => {
    return participants.filter(p => p.eventId === eventId)
  }

  // Add participant
  const addParticipant = async (participant: Omit<EventParticipant, 'id'>): Promise<boolean> => {
    try {
      const newParticipant: EventParticipant = {
        ...participant,
        id: `p${Date.now()}`
      }
      
      setParticipants(prev => [...prev, newParticipant])
      return true
    } catch (err) {
      console.error('Failed to add participant', err)
      return false
    }
  }

  // Update participant status
  const updateParticipantStatus = async (id: string, status: EventParticipant['status']): Promise<boolean> => {
    try {
      setParticipants(prev => 
        prev.map(p => p.id === id ? { ...p, status } : p)
      )
      return true
    } catch (err) {
      console.error('Failed to update participant', err)
      return false
    }
  }

  // Remove participant
  const removeParticipant = async (id: string): Promise<boolean> => {
    try {
      setParticipants(prev => prev.filter(p => p.id !== id))
      return true
    } catch (err) {
      console.error('Failed to remove participant', err)
      return false
    }
  }

  // Get event statistics
  const getEventStatistics = (): EventStatistics => {
    const today = new Date().toISOString().split('T')[0]
    
    const upcomingEvents = events.filter(e => e.startDate > today && e.status === 'upcoming').length
    const ongoingEvents = events.filter(e => 
      e.startDate <= today && e.endDate >= today && e.status === 'ongoing'
    ).length
    const completedEvents = events.filter(e => e.endDate < today || e.status === 'completed').length
    const cancelledEvents = events.filter(e => e.status === 'cancelled').length

    // By type
    const byType = {} as Record<EventType, number>
    events.forEach(event => {
      byType[event.type] = (byType[event.type] || 0) + 1
    })

    // By month
    const byMonth: Record<string, number> = {}
    events.forEach(event => {
      const month = new Date(event.startDate).toLocaleString('default', { month: 'long' })
      byMonth[month] = (byMonth[month] || 0) + 1
    })

    // Total participants
    const totalParticipants = participants.length
    
    // Average attendance (for completed events)
    const completedWithAttendance = events.filter(e => 
      (e.endDate < today || e.status === 'completed') && e.expectedAttendees && e.expectedAttendees > 0
    )
    const avgAttendance = completedWithAttendance.length > 0
      ? completedWithAttendance.reduce((sum, e) => sum + (e.expectedAttendees || 0), 0) / completedWithAttendance.length
      : 0

    return {
      totalEvents: events.length,
      upcomingEvents,
      ongoingEvents,
      completedEvents,
      cancelledEvents,
      byType,
      byMonth,
      totalParticipants,
      averageAttendance: avgAttendance
    }
  }

  // Get upcoming reminders
  const getUpcomingReminders = (days: number = 3): Event[] => {
    const today = new Date()
    const reminderDate = new Date(today)
    reminderDate.setDate(today.getDate() + days)
    
    const reminderDateStr = reminderDate.toISOString().split('T')[0]
    const todayStr = today.toISOString().split('T')[0]
    
    return events
      .filter(event => 
        event.startDate >= todayStr && 
        event.startDate <= reminderDateStr &&
        event.status === 'upcoming'
      )
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
  }

  return {
    events,
    loading,
    error,
    getEvent,
    getUpcomingEvents,
    getOngoingEvents,
    getCompletedEvents,
    getFeaturedEvents,
    getEventsByType,
    getEventsByDate,
    getEventsByMonth,
    addEvent,
    updateEvent,
    deleteEvent,
    refreshEvents,
    searchEvents,
    filterEvents,
    getEventParticipants,
    addParticipant,
    updateParticipantStatus,
    removeParticipant,
    getEventStatistics,
    getUpcomingReminders
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function formatEventDate(event: Event): string {
  const start = new Date(event.startDate)
  const end = new Date(event.endDate)
  
  if (event.allDay) {
    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-PK', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    } else {
      return `${start.toLocaleDateString('en-PK', { 
        day: 'numeric', 
        month: 'long' 
      })} - ${end.toLocaleDateString('en-PK', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })}`
    }
  } else {
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString('en-PK', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })} • ${event.startTime} - ${event.endTime}`
    } else {
      return `${start.toLocaleDateString('en-PK', { 
        day: 'numeric', 
        month: 'long' 
      })} ${event.startTime} - ${end.toLocaleDateString('en-PK', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })} ${event.endTime}`
    }
  }
}

export function getEventStatusColor(status: EventStatus): string {
  const colors: Record<EventStatus, string> = {
    upcoming: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800',
    postponed: 'bg-yellow-100 text-yellow-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function getEventTypeColor(type: EventType): string {
  const colors: Record<EventType, string> = {
    academic: 'bg-indigo-100 text-indigo-800',
    sports: 'bg-green-100 text-green-800',
    cultural: 'bg-purple-100 text-purple-800',
    holiday: 'bg-yellow-100 text-yellow-800',
    meeting: 'bg-blue-100 text-blue-800',
    workshop: 'bg-orange-100 text-orange-800',
    competition: 'bg-red-100 text-red-800',
    other: 'bg-gray-100 text-gray-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

export function getPriorityColor(priority: EventPriority): string {
  const colors: Record<EventPriority, string> = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

export function getParticipantStatusColor(status: EventParticipant['status']): string {
  const colors: Record<EventParticipant['status'], string> = {
    registered: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    attended: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function validateEventForm(data: Partial<Event>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!data.title) errors.title = 'Event title is required'
  if (!data.description) errors.description = 'Description is required'
  if (!data.type) errors.type = 'Event type is required'
  if (!data.startDate) errors.startDate = 'Start date is required'
  if (!data.endDate) errors.endDate = 'End date is required'
  if (!data.venue) errors.venue = 'Venue is required'
  if (!data.organizer) errors.organizer = 'Organizer is required'

  if (data.startDate && data.endDate && data.startDate > data.endDate) {
    errors.endDate = 'End date must be after start date'
  }

  if (!data.allDay) {
    if (!data.startTime) errors.startTime = 'Start time is required'
    if (!data.endTime) errors.endTime = 'End time is required'
    
    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
      errors.endTime = 'End time must be after start time'
    }
  }

  return errors
}

export function isEventToday(event: Event): boolean {
  const today = new Date().toISOString().split('T')[0]
  return event.startDate <= today && event.endDate >= today
}

export function isEventUpcoming(event: Event): boolean {
  const today = new Date().toISOString().split('T')[0]
  return event.startDate > today
}

export function isEventPast(event: Event): boolean {
  const today = new Date().toISOString().split('T')[0]
  return event.endDate < today
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default useEvents