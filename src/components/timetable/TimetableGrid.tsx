'use client'

import React, { useState } from 'react'

// ============================================
// TYPES
// ============================================

export interface TimetablePeriod {
  id: string
  periodNumber: number
  startTime: string
  endTime: string
  subject: string
  teacher: string
  room: string
  isBreak?: boolean
  breakType?: 'short' | 'lunch' | 'prayer'
}

export interface TimetableDay {
  day: string
  dayFull: string
  date?: string
  periods: TimetablePeriod[]
}

export interface TimetableGridProps {
  days: TimetableDay[]
  class: string
  section: string
  academicYear?: string
  onPeriodClick?: (period: TimetablePeriod, day: string) => void
  onTeacherClick?: (teacher: string) => void
  showTeacher?: boolean
  showRoom?: boolean
  className?: string
}

// ============================================
// TIMETABLE GRID COMPONENT
// ============================================

export function TimetableGrid({
  days,
  class: className,
  section,
  academicYear = '2024-2025',
  onPeriodClick,
  onTeacherClick,
  showTeacher = true,
  showRoom = true,
  className: externalClassName = ''
}: TimetableGridProps) {
  const [selectedDay, setSelectedDay] = useState<string>(days[0]?.day || '')
  const [hoveredPeriod, setHoveredPeriod] = useState<string | null>(null)

  // Get all period numbers from all days
  const allPeriodNumbers = React.useMemo(() => {
    const periodSet = new Set<number>()
    days.forEach(day => {
      day.periods.forEach(period => {
        if (!period.isBreak) {
          periodSet.add(period.periodNumber)
        }
      })
    })
    return Array.from(periodSet).sort((a, b) => a - b)
  }, [days])

  // Format time for display
  const formatTime = (time: string): string => {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  // Get period by day and period number
  const getPeriod = (day: string, periodNumber: number): TimetablePeriod | undefined => {
    const dayData = days.find(d => d.day === day)
    return dayData?.periods.find(p => p.periodNumber === periodNumber)
  }

  // Handle period click
  const handlePeriodClick = (period: TimetablePeriod, day: string) => {
    if (onPeriodClick && !period.isBreak) {
      onPeriodClick(period, day)
    }
  }

  // Handle teacher click
  const handleTeacherClick = (teacher: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onTeacherClick && teacher !== '-') {
      onTeacherClick(teacher)
    }
  }

  // Get break style
  const getBreakStyle = (breakType?: string): string => {
    switch (breakType) {
      case 'short':
        return 'bg-yellow-50 border-yellow-200'
      case 'lunch':
        return 'bg-orange-50 border-orange-200'
      case 'prayer':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  // Get period style
  const getPeriodStyle = (period: TimetablePeriod, isHovered: boolean): string => {
    if (period.isBreak) {
      return getBreakStyle(period.breakType)
    }
    return isHovered 
      ? 'bg-blue-50 border-blue-300 shadow-md' 
      : 'bg-white border-gray-200 hover:bg-blue-50'
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${externalClassName}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Class {className} - Section {section}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Academic Year: {academicYear}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Legend:</span>
            <div className="flex items-center space-x-3 ml-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-50 border border-yellow-200 rounded mr-1"></div>
                <span className="text-xs text-gray-600">Short Break</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-50 border border-orange-200 rounded mr-1"></div>
                <span className="text-xs text-gray-600">Lunch</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-50 border border-green-200 rounded mr-1"></div>
                <span className="text-xs text-gray-600">Prayer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Day selector for mobile */}
      <div className="md:hidden p-4 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Day
        </label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {days.map(day => (
            <option key={day.day} value={day.day}>
              {day.dayFull} {day.date ? `- ${day.date}` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop view - Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                Period / Day
              </th>
              {days.map(day => (
                <th key={day.day} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                  <div>{day.dayFull}</div>
                  {day.date && <div className="text-xs font-normal text-gray-500">{day.date}</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPeriodNumbers.map(periodNum => (
              <tr key={periodNum} className="border-b border-gray-200">
                <td className="px-4 py-3 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                  <div>Period {periodNum}</div>
                  <div className="text-xs text-gray-500">
                    {formatTime(days[0]?.periods.find(p => p.periodNumber === periodNum)?.startTime || '')} - 
                    {formatTime(days[0]?.periods.find(p => p.periodNumber === periodNum)?.endTime || '')}
                  </div>
                </td>
                {days.map(day => {
                  const period = getPeriod(day.day, periodNum)
                  const isHovered = hoveredPeriod === `${day.day}-${periodNum}`
                  
                  if (!period) {
                    return (
                      <td key={`${day.day}-${periodNum}`} className="px-4 py-3 border-r border-gray-200 bg-gray-50">
                        <div className="text-center text-gray-400">-</div>
                      </td>
                    )
                  }

                  if (period.isBreak) {
                    return (
                      <td 
                        key={`${day.day}-${periodNum}`} 
                        className={`px-4 py-3 border-r border-gray-200 ${getBreakStyle(period.breakType)}`}
                      >
                        <div className="text-center font-medium text-gray-600">
                          {period.subject}
                        </div>
                      </td>
                    )
                  }

                  return (
                    <td 
                        key={`${day.day}-${periodNum}`}
                      className={`px-4 py-3 border-r border-gray-200 cursor-pointer transition-all ${getPeriodStyle(period, isHovered)}`}
                      onClick={() => handlePeriodClick(period, day.day)}
                      onMouseEnter={() => setHoveredPeriod(`${day.day}-${periodNum}`)}
                      onMouseLeave={() => setHoveredPeriod(null)}
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-gray-800">
                          {period.subject}
                        </div>
                        {showTeacher && period.teacher && (
                          <div 
                            className="text-xs text-blue-600 hover:underline cursor-pointer"
                            onClick={(e) => handleTeacherClick(period.teacher, e)}
                          >
                            {period.teacher}
                          </div>
                        )}
                        {showRoom && period.room && (
                          <div className="text-xs text-gray-500">
                            Room: {period.room}
                          </div>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view - Card layout */}
      <div className="md:hidden p-4 space-y-4">
        {days
          .filter(day => day.day === selectedDay)
          .map(day => (
            <div key={day.day} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {day.dayFull} {day.date && `- ${day.date}`}
              </h3>
              {day.periods
                .sort((a, b) => a.periodNumber - b.periodNumber)
                .map(period => {
                  const isHovered = hoveredPeriod === `mobile-${period.id}`

                  if (period.isBreak) {
                    return (
                      <div
                        key={period.id}
                        className={`p-3 rounded-lg border ${getBreakStyle(period.breakType)}`}
                      >
                        <div className="font-medium text-gray-600 text-center">
                          {period.subject}
                        </div>
                        <div className="text-xs text-gray-500 text-center mt-1">
                          {formatTime(period.startTime)} - {formatTime(period.endTime)}
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div
                      key={period.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${getPeriodStyle(period, isHovered)}`}
                      onClick={() => handlePeriodClick(period, day.day)}
                      onMouseEnter={() => setHoveredPeriod(`mobile-${period.id}`)}
                      onMouseLeave={() => setHoveredPeriod(null)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-800">
                            Period {period.periodNumber}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {period.subject}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTime(period.startTime)} - {formatTime(period.endTime)}
                        </div>
                      </div>
                      {(showTeacher || showRoom) && (
                        <div className="mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-2 text-xs">
                          {showTeacher && period.teacher && (
                            <span 
                              className="text-blue-600 hover:underline cursor-pointer"
                              onClick={(e) => handleTeacherClick(period.teacher, e)}
                            >
                              👤 {period.teacher}
                            </span>
                          )}
                          {showRoom && period.room && (
                            <span className="text-gray-500">
                              🏫 {period.room}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          ))}
      </div>

      {/* Footer with summary */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="font-medium">Total Periods:</span> {allPeriodNumbers.length}
          </div>
          <div>
            <span className="font-medium">Working Days:</span> {days.length}
          </div>
          <div>
            <span className="font-medium">Total Classes:</span> {allPeriodNumbers.length * days.length}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// TIMETABLE GRID SKELETON LOADER
// ============================================

export function TimetableGridSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 border-r border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </th>
              {[1, 2, 3, 4, 5].map(i => (
                <th key={i} className="px-4 py-3 border-r border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map(row => (
              <tr key={row} className="border-b border-gray-200">
                <td className="px-4 py-3 border-r border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </td>
                {[1, 2, 3, 4, 5].map(col => (
                  <td key={col} className="px-4 py-3 border-r border-gray-200">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================
// TIMETABLE GRID UTILITIES
// ============================================

export function createEmptyTimetable(
  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  periods: number = 7
): TimetableDay[] {
  const dayFullNames: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  }

  return days.map(day => ({
    day,
    dayFull: dayFullNames[day] || day,
    periods: Array.from({ length: periods }, (_, i) => ({
      id: `period-${day}-${i + 1}`,
      periodNumber: i + 1,
      startTime: `${8 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`,
      endTime: `${8 + Math.floor((i + 1) / 2)}:${(i + 1) % 2 === 0 ? '00' : '30'}`,
      subject: '',
      teacher: '',
      room: ''
    }))
  }))
}

// ============================================
// USAGE EXAMPLE (commented out)
// ============================================

/*
import { TimetableGrid, createEmptyTimetable } from '@/components/timetable/TimetableGrid'

export default function TimetablePage() {
  const timetable = createEmptyTimetable()
  
  // Add some data
  timetable[0].periods[0] = {
    id: '1',
    periodNumber: 1,
    startTime: '08:00',
    endTime: '08:45',
    subject: 'Mathematics',
    teacher: 'Prof. Ahmad Raza',
    room: 'Room 101'
  }

  return (
    <TimetableGrid
      days={timetable}
      class="10"
      section="A"
      onPeriodClick={(period, day) => console.log('Period clicked:', period, day)}
      onTeacherClick={(teacher) => console.log('Teacher clicked:', teacher)}
    />
  )
}
*/

// ============================================
// EXPORT DEFAULT
// ============================================

export default TimetableGrid