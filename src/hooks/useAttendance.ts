'use client'

import { useState, useEffect, useCallback } from 'react'

// ============================================
// TYPES
// ============================================

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave' | 'holiday' | 'sick'
export type AttendanceType = 'daily' | 'subject-wise' | 'period-wise'
export type AttendanceSessionStatus = 'draft' | 'completed' | 'verified'

export interface StudentAttendance {
  id: string
  studentId: string
  studentName: string
  rollNo: string
  class: string
  section: string
  status: AttendanceStatus
  date: string
  checkIn?: string
  checkOut?: string
  lateMinutes?: number
  remarks?: string
  markedBy: string
  markedAt: string
}

export interface AttendanceRecord {
  id: string
  date: string
  type: AttendanceType
  class: string
  section: string
  subject?: string
  period?: number
  records: StudentAttendance[]
  summary: AttendanceSummary
  status: AttendanceSessionStatus
  markedBy: string
  markedAt: string
  verifiedBy?: string
  verifiedAt?: string
}

export interface AttendanceSummary {
  total: number
  present: number
  absent: number
  late: number
  leave: number
  sick: number
  holiday: number
  percentage: number
}

export interface AttendanceFilters {
  class?: string
  section?: string
  fromDate?: string
  toDate?: string
  status?: AttendanceStatus
  studentId?: string
}

export interface MonthlyAttendance {
  month: string
  year: number
  present: number
  absent: number
  late: number
  leave: number
  total: number
  percentage: number
}

export interface StudentAttendanceStats {
  studentId: string
  studentName: string
  rollNo: string
  class: string
  section: string
  totalDays: number
  present: number
  absent: number
  late: number
  leave: number
  sick: number
  percentage: number
  monthly: MonthlyAttendance[]
}

export interface UseAttendanceReturn {
  attendanceRecords: AttendanceRecord[]
  loading: boolean
  error: string | null
  getTodaysAttendance: (classId: string, section: string) => AttendanceRecord | undefined
  getAttendanceByDate: (date: string, classId: string, section: string) => AttendanceRecord | undefined
  getAttendanceByStudent: (studentId: string, fromDate?: string, toDate?: string) => StudentAttendance[]
  getStudentStats: (studentId: string) => StudentAttendanceStats | null
  getClassStats: (classId: string, section: string, month?: number, year?: number) => any
  markAttendance: (data: Omit<AttendanceRecord, 'id' | 'summary' | 'markedAt'>) => Promise<boolean>
  updateAttendance: (id: string, records: StudentAttendance[]) => Promise<boolean>
  verifyAttendance: (id: string, verifiedBy: string) => Promise<boolean>
  deleteAttendance: (id: string) => Promise<boolean>
  refreshAttendance: () => void
  filterAttendance: (filters: AttendanceFilters) => AttendanceRecord[]
  getLowAttendanceStudents: (threshold?: number) => StudentAttendanceStats[]
  getAttendanceTrends: (classId: string, section: string, months?: number) => any
  exportAttendance: (filters: AttendanceFilters) => any[]
}

// ============================================
// MOCK DATA
// ============================================

const generateMockAttendance = (): AttendanceRecord[] => {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  
  const students = [
    { id: 's1', name: 'Ali Ahmed', rollNo: '101', class: '10', section: 'A' },
    { id: 's2', name: 'Bilal Hassan', rollNo: '102', class: '10', section: 'A' },
    { id: 's3', name: 'Sara Fatima', rollNo: '201', class: '9', section: 'B' },
    { id: 's4', name: 'Zainab Bibi', rollNo: '202', class: '9', section: 'B' },
    { id: 's5', name: 'Hamza Ali', rollNo: '301', class: '8', section: 'A' }
  ]

  const createRecords = (date: string): StudentAttendance[] => {
    return [
      {
        id: `sa1-${date}`,
        studentId: 's1',
        studentName: 'Ali Ahmed',
        rollNo: '101',
        class: '10',
        section: 'A',
        status: 'present',
        date,
        checkIn: '08:00',
        checkOut: '14:00',
        markedBy: 'teacher-1',
        markedAt: `${date}T08:30:00Z`
      },
      {
        id: `sa2-${date}`,
        studentId: 's2',
        studentName: 'Bilal Hassan',
        rollNo: '102',
        class: '10',
        section: 'A',
        status: 'present',
        date,
        checkIn: '08:05',
        checkOut: '14:00',
        lateMinutes: 5,
        markedBy: 'teacher-1',
        markedAt: `${date}T08:30:00Z`
      },
      {
        id: `sa3-${date}`,
        studentId: 's3',
        studentName: 'Sara Fatima',
        rollNo: '201',
        class: '9',
        section: 'B',
        status: 'absent',
        date,
        remarks: 'Sick',
        markedBy: 'teacher-2',
        markedAt: `${date}T08:30:00Z`
      },
      {
        id: `sa4-${date}`,
        studentId: 's4',
        studentName: 'Zainab Bibi',
        rollNo: '202',
        class: '9',
        section: 'B',
        status: 'late',
        date,
        checkIn: '08:30',
        lateMinutes: 30,
        markedBy: 'teacher-2',
        markedAt: `${date}T08:30:00Z`
      },
      {
        id: `sa5-${date}`,
        studentId: 's5',
        studentName: 'Hamza Ali',
        rollNo: '301',
        class: '8',
        section: 'A',
        status: 'present',
        date,
        checkIn: '07:55',
        checkOut: '14:00',
        markedBy: 'teacher-3',
        markedAt: `${date}T08:30:00Z`
      }
    ]
  }

  const calculateSummary = (records: StudentAttendance[]): AttendanceSummary => {
    const total = records.length
    const present = records.filter(r => r.status === 'present').length
    const absent = records.filter(r => r.status === 'absent').length
    const late = records.filter(r => r.status === 'late').length
    const leave = records.filter(r => r.status === 'leave').length
    const sick = records.filter(r => r.status === 'sick').length
    const holiday = records.filter(r => r.status === 'holiday').length
    const percentage = total > 0 ? ((present + late) / total) * 100 : 0

    return { total, present, absent, late, leave, sick, holiday, percentage }
  }

  const todayRecords = createRecords(today)
  const yesterdayRecords = createRecords(yesterday)

  return [
    {
      id: 'att1',
      date: today,
      type: 'daily',
      class: '10',
      section: 'A',
      records: todayRecords.filter(r => r.class === '10' && r.section === 'A'),
      summary: calculateSummary(todayRecords.filter(r => r.class === '10' && r.section === 'A')),
      status: 'completed',
      markedBy: 'teacher-1',
      markedAt: `${today}T08:30:00Z`
    },
    {
      id: 'att2',
      date: today,
      type: 'daily',
      class: '9',
      section: 'B',
      records: todayRecords.filter(r => r.class === '9' && r.section === 'B'),
      summary: calculateSummary(todayRecords.filter(r => r.class === '9' && r.section === 'B')),
      status: 'completed',
      markedBy: 'teacher-2',
      markedAt: `${today}T08:30:00Z`
    },
    {
      id: 'att3',
      date: today,
      type: 'daily',
      class: '8',
      section: 'A',
      records: todayRecords.filter(r => r.class === '8' && r.section === 'A'),
      summary: calculateSummary(todayRecords.filter(r => r.class === '8' && r.section === 'A')),
      status: 'completed',
      markedBy: 'teacher-3',
      markedAt: `${today}T08:30:00Z`
    },
    {
      id: 'att4',
      date: yesterday,
      type: 'daily',
      class: '10',
      section: 'A',
      records: yesterdayRecords.filter(r => r.class === '10' && r.section === 'A'),
      summary: calculateSummary(yesterdayRecords.filter(r => r.class === '10' && r.section === 'A')),
      status: 'verified',
      markedBy: 'teacher-1',
      markedAt: `${yesterday}T08:30:00Z`,
      verifiedBy: 'principal-1',
      verifiedAt: `${yesterday}T15:00:00Z`
    }
  ]
}

const MOCK_ATTENDANCE = generateMockAttendance()

// ============================================
// MAIN HOOK
// ============================================

export function useAttendance(): UseAttendanceReturn {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Load data on mount
  useEffect(() => {
    loadAttendance()
  }, [])

  // Load attendance
  const loadAttendance = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setAttendanceRecords(MOCK_ATTENDANCE)
    } catch (err) {
      setError('Failed to load attendance records')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Get today's attendance for a class
  const getTodaysAttendance = (classId: string, section: string): AttendanceRecord | undefined => {
    const today = new Date().toISOString().split('T')[0]
    return attendanceRecords.find(
      record => record.date === today && record.class === classId && record.section === section
    )
  }

  // Get attendance by date
  const getAttendanceByDate = (date: string, classId: string, section: string): AttendanceRecord | undefined => {
    return attendanceRecords.find(
      record => record.date === date && record.class === classId && record.section === section
    )
  }

  // Get attendance by student
  const getAttendanceByStudent = (studentId: string, fromDate?: string, toDate?: string): StudentAttendance[] => {
    let records: StudentAttendance[] = []
    
    attendanceRecords.forEach(record => {
      const studentRecord = record.records.find(r => r.studentId === studentId)
      if (studentRecord) {
        records.push(studentRecord)
      }
    })

    if (fromDate) {
      records = records.filter(r => r.date >= fromDate)
    }
    if (toDate) {
      records = records.filter(r => r.date <= toDate)
    }

    return records.sort((a, b) => b.date.localeCompare(a.date))
  }

  // Get student statistics
  const getStudentStats = (studentId: string): StudentAttendanceStats | null => {
    const records = getAttendanceByStudent(studentId)
    
    if (records.length === 0) return null

    const firstRecord = records[0]
    const totalDays = records.length
    const present = records.filter(r => r.status === 'present').length
    const absent = records.filter(r => r.status === 'absent').length
    const late = records.filter(r => r.status === 'late').length
    const leave = records.filter(r => r.status === 'leave').length
    const sick = records.filter(r => r.status === 'sick').length
    const percentage = (present + late) / totalDays * 100

    // Group by month
    const monthlyMap: Record<string, { count: number, present: number, absent: number, late: number, leave: number }> = {}
    
    records.forEach(record => {
      const date = new Date(record.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
      const monthName = date.toLocaleString('default', { month: 'long' })
      const year = date.getFullYear()
      
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { count: 0, present: 0, absent: 0, late: 0, leave: 0 }
      }
      
      monthlyMap[monthKey].count++
      if (record.status === 'present') monthlyMap[monthKey].present++
      if (record.status === 'absent') monthlyMap[monthKey].absent++
      if (record.status === 'late') monthlyMap[monthKey].late++
      if (record.status === 'leave') monthlyMap[monthKey].leave++
    })

    const monthly: MonthlyAttendance[] = Object.entries(monthlyMap).map(([key, data]) => {
      const [year, month] = key.split('-')
      return {
        month: new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' }),
        year: parseInt(year),
        present: data.present,
        absent: data.absent,
        late: data.late,
        leave: data.leave,
        total: data.count,
        percentage: (data.present + data.late) / data.count * 100
      }
    })

    return {
      studentId,
      studentName: firstRecord.studentName,
      rollNo: firstRecord.rollNo,
      class: firstRecord.class,
      section: firstRecord.section,
      totalDays,
      present,
      absent,
      late,
      leave,
      sick,
      percentage,
      monthly
    }
  }

  // Get class statistics
  const getClassStats = (classId: string, section: string, month?: number, year?: number): any => {
    const classRecords = attendanceRecords.filter(
      record => record.class === classId && record.section === section
    )

    if (month !== undefined && year !== undefined) {
      const monthStr = month < 10 ? `0${month}` : `${month}`
      const filtered = classRecords.filter(record => {
        const [y, m] = record.date.split('-')
        return parseInt(y) === year && parseInt(m) === month
      })
      
      const allRecords = filtered.flatMap(r => r.records)
      const total = allRecords.length
      const present = allRecords.filter(r => r.status === 'present').length
      const absent = allRecords.filter(r => r.status === 'absent').length
      const late = allRecords.filter(r => r.status === 'late').length
      const leave = allRecords.filter(r => r.status === 'leave').length

      return {
        month,
        year,
        totalDays: filtered.length,
        totalStudents: total,
        present,
        absent,
        late,
        leave,
        percentage: total > 0 ? (present + late) / total * 100 : 0
      }
    }

    // Overall stats
    const allRecords = classRecords.flatMap(r => r.records)
    const total = allRecords.length
    const present = allRecords.filter(r => r.status === 'present').length
    const absent = allRecords.filter(r => r.status === 'absent').length
    const late = allRecords.filter(r => r.status === 'late').length
    const leave = allRecords.filter(r => r.status === 'leave').length

    return {
      class: classId,
      section,
      totalDays: classRecords.length,
      totalStudents: total,
      present,
      absent,
      late,
      leave,
      percentage: total > 0 ? (present + late) / total * 100 : 0
    }
  }

  // Mark attendance
  const markAttendance = async (data: Omit<AttendanceRecord, 'id' | 'summary' | 'markedAt'>): Promise<boolean> => {
    try {
      setLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 500))

      const total = data.records.length
      const present = data.records.filter(r => r.status === 'present').length
      const absent = data.records.filter(r => r.status === 'absent').length
      const late = data.records.filter(r => r.status === 'late').length
      const leave = data.records.filter(r => r.status === 'leave').length
      const sick = data.records.filter(r => r.status === 'sick').length
      const holiday = data.records.filter(r => r.status === 'holiday').length
      const percentage = total > 0 ? ((present + late) / total) * 100 : 0

      const newRecord: AttendanceRecord = {
        ...data,
        id: `att${Date.now()}`,
        summary: { total, present, absent, late, leave, sick, holiday, percentage },
        markedAt: new Date().toISOString()
      }

      setAttendanceRecords(prev => [...prev, newRecord])
      return true
    } catch (err) {
      setError('Failed to mark attendance')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Update attendance
  const updateAttendance = async (id: string, records: StudentAttendance[]): Promise<boolean> => {
    try {
      setLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 500))

      setAttendanceRecords(prev => 
        prev.map(record => {
          if (record.id === id) {
            const total = records.length
            const present = records.filter(r => r.status === 'present').length
            const absent = records.filter(r => r.status === 'absent').length
            const late = records.filter(r => r.status === 'late').length
            const leave = records.filter(r => r.status === 'leave').length
            const sick = records.filter(r => r.status === 'sick').length
            const holiday = records.filter(r => r.status === 'holiday').length
            const percentage = total > 0 ? ((present + late) / total) * 100 : 0

            return {
              ...record,
              records,
              summary: { total, present, absent, late, leave, sick, holiday, percentage }
            }
          }
          return record
        })
      )
      
      return true
    } catch (err) {
      setError('Failed to update attendance')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Verify attendance
  const verifyAttendance = async (id: string, verifiedBy: string): Promise<boolean> => {
    try {
      setLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 500))

      setAttendanceRecords(prev => 
        prev.map(record => 
          record.id === id 
            ? { 
                ...record, 
                status: 'verified', 
                verifiedBy, 
                verifiedAt: new Date().toISOString() 
              } 
            : record
        )
      )
      
      return true
    } catch (err) {
      setError('Failed to verify attendance')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete attendance
  const deleteAttendance = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 500))

      setAttendanceRecords(prev => prev.filter(record => record.id !== id))
      return true
    } catch (err) {
      setError('Failed to delete attendance')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Refresh attendance
  const refreshAttendance = (): void => {
    loadAttendance()
  }

  // Filter attendance
  const filterAttendance = useCallback((filters: AttendanceFilters): AttendanceRecord[] => {
    return attendanceRecords.filter(record => {
      if (filters.class && record.class !== filters.class) return false
      if (filters.section && record.section !== filters.section) return false
      if (filters.fromDate && record.date < filters.fromDate) return false
      if (filters.toDate && record.date > filters.toDate) return false
      if (filters.studentId) {
        const hasStudent = record.records.some(r => r.studentId === filters.studentId)
        if (!hasStudent) return false
      }
      return true
    })
  }, [attendanceRecords])

  // Get low attendance students
  const getLowAttendanceStudents = (threshold: number = 75): StudentAttendanceStats[] => {
    const studentIds = new Set<string>()
    attendanceRecords.forEach(record => {
      record.records.forEach(r => studentIds.add(r.studentId))
    })

    const stats: StudentAttendanceStats[] = []
    studentIds.forEach(id => {
      const studentStat = getStudentStats(id)
      if (studentStat && studentStat.percentage < threshold) {
        stats.push(studentStat)
      }
    })

    return stats.sort((a, b) => a.percentage - b.percentage)
  }

  // Get attendance trends
  const getAttendanceTrends = (classId: string, section: string, months: number = 6): any => {
    const today = new Date()
    const trends = []

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setMonth(today.getMonth() - i)
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      
      const stats = getClassStats(classId, section, month, year)
      trends.push({
        month: date.toLocaleString('default', { month: 'short' }),
        year,
        percentage: stats?.percentage || 0
      })
    }

    return trends
  }

  // Export attendance
  const exportAttendance = (filters: AttendanceFilters): any[] => {
    const filtered = filterAttendance(filters)
    
    return filtered.flatMap(record => 
      record.records.map(r => ({
        Date: record.date,
        Class: record.class,
        Section: record.section,
        'Student Name': r.studentName,
        'Roll No': r.rollNo,
        Status: r.status,
        'Check In': r.checkIn || '-',
        'Check Out': r.checkOut || '-',
        'Late Minutes': r.lateMinutes || 0,
        Remarks: r.remarks || '-'
      }))
    )
  }

  return {
    attendanceRecords,
    loading,
    error,
    getTodaysAttendance,
    getAttendanceByDate,
    getAttendanceByStudent,
    getStudentStats,
    getClassStats,
    markAttendance,
    updateAttendance,
    verifyAttendance,
    deleteAttendance,
    refreshAttendance,
    filterAttendance,
    getLowAttendanceStudents,
    getAttendanceTrends,
    exportAttendance
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getStatusColor(status: AttendanceStatus): string {
  const colors: Record<AttendanceStatus, string> = {
    present: 'bg-green-100 text-green-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    leave: 'bg-blue-100 text-blue-800',
    holiday: 'bg-purple-100 text-purple-800',
    sick: 'bg-orange-100 text-orange-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function getStatusIcon(status: AttendanceStatus): string {
  const icons: Record<AttendanceStatus, string> = {
    present: '✓',
    absent: '✗',
    late: '⏰',
    leave: '📝',
    holiday: '🎉',
    sick: '🤒'
  }
  return icons[status] || '?'
}

export function formatAttendanceDate(date: string): string {
  return new Date(date).toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function calculateAttendancePercentage(present: number, late: number, total: number): number {
  if (total === 0) return 0
  return Math.round(((present + late) / total) * 100)
}

export function validateAttendanceRecords(records: StudentAttendance[]): Record<string, string> {
  const errors: Record<string, string> = {}

  if (records.length === 0) {
    errors.records = 'At least one attendance record is required'
  }

  records.forEach((record, index) => {
    if (!record.studentId) {
      errors[`record-${index}`] = `Student ID is missing for record ${index + 1}`
    }
    if (!record.status) {
      errors[`record-${index}`] = `Status is missing for record ${index + 1}`
    }
  })

  return errors
}

export function getAttendanceSummaryText(summary: AttendanceSummary): string {
  return `${summary.present} Present, ${summary.absent} Absent, ${summary.late} Late - ${summary.percentage.toFixed(1)}%`
}

export function isAttendanceCompleted(record: AttendanceRecord): boolean {
  return record.status === 'completed' || record.status === 'verified'
}

export function canEditAttendance(record: AttendanceRecord): boolean {
  const today = new Date().toISOString().split('T')[0]
  return record.date === today && record.status === 'draft'
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default useAttendance