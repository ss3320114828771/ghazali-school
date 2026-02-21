// ============================================
// MAIN ATTENDANCE INTERFACES
// ============================================

export interface Attendance {
  id: string
  date: Date | string
  type: AttendanceType
  entityType: EntityType
  entityId: string
  entityName: string
  class?: string
  section?: string
  records: AttendanceRecord[]
  summary: AttendanceSummary
  markedBy: string
  markedByName?: string
  verifiedBy?: string
  verifiedByName?: string
  status: AttendanceSessionStatus
  remarks?: string
  createdAt: Date | string
  updatedAt: Date | string
}

export type AttendanceType = 
  | 'daily' 
  | 'period-wise' 
  | 'subject-wise' 
  | 'event' 
  | 'exam' 
  | 'special'

export type EntityType = 
  | 'student' 
  | 'teacher' 
  | 'staff' 
  | 'class' 
  | 'section' 
  | 'all'

export type AttendanceSessionStatus = 
  | 'draft' 
  | 'completed' 
  | 'verified' 
  | 'approved' 
  | 'rejected' 
  | 'pending'

// ============================================
// ATTENDANCE RECORD INTERFACES
// ============================================

export interface AttendanceRecord {
  id: string
  entityId: string
  entityName: string
  rollNo?: string
  class?: string
  section?: string
  status: AttendanceStatus
  checkIn?: string
  checkOut?: string
  totalHours?: number
  lateMinutes?: number
  earlyDeparture?: number
  overTime?: number
  reason?: string
  remarks?: string
  markedBy?: string
  verifiedBy?: string
  documents?: string[]
  location?: LocationData
  deviceInfo?: DeviceInfo
  biometricId?: string
  faceMatch?: number
  createdAt: Date | string
  updatedAt: Date | string
}

export type AttendanceStatus = 
  | 'present' 
  | 'absent' 
  | 'late' 
  | 'half-day' 
  | 'leave' 
  | 'holiday' 
  | 'sick' 
  | 'emergency' 
  | 'remote' 
  | 'field-trip' 
  | 'suspended' 
  | 'not-marked'
  | 'pending-approval'  // Added this to fix the error

export interface LocationData {
  latitude: number
  longitude: number
  address?: string
  accuracy?: number
  device?: string
}

export interface DeviceInfo {
  deviceId: string
  deviceName: string
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'biometric' | 'card-reader'
  ipAddress?: string
  userAgent?: string
}

// ============================================
// ATTENDANCE SUMMARY INTERFACES
// ============================================

export interface AttendanceSummary {
  total: number
  present: number
  absent: number
  late: number
  halfDay: number
  leave: number
  holiday: number
  sick: number
  emergency: number
  remote: number
  notMarked: number
  pendingApproval: number  // Added this
  presentPercentage: number
  absentPercentage: number
  latePercentage: number
  byGender?: GenderWiseAttendance
  byClass?: ClassWiseAttendance
  bySection?: SectionWiseAttendance
}

export interface GenderWiseAttendance {
  male: GenderStats
  female: GenderStats
}

export interface GenderStats {
  total: number
  present: number
  absent: number
  percentage: number
}

export interface ClassWiseAttendance {
  [key: string]: ClassStats
}

export interface ClassStats {
  total: number
  present: number
  absent: number
  percentage: number
  sections: SectionStats
}

export interface SectionStats {
  [key: string]: {
    total: number
    present: number
    absent: number
    percentage: number
  }
}

export interface SectionWiseAttendance {
  [key: string]: {
    total: number
    present: number
    absent: number
    percentage: number
  }
}

// ============================================
// LEAVE MANAGEMENT INTERFACES
// ============================================

export interface Leave {
  id: string
  entityId: string
  entityName: string
  entityType: EntityType
  leaveType: LeaveType
  fromDate: Date | string
  toDate: Date | string
  totalDays: number
  reason: string
  documents?: string[]
  status: LeaveStatus
  appliedOn: Date | string
  approvedBy?: string
  approvedOn?: Date | string
  rejectedBy?: string
  rejectedOn?: Date | string
  rejectionReason?: string
  remarks?: string
  emergencyContact?: string
  alternativeArrangements?: string
  createdAt: Date | string
  updatedAt: Date | string
}

export type LeaveType = 
  | 'annual' 
  | 'sick' 
  | 'casual' 
  | 'study' 
  | 'maternity' 
  | 'paternity' 
  | 'bereavement' 
  | 'hajj' 
  | 'umrah' 
  | 'emergency' 
  | 'unpaid' 
  | 'other'

export type LeaveStatus = 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'cancelled' 
  | 'expired' 
  | 'in-progress'

export interface LeaveBalance {
  entityId: string
  entityName: string
  entityType: EntityType
  academicYear: string
  totalLeaves: LeaveBalanceDetail[]
  usedLeaves: LeaveBalanceDetail[]
  remainingLeaves: LeaveBalanceDetail[]
  lastUpdated: Date | string
}

export interface LeaveBalanceDetail {
  leaveType: LeaveType
  total: number
  used: number
  remaining: number
  pending: number
  approved: number
}

// ============================================
// ATTENDANCE REPORT INTERFACES
// ============================================

export interface AttendanceReport {
  id: string
  entityId: string
  entityName: string
  entityType: EntityType
  period: ReportPeriod
  fromDate: Date | string
  toDate: Date | string
  summary: AttendanceSummary
  dailyBreakdown: DailyAttendance[]
  monthlySummary?: MonthlyAttendanceSummary[]
  subjectWise?: SubjectWiseAttendance[]
  trends: AttendanceTrends
  generatedAt: Date | string
  generatedBy: string
}

export interface ReportPeriod {
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom'
  value: string
}

export interface DailyAttendance {
  date: Date | string
  day: string
  status: AttendanceStatus
  checkIn?: string
  checkOut?: string
  totalHours?: number
  lateMinutes?: number
  remarks?: string
}

export interface MonthlyAttendanceSummary {
  month: string
  year: number
  totalDays: number
  present: number
  absent: number
  late: number
  leave: number
  percentage: number
}

export interface SubjectWiseAttendance {
  subjectId: string
  subjectName: string
  totalPeriods: number
  attended: number
  missed: number
  percentage: number
}

export interface AttendanceTrends {
  weeklyTrend: TrendData[]
  monthlyTrend: TrendData[]
  yearlyTrend: TrendData[]
  comparison: ComparisonData
}

export interface TrendData {
  label: string
  value: number
  percentage: number
}

export interface ComparisonData {
  vsPreviousPeriod: number
  vsSamePeriodLastYear: number
  vsAverage: number
  vsTarget: number
}

// ============================================
// ATTENDANCE STATISTICS
// ============================================

export interface AttendanceStatistics {
  overall: OverallStatistics
  byEntity: EntityStatistics[]
  byDate: DateStatistics[]
  byStatus: StatusStatistics
  byTime: TimeStatistics
  byLocation: LocationStatistics
  topPerformers: TopPerformer[]
  lowPerformers: LowPerformer[]
}

export interface OverallStatistics {
  totalEntities: number
  totalRecords: number
  averageAttendance: number
  highestAttendance: number
  lowestAttendance: number
  totalPresent: number
  totalAbsent: number
  totalLate: number
  totalLeave: number
}

export interface EntityStatistics {
  entityId: string
  entityName: string
  totalDays: number
  present: number
  absent: number
  late: number
  leave: number
  percentage: number
  rank: number
}

export interface DateStatistics {
  date: Date | string
  total: number
  present: number
  absent: number
  percentage: number
}

export interface StatusStatistics {
  [key: string]: number
}

export interface TimeStatistics {
  averageCheckIn: string
  averageCheckOut: string
  peakCheckInTime: string
  peakCheckOutTime: string
  averageLateMinutes: number
  averageEarlyDeparture: number
}

export interface LocationStatistics {
  onCampus: number
  offCampus: number
  remote: number
  unknown: number
}

export interface TopPerformer {
  entityId: string
  entityName: string
  attendancePercentage: number
  daysPresent: number
  rank: number
}

export interface LowPerformer {
  entityId: string
  entityName: string
  attendancePercentage: number
  daysAbsent: number
  warnings: number
}

// ============================================
// ATTENDANCE SETTINGS
// ============================================

export interface AttendanceSettings {
  id: string
  schoolId: string
  academicYear: string
  workingDays: WorkingDay[]
  holidays: Holiday[]
  lateThreshold: number // minutes after which marked late
  earlyDepartureThreshold: number // minutes before which marked early
  minimumHours: number // minimum hours required for full day
  halfDayThreshold: number // hours after which marked half day
  gracePeriod: number // minutes of grace period
  allowRemoteMarking: boolean
  requireLocation: boolean
  requirePhoto: boolean
  requireBiometric: boolean
  autoMarkAbsent: boolean
  autoMarkAfter: string // time to auto-mark absent
  notificationRules: NotificationRule[]
  createdAt: Date | string
  updatedAt: Date | string
}

export interface WorkingDay {
  day: string
  isWorking: boolean
  startTime?: string
  endTime?: string
  breakStart?: string
  breakEnd?: string
}

export interface Holiday {
  date: Date | string
  name: string
  type: 'public' | 'school' | 'religious' | 'emergency'
  description?: string
}

export interface NotificationRule {
  id: string
  type: 'absent' | 'late' | 'leave' | 'holiday'
  sendTo: string[]
  sendAfter: number // minutes after event
  template: string
  isActive: boolean
}

// ============================================
// ATTENDANCE FILTERS AND QUERIES
// ============================================

export interface AttendanceFilters {
  entityType?: EntityType
  entityId?: string
  class?: string
  section?: string
  fromDate?: Date | string
  toDate?: Date | string
  status?: AttendanceStatus | AttendanceStatus[]
  leaveType?: LeaveType
  markedBy?: string
  verifiedBy?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface LeaveFilters {
  entityId?: string
  entityType?: EntityType
  leaveType?: LeaveType
  status?: LeaveStatus
  fromDate?: Date | string
  toDate?: Date | string
  search?: string
  page?: number
  limit?: number
}

// ============================================
// ATTENDANCE LIST RESPONSES
// ============================================

export interface AttendanceListResponse {
  attendances: Attendance[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
  summary?: AttendanceSummary
}

export interface LeaveListResponse {
  leaves: Leave[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
  balance?: LeaveBalance
}

// ============================================
// ATTENDANCE FORM DATA
// ============================================

export interface AttendanceFormData {
  date: string
  type: AttendanceType
  entityType: EntityType
  entityId: string
  class?: string
  section?: string
  records: AttendanceRecordInput[]
  remarks?: string
}

export interface AttendanceRecordInput {
  entityId: string
  status: AttendanceStatus
  checkIn?: string
  checkOut?: string
  reason?: string
  remarks?: string
  location?: LocationData
}

export interface LeaveFormData {
  entityId: string
  entityType: EntityType
  leaveType: LeaveType
  fromDate: string
  toDate: string
  reason: string
  documents?: File[]
  emergencyContact?: string
  alternativeArrangements?: string
}

// ============================================
// BULK ATTENDANCE OPERATIONS
// ============================================

export interface BulkAttendanceData {
  date: string
  class: string
  section: string
  records: BulkAttendanceRecord[]
}

export interface BulkAttendanceRecord {
  studentId: string
  rollNo: string
  name: string
  status: AttendanceStatus
  remarks?: string
}

export interface BulkAttendanceResult {
  success: number
  failed: number
  errors: BulkAttendanceError[]
}

export interface BulkAttendanceError {
  row: number
  studentId: string
  error: string
}

// ============================================
// ATTENDANCE IMPORT/EXPORT
// ============================================

export interface AttendanceImportData {
  date: string
  class: string
  section: string
  records: ImportRecord[]
}

export interface ImportRecord {
  rollNo: string
  name: string
  status: string
  checkIn?: string
  checkOut?: string
  remarks?: string
}

export interface AttendanceExportOptions {
  format: 'excel' | 'csv' | 'pdf'
  fromDate: string
  toDate: string
  entityType: EntityType
  entityIds?: string[]
  class?: string
  section?: string
  includeSummary: boolean
  includeTrends: boolean
}

// ============================================
// ATTENDANCE ALERTS AND NOTIFICATIONS
// ============================================

export interface AttendanceAlert {
  id: string
  type: AlertType
  severity: AlertSeverity
  entityId: string
  entityName: string
  message: string
  details?: any
  read: boolean
  createdAt: Date | string
  expiresAt?: Date | string
}

export type AlertType = 
  | 'low-attendance' 
  | 'excessive-absences' 
  | 'excessive-late' 
  | 'leave-pending' 
  | 'leave-approved' 
  | 'leave-rejected' 
  | 'holiday' 
  | 'reminder'

export type AlertSeverity = 'info' | 'warning' | 'danger' | 'success'

// ============================================
// TYPE GUARDS
// ============================================

export const isPresent = (record: AttendanceRecord): boolean => {
  return record.status === 'present'
}

export const isAbsent = (record: AttendanceRecord): boolean => {
  return record.status === 'absent'
}

export const isLate = (record: AttendanceRecord): boolean => {
  return record.status === 'late'
}

export const isOnLeave = (record: AttendanceRecord): boolean => {
  return record.status === 'leave'
}

export const isHalfDay = (record: AttendanceRecord): boolean => {
  return record.status === 'half-day'
}

export const isHoliday = (record: AttendanceRecord): boolean => {
  return record.status === 'holiday'
}

export const isMarked = (record: AttendanceRecord): boolean => {
  return record.status !== 'not-marked' && record.status !== 'pending-approval'
}

export const requiresAction = (record: AttendanceRecord): boolean => {
  return record.status === 'not-marked' || record.status === 'pending-approval'
}

export const isLeavePending = (leave: Leave): boolean => {
  return leave.status === 'pending'
}

export const isLeaveApproved = (leave: Leave): boolean => {
  return leave.status === 'approved'
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const calculateAttendancePercentage = (
  present: number,
  total: number
): number => {
  if (total === 0) return 0
  return Math.round((present / total) * 100)
}

export const calculateLateMinutes = (
  checkIn: string,
  expectedStartTime: string
): number => {
  const checkInDate = new Date(`2000-01-01T${checkIn}`)
  const expectedDate = new Date(`2000-01-01T${expectedStartTime}`)
  
  const diffMinutes = (checkInDate.getTime() - expectedDate.getTime()) / (1000 * 60)
  return diffMinutes > 0 ? Math.round(diffMinutes) : 0
}

export const calculateTotalHours = (
  checkIn: string,
  checkOut: string
): number => {
  const checkInDate = new Date(`2000-01-01T${checkIn}`)
  const checkOutDate = new Date(`2000-01-01T${checkOut}`)
  
  const diffHours = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60)
  return Math.round(diffHours * 10) / 10
}

export const getAttendanceStatusBadgeColor = (status: AttendanceStatus): string => {
  switch (status) {
    case 'present': return 'bg-green-500/20 text-green-300'
    case 'absent': return 'bg-red-500/20 text-red-300'
    case 'late': return 'bg-yellow-500/20 text-yellow-300'
    case 'half-day': return 'bg-orange-500/20 text-orange-300'
    case 'leave': return 'bg-blue-500/20 text-blue-300'
    case 'holiday': return 'bg-purple-500/20 text-purple-300'
    case 'sick': return 'bg-pink-500/20 text-pink-300'
    case 'emergency': return 'bg-red-500/20 text-red-300'
    case 'remote': return 'bg-indigo-500/20 text-indigo-300'
    case 'field-trip': return 'bg-teal-500/20 text-teal-300'
    case 'suspended': return 'bg-gray-500/20 text-gray-300'
    case 'not-marked': return 'bg-gray-500/20 text-gray-300'
    case 'pending-approval': return 'bg-yellow-500/20 text-yellow-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getLeaveStatusBadgeColor = (status: LeaveStatus): string => {
  switch (status) {
    case 'pending': return 'bg-yellow-500/20 text-yellow-300'
    case 'approved': return 'bg-green-500/20 text-green-300'
    case 'rejected': return 'bg-red-500/20 text-red-300'
    case 'cancelled': return 'bg-gray-500/20 text-gray-300'
    case 'expired': return 'bg-orange-500/20 text-orange-300'
    case 'in-progress': return 'bg-blue-500/20 text-blue-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getAlertSeverityColor = (severity: AlertSeverity): string => {
  switch (severity) {
    case 'info': return 'bg-blue-500/20 text-blue-300'
    case 'warning': return 'bg-yellow-500/20 text-yellow-300'
    case 'danger': return 'bg-red-500/20 text-red-300'
    case 'success': return 'bg-green-500/20 text-green-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const formatAttendanceDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export const formatAttendanceTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-PK', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const groupAttendanceByStatus = (
  records: AttendanceRecord[]
): Record<AttendanceStatus, number> => {
  return records.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1
    return acc
  }, {} as Record<AttendanceStatus, number>)
}

export const calculateMonthlyAttendance = (
  records: AttendanceRecord[],
  month: number,
  year: number
): MonthlyAttendanceSummary => {
  const monthRecords = records.filter(r => {
    const date = new Date(r.createdAt)
    return date.getMonth() + 1 === month && date.getFullYear() === year
  })

  const present = monthRecords.filter(r => r.status === 'present').length
  const absent = monthRecords.filter(r => r.status === 'absent').length
  const late = monthRecords.filter(r => r.status === 'late').length
  const leave = monthRecords.filter(r => r.status === 'leave').length
  const total = monthRecords.length

  return {
    month: new Date(year, month - 1).toLocaleString('default', { month: 'long' }),
    year,
    totalDays: total,
    present,
    absent,
    late,
    leave,
    percentage: calculateAttendancePercentage(present + late, total)
  }
}

export const getStudentsWithLowAttendance = (
  records: AttendanceRecord[],
  threshold: number = 75
): LowPerformer[] => {
  const studentMap = new Map<string, { name: string; present: number; total: number }>()

  records.forEach(record => {
    if (!studentMap.has(record.entityId)) {
      studentMap.set(record.entityId, {
        name: record.entityName,
        present: 0,
        total: 0
      })
    }

    const stats = studentMap.get(record.entityId)!
    stats.total++
    if (record.status === 'present' || record.status === 'late') {
      stats.present++
    }
  })

  return Array.from(studentMap.entries())
    .map(([id, stats]) => ({
      entityId: id,
      entityName: stats.name,
      attendancePercentage: calculateAttendancePercentage(stats.present, stats.total),
      daysAbsent: stats.total - stats.present,
      warnings: 0
    }))
    .filter(s => s.attendancePercentage < threshold)
    .sort((a, b) => a.attendancePercentage - b.attendancePercentage)
}

// ============================================
// CONSTANTS
// ============================================

export const ATTENDANCE_STATUSES: AttendanceStatus[] = [
  'present', 'absent', 'late', 'half-day', 'leave', 'holiday',
  'sick', 'emergency', 'remote', 'field-trip', 'suspended', 
  'not-marked', 'pending-approval'  // Added pending-approval here
]

export const ATTENDANCE_TYPES: AttendanceType[] = [
  'daily', 'period-wise', 'subject-wise', 'event', 'exam', 'special'
]

export const ENTITY_TYPES: EntityType[] = [
  'student', 'teacher', 'staff', 'class', 'section', 'all'
]

export const LEAVE_TYPES: LeaveType[] = [
  'annual', 'sick', 'casual', 'study', 'maternity', 'paternity',
  'bereavement', 'hajj', 'umrah', 'emergency', 'unpaid', 'other'
]

export const LEAVE_STATUSES: LeaveStatus[] = [
  'pending', 'approved', 'rejected', 'cancelled', 'expired', 'in-progress'
]

export const ALERT_TYPES: AlertType[] = [
  'low-attendance', 'excessive-absences', 'excessive-late', 'leave-pending',
  'leave-approved', 'leave-rejected', 'holiday', 'reminder'
]

export const ALERT_SEVERITIES: AlertSeverity[] = ['info', 'warning', 'danger', 'success']

// ============================================
// MOCK DATA CREATORS (for development)
// ============================================

export const createMockAttendanceRecord = (
  overrides?: Partial<AttendanceRecord>
): AttendanceRecord => {
  const statuses: AttendanceStatus[] = [
    'present', 'absent', 'late', 'leave', 'pending-approval'
  ]
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

  return {
    id: `record-${Date.now()}`,
    entityId: `student-${Math.floor(Math.random() * 100)}`,
    entityName: 'Ali Ahmed',
    rollNo: '101',
    class: '10',
    section: 'A',
    status: randomStatus,
    checkIn: randomStatus === 'present' ? '08:00' : undefined,
    checkOut: randomStatus === 'present' ? '14:00' : undefined,
    lateMinutes: randomStatus === 'late' ? 15 : undefined,
    remarks: randomStatus === 'absent' ? 'Family emergency' : undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}

export const createMockAttendance = (
  overrides?: Partial<Attendance>
): Attendance => {
  const records = Array.from({ length: 10 }, () => createMockAttendanceRecord())
  
  const present = records.filter(r => r.status === 'present').length
  const absent = records.filter(r => r.status === 'absent').length
  const late = records.filter(r => r.status === 'late').length
  const leave = records.filter(r => r.status === 'leave').length
  const pendingApproval = records.filter(r => r.status === 'pending-approval').length
  const total = records.length

  return {
    id: `attendance-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    type: 'daily',
    entityType: 'class',
    entityId: 'class-10-a',
    entityName: 'Class 10-A',
    class: '10',
    section: 'A',
    records,
    summary: {
      total,
      present,
      absent,
      late,
      halfDay: 0,
      leave,
      holiday: 0,
      sick: 0,
      emergency: 0,
      remote: 0,
      notMarked: 0,
      pendingApproval,
      presentPercentage: calculateAttendancePercentage(present + late, total),
      absentPercentage: calculateAttendancePercentage(absent, total),
      latePercentage: calculateAttendancePercentage(late, total)
    },
    markedBy: 'teacher-1',
    markedByName: 'Prof. Ahmad Raza',
    status: 'completed',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}

export const createMockLeave = (overrides?: Partial<Leave>): Leave => {
  const leaveTypes: LeaveType[] = ['sick', 'casual', 'annual', 'emergency']
  const randomType = leaveTypes[Math.floor(Math.random() * leaveTypes.length)]
  
  const fromDate = new Date()
  const toDate = new Date(fromDate)
  toDate.setDate(toDate.getDate() + 3)

  return {
    id: `leave-${Date.now()}`,
    entityId: 'teacher-1',
    entityName: 'Prof. Ahmad Raza',
    entityType: 'teacher',
    leaveType: randomType,
    fromDate: fromDate.toISOString().split('T')[0],
    toDate: toDate.toISOString().split('T')[0],
    totalDays: 3,
    reason: 'Medical emergency',
    status: 'pending',
    appliedOn: new Date(),
    emergencyContact: '0300-1234567',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}

export const createMockLeaveBalance = (overrides?: Partial<LeaveBalance>): LeaveBalance => {
  const leaveTypes: LeaveType[] = ['annual', 'sick', 'casual', 'study']
  
  const totalLeaves: LeaveBalanceDetail[] = leaveTypes.map(type => ({
    leaveType: type,
    total: type === 'annual' ? 24 : type === 'sick' ? 12 : type === 'casual' ? 10 : 5,
    used: 0,
    remaining: 0,
    pending: 0,
    approved: 0
  }))

  const usedLeaves: LeaveBalanceDetail[] = leaveTypes.map(type => ({
    leaveType: type,
    total: 0,
    used: type === 'annual' ? 5 : type === 'sick' ? 2 : type === 'casual' ? 3 : 0,
    remaining: 0,
    pending: 1,
    approved: type === 'annual' ? 4 : type === 'sick' ? 2 : type === 'casual' ? 2 : 0
  }))

  const remainingLeaves: LeaveBalanceDetail[] = leaveTypes.map((type, index) => ({
    leaveType: type,
    total: totalLeaves[index].total,
    used: usedLeaves[index].used,
    remaining: totalLeaves[index].total - usedLeaves[index].used,
    pending: usedLeaves[index].pending,
    approved: usedLeaves[index].approved
  }))

  return {
    entityId: 'teacher-1',
    entityName: 'Prof. Ahmad Raza',
    entityType: 'teacher',
    academicYear: '2024-2025',
    totalLeaves,
    usedLeaves,
    remainingLeaves,
    lastUpdated: new Date(),
    ...overrides
  }
}