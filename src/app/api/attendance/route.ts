import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// ============================================
// SIMPLE TYPES
// ============================================

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  rollNo: string
  class: string
  section: string
  date: string
  status: 'present' | 'absent' | 'late' | 'leave'
  checkIn?: string
  checkOut?: string
  remarks?: string
}

export interface AttendanceSummary {
  total: number
  present: number
  absent: number
  late: number
  leave: number
  percentage: number
}

export interface AttendanceRequest {
  date: string
  class: string
  section: string
  records: Array<{
    studentId: string
    status: 'present' | 'absent' | 'late' | 'leave'
    checkIn?: string
    checkOut?: string
    remarks?: string
  }>
}

// ============================================
// MOCK DATABASE
// ============================================

// In a real app, this would be a database
let mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: 's1',
    studentName: 'Ali Ahmed',
    rollNo: '101',
    class: '10',
    section: 'A',
    date: '2024-03-01',
    status: 'present',
    checkIn: '08:00',
    checkOut: '14:00'
  },
  {
    id: '2',
    studentId: 's2',
    studentName: 'Bilal Hassan',
    rollNo: '102',
    class: '10',
    section: 'A',
    date: '2024-03-01',
    status: 'present',
    checkIn: '08:05',
    checkOut: '14:00'
  },
  {
    id: '3',
    studentId: 's3',
    studentName: 'Sara Fatima',
    rollNo: '201',
    class: '9',
    section: 'B',
    date: '2024-03-01',
    status: 'absent',
    remarks: 'Sick'
  },
  {
    id: '4',
    studentId: 's4',
    studentName: 'Zainab Bibi',
    rollNo: '202',
    class: '9',
    section: 'B',
    date: '2024-03-01',
    status: 'late',
    checkIn: '08:30'
  },
  {
    id: '5',
    studentId: 's5',
    studentName: 'Hamza Ali',
    rollNo: '301',
    class: '8',
    section: 'A',
    date: '2024-03-01',
    status: 'present',
    checkIn: '07:55',
    checkOut: '14:00'
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate a unique ID
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

/**
 * Validate attendance request
 */
function validateAttendanceRequest(data: any): { valid: boolean; error?: string } {
  if (!data.date) return { valid: false, error: 'Date is required' }
  if (!data.class) return { valid: false, error: 'Class is required' }
  if (!data.section) return { valid: false, error: 'Section is required' }
  if (!data.records || !Array.isArray(data.records) || data.records.length === 0) {
    return { valid: false, error: 'Records are required' }
  }

  for (const record of data.records) {
    if (!record.studentId) return { valid: false, error: 'Student ID is required for each record' }
    if (!record.status) return { valid: false, error: 'Status is required for each record' }
    if (!['present', 'absent', 'late', 'leave'].includes(record.status)) {
      return { valid: false, error: 'Invalid status value' }
    }
  }

  return { valid: true }
}

/**
 * Calculate attendance summary
 */
function calculateSummary(records: AttendanceRecord[]): AttendanceSummary {
  const total = records.length
  const present = records.filter(r => r.status === 'present').length
  const absent = records.filter(r => r.status === 'absent').length
  const late = records.filter(r => r.status === 'late').length
  const leave = records.filter(r => r.status === 'leave').length
  const percentage = total > 0 ? Math.round(((present + late) / total) * 100) : 0

  return { total, present, absent, late, leave, percentage }
}

// ============================================
// GET /api/attendance
// ============================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const date = searchParams.get('date')
    const classParam = searchParams.get('class')
    const section = searchParams.get('section')
    const studentId = searchParams.get('studentId')
    const fromDate = searchParams.get('fromDate')
    const toDate = searchParams.get('toDate')

    // Filter records
    let filteredRecords = [...mockAttendanceRecords]

    if (date) {
      filteredRecords = filteredRecords.filter(r => r.date === date)
    }

    if (classParam) {
      filteredRecords = filteredRecords.filter(r => r.class === classParam)
    }

    if (section) {
      filteredRecords = filteredRecords.filter(r => r.section === section)
    }

    if (studentId) {
      filteredRecords = filteredRecords.filter(r => r.studentId === studentId)
    }

    if (fromDate) {
      filteredRecords = filteredRecords.filter(r => r.date >= fromDate)
    }

    if (toDate) {
      filteredRecords = filteredRecords.filter(r => r.date <= toDate)
    }

    // Calculate summary
    const summary = calculateSummary(filteredRecords)

    return NextResponse.json({
      success: true,
      data: {
        records: filteredRecords,
        summary,
        total: filteredRecords.length
      }
    })
  } catch (error) {
    console.error('GET /api/attendance error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// POST /api/attendance
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    const validation = validateAttendanceRequest(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    const { date, class: className, section, records } = body as AttendanceRequest

    // Check if attendance already exists for this date/class/section
    const existingRecord = mockAttendanceRecords.find(
      r => r.date === date && r.class === className && r.section === section
    )

    if (existingRecord) {
      return NextResponse.json(
        { success: false, error: 'Attendance already marked for this class on this date' },
        { status: 409 }
      )
    }

    // Get student names (in real app, fetch from database)
    // For mock, we'll use placeholder names
    const studentNames: Record<string, string> = {
      s1: 'Ali Ahmed',
      s2: 'Bilal Hassan',
      s3: 'Sara Fatima',
      s4: 'Zainab Bibi',
      s5: 'Hamza Ali'
    }

    // Create new attendance records
    const newRecords: AttendanceRecord[] = records.map((record, index) => ({
      id: generateId(),
      studentId: record.studentId,
      studentName: studentNames[record.studentId] || `Student ${record.studentId}`,
      rollNo: `${index + 101}`, // In real app, fetch from database
      class: className,
      section: section,
      date: date,
      status: record.status,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      remarks: record.remarks
    }))

    // Add to mock database
    mockAttendanceRecords = [...mockAttendanceRecords, ...newRecords]

    // Calculate summary
    const summary = calculateSummary(newRecords)

    return NextResponse.json({
      success: true,
      data: {
        records: newRecords,
        summary,
        count: newRecords.length
      }
    }, { status: 201 })
  } catch (error) {
    console.error('POST /api/attendance error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// PUT /api/attendance
// ============================================

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, checkIn, checkOut, remarks } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Attendance record ID is required' },
        { status: 400 }
      )
    }

    // Find record
    const recordIndex = mockAttendanceRecords.findIndex(r => r.id === id)
    if (recordIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Attendance record not found' },
        { status: 404 }
      )
    }

    // Update record
    const updatedRecord = {
      ...mockAttendanceRecords[recordIndex],
      ...(status && { status }),
      ...(checkIn !== undefined && { checkIn }),
      ...(checkOut !== undefined && { checkOut }),
      ...(remarks !== undefined && { remarks })
    }

    mockAttendanceRecords[recordIndex] = updatedRecord

    return NextResponse.json({
      success: true,
      data: updatedRecord
    })
  } catch (error) {
    console.error('PUT /api/attendance error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// DELETE /api/attendance
// ============================================

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const date = searchParams.get('date')
    const classParam = searchParams.get('class')
    const section = searchParams.get('section')

    if (id) {
      // Delete single record
      const recordIndex = mockAttendanceRecords.findIndex(r => r.id === id)
      if (recordIndex === -1) {
        return NextResponse.json(
          { success: false, error: 'Attendance record not found' },
          { status: 404 }
        )
      }

      mockAttendanceRecords.splice(recordIndex, 1)

      return NextResponse.json({
        success: true,
        message: 'Attendance record deleted successfully'
      })
    } else if (date && classParam && section) {
      // Delete all records for a date/class/section
      const initialLength = mockAttendanceRecords.length
      mockAttendanceRecords = mockAttendanceRecords.filter(
        r => !(r.date === date && r.class === classParam && r.section === section)
      )

      const deletedCount = initialLength - mockAttendanceRecords.length

      return NextResponse.json({
        success: true,
        message: `Deleted ${deletedCount} attendance records`,
        count: deletedCount
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Missing parameters. Provide id or date+class+section' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('DELETE /api/attendance error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// PATCH /api/attendance (Bulk update)
// ============================================

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, class: className, section, records } = body

    if (!date || !className || !section || !records || !Array.isArray(records)) {
      return NextResponse.json(
        { success: false, error: 'Date, class, section, and records array are required' },
        { status: 400 }
      )
    }

    // Find all records for this date/class/section
    const recordIndices = mockAttendanceRecords
      .map((record, index) => ({ record, index }))
      .filter(item => 
        item.record.date === date && 
        item.record.class === className && 
        item.record.section === section
      )

    if (recordIndices.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No attendance records found for this class on this date' },
        { status: 404 }
      )
    }

    // Update records
    const updates: AttendanceRecord[] = []
    for (const { index } of recordIndices) {
      const recordId = mockAttendanceRecords[index].id
      const updateData = records.find((r: any) => r.id === recordId)
      
      if (updateData) {
        mockAttendanceRecords[index] = {
          ...mockAttendanceRecords[index],
          ...(updateData.status && { status: updateData.status }),
          ...(updateData.checkIn !== undefined && { checkIn: updateData.checkIn }),
          ...(updateData.checkOut !== undefined && { checkOut: updateData.checkOut }),
          ...(updateData.remarks !== undefined && { remarks: updateData.remarks })
        }
        updates.push(mockAttendanceRecords[index])
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        records: updates,
        count: updates.length
      }
    })
  } catch (error) {
    console.error('PATCH /api/attendance error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}