'use client'

import React, { useState } from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface ExamSubject {
  id: string
  name: string
  code: string
  date: string
  day: string
  startTime: string
  endTime: string
  duration: string
  totalMarks: number
  passingMarks: number
  room: string
  invigilator?: string
}

export interface ExamScheduleProps {
  examName?: string
  className?: string
  sections?: string[]
  year?: number
  term?: string
  subjects?: ExamSubject[]
  showInvigilator?: boolean
  showRoom?: boolean
  onPrint?: () => void
  onExport?: () => void
  classNae?: string
}

// ============================================
// DEFAULT MOCK DATA
// ============================================

const DEFAULT_SUBJECTS: ExamSubject[] = [
  {
    id: '1',
    name: 'Mathematics',
    code: 'MATH101',
    date: '2024-03-15',
    day: 'Monday',
    startTime: '09:00',
    endTime: '12:00',
    duration: '3 hours',
    totalMarks: 100,
    passingMarks: 40,
    room: 'Room 101',
    invigilator: 'Prof. Ahmad Raza'
  },
  {
    id: '2',
    name: 'Physics',
    code: 'PHY101',
    date: '2024-03-16',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '12:00',
    duration: '3 hours',
    totalMarks: 100,
    passingMarks: 40,
    room: 'Room 102',
    invigilator: 'Mr. Mohammad Ali'
  },
  {
    id: '3',
    name: 'Chemistry',
    code: 'CHEM101',
    date: '2024-03-17',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '12:00',
    duration: '3 hours',
    totalMarks: 100,
    passingMarks: 40,
    room: 'Lab 1',
    invigilator: 'Ms. Sara Khan'
  },
  {
    id: '4',
    name: 'English',
    code: 'ENG101',
    date: '2024-03-18',
    day: 'Thursday',
    startTime: '09:00',
    endTime: '12:00',
    duration: '3 hours',
    totalMarks: 100,
    passingMarks: 40,
    room: 'Room 103',
    invigilator: 'Mrs. Fatima Hassan'
  },
  {
    id: '5',
    name: 'Urdu',
    code: 'URD101',
    date: '2024-03-19',
    day: 'Friday',
    startTime: '09:00',
    endTime: '12:00',
    duration: '3 hours',
    totalMarks: 100,
    passingMarks: 40,
    room: 'Room 104',
    invigilator: 'Mr. Usman Ahmed'
  },
  {
    id: '6',
    name: 'Islamiat',
    code: 'ISL101',
    date: '2024-03-20',
    day: 'Saturday',
    startTime: '09:00',
    endTime: '11:00',
    duration: '2 hours',
    totalMarks: 100,
    passingMarks: 40,
    room: 'Room 105',
    invigilator: 'Hafiz Khalid'
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

const getDayColor = (day: string): string => {
  const colors: Record<string, string> = {
    Monday: 'bg-blue-100 text-blue-800',
    Tuesday: 'bg-green-100 text-green-800',
    Wednesday: 'bg-purple-100 text-purple-800',
    Thursday: 'bg-yellow-100 text-yellow-800',
    Friday: 'bg-pink-100 text-pink-800',
    Saturday: 'bg-indigo-100 text-indigo-800',
    Sunday: 'bg-red-100 text-red-800'
  }
  return colors[day] || 'bg-gray-100 text-gray-800'
}

// ============================================
// SCHEDULE CARD COMPONENT
// ============================================

interface ScheduleCardProps {
  subject: ExamSubject
  showInvigilator: boolean
  showRoom: boolean
}

function ScheduleCard({ subject, showInvigilator, showRoom }: ScheduleCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{subject.name}</h3>
          <p className="text-xs text-gray-500">{subject.code}</p>
        </div>
        <span className={`px-2 py-0.5 text-xs rounded-full ${getDayColor(subject.day)}`}>
          {subject.day}
        </span>
      </div>

      <div className="space-y-1 text-sm mb-3">
        <div className="flex items-center text-gray-600">
          <span className="w-16 text-xs text-gray-400">Date:</span>
          <span className="font-medium">{formatDate(subject.date)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="w-16 text-xs text-gray-400">Time:</span>
          <span className="font-medium">{formatTime(subject.startTime)} - {formatTime(subject.endTime)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="w-16 text-xs text-gray-400">Duration:</span>
          <span className="font-medium">{subject.duration}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="w-16 text-xs text-gray-400">Marks:</span>
          <span className="font-medium">{subject.totalMarks} (Pass: {subject.passingMarks})</span>
        </div>
        {showRoom && (
          <div className="flex items-center text-gray-600">
            <span className="w-16 text-xs text-gray-400">Room:</span>
            <span className="font-medium">{subject.room}</span>
          </div>
        )}
        {showInvigilator && subject.invigilator && (
          <div className="flex items-center text-gray-600">
            <span className="w-16 text-xs text-gray-400">Invigilator:</span>
            <span className="font-medium">{subject.invigilator}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// SCHEDULE TABLE ROW COMPONENT
// ============================================

interface ScheduleRowProps {
  subject: ExamSubject
  showInvigilator: boolean
  showRoom: boolean
  index: number
}

function ScheduleRow({ subject, showInvigilator, showRoom, index }: ScheduleRowProps) {
  return (
    <tr className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
      <td className="px-3 py-2 text-sm font-medium text-gray-900">{subject.name}</td>
      <td className="px-3 py-2 text-sm text-gray-600">{subject.code}</td>
      <td className="px-3 py-2 text-sm text-gray-600">{formatDate(subject.date)}</td>
      <td className="px-3 py-2">
        <span className={`px-2 py-0.5 text-xs rounded-full ${getDayColor(subject.day)}`}>
          {subject.day}
        </span>
      </td>
      <td className="px-3 py-2 text-sm text-gray-600">
        {formatTime(subject.startTime)} - {formatTime(subject.endTime)}
      </td>
      <td className="px-3 py-2 text-sm text-gray-600">{subject.duration}</td>
      <td className="px-3 py-2 text-sm text-gray-600 text-center">{subject.totalMarks}</td>
      <td className="px-3 py-2 text-sm text-gray-600 text-center">{subject.passingMarks}</td>
      {showRoom && <td className="px-3 py-2 text-sm text-gray-600">{subject.room}</td>}
      {showInvigilator && (
        <td className="px-3 py-2 text-sm text-gray-600">{subject.invigilator || '-'}</td>
      )}
    </tr>
  )
}

// ============================================
// SCHEDULE HEADER
// ============================================

interface ScheduleHeaderProps {
  examName: string
  className: string
  sections: string[]
  year: number
  term?: string
}

function ScheduleHeader({ examName, className, sections, year, term }: ScheduleHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold text-gray-900">{examName}</h2>
      <p className="text-sm text-gray-500">
        Class {className} {sections.length > 0 && `- Sections: ${sections.join(', ')}`} | {term || 'Annual'} {year}
      </p>
    </div>
  )
}

// ============================================
// SCHEDULE STATS
// ============================================

interface ScheduleStatsProps {
  subjects: ExamSubject[]
}

function ScheduleStats({ subjects }: ScheduleStatsProps) {
  const totalSubjects = subjects.length
  const totalDays = new Set(subjects.map(s => s.date)).size
  const totalMarks = subjects.reduce((sum, s) => sum + s.totalMarks, 0)
  const avgMarks = Math.round(totalMarks / totalSubjects)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div className="bg-blue-50 p-2 rounded text-center">
        <div className="text-xs text-blue-600">Subjects</div>
        <div className="text-lg font-bold text-blue-700">{totalSubjects}</div>
      </div>
      <div className="bg-green-50 p-2 rounded text-center">
        <div className="text-xs text-green-600">Days</div>
        <div className="text-lg font-bold text-green-700">{totalDays}</div>
      </div>
      <div className="bg-purple-50 p-2 rounded text-center">
        <div className="text-xs text-purple-600">Total Marks</div>
        <div className="text-lg font-bold text-purple-700">{totalMarks}</div>
      </div>
      <div className="bg-yellow-50 p-2 rounded text-center">
        <div className="text-xs text-yellow-600">Avg Marks</div>
        <div className="text-lg font-bold text-yellow-700">{avgMarks}</div>
      </div>
    </div>
  )
}

// ============================================
// MAIN EXAM SCHEDULE COMPONENT
// ============================================

export function ExamSchedule({
  examName = 'Mid-Term Examinations 2024',
  className = '10',
  sections = ['A', 'B'],
  year = 2024,
  term = 'Mid-Term',
  subjects = DEFAULT_SUBJECTS,
  showInvigilator = true,
  showRoom = true,
  onPrint,
  onExport,
  className: externalClassName = ''
}: ExamScheduleProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [filterDay, setFilterDay] = useState<string>('all')

  // Get unique days for filter
  const days = React.useMemo(() => {
    return ['all', ...new Set(subjects.map(s => s.day))]
  }, [subjects])

  // Filter subjects by day
  const filteredSubjects = React.useMemo(() => {
    if (filterDay === 'all') return subjects
    return subjects.filter(s => s.day === filterDay)
  }, [subjects, filterDay])

  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${externalClassName}`}>
      {/* Header with actions */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <ScheduleHeader
            examName={examName}
            className={className}
            sections={sections}
            year={year}
            term={term}
          />
          <div className="flex gap-2">
            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-sm ${
                  viewMode === 'grid'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 text-sm ${
                  viewMode === 'table'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Table
              </button>
            </div>

            {/* Action Buttons */}
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

      {/* Stats */}
      <div className="p-4 border-b border-gray-200">
        <ScheduleStats subjects={subjects} />
      </div>

      {/* Day Filter */}
      {days.length > 1 && (
        <div className="px-4 py-2 border-b border-gray-200 bg-gray-50/50">
          <div className="flex flex-wrap gap-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setFilterDay(day)}
                className={`px-3 py-1 text-xs rounded-full capitalize transition-colors ${
                  filterDay === day
                    ? day === 'all'
                      ? 'bg-gray-800 text-white'
                      : getDayColor(day)
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {day === 'all' ? 'All Days' : day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {filteredSubjects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No exams scheduled for this day
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects.map(subject => (
              <ScheduleCard
                key={subject.id}
                subject={subject}
                showInvigilator={showInvigilator}
                showRoom={showRoom}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Subject</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Code</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Date</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Day</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Time</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Duration</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">Total</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">Pass</th>
                  {showRoom && <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Room</th>}
                  {showInvigilator && <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Invigilator</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubjects.map((subject, index) => (
                  <ScheduleRow
                    key={subject.id}
                    subject={subject}
                    showInvigilator={showInvigilator}
                    showRoom={showRoom}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Total Subjects: {subjects.length}</span>
          <span>First Exam: {formatDate(subjects[0]?.date || '')}</span>
          <span>Last Exam: {formatDate(subjects[subjects.length - 1]?.date || '')}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SIMPLE SCHEDULE LIST (Card View Only)
// ============================================

export function SimpleScheduleList({
  subjects = DEFAULT_SUBJECTS.slice(0, 3)
}: {
  subjects?: ExamSubject[]
}) {
  return (
    <div className="space-y-2">
      {subjects.map(subject => (
        <div key={subject.id} className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm font-medium text-gray-900">{subject.name}</span>
              <span className="text-xs text-gray-500 ml-2">({subject.code})</span>
            </div>
            <span className={`px-2 py-0.5 text-xs rounded-full ${getDayColor(subject.day)}`}>
              {subject.day}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">{formatDate(subject.date)}</span>
            <span className="text-gray-600">{formatTime(subject.startTime)}</span>
            <span className="text-gray-600">Room: {subject.room}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// DATE GROUPED SCHEDULE
// ============================================

export function DateGroupedSchedule({
  subjects = DEFAULT_SUBJECTS
}: {
  subjects?: ExamSubject[]
}) {
  // Group subjects by date
  const groupedByDate = React.useMemo(() => {
    const groups: Record<string, ExamSubject[]> = {}
    subjects.forEach(subject => {
      if (!groups[subject.date]) {
        groups[subject.date] = []
      }
      groups[subject.date].push(subject)
    })
    return groups
  }, [subjects])

  const sortedDates = Object.keys(groupedByDate).sort()

  return (
    <div className="space-y-4">
      {sortedDates.map(date => (
        <div key={date} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 font-medium text-gray-700">
            {formatDate(date)} - {groupedByDate[date][0].day}
          </div>
          <div className="divide-y divide-gray-200">
            {groupedByDate[date].map(subject => (
              <div key={subject.id} className="px-4 py-2 flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-900">{subject.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{subject.code}</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-600">
                  <span>{formatTime(subject.startTime)} - {formatTime(subject.endTime)}</span>
                  <span>Room: {subject.room}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// EXAM SCHEDULE SKELETON
// ============================================

export function ExamScheduleSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32 mb-3"></div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
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
  ExamSchedule,
  SimpleScheduleList,
  DateGroupedSchedule,
  ExamScheduleSkeleton
}