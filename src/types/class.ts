// ============================================
// MAIN CLASS INTERFACES
// ============================================

export interface Class {
  id: string
  name: string
  displayName: string
  section: string
  sectionDisplay?: string
  classLevel: number
  academicYear: string
  session: string
  
  // Capacity
  totalSeats: number
  occupiedSeats: number
  availableSeats: number
  waitlistCount?: number
  
  // Teachers
  classTeacherId?: string
  classTeacherName?: string
  subjectTeachers: SubjectTeacher[]
  
  // Students
  students: ClassStudent[]
  studentCount: number
  boysCount: number
  girlsCount: number
  
  // Schedule
  timetable?: Timetable
  weeklySchedule?: WeeklySchedule
  
  // Subjects
  subjects: ClassSubject[]
  compulsorySubjects: string[]
  electiveSubjects?: ElectiveSubject[]
  
  // Academic
  syllabus?: Syllabus
  textbooks?: Textbook[]
  examSchedule?: ExamSchedule[]
  
  // Physical
  room: string
  building?: string
  floor?: number
  
  // Status
  status: ClassStatus
  type: ClassType
  category: ClassCategory
  
  // Timestamps
  createdAt: Date | string
  updatedAt: Date | string
  createdBy?: string
  updatedBy?: string
}

export type ClassStatus = 
  | 'active' 
  | 'inactive' 
  | 'archived' 
  | 'pending' 
  | 'discontinued'

export type ClassType = 
  | 'regular' 
  | 'preparatory' 
  | 'remedial' 
  | 'honors' 
  | 'advanced' 
  | 'special'

export type ClassCategory = 
  | 'primary' 
  | 'middle' 
  | 'secondary' 
  | 'higher-secondary' 
  | 'preschool' 
  | 'other'

// ============================================
// CLASS STUDENT INTERFACES
// ============================================

export interface ClassStudent {
  id: string
  studentId: string
  rollNo: string
  name: string
  fatherName: string
  gender: 'male' | 'female'
  attendance?: number
  performance?: StudentPerformance
  status: 'active' | 'inactive' | 'transferred' | 'withdrawn'
  joinedAt: Date | string
  leftAt?: Date | string
}

export interface StudentPerformance {
  averageMarks: number
  percentage: number
  grade: string
  rank: number
  lastUpdated: Date | string
}

// ============================================
// SUBJECT TEACHER INTERFACES
// ============================================

export interface SubjectTeacher {
  subjectId: string
  subjectName: string
  subjectCode: string
  teacherId: string
  teacherName: string
  teacherQualification?: string
  periodsPerWeek: number
  isClassTeacher?: boolean
}

// ============================================
// CLASS SUBJECT INTERFACES
// ============================================

export interface ClassSubject {
  id: string
  subjectId: string
  subjectCode: string
  subjectName: string
  subjectType: SubjectType
  category: SubjectCategory
  isCompulsory: boolean
  isElective?: boolean
  electiveGroup?: string
  totalMarks: number
  theoryMarks?: number
  practicalMarks?: number
  oralMarks?: number
  passingMarks: number
  periodsPerWeek: number
  teacherId?: string
  teacherName?: string
  textbook?: Textbook
  syllabus?: Syllabus
  status: 'active' | 'inactive'
}

export type SubjectType = 
  | 'theory' 
  | 'practical' 
  | 'theory+practical' 
  | 'oral' 
  | 'project' 
  | 'assignment'

export type SubjectCategory = 
  | 'language' 
  | 'science' 
  | 'mathematics' 
  | 'social studies' 
  | 'islamiat' 
  | 'computer' 
  | 'arts' 
  | 'physical education' 
  | 'elective' 
  | 'core'

export interface ElectiveSubject {
  group: string
  name: string
  subjects: ElectiveOption[]
  maxSelections: number
  minSelections: number
}

export interface ElectiveOption {
  subjectId: string
  subjectName: string
  subjectCode: string
  totalMarks: number
  availableSeats: number
  teacherId?: string
}

// ============================================
// TIMETABLE INTERFACES
// ============================================

export interface Timetable {
  id: string
  classId: string
  className: string
  section: string
  academicYear: string
  effectiveFrom: Date | string
  effectiveTo?: Date | string
  days: TimetableDay[]
  periodsPerDay: number
  totalPeriods: number
  breakTime?: BreakTime[]
  lastUpdated: Date | string
}

export interface TimetableDay {
  day: WeekDay
  isHoliday: boolean
  periods: TimetablePeriod[]
}

export type WeekDay = 
  | 'monday' 
  | 'tuesday' 
  | 'wednesday' 
  | 'thursday' 
  | 'friday' 
  | 'saturday' 
  | 'sunday'

export interface TimetablePeriod {
  periodNumber: number
  startTime: string
  endTime: string
  duration: number // in minutes
  subjectId?: string
  subjectName?: string
  teacherId?: string
  teacherName?: string
  room?: string
  isBreak: boolean
  breakType?: BreakType
  isLab?: boolean
  isDoublePeriod?: boolean
  remarks?: string
}

export type BreakType = 'short' | 'lunch' | 'prayer' | 'assembly' | 'other'

export interface BreakTime {
  name: string
  startTime: string
  endTime: string
  duration: number
  type: BreakType
}

export interface WeeklySchedule {
  weekStarting: Date | string
  weekEnding: Date | string
  days: DailySchedule[]
  specialEvents?: SpecialEvent[]
}

export interface DailySchedule {
  date: Date | string
  day: WeekDay
  isHoliday: boolean
  holidayName?: string
  periods: TimetablePeriod[]
  specialInstructions?: string[]
}

export interface SpecialEvent {
  name: string
  date: Date | string
  periodNumber?: number
  description?: string
  affectsSchedule: boolean
  alternateSchedule?: TimetablePeriod[]
}

// ============================================
// SYLLABUS INTERFACES
// ============================================

export interface Syllabus {
  id: string
  classId: string
  className: string
  section: string
  academicYear: string
  term?: string
  subjects: SubjectSyllabus[]
  publishedAt: Date | string
  publishedBy: string
  lastUpdated: Date | string
}

export interface SubjectSyllabus {
  subjectId: string
  subjectName: string
  subjectCode: string
  totalChapters: number
  chapters: Chapter[]
  books: Textbook[]
  referenceBooks?: Textbook[]
  practicalWork?: PracticalWork[]
  assignments?: Assignment[]
  weightage: number
  completionStatus: number // percentage
  remarks?: string
}

export interface Chapter {
  id: string
  number: number
  title: string
  topics: Topic[]
  pageNumbers?: string
  weightage: number // percentage in exam
  estimatedPeriods: number
  completedPeriods: number
  status: 'not-started' | 'in-progress' | 'completed'
  startDate?: Date | string
  completionDate?: Date | string
  remarks?: string
}

export interface Topic {
  id: string
  name: string
  subtopics?: string[]
  isImportant: boolean
  completed: boolean
}

export interface Textbook {
  id: string
  title: string
  author: string
  publisher: string
  edition?: string
  year: number
  isbn?: string
  price?: number
  required: boolean
  availableInLibrary: boolean
}

export interface PracticalWork {
  id: string
  title: string
  description: string
  duration: number // in minutes
  materials?: string[]
  completed: boolean
  date?: Date | string
}

export interface Assignment {
  id: string
  title: string
  description: string
  dueDate: Date | string
  totalMarks: number
  weightage: number
  submittedCount?: number
  status: 'pending' | 'assigned' | 'submitted' | 'graded'
}

// ============================================
// EXAM SCHEDULE INTERFACES
// ============================================

export interface ExamSchedule {
  id: string
  examId: string
  examName: string
  examType: string
  classId: string
  className: string
  section: string
  subjects: ExamSubjectSchedule[]
  startDate: Date | string
  endDate: Date | string
  publishedAt?: Date | string
  room?: string
  instructions?: string[]
}

export interface ExamSubjectSchedule {
  subjectId: string
  subjectName: string
  date: Date | string
  startTime: string
  endTime: string
  duration: number
  totalMarks: number
  passingMarks: number
  room?: string
  invigilators?: string[]
}

// ============================================
// CLASS ROUTINE/DAILY SCHEDULE
// ============================================

export interface ClassRoutine {
  id: string
  classId: string
  className: string
  section: string
  date: Date | string
  day: WeekDay
  periods: RoutinePeriod[]
  substitutions?: TeacherSubstitution[]
  announcements?: string[]
  updatedAt: Date | string
}

export interface RoutinePeriod {
  periodNumber: number
  startTime: string
  endTime: string
  subjectId: string
  subjectName: string
  teacherId: string
  teacherName: string
  room: string
  status: 'regular' | 'substituted' | 'cancelled' | 'special'
  substitutedBy?: string
  remarks?: string
}

export interface TeacherSubstitution {
  periodNumber: number
  originalTeacherId: string
  originalTeacherName: string
  substituteTeacherId: string
  substituteTeacherName: string
  reason: string
  date: Date | string
}

// ============================================
// CLASS PERFORMANCE AND STATISTICS
// ============================================

export interface ClassPerformance {
  classId: string
  className: string
  section: string
  academicYear: string
  term?: string
  overallStats: OverallStats
  subjectWiseStats: SubjectWiseStats[]
  studentWiseStats: StudentWiseStats[]
  attendanceStats: AttendanceStats
  comparativeStats?: ComparativeStats
  lastUpdated: Date | string
}

export interface OverallStats {
  totalStudents: number
  averagePercentage: number
  highestPercentage: number
  lowestPercentage: number
  passCount: number
  failCount: number
  passPercentage: number
  gradeDistribution: Record<string, number>
  rankDistribution: Record<string, number>
}

export interface SubjectWiseStats {
  subjectId: string
  subjectName: string
  totalStudents: number
  averageMarks: number
  highestMarks: number
  lowestMarks: number
  passCount: number
  failCount: number
  passPercentage: number
  gradeDistribution: Record<string, number>
}

export interface StudentWiseStats {
  studentId: string
  studentName: string
  rollNo: string
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  rank: number
  subjectWise: Record<string, number>
}

export interface AttendanceStats {
  averageAttendance: number
  highestAttendance: number
  lowestAttendance: number
  presentCount: number
  absentCount: number
  lateCount: number
  leaveCount: number
  monthlyTrend: MonthlyAttendance[]
}

export interface MonthlyAttendance {
  month: string
  year: number
  percentage: number
  totalDays: number
  presentDays: number
}

export interface ComparativeStats {
  vsPreviousTerm: number
  vsPreviousYear: number
  vsSchoolAverage: number
  vsSectionA?: number
  vsSectionB?: number
}

// ============================================
// CLASS FILTERS AND QUERIES
// ============================================

export interface ClassFilters {
  classLevel?: number
  section?: string
  status?: ClassStatus
  type?: ClassType
  category?: ClassCategory
  academicYear?: string
  classTeacherId?: string
  subjectId?: string
  hasVacancy?: boolean
  search?: string
  page?: number
  limit?: number
  sortBy?: keyof Class
  sortOrder?: 'asc' | 'desc'
}

export interface StudentFilters {
  classId?: string
  section?: string
  gender?: 'male' | 'female'
  status?: string
  minAttendance?: number
  maxAttendance?: number
  search?: string
  page?: number
  limit?: number
}

// ============================================
// CLASS LIST RESPONSES
// ============================================

export interface ClassListResponse {
  classes: Class[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
  stats?: ClassOverviewStats
}

export interface ClassOverviewStats {
  totalClasses: number
  activeClasses: number
  totalStudents: number
  totalTeachers: number
  averageClassSize: number
  byLevel: Record<number, number>
  bySection: Record<string, number>
  byStatus: Record<ClassStatus, number>
  vacancyCount: number
  waitlistCount: number
}

export interface StudentListResponse {
  students: ClassStudent[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
  stats?: StudentOverviewStats
}

export interface StudentOverviewStats {
  total: number
  boys: number
  girls: number
  active: number
  transferred: number
  averageAttendance: number
}

// ============================================
// CLASS FORM DATA
// ============================================

export interface ClassFormData {
  name: string
  displayName: string
  section: string
  sectionDisplay?: string
  classLevel: number
  academicYear: string
  totalSeats: number
  classTeacherId?: string
  subjects: ClassSubjectInput[]
  room: string
  building?: string
  floor?: number
  type: ClassType
  category: ClassCategory
}

export interface ClassSubjectInput {
  subjectId: string
  subjectName: string
  subjectCode: string
  isCompulsory: boolean
  isElective?: boolean
  electiveGroup?: string
  totalMarks: number
  theoryMarks?: number
  practicalMarks?: number
  periodsPerWeek: number
  teacherId?: string
}

export interface TimetableFormData {
  classId: string
  effectiveFrom: string
  periodsPerDay: number
  days: TimetableDayInput[]
  breakTime?: BreakTimeInput[]
}

export interface TimetableDayInput {
  day: WeekDay
  isHoliday: boolean
  periods: TimetablePeriodInput[]
}

export interface TimetablePeriodInput {
  periodNumber: number
  startTime: string
  endTime: string
  subjectId?: string
  teacherId?: string
  room?: string
  isBreak: boolean
  breakType?: BreakType
  isLab?: boolean
}

export interface BreakTimeInput {
  name: string
  startTime: string
  endTime: string
  type: BreakType
}

// ============================================
// TYPE GUARDS
// ============================================

export const isClassActive = (cls: Class): boolean => {
  return cls.status === 'active'
}

export const hasVacancy = (cls: Class): boolean => {
  return cls.availableSeats > 0
}

export const isFull = (cls: Class): boolean => {
  return cls.occupiedSeats >= cls.totalSeats
}

export const hasClassTeacher = (cls: Class): boolean => {
  return cls.classTeacherId !== undefined && cls.classTeacherId !== ''
}

export const hasSubject = (cls: Class, subjectId: string): boolean => {
  return cls.subjects.some(s => s.subjectId === subjectId)
}

export const isSubjectCompulsory = (cls: Class, subjectId: string): boolean => {
  const subject = cls.subjects.find(s => s.subjectId === subjectId)
  return subject?.isCompulsory || false
}

export const getStudentById = (cls: Class, studentId: string): ClassStudent | undefined => {
  return cls.students.find(s => s.studentId === studentId)
}

export const getSubjectTeacher = (cls: Class, subjectId: string): SubjectTeacher | undefined => {
  return cls.subjectTeachers.find(t => t.subjectId === subjectId)
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const calculateAvailableSeats = (cls: Class): number => {
  return cls.totalSeats - cls.occupiedSeats
}

export const calculateOccupancyRate = (cls: Class): number => {
  if (cls.totalSeats === 0) return 0
  return (cls.occupiedSeats / cls.totalSeats) * 100
}

export const calculateBoysGirlsRatio = (cls: Class): string => {
  if (cls.girlsCount === 0) return `${cls.boysCount}:0`
  return `${cls.boysCount}:${cls.girlsCount}`
}

export const getClassDisplayName = (cls: Class): string => {
  if (cls.sectionDisplay) {
    return `${cls.displayName} - ${cls.sectionDisplay}`
  }
  return `${cls.displayName} - Section ${cls.section}`
}

export const getClassStatusBadgeColor = (status: ClassStatus): string => {
  switch (status) {
    case 'active': return 'bg-green-500/20 text-green-300'
    case 'inactive': return 'bg-gray-500/20 text-gray-300'
    case 'archived': return 'bg-yellow-500/20 text-yellow-300'
    case 'pending': return 'bg-blue-500/20 text-blue-300'
    case 'discontinued': return 'bg-red-500/20 text-red-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getClassTypeBadgeColor = (type: ClassType): string => {
  switch (type) {
    case 'regular': return 'bg-green-500/20 text-green-300'
    case 'preparatory': return 'bg-blue-500/20 text-blue-300'
    case 'remedial': return 'bg-yellow-500/20 text-yellow-300'
    case 'honors': return 'bg-purple-500/20 text-purple-300'
    case 'advanced': return 'bg-orange-500/20 text-orange-300'
    case 'special': return 'bg-pink-500/20 text-pink-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getClassCategoryColor = (category: ClassCategory): string => {
  switch (category) {
    case 'preschool': return 'bg-pink-500/20 text-pink-300'
    case 'primary': return 'bg-blue-500/20 text-blue-300'
    case 'middle': return 'bg-green-500/20 text-green-300'
    case 'secondary': return 'bg-yellow-500/20 text-yellow-300'
    case 'higher-secondary': return 'bg-orange-500/20 text-orange-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getDayInUrdu = (day: WeekDay): string => {
  const days: Record<WeekDay, string> = {
    monday: 'پیر',
    tuesday: 'منگل',
    wednesday: 'بدھ',
    thursday: 'جمعرات',
    friday: 'جمعہ',
    saturday: 'ہفتہ',
    sunday: 'اتوار'
  }
  return days[day]
}

export const calculatePeriodsPerWeek = (timetable: Timetable): number => {
  return timetable.days.reduce((total, day) => {
    return total + day.periods.filter(p => !p.isBreak).length
  }, 0)
}

export const getTeacherWorkload = (timetable: Timetable, teacherId: string): number => {
  let count = 0
  timetable.days.forEach(day => {
    day.periods.forEach(period => {
      if (period.teacherId === teacherId) count++
    })
  })
  return count
}

export const getNextPeriod = (
  timetable: Timetable,
  currentDay: WeekDay,
  currentPeriod: number
): TimetablePeriod | null => {
  const dayIndex = timetable.days.findIndex(d => d.day === currentDay)
  if (dayIndex === -1) return null
  
  const currentDayPeriods = timetable.days[dayIndex].periods
  if (currentPeriod < currentDayPeriods.length - 1) {
    return currentDayPeriods[currentPeriod + 1]
  }
  
  if (dayIndex < timetable.days.length - 1) {
    const nextDay = timetable.days[dayIndex + 1]
    return nextDay.periods.find(p => !p.isBreak) || null
  }
  
  return null
}

// ============================================
// CONSTANTS
// ============================================

export const CLASS_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const CLASS_SECTIONS = ['A', 'B', 'C', 'D', 'E']

export const CLASS_STATUSES: ClassStatus[] = [
  'active', 'inactive', 'archived', 'pending', 'discontinued'
]

export const CLASS_TYPES: ClassType[] = [
  'regular', 'preparatory', 'remedial', 'honors', 'advanced', 'special'
]

export const CLASS_CATEGORIES: ClassCategory[] = [
  'preschool', 'primary', 'middle', 'secondary', 'higher-secondary', 'other'
]

export const WEEK_DAYS: WeekDay[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
]

export const BREAK_TYPES: BreakType[] = ['short', 'lunch', 'prayer', 'assembly', 'other']

export const SUBJECT_TYPES: SubjectType[] = [
  'theory', 'practical', 'theory+practical', 'oral', 'project', 'assignment'
]

export const SUBJECT_CATEGORIES: SubjectCategory[] = [
  'language', 'science', 'mathematics', 'social studies', 'islamiat',
  'computer', 'arts', 'physical education', 'elective', 'core'
]

// ============================================
// MOCK DATA CREATORS (for development)
// ============================================

export const createMockClass = (overrides?: Partial<Class>): Class => {
  const now = new Date()
  
  const subjects: ClassSubject[] = [
    {
      id: 'subj-1',
      subjectId: 'math-101',
      subjectCode: 'MATH101',
      subjectName: 'Mathematics',
      subjectType: 'theory+practical',
      category: 'mathematics',
      isCompulsory: true,
      totalMarks: 100,
      theoryMarks: 80,
      practicalMarks: 20,
      passingMarks: 40,
      periodsPerWeek: 6,
      teacherId: 'teacher-1',
      teacherName: 'Prof. Ahmad Raza',
      status: 'active'
    },
    {
      id: 'subj-2',
      subjectId: 'phy-101',
      subjectCode: 'PHY101',
      subjectName: 'Physics',
      subjectType: 'theory+practical',
      category: 'science',
      isCompulsory: true,
      totalMarks: 100,
      theoryMarks: 70,
      practicalMarks: 30,
      passingMarks: 40,
      periodsPerWeek: 5,
      teacherId: 'teacher-2',
      teacherName: 'Dr. Muhammad Ali',
      status: 'active'
    }
  ]

  const subjectTeachers: SubjectTeacher[] = [
    {
      subjectId: 'math-101',
      subjectName: 'Mathematics',
      subjectCode: 'MATH101',
      teacherId: 'teacher-1',
      teacherName: 'Prof. Ahmad Raza',
      periodsPerWeek: 6
    },
    {
      subjectId: 'phy-101',
      subjectName: 'Physics',
      subjectCode: 'PHY101',
      teacherId: 'teacher-2',
      teacherName: 'Dr. Muhammad Ali',
      periodsPerWeek: 5
    }
  ]

  const students: ClassStudent[] = [
    {
      id: 'student-1',
      studentId: 'stu-101',
      rollNo: '101',
      name: 'Ali Ahmed',
      fatherName: 'Ahmed Khan',
      gender: 'male',
      status: 'active',
      joinedAt: new Date('2024-03-01')
    },
    {
      id: 'student-2',
      studentId: 'stu-102',
      rollNo: '102',
      name: 'Bilal Hassan',
      fatherName: 'Hassan Ali',
      gender: 'male',
      status: 'active',
      joinedAt: new Date('2024-03-01')
    }
  ]

  return {
    id: `class-${Date.now()}`,
    name: '10',
    displayName: 'Class 10',
    section: 'A',
    sectionDisplay: 'Gold',
    classLevel: 10,
    academicYear: '2024-2025',
    session: '2024-2025',
    
    totalSeats: 50,
    occupiedSeats: 45,
    availableSeats: 5,
    waitlistCount: 2,
    
    classTeacherId: 'teacher-1',
    classTeacherName: 'Prof. Ahmad Raza',
    subjectTeachers,
    
    students,
    studentCount: 45,
    boysCount: 25,
    girlsCount: 20,
    
    subjects,
    compulsorySubjects: ['math-101', 'phy-101', 'eng-101', 'urd-101'],
    
    room: 'Room 101',
    building: 'Main Building',
    floor: 1,
    
    status: 'active',
    type: 'regular',
    category: 'secondary',
    
    createdAt: new Date(),
    updatedAt: new Date(),
    
    ...overrides
  }
}

export const createMockTimetable = (classId: string, overrides?: Partial<Timetable>): Timetable => {
  const periods: TimetablePeriod[] = [
    {
      periodNumber: 1,
      startTime: '08:00',
      endTime: '08:45',
      duration: 45,
      subjectId: 'math-101',
      subjectName: 'Mathematics',
      teacherId: 'teacher-1',
      teacherName: 'Prof. Ahmad Raza',
      room: 'Room 101',
      isBreak: false
    },
    {
      periodNumber: 2,
      startTime: '08:45',
      endTime: '09:30',
      duration: 45,
      subjectId: 'phy-101',
      subjectName: 'Physics',
      teacherId: 'teacher-2',
      teacherName: 'Dr. Muhammad Ali',
      room: 'Lab 1',
      isBreak: false,
      isLab: true
    },
    {
      periodNumber: 3,
      startTime: '09:30',
      endTime: '10:00',
      duration: 30,
      isBreak: true,
      breakType: 'short'
    }
  ]

  const days: TimetableDay[] = WEEK_DAYS.slice(0, 6).map(day => ({
    day,
    isHoliday: day === 'saturday',
    periods: day === 'saturday' ? [] : periods
  }))

  return {
    id: `timetable-${Date.now()}`,
    classId,
    className: 'Class 10',
    section: 'A',
    academicYear: '2024-2025',
    effectiveFrom: new Date().toISOString().split('T')[0],
    days,
    periodsPerDay: 8,
    totalPeriods: 40,
    breakTime: [
      {
        name: 'Short Break',
        startTime: '09:30',
        endTime: '10:00',
        duration: 30,
        type: 'short'
      },
      {
        name: 'Lunch Break',
        startTime: '12:00',
        endTime: '12:30',
        duration: 30,
        type: 'lunch'
      }
    ],
    lastUpdated: new Date(),
    ...overrides
  }
}

export const createMockClassPerformance = (
  classId: string,
  overrides?: Partial<ClassPerformance>
): ClassPerformance => {
  return {
    classId,
    className: 'Class 10',
    section: 'A',
    academicYear: '2024-2025',
    term: 'Mid-Term',
    
    overallStats: {
      totalStudents: 45,
      averagePercentage: 75.5,
      highestPercentage: 98.5,
      lowestPercentage: 35.0,
      passCount: 40,
      failCount: 5,
      passPercentage: 88.9,
      gradeDistribution: {
        'A+': 5,
        'A': 10,
        'B': 15,
        'C': 8,
        'D': 2,
        'F': 5
      },
      rankDistribution: {
        'Top 10': 10,
        'Top 20': 20,
        'Above Average': 30,
        'Below Average': 15
      }
    },
    
    subjectWiseStats: [
      {
        subjectId: 'math-101',
        subjectName: 'Mathematics',
        totalStudents: 45,
        averageMarks: 72,
        highestMarks: 98,
        lowestMarks: 30,
        passCount: 38,
        failCount: 7,
        passPercentage: 84.4,
        gradeDistribution: {
          'A+': 4,
          'A': 8,
          'B': 12,
          'C': 10,
          'D': 4,
          'F': 7
        }
      }
    ],
    
    studentWiseStats: [
      {
        studentId: 'stu-101',
        studentName: 'Ali Ahmed',
        rollNo: '101',
        totalMarks: 500,
        obtainedMarks: 450,
        percentage: 90,
        grade: 'A+',
        rank: 1,
        subjectWise: {
          'Mathematics': 95,
          'Physics': 88
        }
      }
    ],
    
    attendanceStats: {
      averageAttendance: 92.5,
      highestAttendance: 100,
      lowestAttendance: 65,
      presentCount: 4050,
      absentCount: 250,
      lateCount: 50,
      leaveCount: 25,
      monthlyTrend: [
        {
          month: 'January',
          year: 2024,
          percentage: 94,
          totalDays: 22,
          presentDays: 20.68
        },
        {
          month: 'February',
          year: 2024,
          percentage: 91,
          totalDays: 20,
          presentDays: 18.2
        }
      ]
    },
    
    lastUpdated: new Date(),
    ...overrides
  }
}