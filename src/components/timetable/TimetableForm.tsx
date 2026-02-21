'use client'

import React, { useState, useEffect } from 'react'

// ============================================
// TYPES
// ============================================

export interface TimetablePeriodInput {
  periodNumber: number
  startTime: string
  endTime: string
  subject: string
  teacher: string
  room: string
  isBreak?: boolean
  breakType?: 'short' | 'lunch' | 'prayer'
}

export interface TimetableDayInput {
  day: string
  dayFull: string
  periods: TimetablePeriodInput[]
}

export interface TimetableFormData {
  class: string
  section: string
  academicYear: string
  days: TimetableDayInput[]
}

export interface TimetableFormProps {
  initialData?: TimetableFormData
  onSubmit: (data: TimetableFormData) => void
  onCancel?: () => void
  isLoading?: boolean
  className?: string
}

// ============================================
// CONSTANTS
// ============================================

const DAYS = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' }
]

const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8]

const BREAK_TYPES = [
  { value: 'short', label: 'Short Break' },
  { value: 'lunch', label: 'Lunch Break' },
  { value: 'prayer', label: 'Prayer Break' }
]

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Urdu',
  'Islamiat',
  'Computer',
  'Science',
  'Social Studies',
  'Pak Studies',
  'Physical Education'
]

const TEACHERS = [
  'Prof. Ahmad Raza',
  'Mrs. Fatima Hassan',
  'Mr. Mohammad Ali',
  'Ms. Sara Khan',
  'Dr. Usman Ahmed',
  'Prof. Khalid Mahmood',
  'Mrs. Aisha Bibi'
]

// ============================================
// TIMETABLE FORM COMPONENT
// ============================================

export function TimetableForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  className = ''
}: TimetableFormProps) {
  const [formData, setFormData] = useState<TimetableFormData>(() => {
    if (initialData) {
      return initialData
    }
    return {
      class: '',
      section: '',
      academicYear: new Date().getFullYear().toString(),
      days: DAYS.map(day => ({
        day: day.value,
        dayFull: day.label,
        periods: PERIODS.map(periodNum => ({
          periodNumber: periodNum,
          startTime: getDefaultStartTime(periodNum),
          endTime: getDefaultEndTime(periodNum),
          subject: '',
          teacher: '',
          room: '',
          isBreak: false
        }))
      }))
    }
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeDay, setActiveDay] = useState<string>(DAYS[0].value)
  const [copyMode, setCopyMode] = useState<'day' | 'period' | null>(null)
  const [copySource, setCopySource] = useState<{
    day?: string
    period?: number
  }>({})

  // Get default start time based on period number
  function getDefaultStartTime(periodNum: number): string {
    const baseHour = 8 + Math.floor((periodNum - 1) / 2)
    const minute = (periodNum - 1) % 2 === 0 ? '00' : '30'
    return `${baseHour.toString().padStart(2, '0')}:${minute}`
  }

  // Get default end time based on period number
  function getDefaultEndTime(periodNum: number): string {
    const baseHour = 8 + Math.floor(periodNum / 2)
    const minute = periodNum % 2 === 0 ? '00' : '30'
    return `${baseHour.toString().padStart(2, '0')}:${minute}`
  }

  // Handle input change for class/section
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle period field change
  const handlePeriodChange = (
    day: string,
    periodNumber: number,
    field: keyof TimetablePeriodInput,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(d => {
        if (d.day === day) {
          return {
            ...d,
            periods: d.periods.map(p => {
              if (p.periodNumber === periodNumber) {
                return { ...p, [field]: value }
              }
              return p
            })
          }
        }
        return d
      })
    }))

    // Clear error for this field if any
    const errorKey = `${day}-${periodNumber}-${field}`
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[errorKey]
        return newErrors
      })
    }
  }

  // Handle break toggle
  const handleBreakToggle = (day: string, periodNumber: number, isBreak: boolean) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(d => {
        if (d.day === day) {
          return {
            ...d,
            periods: d.periods.map(p => {
              if (p.periodNumber === periodNumber) {
                return {
                  ...p,
                  isBreak,
                  subject: isBreak ? 'Break' : '',
                  teacher: isBreak ? '-' : '',
                  breakType: isBreak ? 'short' : undefined
                }
              }
              return p
            })
          }
        }
        return d
      })
    }))
  }

  // Copy day schedule
  const copyDay = (sourceDay: string, targetDay: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(d => {
        if (d.day === targetDay) {
          const source = prev.days.find(sd => sd.day === sourceDay)
          if (source) {
            return {
              ...d,
              periods: source.periods.map(p => ({
                ...p,
                id: undefined // Remove any IDs
              }))
            }
          }
        }
        return d
      })
    }))
    setCopyMode(null)
  }

  // Copy period across days
  const copyPeriodAcrossDays = (periodNumber: number, sourceDay: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(d => {
        if (d.day !== sourceDay) {
          const sourcePeriod = prev.days
            .find(sd => sd.day === sourceDay)
            ?.periods.find(p => p.periodNumber === periodNumber)
          
          if (sourcePeriod) {
            return {
              ...d,
              periods: d.periods.map(p => {
                if (p.periodNumber === periodNumber) {
                  return { ...sourcePeriod, id: undefined }
                }
                return p
              })
            }
          }
        }
        return d
      })
    }))
    setCopyMode(null)
  }

  // Reset day
  const resetDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(d => {
        if (d.day === day) {
          return {
            ...d,
            periods: PERIODS.map(periodNum => ({
              periodNumber: periodNum,
              startTime: getDefaultStartTime(periodNum),
              endTime: getDefaultEndTime(periodNum),
              subject: '',
              teacher: '',
              room: '',
              isBreak: false
            }))
          }
        }
        return d
      })
    }))
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.class) {
      newErrors.class = 'Class is required'
    }

    if (!formData.section) {
      newErrors.section = 'Section is required'
    }

    formData.days.forEach(day => {
      day.periods.forEach(period => {
        if (!period.isBreak) {
          if (!period.subject) {
            newErrors[`${day.day}-${period.periodNumber}-subject`] = 'Subject is required'
          }
          if (!period.teacher) {
            newErrors[`${day.day}-${period.periodNumber}-teacher`] = 'Teacher is required'
          }
          if (!period.room) {
            newErrors[`${day.day}-${period.periodNumber}-room`] = 'Room is required'
          }
        }
      })
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  // Get current day data
  const currentDay = formData.days.find(d => d.day === activeDay)

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Class Information */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Class Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            {errors.class && (
              <p className="mt-1 text-sm text-red-600">{errors.class}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section <span className="text-red-500">*</span>
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Section</option>
              {['A', 'B', 'C', 'D'].map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
            {errors.section && (
              <p className="mt-1 text-sm text-red-600">{errors.section}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Academic Year
            </label>
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Timetable Schedule</h3>
          <div className="flex space-x-2">
            <select
              value={copyMode || ''}
              onChange={(e) => setCopyMode(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Copy Options</option>
              <option value="day">Copy Day</option>
              <option value="period">Copy Period Across Days</option>
            </select>
          </div>
        </div>

        {/* Day Tabs */}
        <div className="flex space-x-1 border-b border-gray-200 mb-4 overflow-x-auto pb-1">
          {formData.days.map(day => (
            <button
              key={day.day}
              type="button"
              onClick={() => setActiveDay(day.day)}
              className={`
                px-4 py-2 text-sm font-medium whitespace-nowrap
                ${activeDay === day.day
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {day.dayFull}
            </button>
          ))}
        </div>

        {/* Copy Mode UI */}
        {copyMode === 'day' && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 mb-2">Copy from another day:</p>
            <div className="flex space-x-2">
              <select
                onChange={(e) => setCopySource({ day: e.target.value })}
                className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm"
              >
                <option value="">Select source day</option>
                {formData.days
                  .filter(d => d.day !== activeDay)
                  .map(day => (
                    <option key={day.day} value={day.day}>{day.dayFull}</option>
                  ))}
              </select>
              <button
                type="button"
                onClick={() => copySource.day && copyDay(copySource.day, activeDay)}
                disabled={!copySource.day}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => setCopyMode(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {copyMode === 'period' && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 mb-2">Copy period across all days:</p>
            <div className="flex space-x-2">
              <select
                onChange={(e) => setCopySource({ period: parseInt(e.target.value) })}
                className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm"
              >
                <option value="">Select period number</option>
                {PERIODS.map(num => (
                  <option key={num} value={num}>Period {num}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => copySource.period && copyPeriodAcrossDays(copySource.period, activeDay)}
                disabled={!copySource.period}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => setCopyMode(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Periods Table */}
        {currentDay && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Period</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Time</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Subject</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Teacher</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Room</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Break</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDay.periods.map(period => {
                  const subjectError = errors[`${activeDay}-${period.periodNumber}-subject`]
                  const teacherError = errors[`${activeDay}-${period.periodNumber}-teacher`]
                  const roomError = errors[`${activeDay}-${period.periodNumber}-room`]

                  return (
                    <tr key={period.periodNumber} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Period {period.periodNumber}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          <input
                            type="time"
                            value={period.startTime}
                            onChange={(e) => handlePeriodChange(activeDay, period.periodNumber, 'startTime', e.target.value)}
                            disabled={period.isBreak}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span>-</span>
                          <input
                            type="time"
                            value={period.endTime}
                            onChange={(e) => handlePeriodChange(activeDay, period.periodNumber, 'endTime', e.target.value)}
                            disabled={period.isBreak}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {period.isBreak ? (
                          <select
                            value={period.breakType}
                            onChange={(e) => handlePeriodChange(activeDay, period.periodNumber, 'breakType', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {BREAK_TYPES.map(bt => (
                              <option key={bt.value} value={bt.value}>{bt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <select
                            value={period.subject}
                            onChange={(e) => handlePeriodChange(activeDay, period.periodNumber, 'subject', e.target.value)}
                            className={`w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              subjectError ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select Subject</option>
                            {SUBJECTS.map(subject => (
                              <option key={subject} value={subject}>{subject}</option>
                            ))}
                          </select>
                        )}
                        {subjectError && (
                          <p className="mt-1 text-xs text-red-600">{subjectError}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {!period.isBreak && (
                          <>
                            <select
                              value={period.teacher}
                              onChange={(e) => handlePeriodChange(activeDay, period.periodNumber, 'teacher', e.target.value)}
                              className={`w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                teacherError ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select Teacher</option>
                              {TEACHERS.map(teacher => (
                                <option key={teacher} value={teacher}>{teacher}</option>
                              ))}
                            </select>
                            {teacherError && (
                              <p className="mt-1 text-xs text-red-600">{teacherError}</p>
                            )}
                          </>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {!period.isBreak && (
                          <>
                            <input
                              type="text"
                              value={period.room}
                              onChange={(e) => handlePeriodChange(activeDay, period.periodNumber, 'room', e.target.value)}
                              placeholder="Room"
                              className={`w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                roomError ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {roomError && (
                              <p className="mt-1 text-xs text-red-600">{roomError}</p>
                            )}
                          </>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={period.isBreak}
                            onChange={(e) => handleBreakToggle(activeDay, period.periodNumber, e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600">Break</span>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => resetDay(activeDay)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Reset Day
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Timetable</span>
          )}
        </button>
      </div>
    </form>
  )
}

// ============================================
// TIMETABLE FORM SKELETON LOADER
// ============================================

export function TimetableFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 bg-gray-200 rounded w-16"></div>
          ))}
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7].map(row => (
            <div key={row} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <div className="h-10 bg-gray-200 rounded w-20"></div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  )
}

// ============================================
// TIMETABLE FORM UTILITIES
// ============================================

export function validateTimetable(data: TimetableFormData): string[] {
  const errors: string[] = []

  if (!data.class) {
    errors.push('Class is required')
  }

  if (!data.section) {
    errors.push('Section is required')
  }

  data.days.forEach(day => {
    day.periods.forEach(period => {
      if (!period.isBreak) {
        if (!period.subject) {
          errors.push(`${day.dayFull} Period ${period.periodNumber}: Subject is required`)
        }
        if (!period.teacher) {
          errors.push(`${day.dayFull} Period ${period.periodNumber}: Teacher is required`)
        }
        if (!period.room) {
          errors.push(`${day.dayFull} Period ${period.periodNumber}: Room is required`)
        }
      }
    })
  })

  return errors
}

export function formatTimetableForDisplay(data: TimetableFormData): any {
  return {
    class: data.class,
    section: data.section,
    academicYear: data.academicYear,
    days: data.days.map(day => ({
      name: day.dayFull,
      periods: day.periods.map(period => ({
        number: period.periodNumber,
        time: `${period.startTime} - ${period.endTime}`,
        subject: period.isBreak ? 'Break' : period.subject,
        teacher: period.isBreak ? '-' : period.teacher,
        room: period.isBreak ? '-' : period.room,
        isBreak: period.isBreak,
        breakType: period.breakType
      }))
    }))
  }
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default TimetableForm