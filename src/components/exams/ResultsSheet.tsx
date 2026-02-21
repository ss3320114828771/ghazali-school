'use client'

import React, { useState } from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface StudentResult {
  id: string
  rollNo: string
  name: string
  class: string
  section: string
  subjectMarks: {
    [subject: string]: number
  }
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  status: 'pass' | 'fail' | 'absent'
}

export interface ResultsSheetProps {
  examName?: string
  className?: string          // Fixed: renamed from 'class' to 'className' to avoid conflict
  section?: string
  year?: number
  results?: StudentResult[]
  subjects?: string[]
  maxMarks?: number
  passingMarks?: number
  showRank?: boolean
  onPrint?: () => void
  onExport?: () => void
  containerClassName?: string  // Fixed: renamed second className to containerClassName
}

// ============================================
// DEFAULT MOCK DATA
// ============================================

const DEFAULT_SUBJECTS = ['Math', 'Physics', 'Chemistry', 'English', 'Urdu']

const DEFAULT_RESULTS: StudentResult[] = [
  {
    id: '1',
    rollNo: '101',
    name: 'Ali Ahmed',
    class: '10',
    section: 'A',
    subjectMarks: {
      Math: 85,
      Physics: 78,
      Chemistry: 82,
      English: 90,
      Urdu: 88
    },
    totalMarks: 500,
    obtainedMarks: 423,
    percentage: 84.6,
    grade: 'A',
    status: 'pass'
  },
  {
    id: '2',
    rollNo: '102',
    name: 'Bilal Hassan',
    class: '10',
    section: 'A',
    subjectMarks: {
      Math: 92,
      Physics: 88,
      Chemistry: 85,
      English: 86,
      Urdu: 90
    },
    totalMarks: 500,
    obtainedMarks: 441,
    percentage: 88.2,
    grade: 'A',
    status: 'pass'
  },
  {
    id: '3',
    rollNo: '103',
    name: 'Sara Fatima',
    class: '10',
    section: 'A',
    subjectMarks: {
      Math: 65,
      Physics: 58,
      Chemistry: 62,
      English: 75,
      Urdu: 70
    },
    totalMarks: 500,
    obtainedMarks: 330,
    percentage: 66.0,
    grade: 'C',
    status: 'pass'
  },
  {
    id: '4',
    rollNo: '104',
    name: 'Zainab Bibi',
    class: '10',
    section: 'A',
    subjectMarks: {
      Math: 45,
      Physics: 38,
      Chemistry: 42,
      English: 55,
      Urdu: 50
    },
    totalMarks: 500,
    obtainedMarks: 230,
    percentage: 46.0,
    grade: 'D',
    status: 'pass'
  },
  {
    id: '5',
    rollNo: '105',
    name: 'Hamza Ali',
    class: '10',
    section: 'A',
    subjectMarks: {
      Math: 30,
      Physics: 25,
      Chemistry: 28,
      English: 35,
      Urdu: 32
    },
    totalMarks: 500,
    obtainedMarks: 150,
    percentage: 30.0,
    grade: 'F',
    status: 'fail'
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

const getGradeColor = (grade: string): string => {
  switch (grade) {
    case 'A+':
    case 'A':
      return 'text-green-600 bg-green-50'
    case 'B':
      return 'text-blue-600 bg-blue-50'
    case 'C':
      return 'text-yellow-600 bg-yellow-50'
    case 'D':
      return 'text-orange-600 bg-orange-50'
    case 'F':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pass':
      return 'text-green-600 bg-green-50'
    case 'fail':
      return 'text-red-600 bg-red-50'
    case 'absent':
      return 'text-gray-600 bg-gray-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'pass':
      return '✓'
    case 'fail':
      return '✗'
    case 'absent':
      return '○'
    default:
      return '•'
  }
}

const calculateRank = (results: StudentResult[], studentId: string): number => {
  const sorted = [...results].sort((a, b) => b.percentage - a.percentage)
  return sorted.findIndex(r => r.id === studentId) + 1
}

// ============================================
// RESULT ROW COMPONENT
// ============================================

interface ResultRowProps {
  result: StudentResult
  subjects: string[]
  showRank: boolean
  index: number
}

function ResultRow({ result, subjects, showRank, index }: ResultRowProps) {
  const rank = showRank ? calculateRank([result], result.id) : null

  return (
    <tr className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
      <td className="px-3 py-2 text-sm text-gray-900">{result.rollNo}</td>
      <td className="px-3 py-2 text-sm font-medium text-gray-900">{result.name}</td>
      {subjects.map(subject => (
        <td key={subject} className="px-3 py-2 text-sm text-gray-600 text-center">
          {result.subjectMarks[subject] || '-'}
        </td>
      ))}
      <td className="px-3 py-2 text-sm font-medium text-gray-900 text-center">
        {result.obtainedMarks}
      </td>
      <td className="px-3 py-2 text-sm text-gray-600 text-center">
        {result.percentage.toFixed(1)}%
      </td>
      <td className="px-3 py-2 text-sm text-center">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
          {result.grade}
        </span>
      </td>
      <td className="px-3 py-2 text-sm text-center">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
          {getStatusIcon(result.status)} {result.status}
        </span>
      </td>
      {showRank && (
        <td className="px-3 py-2 text-sm font-bold text-gray-900 text-center">
          #{rank}
        </td>
      )}
    </tr>
  )
}

// ============================================
// RESULTS SUMMARY COMPONENT
// ============================================

interface ResultsSummaryProps {
  results: StudentResult[]
  totalMarks: number
  passingMarks: number
}

function ResultsSummary({ results, totalMarks, passingMarks }: ResultsSummaryProps) {
  const totalStudents = results.length
  const passedStudents = results.filter(r => r.status === 'pass').length
  const failedStudents = results.filter(r => r.status === 'fail').length
  const absentStudents = results.filter(r => r.status === 'absent').length
  const passPercentage = totalStudents > 0 ? (passedStudents / totalStudents) * 100 : 0

  const averageMarks = results.reduce((sum, r) => sum + r.percentage, 0) / totalStudents
  const highestMarks = Math.max(...results.map(r => r.percentage))
  const lowestMarks = Math.min(...results.map(r => r.percentage))

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div className="bg-blue-50 p-3 rounded-lg text-center">
        <div className="text-xs text-blue-600">Total Students</div>
        <div className="text-xl font-bold text-blue-700">{totalStudents}</div>
      </div>
      <div className="bg-green-50 p-3 rounded-lg text-center">
        <div className="text-xs text-green-600">Passed</div>
        <div className="text-xl font-bold text-green-700">{passedStudents}</div>
        <div className="text-xs text-green-600">{passPercentage.toFixed(1)}%</div>
      </div>
      <div className="bg-red-50 p-3 rounded-lg text-center">
        <div className="text-xs text-red-600">Failed</div>
        <div className="text-xl font-bold text-red-700">{failedStudents}</div>
      </div>
      <div className="bg-purple-50 p-3 rounded-lg text-center">
        <div className="text-xs text-purple-600">Average</div>
        <div className="text-xl font-bold text-purple-700">{averageMarks.toFixed(1)}%</div>
      </div>
    </div>
  )
}

// ============================================
// MAIN RESULTS SHEET COMPONENT
// ============================================

export function ResultsSheet({
  examName = 'Mid-Term Examinations 2024',
  className = '10',                // Now using className for class name
  section = 'A',
  year = 2024,
  results = DEFAULT_RESULTS,
  subjects = DEFAULT_SUBJECTS,
  maxMarks = 100,
  passingMarks = 40,
  showRank = true,
  onPrint,
  onExport,
  containerClassName = ''           // For outer container styling
}: ResultsSheetProps) {
  const [sortBy, setSortBy] = useState<'rollNo' | 'name' | 'percentage'>('rollNo')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Sort results
  const sortedResults = React.useMemo(() => {
    return [...results].sort((a, b) => {
      if (sortBy === 'rollNo') {
        return sortOrder === 'asc'
          ? a.rollNo.localeCompare(b.rollNo)
          : b.rollNo.localeCompare(a.rollNo)
      }
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      if (sortBy === 'percentage') {
        return sortOrder === 'asc'
          ? a.percentage - b.percentage
          : b.percentage - a.percentage
      }
      return 0
    })
  }, [results, sortBy, sortOrder])

  // Handle sort click
  const handleSort = (field: 'rollNo' | 'name' | 'percentage') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  // Get sort icon
  const getSortIcon = (field: string) => {
    if (sortBy !== field) return '↕️'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${containerClassName}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{examName}</h2>
            <p className="text-sm text-gray-500">
              Class {className} - Section {section} | Year: {year}
            </p>
          </div>
          <div className="flex gap-2">
            {onPrint && (
              <button
                onClick={onPrint}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                🖨️ Print
              </button>
            )}
            {onExport && (
              <button
                onClick={onExport}
                className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                📥 Export
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 border-b border-gray-200">
        <ResultsSummary
          results={results}
          totalMarks={maxMarks * subjects.length}
          passingMarks={passingMarks}
        />
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-3 py-2 text-left text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('rollNo')}
              >
                Roll No {getSortIcon('rollNo')}
              </th>
              <th
                className="px-3 py-2 text-left text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('name')}
              >
                Student Name {getSortIcon('name')}
              </th>
              {subjects.map(subject => (
                <th key={subject} className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                  {subject}
                </th>
              ))}
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">Total</th>
              <th
                className="px-3 py-2 text-center text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('percentage')}
              >
                % {getSortIcon('percentage')}
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">Grade</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">Status</th>
              {showRank && <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">Rank</th>}
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, index) => (
              <ResultRow
                key={result.id}
                result={result}
                subjects={subjects}
                showRank={showRank}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Max Marks per Subject: {maxMarks} | Passing Marks: {passingMarks}</span>
          <span>Total Students: {results.length}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SIMPLE RESULTS LIST (Card View)
// ============================================

export function SimpleResultsList({
  results = DEFAULT_RESULTS.slice(0, 3)
}: {
  results?: StudentResult[]
}) {
  return (
    <div className="space-y-2">
      {results.map(result => (
        <div key={result.id} className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm font-medium text-gray-900">{result.name}</span>
              <span className="text-xs text-gray-500 ml-2">({result.rollNo})</span>
            </div>
            <span className={`px-2 py-0.5 text-xs rounded-full ${getGradeColor(result.grade)}`}>
              {result.grade}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Marks: {result.obtainedMarks}/{result.totalMarks}</span>
            <span className="text-gray-600">{result.percentage.toFixed(1)}%</span>
            <span className={`font-medium ${getStatusColor(result.status)}`}>
              {result.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// STUDENT RESULT CARD (Individual)
// ============================================

export function StudentResultCard({
  result
}: {
  result: StudentResult
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{result.name}</h3>
      <p className="text-sm text-gray-500 mb-3">Roll No: {result.rollNo} | Class {result.class}-{result.section}</p>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-50 p-2 rounded text-center">
          <div className="text-xs text-gray-500">Total Marks</div>
          <div className="text-lg font-bold text-gray-900">{result.obtainedMarks}/{result.totalMarks}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded text-center">
          <div className="text-xs text-gray-500">Percentage</div>
          <div className="text-lg font-bold text-blue-600">{result.percentage.toFixed(1)}%</div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(result.grade)}`}>
          Grade: {result.grade}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
          {result.status === 'pass' ? '✓ Pass' : result.status === 'fail' ? '✗ Fail' : '○ Absent'}
        </span>
      </div>
    </div>
  )
}

// ============================================
// RESULTS SHEET SKELETON
// ============================================

export function ResultsSheetSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  ResultsSheet,
  SimpleResultsList,
  StudentResultCard,
  ResultsSheetSkeleton
}