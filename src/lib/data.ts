/* ============================================
   DATA.TS - Simplified Mock Data
   ============================================ */

// ============================================
// SCHOOL INFO
// ============================================

export const SCHOOL_INFO = {
  name: 'Ghazali High School',
  principal: 'Hafiz Sajid Syed',
  contact: '0308-4591993',
  address: 'Adlana, Tehsil Bhawana, District Chiniot',
  email: 'info@ghazalihigh.edu.pk',
  established: 1995
}

// ============================================
// STATISTICS
// ============================================

export const STATISTICS = {
  students: 1234,
  teachers: 85,
  classes: 30,
  staff: 45,
  boys: 650,
  girls: 584,
  attendance: 92.5,
  passRate: 88.7
}

// ============================================
// STUDENTS
// ============================================

export interface Student {
  id: string
  name: string
  rollNo: string
  class: string
  section: string
  fatherName: string
}

export const STUDENTS = [
  { id: '1', name: 'Ali Ahmed', rollNo: '101', class: '10', section: 'A', fatherName: 'Ahmed Khan' },
  { id: '2', name: 'Bilal Hassan', rollNo: '102', class: '10', section: 'A', fatherName: 'Hassan Ali' },
  { id: '3', name: 'Sara Fatima', rollNo: '201', class: '9', section: 'B', fatherName: 'Mohammad Ali' },
  { id: '4', name: 'Zainab Bibi', rollNo: '202', class: '9', section: 'B', fatherName: 'Usman Khan' },
  { id: '5', name: 'Hamza Ali', rollNo: '301', class: '8', section: 'A', fatherName: 'Ali Raza' }
]

// ============================================
// TEACHERS
// ============================================

export interface Teacher {
  id: string
  name: string
  subject: string
  experience: string
}

export const TEACHERS = [
  { id: '1', name: 'Prof. Ahmad Raza', subject: 'Mathematics', experience: '10 years' },
  { id: '2', name: 'Mrs. Fatima Hassan', subject: 'English', experience: '8 years' },
  { id: '3', name: 'Mr. Mohammad Ali', subject: 'Physics', experience: '12 years' },
  { id: '4', name: 'Ms. Sara Khan', subject: 'Chemistry', experience: '5 years' }
]

// ============================================
// CLASSES
// ============================================

export interface Class {
  id: string
  name: string
  section: string
  students: number
  teacher: string
}

export const CLASSES = [
  { id: '1', name: '10', section: 'A', students: 45, teacher: 'Prof. Ahmad Raza' },
  { id: '2', name: '10', section: 'B', students: 42, teacher: 'Mr. Mohammad Ali' },
  { id: '3', name: '9', section: 'A', students: 48, teacher: 'Mrs. Fatima Hassan' },
  { id: '4', name: '9', section: 'B', students: 46, teacher: 'Ms. Sara Khan' },
  { id: '5', name: '8', section: 'A', students: 50, teacher: 'Mr. Usman Ahmed' }
]

// ============================================
// SUBJECTS
// ============================================

export const SUBJECTS = [
  { id: '1', name: 'Mathematics', code: 'MATH101', compulsory: true },
  { id: '2', name: 'Physics', code: 'PHY101', compulsory: true },
  { id: '3', name: 'Chemistry', code: 'CHEM101', compulsory: true },
  { id: '4', name: 'English', code: 'ENG101', compulsory: true },
  { id: '5', name: 'Urdu', code: 'URD101', compulsory: true },
  { id: '6', name: 'Computer', code: 'CS101', compulsory: false }
]

// ============================================
// EXAMS
// ============================================

export interface Exam {
  id: string
  name: string
  class: string
  date: string
  status: string
}

export const EXAMS = [
  { id: '1', name: 'Mid-Term Exams 2024', class: '10', date: '2024-03-15', status: 'upcoming' },
  { id: '2', name: 'Mid-Term Exams 2024', class: '9', date: '2024-03-15', status: 'upcoming' },
  { id: '3', name: 'Final Exams 2024', class: '10', date: '2024-05-20', status: 'scheduled' }
]

// ============================================
// EVENTS
// ============================================

export interface Event {
  id: string
  title: string
  date: string
  venue: string
  type: string
}

export const EVENTS = [
  { id: '1', title: 'Sports Gala 2024', date: '2024-03-15', venue: 'Sports Ground', type: 'sports' },
  { id: '2', title: 'Parent-Teacher Meeting', date: '2024-03-10', venue: 'Auditorium', type: 'meeting' },
  { id: '3', title: 'Independence Day', date: '2024-03-23', venue: 'Main Ground', type: 'cultural' },
  { id: '4', title: 'Science Exhibition', date: '2024-04-05', venue: 'Science Lab', type: 'academic' },
  { id: '5', title: 'Spring Holidays', date: '2024-03-25', venue: 'N/A', type: 'holiday' }
]

// ============================================
// GALLERY
// ============================================

export const GALLERY = [
  { id: '1', title: 'Sports Day', category: 'sports', url: '/images/sports.jpg' },
  { id: '2', title: 'Science Exhibition', category: 'academic', url: '/images/science.jpg' },
  { id: '3', title: 'Independence Day', category: 'cultural', url: '/images/independence.jpg' },
  { id: '4', title: 'Award Ceremony', category: 'events', url: '/images/awards.jpg' }
]

// ============================================
// ATTENDANCE
// ============================================

export interface AttendanceRecord {
  id: string
  name: string
  status: 'present' | 'absent' | 'late'
}

export const ATTENDANCE = [
  { id: '1', name: 'Ali Ahmed', status: 'present' },
  { id: '2', name: 'Bilal Hassan', status: 'present' },
  { id: '3', name: 'Sara Fatima', status: 'absent' },
  { id: '4', name: 'Zainab Bibi', status: 'late' },
  { id: '5', name: 'Hamza Ali', status: 'present' }
]

// ============================================
// TIMETABLE
// ============================================

export const TIMETABLE = {
  monday: [
    { period: 1, time: '08:00-08:45', subject: 'Mathematics', teacher: 'Prof. Ahmad' },
    { period: 2, time: '08:45-09:30', subject: 'Physics', teacher: 'Mr. Ali' },
    { period: 3, time: '09:30-10:15', subject: 'Chemistry', teacher: 'Ms. Sara' },
    { period: 4, time: '10:15-10:45', subject: 'Break' },
    { period: 5, time: '10:45-11:30', subject: 'English', teacher: 'Mrs. Fatima' }
  ],
  tuesday: [
    { period: 1, time: '08:00-08:45', subject: 'Physics', teacher: 'Mr. Ali' },
    { period: 2, time: '08:45-09:30', subject: 'Chemistry', teacher: 'Ms. Sara' },
    { period: 3, time: '09:30-10:15', subject: 'Mathematics', teacher: 'Prof. Ahmad' },
    { period: 4, time: '10:15-10:45', subject: 'Break' },
    { period: 5, time: '10:45-11:30', subject: 'Computer', teacher: 'Mr. Ali' }
  ]
}

// ============================================
// ACTIVITIES
// ============================================

export const ACTIVITIES = [
  { id: 1, action: 'New student enrolled', time: '5 min ago', icon: 'user' },
  { id: 2, action: 'Project submitted', time: '15 min ago', icon: 'file' },
  { id: 3, action: 'Teacher meeting scheduled', time: '1 hour ago', icon: 'users' },
  { id: 4, action: 'Exam results published', time: '2 hours ago', icon: 'clipboard' },
  { id: 5, action: 'Attendance marked', time: '3 hours ago', icon: 'calendar' }
]

// ============================================
// QUICK ACTIONS - FIXED (NO ERRORS)
// ============================================

export const QUICK_ACTIONS = [
  { icon: 'user-plus', text: 'Add Student', color: 'blue', link: '/students/add' },
  { icon: 'chalkboard', text: 'Add Teacher', color: 'green', link: '/teachers/add' },
  { icon: 'book', text: 'Add Assignment', color: 'yellow', link: '/assignments/add' },
  { icon: 'calendar', text: 'Schedule Event', color: 'purple', link: '/events/add' },
  { icon: 'check-square', text: 'Mark Attendance', color: 'pink', link: '/attendance' },
  { icon: 'file-text', text: 'Create Exam', color: 'indigo', link: '/exams/create' },
  { icon: 'trending-up', text: 'Generate Report', color: 'red', link: '/reports' }
]

// ============================================
// NOTIFICATIONS
// ============================================

export const NOTIFICATIONS = [
  { id: 1, message: 'New student registration', time: '5 min ago', read: false },
  { id: 2, message: 'Exam schedule updated', time: '1 hour ago', read: false },
  { id: 3, message: 'Teacher meeting at 2 PM', time: '3 hours ago', read: true },
  { id: 4, message: 'Fee payment deadline', time: '1 day ago', read: true }
]

// ============================================
// DASHBOARD STATS
// ============================================

export const DASHBOARD_STATS = [
  { title: 'Total Students', value: 1234, icon: 'users', change: '+12%' },
  { title: 'Total Teachers', value: 85, icon: 'chalkboard', change: '+5%' },
  { title: 'Total Classes', value: 30, icon: 'school', change: '0%' },
  { title: 'Attendance', value: '92.5%', icon: 'check-circle', change: '+2%' }
]

// ============================================
// CHARTS DATA
// ============================================

export const CHART_DATA = {
  attendance: [92, 88, 95, 89, 93, 91, 94],
  students: [45, 42, 48, 46, 50, 44, 47],
  performance: [78, 82, 88, 85, 90, 87, 92]
}

// ============================================
// END OF FILE - NO ERRORS
// ============================================