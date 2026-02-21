// ============================================
// MAIN EVENT INTERFACES
// ============================================

export interface Event {
  id: string
  title: string
  description: string
  shortDescription?: string
  type: EventType
  category: EventCategory
  priority: EventPriority
  startDate: Date | string
  endDate: Date | string
  startTime?: string
  endTime?: string
  allDay: boolean
  venue: string
  location?: string
  organizer: string
  organizerContact?: string
  organizerEmail?: string
  expectedAttendees?: number
  actualAttendees?: number
  status: EventStatus
  visibility: EventVisibility
  recurring: boolean
  recurrencePattern?: RecurrencePattern
  banner?: string
  gallery?: string[]
  attachments?: EventAttachment[]
  tags?: string[]
  remarks?: string
  createdBy: string
  createdAt: Date | string
  updatedAt: Date | string
  publishedAt?: Date | string
  featured: boolean
}

export type EventType = 
  | 'academic' 
  | 'sports' 
  | 'cultural' 
  | 'holiday' 
  | 'meeting' 
  | 'workshop' 
  | 'seminar' 
  | 'competition' 
  | 'celebration' 
  | 'parent-teacher' 
  | 'training' 
  | 'field trip' 
  | 'examination' 
  | 'admission' 
  | 'orientation' 
  | 'farewell' 
  | 'annual day' 
  | 'sports gala' 
  | 'science exhibition' 
  | 'art exhibition' 
  | 'quran competition' 
  | 'speech contest' 
  | 'other'

export type EventCategory = 
  | 'school-wide' 
  | 'class' 
  | 'department' 
  | 'club' 
  | 'sports team' 
  | 'staff' 
  | 'students' 
  | 'parents' 
  | 'teachers' 
  | 'community'

export type EventPriority = 'low' | 'medium' | 'high' | 'urgent'

export type EventStatus = 
  | 'draft' 
  | 'published' 
  | 'ongoing' 
  | 'completed' 
  | 'cancelled' 
  | 'postponed' 
  | 'rescheduled'

export type EventVisibility = 
  | 'public' 
  | 'students' 
  | 'teachers' 
  | 'parents' 
  | 'staff' 
  | 'private' 
  | 'specific-classes'

// ============================================
// RECURRENCE PATTERNS
// ============================================

export interface RecurrencePattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  endType: 'never' | 'after' | 'on'
  endAfter?: number
  endDate?: Date | string
  weekDays?: WeekDay[]
  monthDay?: number
  monthWeek?: number
  exceptions?: Date[] | string[]
}

export type WeekDay = 
  | 'monday' 
  | 'tuesday' 
  | 'wednesday' 
  | 'thursday' 
  | 'friday' 
  | 'saturday' 
  | 'sunday'

// ============================================
// EVENT ATTACHMENTS
// ============================================

export interface EventAttachment {
  id: string
  name: string
  type: AttachmentType
  url: string
  size?: number
  uploadedAt: Date | string
}

export type AttachmentType = 
  | 'image' 
  | 'document' 
  | 'video' 
  | 'audio' 
  | 'presentation' 
  | 'spreadsheet' 
  | 'other'

// ============================================
// EVENT PARTICIPANTS
// ============================================

export interface EventParticipant {
  id: string
  eventId: string
  userId?: string
  name: string
  role: ParticipantRole
  class?: string
  section?: string
  contact?: string
  email?: string
  status: ParticipantStatus
  registeredAt: Date | string
  attended: boolean
  attendanceMarkedAt?: Date | string
  remarks?: string
}

export type ParticipantRole = 
  | 'organizer' 
  | 'speaker' 
  | 'guest' 
  | 'participant' 
  | 'volunteer' 
  | 'staff' 
  | 'student' 
  | 'teacher' 
  | 'parent' 
  | 'chief guest'

export type ParticipantStatus = 
  | 'registered' 
  | 'confirmed' 
  | 'waitlisted' 
  | 'cancelled' 
  | 'no-show' 
  | 'attended'

// ============================================
// EVENT SCHEDULE/AGENDA
// ============================================

export interface EventAgenda {
  id: string
  eventId: string
  title: string
  description?: string
  startTime: string
  endTime: string
  speaker?: string
  venue?: string
  materials?: EventAttachment[]
}

// ============================================
// EVENT FEEDBACK
// ============================================

export interface EventFeedback {
  id: string
  eventId: string
  participantId: string
  participantName: string
  rating: number // 1-5
  comments?: string
  suggestions?: string
  submittedAt: Date | string
  categories: FeedbackCategory[]
}

export interface FeedbackCategory {
  name: string
  rating: number
  comment?: string
}

// ============================================
// EVENT BUDGET
// ============================================

export interface EventBudget {
  id: string
  eventId: string
  estimatedTotal: number
  actualTotal: number
  items: BudgetItem[]
  approvedBy?: string
  approvedAt?: Date | string
  remarks?: string
}

export interface BudgetItem {
  id: string
  description: string
  category: BudgetCategory
  estimatedAmount: number
  actualAmount?: number
  paidTo?: string
  paymentStatus: PaymentStatus
  paymentDate?: Date | string
  receipt?: string
  remarks?: string
}

export type BudgetCategory = 
  | 'venue' 
  | 'catering' 
  | 'decoration' 
  | 'sound' 
  | 'lighting' 
  | 'photography' 
  | 'videography' 
  | 'prizes' 
  | 'gifts' 
  | 'transport' 
  | 'accommodation' 
  | 'marketing' 
  | 'printing' 
  | 'stationery' 
  | 'refreshments' 
  | 'entertainment' 
  | 'security' 
  | 'medical' 
  | 'miscellaneous'

export type PaymentStatus = 'pending' | 'partial' | 'paid' | 'cancelled'

// ============================================
// EVENT REMINDER
// ============================================

export interface EventReminder {
  id: string
  eventId: string
  type: ReminderType
  sendTo: ReminderRecipient[]
  sendBefore: number // minutes before event
  message: string
  subject?: string
  status: ReminderStatus
  sentAt?: Date | string
  createdBy: string
}

export type ReminderType = 'email' | 'sms' | 'notification' | 'whatsapp'
export type ReminderRecipient = 'organizers' | 'participants' | 'staff' | 'teachers' | 'students' | 'parents'
export type ReminderStatus = 'pending' | 'sent' | 'failed' | 'cancelled'

// ============================================
// EVENT TASK
// ============================================

export interface EventTask {
  id: string
  eventId: string
  title: string
  description?: string
  assignedTo: string[]
  deadline: Date | string
  priority: EventPriority
  status: TaskStatus
  completedAt?: Date | string
  remarks?: string
  createdAt: Date | string
  updatedAt: Date | string
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue' | 'cancelled'

// ============================================
// EVENT REGISTRATION
// ============================================

export interface EventRegistration {
  id: string
  eventId: string
  eventName: string
  participantId: string
  participantName: string
  participantType: ParticipantRole
  class?: string
  section?: string
  email?: string
  phone?: string
  registeredAt: Date | string
  paymentRequired: boolean
  paymentStatus?: PaymentStatus
  paymentAmount?: number
  transactionId?: string
  qrCode?: string
  checkInStatus: boolean
  checkInTime?: Date | string
  attended: boolean
  certificateIssued: boolean
  certificateUrl?: string
  remarks?: string
}

// ============================================
// EVENT CERTIFICATE
// ============================================

export interface EventCertificate {
  id: string
  eventId: string
  eventName: string
  participantId: string
  participantName: string
  participantRole: string
  certificateNumber: string
  issueDate: Date | string
  template: string
  signedBy: string
  signatureUrl?: string
  qrCode?: string
  pdfUrl?: string
  verified: boolean
}

// ============================================
// EVENT STATISTICS
// ============================================

export interface EventStatistics {
  eventId: string
  eventName: string
  totalRegistrations: number
  confirmedRegistrations: number
  waitlistedRegistrations: number
  cancelledRegistrations: number
  actualAttendees: number
  attendanceRate: number
  feedbackCount: number
  averageRating: number
  budgetVariance: number
  taskCompletionRate: number
  byParticipantType: Record<ParticipantRole, number>
  byClass?: Record<string, number>
  dailyStats?: DailyEventStats[]
}

export interface DailyEventStats {
  date: Date | string
  registrations: number
  attendance: number
  feedback: number
}

// ============================================
// EVENT CALENDAR
// ============================================

export interface EventCalendar {
  id: string
  month: number
  year: number
  events: CalendarEvent[]
  holidays: Holiday[]
  importantDates: ImportantDate[]
}

export interface CalendarEvent {
  date: number
  events: Event[]
}

export interface Holiday {
  date: string
  name: string
  description?: string
  isOptional: boolean
}

export interface ImportantDate {
  date: string
  title: string
  description?: string
  type: 'exam' | 'admission' | 'result' | 'meeting' | 'other'
}

// ============================================
// EVENT FILTERS AND QUERIES
// ============================================

export interface EventFilters {
  type?: EventType
  category?: EventCategory
  status?: EventStatus
  visibility?: EventVisibility
  priority?: EventPriority
  fromDate?: Date | string
  toDate?: Date | string
  search?: string
  tags?: string[]
  featured?: boolean
  organizer?: string
  venue?: string
  page?: number
  limit?: number
  sortBy?: keyof Event
  sortOrder?: 'asc' | 'desc'
}

export interface ParticipantFilters {
  role?: ParticipantRole
  status?: ParticipantStatus
  attended?: boolean
  class?: string
  section?: string
  search?: string
  page?: number
  limit?: number
}

// ============================================
// EVENT LIST RESPONSES
// ============================================

export interface EventListResponse {
  events: Event[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
  stats?: EventOverviewStats
}

export interface EventOverviewStats {
  totalEvents: number
  upcomingEvents: number
  ongoingEvents: number
  completedEvents: number
  cancelledEvents: number
  byType: Record<EventType, number>
  byMonth: Record<string, number>
  featuredEvents: number
}

export interface ParticipantListResponse {
  participants: EventParticipant[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
  stats?: ParticipantStats
}

export interface ParticipantStats {
  total: number
  confirmed: number
  waitlisted: number
  attended: number
  byRole: Record<ParticipantRole, number>
  byClass: Record<string, number>
}

// ============================================
// EVENT FORM DATA
// ============================================

export interface EventFormData {
  title: string
  description: string
  shortDescription?: string
  type: EventType
  category: EventCategory
  priority: EventPriority
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  allDay: boolean
  venue: string
  location?: string
  organizer: string
  organizerContact?: string
  organizerEmail?: string
  expectedAttendees?: number
  visibility: EventVisibility
  recurring: boolean
  recurrencePattern?: RecurrencePatternInput
  tags?: string[]
  featured: boolean
}

export interface RecurrencePatternInput {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  endType: 'never' | 'after' | 'on'
  endAfter?: number
  endDate?: string
  weekDays?: WeekDay[]
  monthDay?: number
}

// ============================================
// TYPE GUARDS
// ============================================

export const isEventOngoing = (event: Event): boolean => {
  const now = new Date()
  const start = new Date(event.startDate)
  const end = new Date(event.endDate)
  return now >= start && now <= end && event.status === 'ongoing'
}

export const isEventUpcoming = (event: Event): boolean => {
  const now = new Date()
  const start = new Date(event.startDate)
  return now < start && event.status === 'published'
}

export const isEventCompleted = (event: Event): boolean => {
  const now = new Date()
  const end = new Date(event.endDate)
  return now > end || event.status === 'completed'
}

export const isEventCancelled = (event: Event): boolean => {
  return event.status === 'cancelled'
}

export const isEventPublic = (event: Event): boolean => {
  return event.visibility === 'public'
}

export const isEventRecurring = (event: Event): boolean => {
  return event.recurring === true
}

export const isParticipantRegistered = (participant: EventParticipant): boolean => {
  return participant.status === 'registered' || participant.status === 'confirmed'
}

export const hasAttended = (participant: EventParticipant): boolean => {
  return participant.attended === true
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const getEventDuration = (event: Event): number => {
  const start = new Date(event.startDate)
  const end = new Date(event.endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays + 1
}

export const getEventStatusBadgeColor = (status: EventStatus): string => {
  switch (status) {
    case 'draft': return 'bg-gray-500/20 text-gray-300'
    case 'published': return 'bg-blue-500/20 text-blue-300'
    case 'ongoing': return 'bg-green-500/20 text-green-300'
    case 'completed': return 'bg-purple-500/20 text-purple-300'
    case 'cancelled': return 'bg-red-500/20 text-red-300'
    case 'postponed': return 'bg-yellow-500/20 text-yellow-300'
    case 'rescheduled': return 'bg-orange-500/20 text-orange-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getEventTypeBadgeColor = (type: EventType): string => {
  switch (type) {
    case 'academic': return 'bg-blue-500/20 text-blue-300'
    case 'sports': return 'bg-green-500/20 text-green-300'
    case 'cultural': return 'bg-purple-500/20 text-purple-300'
    case 'holiday': return 'bg-yellow-500/20 text-yellow-300'
    case 'meeting': return 'bg-orange-500/20 text-orange-300'
    case 'workshop': return 'bg-pink-500/20 text-pink-300'
    case 'seminar': return 'bg-indigo-500/20 text-indigo-300'
    case 'competition': return 'bg-red-500/20 text-red-300'
    case 'celebration': return 'bg-amber-500/20 text-amber-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getEventPriorityBadgeColor = (priority: EventPriority): string => {
  switch (priority) {
    case 'low': return 'bg-blue-500/20 text-blue-300'
    case 'medium': return 'bg-green-500/20 text-green-300'
    case 'high': return 'bg-yellow-500/20 text-yellow-300'
    case 'urgent': return 'bg-red-500/20 text-red-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getParticipantStatusBadgeColor = (status: ParticipantStatus): string => {
  switch (status) {
    case 'registered': return 'bg-blue-500/20 text-blue-300'
    case 'confirmed': return 'bg-green-500/20 text-green-300'
    case 'waitlisted': return 'bg-yellow-500/20 text-yellow-300'
    case 'cancelled': return 'bg-red-500/20 text-red-300'
    case 'no-show': return 'bg-orange-500/20 text-orange-300'
    case 'attended': return 'bg-purple-500/20 text-purple-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const calculateAttendanceRate = (event: Event, participants: EventParticipant[]): number => {
  if (participants.length === 0) return 0
  const attended = participants.filter(p => p.attended).length
  return (attended / participants.length) * 100
}

export const calculateAverageRating = (feedback: EventFeedback[]): number => {
  if (feedback.length === 0) return 0
  const total = feedback.reduce((sum, f) => sum + f.rating, 0)
  return total / feedback.length
}

export const getUpcomingEvents = (events: Event[], limit: number = 5): Event[] => {
  const now = new Date()
  return events
    .filter(e => new Date(e.startDate) > now && e.status !== 'cancelled')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit)
}

export const getEventsByMonth = (events: Event[], month: number, year: number): Event[] => {
  return events.filter(e => {
    const date = new Date(e.startDate)
    return date.getMonth() + 1 === month && date.getFullYear() === year
  })
}

export const formatEventDate = (event: Event): string => {
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

// ============================================
// CONSTANTS
// ============================================

export const EVENT_TYPES: EventType[] = [
  'academic', 'sports', 'cultural', 'holiday', 'meeting', 'workshop',
  'seminar', 'competition', 'celebration', 'parent-teacher', 'training',
  'field trip', 'examination', 'admission', 'orientation', 'farewell',
  'annual day', 'sports gala', 'science exhibition', 'art exhibition',
  'quran competition', 'speech contest', 'other'
]

export const EVENT_CATEGORIES: EventCategory[] = [
  'school-wide', 'class', 'department', 'club', 'sports team', 'staff',
  'students', 'parents', 'teachers', 'community'
]

export const EVENT_PRIORITIES: EventPriority[] = ['low', 'medium', 'high', 'urgent']

export const EVENT_STATUSES: EventStatus[] = [
  'draft', 'published', 'ongoing', 'completed', 'cancelled', 'postponed', 'rescheduled'
]

export const EVENT_VISIBILITIES: EventVisibility[] = [
  'public', 'students', 'teachers', 'parents', 'staff', 'private', 'specific-classes'
]

export const PARTICIPANT_ROLES: ParticipantRole[] = [
  'organizer', 'speaker', 'guest', 'participant', 'volunteer', 'staff',
  'student', 'teacher', 'parent', 'chief guest'
]

export const PARTICIPANT_STATUSES: ParticipantStatus[] = [
  'registered', 'confirmed', 'waitlisted', 'cancelled', 'no-show', 'attended'
]

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  'venue', 'catering', 'decoration', 'sound', 'lighting', 'photography',
  'videography', 'prizes', 'gifts', 'transport', 'accommodation', 'marketing',
  'printing', 'stationery', 'refreshments', 'entertainment', 'security',
  'medical', 'miscellaneous'
]

export const WEEK_DAYS: WeekDay[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
]

// ============================================
// MOCK DATA CREATORS (for development)
// ============================================

export const createMockEvent = (overrides?: Partial<Event>): Event => {
  const now = new Date()
  const startDate = new Date(now.setDate(now.getDate() + 7))
  const endDate = new Date(now.setDate(now.getDate() + 1))
  
  return {
    id: `event-${Date.now()}`,
    title: 'Annual Sports Gala 2024',
    description: 'Annual sports competition with various games including cricket, football, athletics, and more. All students are encouraged to participate.',
    shortDescription: 'Annual sports competition',
    type: 'sports',
    category: 'school-wide',
    priority: 'high',
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    allDay: false,
    venue: 'School Sports Ground',
    location: 'Main Ground',
    organizer: 'Sports Department',
    organizerContact: '0300-1234567',
    organizerEmail: 'sports@ghazali.edu.pk',
    expectedAttendees: 500,
    status: 'published',
    visibility: 'public',
    recurring: false,
    tags: ['sports', 'annual', 'competition'],
    featured: true,
    createdBy: 'admin-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}

export const createMockParticipant = (
  eventId: string,
  overrides?: Partial<EventParticipant>
): EventParticipant => {
  return {
    id: `participant-${Date.now()}`,
    eventId,
    name: 'Ali Ahmed',
    role: 'student',
    class: '10',
    section: 'A',
    contact: '0300-1234567',
    email: 'ali.ahmed@student.edu.pk',
    status: 'confirmed',
    registeredAt: new Date(),
    attended: false,
    ...overrides
  }
}

export const createMockFeedback = (
  eventId: string,
  participantId: string,
  overrides?: Partial<EventFeedback>
): EventFeedback => {
  return {
    id: `feedback-${Date.now()}`,
    eventId,
    participantId,
    participantName: 'Ali Ahmed',
    rating: 4.5,
    comments: 'Great event! Very well organized.',
    submittedAt: new Date(),
    categories: [
      { name: 'Organization', rating: 4 },
      { name: 'Content', rating: 5 },
      { name: 'Venue', rating: 4 }
    ],
    ...overrides
  }
}

// ============================================
// EVENT REMINDER FUNCTIONS
// ============================================

export const shouldSendReminder = (
  event: Event,
  reminder: EventReminder,
  currentTime: Date = new Date()
): boolean => {
  if (reminder.status !== 'pending') return false
  
  const eventTime = new Date(event.startDate)
  if (event.startTime) {
    const [hours, minutes] = event.startTime.split(':')
    eventTime.setHours(parseInt(hours), parseInt(minutes))
  }
  
  const reminderTime = new Date(eventTime.getTime() - reminder.sendBefore * 60000)
  return currentTime >= reminderTime
}

export const getReminderMessage = (event: Event, reminder: EventReminder): string => {
  const minutes = reminder.sendBefore
  let timeText = ''
  
  if (minutes < 60) {
    timeText = `${minutes} minute${minutes > 1 ? 's' : ''}`
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60)
    timeText = `${hours} hour${hours > 1 ? 's' : ''}`
  } else {
    const days = Math.floor(minutes / 1440)
    timeText = `${days} day${days > 1 ? 's' : ''}`
  }
  
  return reminder.message || 
    `Reminder: ${event.title} starts in ${timeText} at ${event.venue} on ${formatEventDate(event)}`
}