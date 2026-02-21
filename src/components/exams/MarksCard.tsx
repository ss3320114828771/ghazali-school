'use client'

import React from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface SubjectMark {
  name: string
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  status: 'pass' | 'fail'
}

export interface MarksCardProps {
  studentName?: string
  rollNo?: string
  classNae?: string
  section?: string
  examName?: string
  examType?: string
  year?: number
  subjects?: SubjectMark[]
  totalMarks?: number
  obtainedMarks?: number
  percentage?: number
  grade?: string
  rank?: number
  result?: 'pass' | 'fail'
  schoolName?: string
  schoolAddress?: string
  showHeader?: boolean
  showFooter?: boolean
  onPrint?: () => void
  className?: string
}

// ============================================
// DEFAULT MOCK DATA
// ============================================

const DEFAULT_SUBJECTS: SubjectMark[] = [
  { name: 'Mathematics', totalMarks: 100, obtainedMarks: 85, percentage: 85, grade: 'A', status: 'pass' },
  { name: 'Physics', totalMarks: 100, obtainedMarks: 78, percentage: 78, grade: 'B+', status: 'pass' },
  { name: 'Chemistry', totalMarks: 100, obtainedMarks: 82, percentage: 82, grade: 'A', status: 'pass' },
  { name: 'English', totalMarks: 100, obtainedMarks: 90, percentage: 90, grade: 'A+', status: 'pass' },
  { name: 'Urdu', totalMarks: 100, obtainedMarks: 88, percentage: 88, grade: 'A', status: 'pass' },
  { name: 'Islamiat', totalMarks: 100, obtainedMarks: 95, percentage: 95, grade: 'A+', status: 'pass' }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

const getGradeColor = (grade: string): string => {
  if (grade === 'A+') return 'text-green-600 bg-green-100'
  if (grade === 'A') return 'text-green-600 bg-green-50'
  if (grade === 'B+') return 'text-blue-600 bg-blue-50'
  if (grade === 'B') return 'text-blue-600 bg-blue-50'
  if (grade === 'C') return 'text-yellow-600 bg-yellow-50'
  if (grade === 'D') return 'text-orange-600 bg-orange-50'
  if (grade === 'F') return 'text-red-600 bg-red-50'
  return 'text-gray-600 bg-gray-50'
}

const getResultColor = (result: string): string => {
  if (result === 'pass') return 'text-green-600 bg-green-100'
  if (result === 'fail') return 'text-red-600 bg-red-100'
  return 'text-gray-600 bg-gray-100'
}

const calculatePercentage = (obtained: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((obtained / total) * 100)
}

const getGradeFromPercentage = (percentage: number): string => {
  if (percentage >= 90) return 'A+'
  if (percentage >= 80) return 'A'
  if (percentage >= 70) return 'B'
  if (percentage >= 60) return 'C'
  if (percentage >= 50) return 'D'
  return 'F'
}

// ============================================
// SUBJECT ROW COMPONENT
// ============================================

interface SubjectRowProps {
  subject: SubjectMark
  index: number
}

function SubjectRow({ subject, index }: SubjectRowProps) {
  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
      <td className="px-4 py-2 text-sm text-gray-900">{subject.name}</td>
      <td className="px-4 py-2 text-sm text-gray-600 text-center">{subject.totalMarks}</td>
      <td className="px-4 py-2 text-sm text-gray-900 text-center font-medium">{subject.obtainedMarks}</td>
      <td className="px-4 py-2 text-sm text-gray-600 text-center">{subject.percentage}%</td>
      <td className="px-4 py-2 text-sm text-center">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
          {subject.grade}
        </span>
      </td>
      <td className="px-4 py-2 text-sm text-center">
        <span className={subject.status === 'pass' ? 'text-green-600' : 'text-red-600'}>
          {subject.status === 'pass' ? '✓' : '✗'}
        </span>
      </td>
    </tr>
  )
}

// ============================================
// MARKS CARD HEADER
// ============================================

interface MarksCardHeaderProps {
  schoolName: string
  schoolAddress: string
  examName: string
  examType: string
  year: number
}

function MarksCardHeader({ schoolName, schoolAddress, examName, examType, year }: MarksCardHeaderProps) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{schoolName}</h1>
      <p className="text-sm text-gray-600">{schoolAddress}</p>
      <div className="h-1 w-20 bg-green-600 mx-auto my-3"></div>
      <h2 className="text-xl font-semibold text-gray-800">{examName}</h2>
      <p className="text-sm text-gray-500">{examType} Examination - {year}</p>
    </div>
  )
}

// ============================================
// STUDENT INFO SECTION
// ============================================

interface StudentInfoProps {
  studentName: string
  rollNo: string
  className: string
  section: string
}

function StudentInfo({ studentName, rollNo, className, section }: StudentInfoProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <p className="text-xs text-gray-500">Student Name</p>
          <p className="text-sm font-semibold text-gray-900">{studentName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Roll Number</p>
          <p className="text-sm font-semibold text-gray-900">{rollNo}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Class</p>
          <p className="text-sm font-semibold text-gray-900">{className}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Section</p>
          <p className="text-sm font-semibold text-gray-900">{section}</p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// RESULT SUMMARY SECTION
// ============================================

interface ResultSummaryProps {
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  rank?: number
  result: string
}

function ResultSummary({ totalMarks, obtainedMarks, percentage, grade, rank, result }: ResultSummaryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
      <div className="bg-blue-50 p-2 rounded text-center">
        <p className="text-xs text-blue-600">Total</p>
        <p className="text-lg font-bold text-blue-700">{totalMarks}</p>
      </div>
      <div className="bg-green-50 p-2 rounded text-center">
        <p className="text-xs text-green-600">Obtained</p>
        <p className="text-lg font-bold text-green-700">{obtainedMarks}</p>
      </div>
      <div className="bg-purple-50 p-2 rounded text-center">
        <p className="text-xs text-purple-600">Percentage</p>
        <p className="text-lg font-bold text-purple-700">{percentage}%</p>
      </div>
      <div className="bg-yellow-50 p-2 rounded text-center">
        <p className="text-xs text-yellow-600">Grade</p>
        <p className="text-lg font-bold text-yellow-700">{grade}</p>
      </div>
      <div className={`p-2 rounded text-center ${getResultColor(result)}`}>
        <p className="text-xs">Result</p>
        <p className="text-lg font-bold capitalize">{result}</p>
      </div>
    </div>
  )
}

// ============================================
// MARKS CARD FOOTER
// ============================================

function MarksCardFooter() {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
      <div className="flex justify-between">
        <p>Generated on: {new Date().toLocaleDateString()}</p>
        <p>This is a computer generated marks card</p>
      </div>
    </div>
  )
}

// ============================================
// MAIN MARKS CARD COMPONENT
// ============================================

export function MarksCard({
  studentName = 'Ali Ahmed',
  rollNo = '101',
  className = '10',
  section = 'A',
  examName = 'Mid-Term Examinations',
  examType = 'Mid-Term',
  year = 2024,
  subjects = DEFAULT_SUBJECTS,
  totalMarks = 600,
  obtainedMarks = 518,
  percentage = 86.3,
  grade = 'A',
  rank,
  result = 'pass',
  schoolName = 'Ghazali High School',
  schoolAddress = 'Adlana, Bhawana, Chiniot',
  showHeader = true,
  showFooter = true,
  onPrint,
  className: externalClassName = ''
}: MarksCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm ${externalClassName}`}>
      {/* Print Button */}
      {onPrint && (
        <div className="flex justify-end mb-4">
          <button
            onClick={onPrint}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🖨️ Print Marks Card
          </button>
        </div>
      )}

      {/* Header */}
      {showHeader && (
        <MarksCardHeader
          schoolName={schoolName}
          schoolAddress={schoolAddress}
          examName={examName}
          examType={examType}
          year={year}
        />
      )}

      {/* Student Info */}
      <StudentInfo
        studentName={studentName}
        rollNo={rollNo}
        className={className}
        section={section}
      />

      {/* Subjects Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Subject</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Total</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Obtained</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">%</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Grade</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subjects.map((subject, index) => (
              <SubjectRow key={subject.name} subject={subject} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Result Summary */}
      <ResultSummary
        totalMarks={totalMarks}
        obtainedMarks={obtainedMarks}
        percentage={percentage}
        grade={grade}
        rank={rank}
        result={result}
      />

      {/* Rank (if provided) */}
      {rank && (
        <div className="mt-3 text-center">
          <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            🏆 Class Rank: #{rank}
          </span>
        </div>
      )}

      {/* Footer */}
      {showFooter && <MarksCardFooter />}
    </div>
  )
}

// ============================================
// SIMPLE MARKS CARD (Minimal)
// ============================================

export function SimpleMarksCard({
  studentName = 'Ali Ahmed',
  subjects = DEFAULT_SUBJECTS.slice(0, 3),
  percentage = 86.3,
  grade = 'A'
}: {
  studentName?: string
  subjects?: SubjectMark[]
  percentage?: number
  grade?: string
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-900">{studentName}</h3>
        <span className={`px-2 py-0.5 text-xs rounded-full ${getGradeColor(grade)}`}>
          Grade: {grade}
        </span>
      </div>
      <div className="space-y-1 mb-2">
        {subjects.map(subject => (
          <div key={subject.name} className="flex justify-between text-xs">
            <span className="text-gray-600">{subject.name}</span>
            <span className="font-medium text-gray-900">{subject.obtainedMarks}/{subject.totalMarks}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">Percentage</span>
        <span className="text-sm font-bold text-blue-600">{percentage}%</span>
      </div>
    </div>
  )
}

// ============================================
// MARKS CARD SKELETON
// ============================================

export function MarksCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
      <div className="text-center mb-6">
        <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-8 bg-gray-200 rounded"></div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-12 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// MARKS CARD PRESETS
// ============================================

export const MarksCardPresets = {
  // Topper
  topper: {
    studentName: 'Bilal Hassan',
    rollNo: '102',
    percentage: 98.5,
    grade: 'A+',
    result: 'pass' as const,
    subjects: DEFAULT_SUBJECTS.map(s => ({ ...s, obtainedMarks: s.totalMarks - 2 }))
  },

  // Average student
  average: {
    studentName: 'Sara Fatima',
    rollNo: '103',
    percentage: 72.3,
    grade: 'B',
    result: 'pass' as const,
    subjects: DEFAULT_SUBJECTS.map(s => ({ ...s, obtainedMarks: Math.floor(s.totalMarks * 0.72) }))
  },

  // Failed student
  failed: {
    studentName: 'Hamza Ali',
    rollNo: '105',
    percentage: 38.5,
    grade: 'F',
    result: 'fail' as const,
    subjects: DEFAULT_SUBJECTS.map(s => ({ ...s, obtainedMarks: Math.floor(s.totalMarks * 0.38) }))
  }
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  MarksCard,
  SimpleMarksCard,
  MarksCardSkeleton,
  MarksCardPresets
}