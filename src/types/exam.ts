// ============================================
// MAIN EXAM INTERFACES
// ============================================

export interface Exam {
  id: string
  name: string
  type: ExamType
  category: ExamCategory
  class: string
  section?: string
  subjects: ExamSubject[]
  startDate: Date | string
  endDate: Date | string
  academicYear: string
  term?: string
  totalMarks: number
  passingMarks: number
  status: ExamStatus
  description?: string
  instructions?: string[]
  createdBy: string
  createdAt: Date | string
  updatedAt: Date | string
  publishedAt?: Date | string
  resultsPublished?: boolean
}

export type ExamType = 
  | 'midterm' 
  | 'final' 
  | 'quarterly' 
  | 'half-yearly' 
  | 'annual' 
  | 'weekly test' 
  | 'monthly test' 
  | 'pre-board' 
  | 'entrance' 
  | 'competitive'

export type ExamCategory = 
  | 'written' 
  | 'oral' 
  | 'practical' 
  | 'viva' 
  | 'project' 
  | 'assignment' 
  | 'quiz'

export type ExamStatus = 
  | 'scheduled' 
  | 'ongoing' 
  | 'completed' 
  | 'cancelled' 
  | 'postponed' 
  | 'results-pending' 
  | 'results-published'

// ============================================
// EXAM SUBJECT INTERFACES
// ============================================

export interface ExamSubject {
  id: string
  examId: string
  subjectId: string
  subjectName: string
  subjectCode: string
  date: Date | string
  startTime: string
  endTime: string
  duration: number // in minutes
  totalMarks: number
  passingMarks: number
  theoryMarks?: number
  practicalMarks?: number
  oralMarks?: number
  teacherId?: string
  teacherName?: string
  room?: string
  isCompulsory: boolean
  syllabus?: string
  specialInstructions?: string[]
  status: ExamSubjectStatus
}

export type ExamSubjectStatus = 
  | 'scheduled' 
  | 'ongoing' 
  | 'completed' 
  | 'cancelled' 
  | 'postponed'

// ============================================
// EXAM RESULT INTERFACES
// ============================================

export interface ExamResult {
  id: string
  examId: string
  examName: string
  studentId: string
  studentName: string
  rollNo: string
  class: string
  section: string
  subjects: SubjectResult[]
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  gradePoint?: number
  cgpa?: number
  rank?: number
  division?: Division
  resultStatus: ResultStatus
  remarks?: string
  teacherRemarks?: string
  principalRemarks?: string
  checkedBy?: string
  verifiedBy?: string
  publishedAt?: Date | string
  createdAt: Date | string
  updatedAt: Date | string
}

export interface SubjectResult {
  subjectId: string
  subjectName: string
  subjectCode: string
  theoryMarks?: number
  practicalMarks?: number
  oralMarks?: number
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  gradePoint?: number
  position?: number
  status: 'pass' | 'fail' | 'absent' | 'withheld'
  teacherRemarks?: string
  isCompulsory: boolean
}

export type Division = 
  | 'first' 
  | 'second' 
  | 'third' 
  | 'distinction' 
  | 'none'

export type ResultStatus = 
  | 'pass' 
  | 'fail' 
  | 'supplementary' 
  | 'withheld' 
  | 'absent' 
  | 'pending'

// ============================================
// GRADE AND GRADING SYSTEM
// ============================================

export interface GradeSystem {
  id: string
  name: string
  grades: Grade[]
  isActive: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

export interface Grade {
  grade: string
  gradePoint: number
  minPercentage: number
  maxPercentage: number
  remarks: string
}

export const DEFAULT_GRADE_SYSTEM: Grade[] = [
  { grade: 'A+', gradePoint: 4.0, minPercentage: 90, maxPercentage: 100, remarks: 'Excellent' },
  { grade: 'A', gradePoint: 3.7, minPercentage: 80, maxPercentage: 89, remarks: 'Very Good' },
  { grade: 'B+', gradePoint: 3.3, minPercentage: 75, maxPercentage: 79, remarks: 'Good' },
  { grade: 'B', gradePoint: 3.0, minPercentage: 70, maxPercentage: 74, remarks: 'Above Average' },
  { grade: 'C+', gradePoint: 2.7, minPercentage: 65, maxPercentage: 69, remarks: 'Average' },
  { grade: 'C', gradePoint: 2.3, minPercentage: 60, maxPercentage: 64, remarks: 'Satisfactory' },
  { grade: 'D+', gradePoint: 2.0, minPercentage: 55, maxPercentage: 59, remarks: 'Pass' },
  { grade: 'D', gradePoint: 1.7, minPercentage: 50, maxPercentage: 54, remarks: 'Barely Pass' },
  { grade: 'F', gradePoint: 0.0, minPercentage: 0, maxPercentage: 49, remarks: 'Fail' }
]

// ============================================
// MARKSHEET AND REPORT CARD
// ============================================

export interface Marksheet {
  id: string
  examId: string
  examName: string
  studentId: string
  studentName: string
  rollNo: string
  class: string
  section: string
  fatherName: string
  motherName?: string
  dateOfBirth: Date | string
  schoolName: string
  academicYear: string
  subjects: SubjectResult[]
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  cgpa?: number
  rank?: number
  division?: Division
  attendance?: number
  result: ResultStatus
  remarks: string
  classTeacherRemarks?: string
  principalRemarks?: string
  issueDate: Date | string
  issuedBy: string
  verifiedBy?: string
}

export interface ReportCard {
  id: string
  studentId: string
  studentName: string
  rollNo: string
  class: string
  section: string
  academicYear: string
  terms: ReportCardTerm[]
  annualTotal?: number
  annualPercentage?: number
  annualGrade?: string
  annualRank?: number
  promoted: boolean
  nextClass?: string
  remarks: string
  issueDate: Date | string
}

export interface ReportCardTerm {
  termName: string
  examId: string
  examName: string
  subjects: SubjectResult[]
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  rank?: number
}

// ============================================
// EXAM SCHEDULE AND TIMETABLE
// ============================================

export interface ExamSchedule {
  id: string
  examId: string
  examName: string
  class: string
  sections: string[]
  subjects: ScheduledSubject[]
  academicYear: string
  publishedAt: Date | string
  publishedBy: string
}

export interface ScheduledSubject {
  subjectId: string
  subjectName: string
  subjectCode: string
  date: Date | string
  day: string
  startTime: string
  endTime: string
  duration: number
  totalMarks: number
  passingMarks: number
  room: string
  invigilators: string[]
  specialInstructions?: string[]
}

// ============================================
// SEAT PLAN AND INVIGILATION
// ============================================

export interface SeatPlan {
  id: string
  examId: string
  examName: string
  date: Date | string
  room: string
  rows: SeatRow[]
  invigilators: Invigilator[]
  totalSeats: number
  occupiedSeats: number
}

export interface SeatRow {
  rowNumber: number
  seats: Seat[]
}

export interface Seat {
  seatNumber: string
  studentId?: string
  studentName?: string
  rollNo?: string
  isOccupied: boolean
}

export interface Invigilator {
  teacherId: string
  teacherName: string
  room: string
  dutyTime: string
  isHead: boolean
}

// ============================================
// EXAM STATISTICS AND ANALYTICS
// ============================================

export interface ExamStatistics {
  examId: string
  examName: string
  totalStudents: number
  appearedStudents: number
  absentStudents: number
  passedStudents: number
  failedStudents: number
  passPercentage: number
  failPercentage: number
  highestMarks: number
  lowestMarks: number
  averageMarks: number
  gradeDistribution: Record<string, number>
  subjectWiseStats: SubjectStatistics[]
  classWiseStats?: ClassStatistics[]
}

export interface SubjectStatistics {
  subjectId: string
  subjectName: string
  totalStudents: number
  appearedStudents: number
  passedStudents: number
  failedStudents: number
  passPercentage: number
  averageMarks: number
  highestMarks: number
  lowestMarks: number
}

export interface ClassStatistics {
  className: string
  section: string
  totalStudents: number
  appearedStudents: number
  passedStudents: number
  passPercentage: number
  averagePercentage: number
  gradeDistribution: Record<string, number>
}

// ============================================
// EXAM FORMS AND REQUESTS
// ============================================

export interface ExamFormData {
  name: string
  type: ExamType
  category: ExamCategory
  class: string
  section?: string
  subjects: ExamSubjectInput[]
  startDate: string
  endDate: string
  academicYear: string
  term?: string
  description?: string
  instructions?: string[]
}

export interface ExamSubjectInput {
  subjectId: string
  subjectName: string
  date: string
  startTime: string
  endTime: string
  totalMarks: number
  passingMarks: number
  theoryMarks?: number
  practicalMarks?: number
  teacherId?: string
  room?: string
}

export interface ResultEntryData {
  examId: string
  subjectId: string
  class: string
  section: string
  marks: StudentMarksEntry[]
}

export interface StudentMarksEntry {
  studentId: string
  studentName: string
  rollNo: string
  theoryMarks?: number
  practicalMarks?: number
  oralMarks?: number
  obtainedMarks?: number
  isAbsent: boolean
  remarks?: string
}

// ============================================
// EXAM FILTERS AND QUERIES
// ============================================

export interface ExamFilters {
  type?: ExamType
  category?: ExamCategory
  class?: string
  section?: string
  status?: ExamStatus
  academicYear?: string
  term?: string
  fromDate?: Date | string
  toDate?: Date | string
  search?: string
  page?: number
  limit?: number
  sortBy?: keyof Exam
  sortOrder?: 'asc' | 'desc'
}

export interface ResultFilters {
  examId?: string
  class?: string
  section?: string
  studentId?: string
  rollNo?: string
  resultStatus?: ResultStatus
  minPercentage?: number
  maxPercentage?: number
  grade?: string
  search?: string
  page?: number
  limit?: number
}

// ============================================
// EXAM LIST RESPONSES
// ============================================

export interface ExamListResponse {
  exams: Exam[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
  statistics?: ExamOverviewStats
}

export interface ExamOverviewStats {
  totalExams: number
  scheduled: number
  ongoing: number
  completed: number
  cancelled: number
  byType: Record<ExamType, number>
  byClass: Record<string, number>
}

export interface ResultListResponse {
  results: ExamResult[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
  statistics?: ExamStatistics
}

// ============================================
// ADMIT CARD AND HALL TICKET
// ============================================

export interface AdmitCard {
  id: string
  examId: string
  examName: string
  studentId: string
  studentName: string
  rollNo: string
  class: string
  section: string
  fatherName: string
  motherName?: string
  photo?: string
  subjects: AdmitCardSubject[]
  examCenter: string
  room: string
  seatNumber?: string
  issueDate: Date | string
  validUntil: Date | string
  instructions: string[]
  qrCode?: string
  signature?: string
}

export interface AdmitCardSubject {
  subjectName: string
  subjectCode: string
  date: string
  time: string
  duration: string
  room: string
}

// ============================================
// TYPE GUARDS
// ============================================

export const isExamOngoing = (exam: Exam): boolean => {
  return exam.status === 'ongoing'
}

export const isExamCompleted = (exam: Exam): boolean => {
  return exam.status === 'completed' || exam.status === 'results-published'
}

export const isResultPublished = (exam: Exam): boolean => {
  return exam.resultsPublished === true
}

export const hasPassed = (result: ExamResult): boolean => {
  return result.resultStatus === 'pass'
}

export const hasFailed = (result: ExamResult): boolean => {
  return result.resultStatus === 'fail'
}

export const isAbsent = (result: ExamResult): boolean => {
  return result.resultStatus === 'absent'
}

export const isSubjectPassed = (subject: SubjectResult): boolean => {
  return subject.status === 'pass'
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const calculatePercentage = (obtained: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((obtained / total) * 100)
}

export const getGradeFromPercentage = (
  percentage: number, 
  gradeSystem: Grade[] = DEFAULT_GRADE_SYSTEM
): string => {
  const grade = gradeSystem.find(
    g => percentage >= g.minPercentage && percentage <= g.maxPercentage
  )
  return grade?.grade || 'F'
}

export const getGradePointFromPercentage = (
  percentage: number,
  gradeSystem: Grade[] = DEFAULT_GRADE_SYSTEM
): number => {
  const grade = gradeSystem.find(
    g => percentage >= g.minPercentage && percentage <= g.maxPercentage
  )
  return grade?.gradePoint || 0
}

export const calculateCGPA = (subjectResults: SubjectResult[]): number => {
  if (subjectResults.length === 0) return 0
  
  const totalGradePoints = subjectResults.reduce(
    (sum, subject) => sum + (subject.gradePoint || 0), 
    0
  )
  return totalGradePoints / subjectResults.length
}

export const getDivisionFromPercentage = (percentage: number): Division => {
  if (percentage >= 60) return 'first'
  if (percentage >= 50) return 'second'
  if (percentage >= 40) return 'third'
  return 'none'
}

export const calculateRank = (
  results: ExamResult[], 
  studentId: string
): number => {
  const sorted = [...results].sort((a, b) => b.percentage - a.percentage)
  return sorted.findIndex(r => r.studentId === studentId) + 1
}

export const getExamStatusBadgeColor = (status: ExamStatus): string => {
  switch (status) {
    case 'scheduled': return 'bg-blue-500/20 text-blue-300'
    case 'ongoing': return 'bg-green-500/20 text-green-300'
    case 'completed': return 'bg-purple-500/20 text-purple-300'
    case 'cancelled': return 'bg-red-500/20 text-red-300'
    case 'postponed': return 'bg-yellow-500/20 text-yellow-300'
    case 'results-pending': return 'bg-orange-500/20 text-orange-300'
    case 'results-published': return 'bg-indigo-500/20 text-indigo-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getResultStatusBadgeColor = (status: ResultStatus): string => {
  switch (status) {
    case 'pass': return 'bg-green-500/20 text-green-300'
    case 'fail': return 'bg-red-500/20 text-red-300'
    case 'supplementary': return 'bg-yellow-500/20 text-yellow-300'
    case 'withheld': return 'bg-orange-500/20 text-orange-300'
    case 'absent': return 'bg-gray-500/20 text-gray-300'
    case 'pending': return 'bg-blue-500/20 text-blue-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

export const getSubjectResultStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'pass': return 'bg-green-500/20 text-green-300'
    case 'fail': return 'bg-red-500/20 text-red-300'
    case 'absent': return 'bg-yellow-500/20 text-yellow-300'
    case 'withheld': return 'bg-orange-500/20 text-orange-300'
    default: return 'bg-gray-500/20 text-gray-300'
  }
}

// ============================================
// CONSTANTS
// ============================================

export const EXAM_TYPES: ExamType[] = [
  'midterm',
  'final',
  'quarterly',
  'half-yearly',
  'annual',
  'weekly test',
  'monthly test',
  'pre-board',
  'entrance',
  'competitive'
]

export const EXAM_CATEGORIES: ExamCategory[] = [
  'written',
  'oral',
  'practical',
  'viva',
  'project',
  'assignment',
  'quiz'
]

export const EXAM_STATUSES: ExamStatus[] = [
  'scheduled',
  'ongoing',
  'completed',
  'cancelled',
  'postponed',
  'results-pending',
  'results-published'
]

export const RESULT_STATUSES: ResultStatus[] = [
  'pass',
  'fail',
  'supplementary',
  'withheld',
  'absent',
  'pending'
]

export const DIVISIONS: Division[] = [
  'first',
  'second',
  'third',
  'distinction',
  'none'
]

// ============================================
// MOCK DATA CREATORS (for development)
// ============================================

export const createMockExam = (overrides?: Partial<Exam>): Exam => {
  const now = new Date()
  const startDate = new Date(now.setDate(now.getDate() + 7))
  const endDate = new Date(now.setDate(now.getDate() + 14))
  
  return {
    id: `exam-${Date.now()}`,
    name: 'Mid-Term Examinations 2024',
    type: 'midterm',
    category: 'written',
    class: '10',
    section: 'A',
    subjects: [
      {
        id: 'subj-1',
        examId: `exam-${Date.now()}`,
        subjectId: 'math-101',
        subjectName: 'Mathematics',
        subjectCode: 'MATH101',
        date: '2024-03-15',
        startTime: '09:00',
        endTime: '12:00',
        duration: 180,
        totalMarks: 100,
        passingMarks: 40,
        theoryMarks: 100,
        teacherId: 'teacher-1',
        teacherName: 'Prof. Ahmad Raza',
        room: 'Room 101',
        isCompulsory: true,
        status: 'scheduled'
      }
    ],
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    academicYear: '2024-2025',
    totalMarks: 100,
    passingMarks: 40,
    status: 'scheduled',
    createdBy: 'admin-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}

export const createMockExamResult = (
  studentId: string,
  studentName: string,
  overrides?: Partial<ExamResult>
): ExamResult => {
  const subjects: SubjectResult[] = [
    {
      subjectId: 'math-101',
      subjectName: 'Mathematics',
      subjectCode: 'MATH101',
      theoryMarks: 85,
      totalMarks: 100,
      obtainedMarks: 85,
      percentage: 85,
      grade: 'A',
      gradePoint: 3.7,
      status: 'pass',
      isCompulsory: true
    },
    {
      subjectId: 'phy-101',
      subjectName: 'Physics',
      subjectCode: 'PHY101',
      theoryMarks: 78,
      totalMarks: 100,
      obtainedMarks: 78,
      percentage: 78,
      grade: 'B+',
      gradePoint: 3.3,
      status: 'pass',
      isCompulsory: true
    }
  ]

  const totalMarks = subjects.reduce((sum, s) => sum + s.totalMarks, 0)
  const obtainedMarks = subjects.reduce((sum, s) => sum + s.obtainedMarks, 0)
  const percentage = calculatePercentage(obtainedMarks, totalMarks)

  return {
    id: `result-${Date.now()}`,
    examId: 'exam-1',
    examName: 'Mid-Term Examinations 2024',
    studentId,
    studentName,
    rollNo: '101',
    class: '10',
    section: 'A',
    subjects,
    totalMarks,
    obtainedMarks,
    percentage,
    grade: getGradeFromPercentage(percentage),
    gradePoint: getGradePointFromPercentage(percentage),
    division: getDivisionFromPercentage(percentage),
    resultStatus: percentage >= 40 ? 'pass' : 'fail',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}