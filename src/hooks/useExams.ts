'use client'

import { useState, useEffect, useCallback } from 'react'

// ============================================
// TYPES
// ============================================

export interface Exam {
  id: string
  name: string
  type: 'midterm' | 'final' | 'quarterly' | 'half-yearly' | 'annual' | 'test'
  class: string
  sections: string[]
  subject: string
  date: string
  startTime: string
  endTime: string
  duration: number
  totalMarks: number
  passingMarks: number
  room?: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  description?: string
}

export interface ExamResult {
  id: string
  examId: string
  studentId: string
  studentName: string
  rollNo: string
  class: string
  section: string
  marks: number
  totalMarks: number
  percentage: number
  grade: string
  status: 'pass' | 'fail' | 'absent'
  remarks?: string
}

export interface ExamFilters {
  type?: string
  class?: string
  section?: string
  status?: string
  fromDate?: string
  toDate?: string
  search?: string
}

export interface UseExamsReturn {
  exams: Exam[]
  loading: boolean
  error: string | null
  getExam: (id: string) => Exam | undefined
  getExamsByClass: (className: string) => Exam[]
  getExamsByType: (type: string) => Exam[]
  getUpcomingExams: () => Exam[]
  getOngoingExams: () => Exam[]
  getCompletedExams: () => Exam[]
  addExam: (exam: Omit<Exam, 'id'>) => Promise<boolean>
  updateExam: (id: string, updates: Partial<Exam>) => Promise<boolean>
  deleteExam: (id: string) => Promise<boolean>
  refreshExams: () => void
  searchExams: (query: string) => Exam[]
  filterExams: (filters: ExamFilters) => Exam[]
  getExamResults: (examId: string) => ExamResult[]
  addExamResult: (result: Omit<ExamResult, 'id'>) => Promise<boolean>
  updateExamResult: (id: string, marks: number) => Promise<boolean>
  getStudentResults: (studentId: string) => ExamResult[]
  calculateStatistics: (examId: string) => ExamStatistics | null
}

export interface ExamStatistics {
  totalStudents: number
  appearedStudents: number
  absentStudents: number
  passedStudents: number
  failedStudents: number
  passPercentage: number
  averageMarks: number
  highestMarks: number
  lowestMarks: number
  gradeDistribution: Record<string, number>
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_EXAMS: Exam[] = [
  {
    id: '1',
    name: 'Mid-Term Examinations 2024',
    type: 'midterm',
    class: '10',
    sections: ['A', 'B'],
    subject: 'Mathematics',
    date: '2024-03-15',
    startTime: '09:00',
    endTime: '12:00',
    duration: 180,
    totalMarks: 100,
    passingMarks: 40,
    room: 'Room 101',
    status: 'scheduled',
    description: 'Mid-term examination for Mathematics'
  },
  {
    id: '2',
    name: 'Mid-Term Examinations 2024',
    type: 'midterm',
    class: '10',
    sections: ['A', 'B'],
    subject: 'Physics',
    date: '2024-03-16',
    startTime: '09:00',
    endTime: '12:00',
    duration: 180,
    totalMarks: 100,
    passingMarks: 40,
    room: 'Room 102',
    status: 'scheduled',
    description: 'Mid-term examination for Physics'
  },
  {
    id: '3',
    name: 'Mid-Term Examinations 2024',
    type: 'midterm',
    class: '9',
    sections: ['A', 'B'],
    subject: 'Mathematics',
    date: '2024-03-15',
    startTime: '09:00',
    endTime: '12:00',
    duration: 180,
    totalMarks: 100,
    passingMarks: 40,
    room: 'Room 103',
    status: 'scheduled',
    description: 'Mid-term examination for Mathematics'
  },
  {
    id: '4',
    name: 'Final Examinations 2024',
    type: 'final',
    class: '10',
    sections: ['A', 'B'],
    subject: 'Mathematics',
    date: '2024-05-20',
    startTime: '09:00',
    endTime: '12:00',
    duration: 180,
    totalMarks: 100,
    passingMarks: 40,
    room: 'Room 101',
    status: 'scheduled',
    description: 'Final examination for Mathematics'
  },
  {
    id: '5',
    name: 'Weekly Test',
    type: 'test',
    class: '10',
    sections: ['A'],
    subject: 'Physics',
    date: '2024-02-10',
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    totalMarks: 25,
    passingMarks: 10,
    room: 'Room 102',
    status: 'completed',
    description: 'Weekly test on Chapter 5'
  }
]

const MOCK_RESULTS: ExamResult[] = [
  {
    id: 'r1',
    examId: '5',
    studentId: 's1',
    studentName: 'Ali Ahmed',
    rollNo: '101',
    class: '10',
    section: 'A',
    marks: 22,
    totalMarks: 25,
    percentage: 88,
    grade: 'A',
    status: 'pass'
  },
  {
    id: 'r2',
    examId: '5',
    studentId: 's2',
    studentName: 'Bilal Hassan',
    rollNo: '102',
    class: '10',
    section: 'A',
    marks: 18,
    totalMarks: 25,
    percentage: 72,
    grade: 'B',
    status: 'pass'
  },
  {
    id: 'r3',
    examId: '5',
    studentId: 's3',
    studentName: 'Sara Fatima',
    rollNo: '201',
    class: '9',
    section: 'B',
    marks: 0,
    totalMarks: 25,
    percentage: 0,
    grade: 'F',
    status: 'absent'
  }
]

// ============================================
// MAIN HOOK
// ============================================

export function useExams(): UseExamsReturn {
  const [exams, setExams] = useState<Exam[]>([])
  const [results, setResults] = useState<ExamResult[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Load data on mount
  useEffect(() => {
    loadExams()
    loadResults()
  }, [])

  // Load exams
  const loadExams = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setExams(MOCK_EXAMS)
    } catch (err) {
      setError('Failed to load exams')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Load results
  const loadResults = async (): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      setResults(MOCK_RESULTS)
    } catch (err) {
      console.error('Failed to load results', err)
    }
  }

  // Get single exam by ID
  const getExam = (id: string): Exam | undefined => {
    return exams.find(exam => exam.id === id)
  }

  // Get exams by class
  const getExamsByClass = (className: string): Exam[] => {
    return exams.filter(exam => exam.class === className)
  }

  // Get exams by type
  const getExamsByType = (type: string): Exam[] => {
    return exams.filter(exam => exam.type === type)
  }

  // Get upcoming exams (future dates)
  const getUpcomingExams = (): Exam[] => {
    const today = new Date().toISOString().split('T')[0]
    return exams.filter(exam => exam.date > today && exam.status === 'scheduled')
  }

  // Get ongoing exams (today)
  const getOngoingExams = (): Exam[] => {
    const today = new Date().toISOString().split('T')[0]
    return exams.filter(exam => exam.date === today && exam.status === 'ongoing')
  }

  // Get completed exams (past dates)
  const getCompletedExams = (): Exam[] => {
    const today = new Date().toISOString().split('T')[0]
    return exams.filter(exam => exam.date < today || exam.status === 'completed')
  }

  // Add new exam
  const addExam = async (exam: Omit<Exam, 'id'>): Promise<boolean> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newExam: Exam = {
        ...exam,
        id: Date.now().toString()
      }
      
      setExams(prev => [...prev, newExam])
      return true
    } catch (err) {
      setError('Failed to add exam')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Update existing exam
  const updateExam = async (id: string, updates: Partial<Exam>): Promise<boolean> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setExams(prev => 
        prev.map(exam => 
          exam.id === id ? { ...exam, ...updates } : exam
        )
      )
      
      return true
    } catch (err) {
      setError('Failed to update exam')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete exam
  const deleteExam = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setExams(prev => prev.filter(exam => exam.id !== id))
      return true
    } catch (err) {
      setError('Failed to delete exam')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Refresh exams
  const refreshExams = (): void => {
    loadExams()
  }

  // Search exams
  const searchExams = (query: string): Exam[] => {
    if (!query.trim()) return exams
    
    const lowerQuery = query.toLowerCase()
    
    return exams.filter(exam => 
      exam.name.toLowerCase().includes(lowerQuery) ||
      exam.subject.toLowerCase().includes(lowerQuery) ||
      exam.class.includes(lowerQuery) ||
      exam.description?.toLowerCase().includes(lowerQuery)
    )
  }

  // Filter exams
  const filterExams = useCallback((filters: ExamFilters): Exam[] => {
    return exams.filter(exam => {
      if (filters.type && exam.type !== filters.type) return false
      if (filters.class && exam.class !== filters.class) return false
      if (filters.section && !exam.sections.includes(filters.section)) return false
      if (filters.status && exam.status !== filters.status) return false
      if (filters.fromDate && exam.date < filters.fromDate) return false
      if (filters.toDate && exam.date > filters.toDate) return false
      if (filters.search) {
        const search = filters.search.toLowerCase()
        return (
          exam.name.toLowerCase().includes(search) ||
          exam.subject.toLowerCase().includes(search) ||
          exam.class.includes(search)
        )
      }
      return true
    })
  }, [exams])

  // Get exam results
  const getExamResults = (examId: string): ExamResult[] => {
    return results.filter(result => result.examId === examId)
  }

  // Add exam result
  const addExamResult = async (result: Omit<ExamResult, 'id'>): Promise<boolean> => {
    try {
      // Calculate percentage and grade
      const percentage = (result.marks / result.totalMarks) * 100
      let grade = 'F'
      if (percentage >= 90) grade = 'A+'
      else if (percentage >= 80) grade = 'A'
      else if (percentage >= 70) grade = 'B'
      else if (percentage >= 60) grade = 'C'
      else if (percentage >= 50) grade = 'D'

      const newResult: ExamResult = {
        ...result,
        id: Date.now().toString(),
        percentage,
        grade
      }
      
      setResults(prev => [...prev, newResult])
      return true
    } catch (err) {
      console.error('Failed to add result', err)
      return false
    }
  }

  // Update exam result
  const updateExamResult = async (id: string, marks: number): Promise<boolean> => {
    try {
      setResults(prev => 
        prev.map(result => {
          if (result.id === id) {
            const percentage = (marks / result.totalMarks) * 100
            let grade = 'F'
            if (percentage >= 90) grade = 'A+'
            else if (percentage >= 80) grade = 'A'
            else if (percentage >= 70) grade = 'B'
            else if (percentage >= 60) grade = 'C'
            else if (percentage >= 50) grade = 'D'
            
            return {
              ...result,
              marks,
              percentage,
              grade,
              status: marks >= result.totalMarks * 0.4 ? 'pass' : 'fail'
            }
          }
          return result
        })
      )
      return true
    } catch (err) {
      console.error('Failed to update result', err)
      return false
    }
  }

  // Get student results
  const getStudentResults = (studentId: string): ExamResult[] => {
    return results.filter(result => result.studentId === studentId)
  }

  // Calculate exam statistics
  const calculateStatistics = (examId: string): ExamStatistics | null => {
    const examResults = results.filter(r => r.examId === examId)
    
    if (examResults.length === 0) return null

    const totalStudents = examResults.length
    const appearedStudents = examResults.filter(r => r.status !== 'absent').length
    const absentStudents = examResults.filter(r => r.status === 'absent').length
    const passedStudents = examResults.filter(r => r.status === 'pass').length
    const failedStudents = examResults.filter(r => r.status === 'fail').length
    
    const passPercentage = appearedStudents > 0 
      ? (passedStudents / appearedStudents) * 100 
      : 0

    const marks = examResults
      .filter(r => r.status !== 'absent')
      .map(r => r.marks)
    
    const averageMarks = marks.length > 0
      ? marks.reduce((sum, m) => sum + m, 0) / marks.length
      : 0
    
    const highestMarks = marks.length > 0 ? Math.max(...marks) : 0
    const lowestMarks = marks.length > 0 ? Math.min(...marks) : 0

    // Grade distribution
    const gradeDistribution: Record<string, number> = {}
    examResults.forEach(result => {
      gradeDistribution[result.grade] = (gradeDistribution[result.grade] || 0) + 1
    })

    return {
      totalStudents,
      appearedStudents,
      absentStudents,
      passedStudents,
      failedStudents,
      passPercentage,
      averageMarks,
      highestMarks,
      lowestMarks,
      gradeDistribution
    }
  }

  return {
    exams,
    loading,
    error,
    getExam,
    getExamsByClass,
    getExamsByType,
    getUpcomingExams,
    getOngoingExams,
    getCompletedExams,
    addExam,
    updateExam,
    deleteExam,
    refreshExams,
    searchExams,
    filterExams,
    getExamResults,
    addExamResult,
    updateExamResult,
    getStudentResults,
    calculateStatistics
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function formatExamDate(date: string): string {
  return new Date(date).toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatExamTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export function getExamStatusColor(status: string): string {
  const colors: Record<string, string> = {
    scheduled: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    'A+': 'bg-green-100 text-green-800',
    'A': 'bg-green-100 text-green-800',
    'B': 'bg-blue-100 text-blue-800',
    'C': 'bg-yellow-100 text-yellow-800',
    'D': 'bg-orange-100 text-orange-800',
    'F': 'bg-red-100 text-red-800'
  }
  return colors[grade] || 'bg-gray-100 text-gray-800'
}

export function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'A+'
  if (percentage >= 80) return 'A'
  if (percentage >= 70) return 'B'
  if (percentage >= 60) return 'C'
  if (percentage >= 50) return 'D'
  return 'F'
}

export function validateExamForm(data: Partial<Exam>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!data.name) errors.name = 'Exam name is required'
  if (!data.type) errors.type = 'Exam type is required'
  if (!data.class) errors.class = 'Class is required'
  if (!data.subject) errors.subject = 'Subject is required'
  if (!data.date) errors.date = 'Date is required'
  if (!data.startTime) errors.startTime = 'Start time is required'
  if (!data.endTime) errors.endTime = 'End time is required'
  if (!data.totalMarks) errors.totalMarks = 'Total marks is required'
  if (!data.passingMarks) errors.passingMarks = 'Passing marks is required'

  if (data.totalMarks && data.passingMarks && data.passingMarks > data.totalMarks) {
    errors.passingMarks = 'Passing marks cannot exceed total marks'
  }

  if (data.startTime && data.endTime && data.startTime >= data.endTime) {
    errors.endTime = 'End time must be after start time'
  }

  return errors
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default useExams