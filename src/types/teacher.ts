// Base Teacher Interface
export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  emergencyContact?: string
  address: string
  city: string
  gender: 'male' | 'female'
  dateOfBirth: Date | string
  bloodGroup?: BloodGroup
  profileImage?: string
  
  // Professional Information
  employeeId: string
  qualification: string
  specialization: string
  experience: number // in years
  joiningDate: Date | string
  designation: TeacherDesignation
  department: TeacherDepartment
  status: TeacherStatus
  
  // Teaching Information
  subjects: Subject[]
  classes: ClassAssignment[]
  isClassTeacher: boolean
  classTeacherOf?: string
  
  // Salary & Benefits
  salary: number
  bankDetails?: BankDetails
  taxDeduction?: number
  allowances?: Allowance[]
  
  // Documents & Certificates
  documents?: TeacherDocument[]
  qualifications: Qualification[]
  certificates?: Certificate[]
  
  // Attendance & Leave
  attendance?: TeacherAttendance[]
  leaveBalance?: LeaveBalance
  
  // Performance
  performanceReviews?: PerformanceReview[]
  achievements?: string[]
  
  // Contact
  emergencyContactName?: string
  emergencyContactNumber?: string
  
  // System Fields
  createdAt: Date | string
  updatedAt: Date | string
  createdBy?: string
  updatedBy?: string
}

// Teacher Designation Types
export type TeacherDesignation = 
  | 'senior teacher' 
  | 'subject specialist' 
  | 'assistant teacher' 
  | 'head of department' 
  | 'coordinator'
  | 'visiting teacher'
  | 'trainee teacher'
  | 'demonstrator'
  | 'professor'

// Teacher Department Types
export type TeacherDepartment = 
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'computer science'
  | 'english'
  | 'urdu'
  | 'islamiat'
  | 'pakistan studies'
  | 'general science'
  | 'social studies'
  | 'physical education'
  | 'arts'
  | 'quranic education'
  | 'academic'

// Teacher Status Types
export type TeacherStatus = 
  | 'active' 
  | 'on leave' 
  | 'resigned' 
  | 'retired' 
  | 'suspended'
  | 'probation'

// Blood Group Types
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

// Subject Interface
export interface Subject {
  id: string
  name: string
  code: string
  class: string
  isCompulsory: boolean
  marksTheory?: number
  marksPractical?: number
  totalMarks: number
}

// Class Assignment Interface
export interface ClassAssignment {
  classId: string
  className: string
  section: string
  subject: string
  periodsPerWeek: number
  isClassTeacher: boolean
  academicYear: string
}

// Bank Details Interface
export interface BankDetails {
  accountTitle: string
  accountNumber: string
  bankName: string
  branchName: string
  branchCode?: string
  iban?: string
}

// Allowance Interface
export interface Allowance {
  type: 'house rent' | 'medical' | 'transport' | 'special' | 'other'
  amount: number
  description?: string
  isActive: boolean
}

// Teacher Document Interface
export interface TeacherDocument {
  id: string
  type: DocumentType
  title: string
  fileUrl: string
  uploadedAt: Date | string
  verified: boolean
  expiryDate?: Date | string
}

export type DocumentType = 
  | 'cv'
  | 'degree'
  | 'certificate'
  | 'experience letter'
  | 'cnic'
  | 'passport'
  | 'contract'
  | 'other'

// Qualification Interface
export interface Qualification {
  id: string
  degree: string
  field: string
  institution: string
  board?: string
  year: number
  grade?: string
  percentage?: number
  cgpa?: number
  totalMarks?: number
  obtainedMarks?: number
  division?: 'first' | 'second' | 'third' | 'distinction'
  certificate?: string
  verified: boolean
}

// Certificate Interface
export interface Certificate {
  id: string
  name: string
  issuedBy: string
  issueDate: Date | string
  expiryDate?: Date | string
  credentialId?: string
  fileUrl?: string
  verified: boolean
}

// Teacher Attendance Interface
export interface TeacherAttendance {
  id: string
  date: Date | string
  status: AttendanceStatus
  checkIn?: string
  checkOut?: string
  lateMinutes?: number
  overtime?: number
  remarks?: string
  markedBy?: string
}

export type AttendanceStatus = 
  | 'present' 
  | 'absent' 
  | 'late' 
  | 'half day' 
  | 'leave' 
  | 'holiday'

// Leave Balance Interface
export interface LeaveBalance {
  annual: number
  sick: number
  casual: number
  earned: number
  unpaid: number
  total: number
  taken: number
  remaining: number
}

// Performance Review Interface
export interface PerformanceReview {
  id: string
  date: Date | string
  reviewer: string
  rating: number // 1-5
  categories: PerformanceCategory[]
  comments: string
  recommendations?: string
  nextReviewDate?: Date | string
}

export interface PerformanceCategory {
  name: string
  rating: number
  comments?: string
}

// Teacher Schedule Interface
export interface TeacherSchedule {
  id: string
  teacherId: string
  day: DayOfWeek
  periods: ScheduledPeriod[]
  academicYear: string
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export interface ScheduledPeriod {
  periodNumber: number
  startTime: string
  endTime: string
  classId: string
  className: string
  section: string
  subject: string
  room: string
}

// Teacher Statistics Interface
export interface TeacherStats {
  totalTeachers: number
  activeTeachers: number
  onLeave: number
  byDepartment: Record<TeacherDepartment, number>
  byDesignation: Record<TeacherDesignation, number>
  byGender: Record<'male' | 'female', number>
  averageExperience: number
  newThisMonth: number
  newThisYear: number
  attendanceRate: number
}

// Teacher Filters Interface
export interface TeacherFilters {
  department?: TeacherDepartment
  designation?: TeacherDesignation
  status?: TeacherStatus
  gender?: 'male' | 'female'
  search?: string
  page?: number
  limit?: number
  sortBy?: keyof Teacher
  sortOrder?: 'asc' | 'desc'
  minExperience?: number
  maxExperience?: number
  isClassTeacher?: boolean
}

// Teacher List Response
export interface TeacherListResponse {
  teachers: Teacher[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
  stats?: TeacherStats
}

// Teacher Form Data (for create/edit)
export interface TeacherFormData {
  name: string
  email: string
  phone: string
  emergencyContact?: string
  address: string
  city: string
  gender: 'male' | 'female'
  dateOfBirth: string
  bloodGroup?: BloodGroup
  
  employeeId: string
  qualification: string
  specialization: string
  experience: number
  joiningDate: string
  designation: TeacherDesignation
  department: TeacherDepartment
  
  subjects: string[]
  classes: ClassAssignmentInput[]
  isClassTeacher: boolean
  classTeacherOf?: string
  
  salary: number
  bankAccount?: string
  bankName?: string
  
  emergencyContactName?: string
  emergencyContactNumber?: string
}

export interface ClassAssignmentInput {
  classId: string
  className: string
  section: string
  subject: string
  periodsPerWeek: number
  isClassTeacher?: boolean
}

// Teacher Import/Export
export interface TeacherImportData {
  name: string
  email: string
  phone: string
  employeeId: string
  qualification: string
  specialization: string
  experience: number
  designation: string
  department: string
  salary: number
  joiningDate: string
}

// Teacher Salary Slip
export interface SalarySlip {
  id: string
  teacherId: string
  teacherName: string
  month: string
  year: number
  basicSalary: number
  allowances: Allowance[]
  deductions: Deduction[]
  grossSalary: number
  netSalary: number
  paymentDate: Date | string
  paymentMethod: 'cash' | 'bank transfer' | 'cheque'
  status: 'paid' | 'pending' | 'processing'
  generatedBy: string
}

export interface Deduction {
  type: 'tax' | 'loan' | 'advance' | 'late' | 'other'
  amount: number
  description?: string
}

// Teacher Leave Application
export interface LeaveApplication {
  id: string
  teacherId: string
  teacherName: string
  leaveType: 'annual' | 'sick' | 'casual' | 'unpaid' | 'emergency'
  fromDate: Date | string
  toDate: Date | string
  totalDays: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  appliedOn: Date | string
  approvedBy?: string
  approvedOn?: Date | string
  remarks?: string
  documents?: string[]
}

// Teacher Notification
export interface TeacherNotification {
  id: string
  teacherId: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  read: boolean
  createdAt: Date | string
  link?: string
}

// Teacher Training
export interface Training {
  id: string
  teacherId: string
  title: string
  provider: string
  startDate: Date | string
  endDate: Date | string
  duration: string
  certificate?: string
  status: 'completed' | 'ongoing' | 'upcoming'
  description?: string
}

// Type Guards
export const isActiveTeacher = (teacher: Teacher): boolean => {
  return teacher.status === 'active'
}

export const isClassTeacher = (teacher: Teacher): boolean => {
  return teacher.isClassTeacher === true
}

export const hasSubject = (teacher: Teacher, subjectName: string): boolean => {
  return teacher.subjects.some(s => s.name.toLowerCase() === subjectName.toLowerCase())
}

export const teachesClass = (teacher: Teacher, className: string, section?: string): boolean => {
  return teacher.classes.some(c => 
    c.className === className && (!section || c.section === section)
  )
}

// Validation Functions
export const isValidEmployeeId = (id: string): boolean => {
  const employeeIdRegex = /^T(eacher)?-[0-9]{3,5}$|^[0-9]{4,6}$/i
  return employeeIdRegex.test(id)
}

export const isValidQualification = (qual: string): boolean => {
  const validDegrees = ['phd', 'm.phil', 'masters', 'bachelors', 'intermediate', 'matric']
  return validDegrees.some(degree => qual.toLowerCase().includes(degree))
}

export const isValidExperience = (years: number): boolean => {
  return years >= 0 && years <= 50
}

export const isValidSalary = (salary: number): boolean => {
  return salary >= 15000 && salary <= 500000
}

// Constants
export const TEACHER_DESIGNATIONS: TeacherDesignation[] = [
  'senior teacher',
  'subject specialist',
  'assistant teacher',
  'head of department',
  'coordinator',
  'visiting teacher',
  'trainee teacher',
  'demonstrator',
  'professor'
]

export const TEACHER_DEPARTMENTS: TeacherDepartment[] = [
  'mathematics',
  'physics',
  'chemistry',
  'biology',
  'computer science',
  'english',
  'urdu',
  'islamiat',
  'pakistan studies',
  'general science',
  'social studies',
  'physical education',
  'arts',
  'quranic education',
  'academic'
]

export const TEACHER_STATUSES: TeacherStatus[] = [
  'active',
  'on leave',
  'resigned',
  'retired',
  'suspended',
  'probation'
]

export const ATTENDANCE_STATUSES: AttendanceStatus[] = [
  'present',
  'absent',
  'late',
  'half day',
  'leave',
  'holiday'
]

export const LEAVE_TYPES = {
  annual: 'Annual Leave',
  sick: 'Sick Leave',
  casual: 'Casual Leave',
  unpaid: 'Unpaid Leave',
  emergency: 'Emergency Leave'
} as const

// Mock Data Creator
export const createMockTeacher = (overrides?: Partial<Teacher>): Teacher => {
  const baseTeacher: Teacher = {
    id: `teacher-${Date.now()}`,
    name: 'Prof. Ahmad Raza',
    email: 'ahmad.raza@ghazali.edu.pk',
    phone: '0300-1234567',
    address: 'Street 1, Adlana',
    city: 'Bhawana',
    gender: 'male',
    dateOfBirth: '1985-05-15',
    bloodGroup: 'B+',
    
    employeeId: `T-${Math.floor(1000 + Math.random() * 9000)}`,
    qualification: 'M.Sc Mathematics',
    specialization: 'Pure Mathematics',
    experience: 10,
    joiningDate: '2014-03-01',
    designation: 'senior teacher',
    department: 'mathematics',
    status: 'active',
    
    subjects: [
      { id: '1', name: 'Mathematics', code: 'MATH101', class: '10', isCompulsory: true, totalMarks: 100 },
      { id: '2', name: 'Physics', code: 'PHY101', class: '10', isCompulsory: true, totalMarks: 100 }
    ],
    classes: [
      { classId: 'c1', className: '10', section: 'A', subject: 'Mathematics', periodsPerWeek: 6, isClassTeacher: true, academicYear: '2024-2025' },
      { classId: 'c2', className: '10', section: 'B', subject: 'Mathematics', periodsPerWeek: 6, isClassTeacher: false, academicYear: '2024-2025' }
    ],
    isClassTeacher: true,
    classTeacherOf: '10-A',
    
    salary: 75000,
    bankDetails: {
      accountTitle: 'Ahmad Raza',
      accountNumber: '1234567890123',
      bankName: 'Habib Bank',
      branchName: 'Bhawana Branch'
    },
    
    qualifications: [
      {
        id: 'q1',
        degree: 'M.Sc',
        field: 'Mathematics',
        institution: 'Punjab University',
        year: 2010,
        percentage: 85,
        division: 'first',
        verified: true
      }
    ],
    
    createdAt: new Date(),
    updatedAt: new Date(),
    
    ...overrides
  }
  
  return baseTeacher
}

// Utility Functions
export const calculateTeacherAttendanceRate = (attendance: TeacherAttendance[]): number => {
  if (attendance.length === 0) return 0
  
  const presentDays = attendance.filter(a => a.status === 'present').length
  const totalDays = attendance.length
  
  return (presentDays / totalDays) * 100
}

export const getTeacherFullName = (teacher: Teacher): string => {
  const prefix = teacher.gender === 'male' ? 'Prof.' : 'Prof.'
  return `${prefix} ${teacher.name}`
}

export const getTeacherSubjectsString = (teacher: Teacher): string => {
  return teacher.subjects.map(s => s.name).join(', ')
}

export const getTeacherClassesString = (teacher: Teacher): string => {
  return teacher.classes.map(c => `${c.className}-${c.section} (${c.subject})`).join(', ')
}

export const calculateTeacherExperience = (joiningDate: Date | string): number => {
  const join = new Date(joiningDate)
  const now = new Date()
  const years = now.getFullYear() - join.getFullYear()
  
  if (now.getMonth() < join.getMonth() || 
      (now.getMonth() === join.getMonth() && now.getDate() < join.getDate())) {
    return years - 1
  }
  
  return years
}

export const getTeacherStatusBadgeColor = (status: TeacherStatus): string => {
  switch (status) {
    case 'active': return 'bg-green-500/20 text-green-300'
    case 'on leave': return 'bg-yellow-500/20 text-yellow-300'
    case 'resigned': return 'bg-gray-500/20 text-gray-300'
    case 'retired': return 'bg-purple-500/20 text-purple-300'
    case 'suspended': return 'bg-red-500/20 text-red-300'
    case 'probation': return 'bg-orange-500/20 text-orange-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getTeacherDesignationBadgeColor = (designation: TeacherDesignation): string => {
  switch (designation) {
    case 'head of department': return 'bg-purple-500/20 text-purple-300'
    case 'senior teacher': return 'bg-blue-500/20 text-blue-300'
    case 'coordinator': return 'bg-green-500/20 text-green-300'
    case 'subject specialist': return 'bg-yellow-500/20 text-yellow-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}