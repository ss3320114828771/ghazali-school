// Base User Interface
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  address?: string
  profileImage?: string
  createdAt: Date | string
  updatedAt: Date | string
  status: UserStatus
  gender?: Gender
  bloodGroup?: BloodGroup
  dateOfBirth?: Date | string
  emergencyContact?: string
}

// User Role Types
export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'staff'

// User Status Types
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'graduated' | 'transferred'

// Gender Types
export type Gender = 'male' | 'female' | 'other'

// Blood Group Types
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

// Student Specific Interface
export interface Student extends User {
  role: 'student'
  rollNo: string
  class: string
  section: string
  fatherName: string
  motherName?: string
  fatherOccupation?: string
  motherOccupation?: string
  fatherContact?: string
  motherContact?: string
  guardianName?: string
  guardianRelation?: string
  guardianContact?: string
  admissionDate: Date | string
  previousSchool?: string
  busRoute?: string
  busStop?: string
  feesStatus: FeeStatus
  monthlyFee: number
  transportFee?: number
  annualCharges?: number
  dues?: number
  attendancePercentage?: number
  lastAttendanceDate?: Date | string
  medicalInfo?: string
  sportsTeam?: string
  house?: string
}

// Teacher Specific Interface
export interface Teacher extends User {
  role: 'teacher'
  employeeId: string
  qualification: string
  specialization: string
  experience: number // in years
  subjects: string[]
  classes: string[]
  joiningDate: Date | string
  salary: number
  bankAccount?: string
  bankName?: string
  emergencyContactName?: string
  emergencyContactNumber?: string
  designation: TeacherDesignation
  isClassTeacher?: boolean
  classTeacherOf?: string
  qualifications: Qualification[]
  certificates?: Certificate[]
  achievements?: string[]
}

// Parent Specific Interface
export interface Parent extends User {
  role: 'parent'
  children: StudentChild[]
  occupation: string
  income?: number
  cnic: string
  cnicFront?: string
  cnicBack?: string
  relationship: ParentRelationship
  numberOfChildren: number
  totalFee?: number
  paidFee?: number
  pendingFee?: number
}

// Staff Specific Interface
export interface Staff extends User {
  role: 'staff'
  employeeId: string
  department: StaffDepartment
  position: string
  joiningDate: Date | string
  salary: number
  shift: StaffShift
  duties?: string[]
  supervisor?: string
  emergencyContact?: string
  bankDetails?: BankDetails
}

// Admin Specific Interface
export interface Admin extends User {
  role: 'admin'
  permissions: Permission[]
  department: AdminDepartment
  accessLevel: AccessLevel
  lastLogin?: Date | string
  loginHistory?: LoginRecord[]
}

// Supporting Types
export type FeeStatus = 'paid' | 'pending' | 'partial' | 'exempted'

export type TeacherDesignation = 
  | 'senior teacher' 
  | 'subject specialist' 
  | 'assistant teacher' 
  | 'head of department' 
  | 'coordinator'

export type ParentRelationship = 
  | 'father' 
  | 'mother' 
  | 'guardian' 
  | 'grandfather' 
  | 'grandmother' 
  | 'uncle' 
  | 'aunt' 
  | 'brother' 
  | 'sister'

export type StaffDepartment = 
  | 'administration' 
  | 'accounts' 
  | 'transport' 
  | 'security' 
  | 'maintenance' 
  | 'library' 
  | 'laboratory' 
  | 'sports' 
  | 'medical'

export type StaffShift = 'morning' | 'evening' | 'full day'

export type AdminDepartment = 
  | 'principal' 
  | 'vice principal' 
  | 'academic' 
  | 'finance' 
  | 'admissions' 
  | 'examinations' 
  | 'discipline' 
  | 'it'

export type AccessLevel = 'super' | 'full' | 'limited' | 'readonly'

export type Permission = 
  | 'manage_students'
  | 'manage_teachers'
  | 'manage_staff'
  | 'manage_classes'
  | 'manage_exams'
  | 'manage_results'
  | 'manage_attendance'
  | 'manage_fees'
  | 'manage_transport'
  | 'manage_library'
  | 'manage_events'
  | 'manage_gallery'
  | 'view_reports'
  | 'generate_reports'
  | 'manage_settings'
  | 'manage_users'
  | 'manage_backup'

// Complex Types
export interface StudentChild {
  id: string
  name: string
  rollNo: string
  class: string
  section: string
}

export interface Qualification {
  degree: string
  institution: string
  year: number
  grade?: string
  percentage?: number
  certificate?: string
}

export interface Certificate {
  name: string
  issuedBy: string
  issueDate: Date | string
  expiryDate?: Date | string
  file?: string
}

export interface BankDetails {
  accountTitle: string
  accountNumber: string
  bankName: string
  branchCode?: string
  iban?: string
}

export interface LoginRecord {
  date: Date | string
  time: string
  ip: string
  device: string
  browser: string
  location?: string
  status: 'success' | 'failed'
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role: UserRole
  phone?: string
  class?: string
  rollNo?: string
  fatherName?: string
  employeeId?: string
  qualification?: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
  expiresIn: number
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  newPassword: string
  confirmPassword: string
}

// Profile Types
export interface ProfileUpdateData {
  name?: string
  phone?: string
  address?: string
  profileImage?: string
  emergencyContact?: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Session Types
export interface Session {
  user: User
  token: string
  expiresAt: Date | string
}

// Role-Based Dashboard Access
export interface DashboardAccess {
  role: UserRole
  allowedModules: string[]
  defaultRoute: string
  permissions: Permission[]
}

// User Statistics
export interface UserStats {
  total: number
  active: number
  inactive: number
  newThisMonth: number
  newThisYear: number
  byRole: Record<UserRole, number>
  byGender: Record<Gender, number>
  byStatus: Record<UserStatus, number>
}

// User Filters
export interface UserFilters {
  role?: UserRole
  status?: UserStatus
  gender?: Gender
  class?: string
  section?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// User List Response
export interface UserListResponse {
  users: User[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

// Error Types
export interface UserError {
  code: string
  message: string
  field?: string
}

// Activity Log
export interface UserActivity {
  id: string
  userId: string
  action: string
  details: string
  ip: string
  timestamp: Date | string
}

// Notification Preferences
export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  attendance: boolean
  results: boolean
  events: boolean
  fees: boolean
  announcements: boolean
}

// User Settings
export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  language: 'en' | 'ur'
  timezone: string
  dateFormat: string
  notifications: NotificationPreferences
  privacy: PrivacySettings
}

export interface PrivacySettings {
  showProfile: boolean
  showContact: boolean
  showAttendance: boolean
  showResults: boolean
}

// Validation Functions
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^03[0-9]{2}[0-9]{7}$|^\+923[0-9]{2}[0-9]{7}$/
  return phoneRegex.test(phone)
}

export const isValidCnic = (cnic: string): boolean => {
  const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/
  return cnicRegex.test(cnic)
}

export const isValidRollNo = (rollNo: string): boolean => {
  const rollNoRegex = /^[0-9]{2,3}-[A-Z]-[0-9]{2,3}$|^[0-9]{2,3}$/
  return rollNoRegex.test(rollNo)
}

export const isValidDate = (date: any): boolean => {
  return date instanceof Date && !isNaN(date.getTime())
}

// Type Guards
export const isStudent = (user: User): user is Student => {
  return user.role === 'student'
}

export const isTeacher = (user: User): user is Teacher => {
  return user.role === 'teacher'
}

export const isParent = (user: User): user is Parent => {
  return user.role === 'parent'
}

export const isAdmin = (user: User): user is Admin => {
  return user.role === 'admin'
}

export const isStaff = (user: User): user is Staff => {
  return user.role === 'staff'
}

export const isActive = (user: User): boolean => {
  return user.status === 'active'
}

// Constants
export const USER_ROLES: UserRole[] = ['admin', 'teacher', 'student', 'parent', 'staff']

export const USER_STATUSES: UserStatus[] = ['active', 'inactive', 'suspended', 'graduated', 'transferred']

export const GENDERS: Gender[] = ['male', 'female', 'other']

export const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export const PARENT_RELATIONSHIPS: ParentRelationship[] = [
  'father', 'mother', 'guardian', 'grandfather', 'grandmother', 'uncle', 'aunt', 'brother', 'sister'
]

export const STAFF_DEPARTMENTS: StaffDepartment[] = [
  'administration', 'accounts', 'transport', 'security', 'maintenance', 'library', 'laboratory', 'sports', 'medical'
]

export const ADMIN_DEPARTMENTS: AdminDepartment[] = [
  'principal', 'vice principal', 'academic', 'finance', 'admissions', 'examinations', 'discipline', 'it'
]

export const PERMISSIONS: Permission[] = [
  'manage_students',
  'manage_teachers',
  'manage_staff',
  'manage_classes',
  'manage_exams',
  'manage_results',
  'manage_attendance',
  'manage_fees',
  'manage_transport',
  'manage_library',
  'manage_events',
  'manage_gallery',
  'view_reports',
  'generate_reports',
  'manage_settings',
  'manage_users',
  'manage_backup'
]

// Role-based default routes
export const DEFAULT_ROUTES: Record<UserRole, string> = {
  admin: '/dashboard',
  teacher: '/dashboard/attendance',
  student: '/dashboard/exams',
  parent: '/dashboard/events',
  staff: '/dashboard'
}

// Mock User Creator (for development)
export const createMockUser = (role: UserRole, overrides?: Partial<User>): User => {
  const baseUser: User = {
    id: `user-${Date.now()}`,
    name: 'John Doe',
    email: 'john@example.com',
    role,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }

  switch (role) {
    case 'student':
      return {
        ...baseUser,
        role: 'student',
        rollNo: '101',
        class: '10',
        section: 'A',
        fatherName: 'Father Name',
        admissionDate: new Date(),
        feesStatus: 'paid',
        monthlyFee: 2000
      } as Student
    case 'teacher':
      return {
        ...baseUser,
        role: 'teacher',
        employeeId: 'T-101',
        qualification: 'M.Sc Mathematics',
        specialization: 'Mathematics',
        experience: 5,
        subjects: ['Mathematics', 'Physics'],
        classes: ['10-A', '10-B'],
        joiningDate: new Date(),
        salary: 50000,
        designation: 'senior teacher'
      } as Teacher
    default:
      return baseUser
  }
}