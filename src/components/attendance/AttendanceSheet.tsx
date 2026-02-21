'use client'

import React, { useState } from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

interface Student {
  id: string
  name: string
  rollNo: string
  class: string
  section: string
}

interface AttendanceRecord {
  studentId: string
  status: 'present' | 'absent' | 'late' | 'leave'
}

interface AttendanceSheetProps {
  date?: string
  class?: string
  section?: string
  students?: Student[]
  onSave?: (records: AttendanceRecord[]) => void
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Ali Ahmed', rollNo: '101', class: '10', section: 'A' },
  { id: '2', name: 'Bilal Hassan', rollNo: '102', class: '10', section: 'A' },
  { id: '3', name: 'Sara Fatima', rollNo: '103', class: '10', section: 'A' },
  { id: '4', name: 'Zainab Bibi', rollNo: '104', class: '10', section: 'A' },
  { id: '5', name: 'Hamza Ali', rollNo: '105', class: '10', section: 'A' },
]

// ============================================
// ATTENDANCE SHEET COMPONENT
// ============================================

export function AttendanceSheet({
  date = new Date().toISOString().split('T')[0],
  class: className = '10',
  section = 'A',
  students = MOCK_STUDENTS,
  onSave
}: AttendanceSheetProps) {
  const [records, setRecords] = useState<AttendanceRecord[]>(
    students.map(s => ({ studentId: s.id, status: 'present' }))
  )

  const updateStatus = (studentId: string, status: 'present' | 'absent' | 'late' | 'leave') => {
    setRecords(prev =>
      prev.map(r => r.studentId === studentId ? { ...r, status } : r)
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500'
      case 'absent': return 'bg-red-500'
      case 'late': return 'bg-yellow-500'
      case 'leave': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const handleSave = () => {
    if (onSave) onSave(records)
    alert('Attendance saved!')
  }

  const totals = {
    present: records.filter(r => r.status === 'present').length,
    absent: records.filter(r => r.status === 'absent').length,
    late: records.filter(r => r.status === 'late').length,
    leave: records.filter(r => r.status === 'leave').length,
    total: records.length
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Attendance Sheet</h2>
            <p className="text-sm text-gray-500">
              Class {className} - Section {section} | {date}
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Attendance
          </button>
        </div>
      </div>

      {/* Summary Badges */}
      <div className="p-4 border-b border-gray-200 bg-gray-50/50">
        <div className="flex gap-4 text-sm">
          <span>✅ Present: {totals.present}</span>
          <span>❌ Absent: {totals.absent}</span>
          <span>⏰ Late: {totals.late}</span>
          <span>📝 Leave: {totals.leave}</span>
          <span className="font-medium">Total: {totals.total}</span>
        </div>
      </div>

      {/* Student List */}
      <div className="divide-y divide-gray-200">
        {students.map(student => {
          const record = records.find(r => r.studentId === student.id)!
          
          return (
            <div key={student.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex-1">
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p>
              </div>
              
              <div className="flex gap-2">
                {(['present', 'absent', 'late', 'leave'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => updateStatus(student.id, status)}
                    className={`px-3 py-1 rounded text-sm capitalize transition-colors ${
                      record.status === status
                        ? `${getStatusColor(status)} text-white`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'present' && '✓'}
                    {status === 'absent' && '✗'}
                    {status === 'late' && '⏰'}
                    {status === 'leave' && '📝'}
                    <span className="ml-1 hidden sm:inline">{status}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// QUICK ATTENDANCE (Compact Version)
// ============================================

export function QuickAttendance({ students = MOCK_STUDENTS.slice(0, 3) }: { students?: Student[] }) {
  const [records, setRecords] = useState<Record<string, string>>({})

  const toggleStatus = (studentId: string) => {
    setRecords(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
    }))
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium mb-3">Quick Attendance</h3>
      <div className="space-y-2">
        {students.map(s => (
          <div key={s.id} className="flex items-center justify-between">
            <span className="text-sm">{s.name}</span>
            <button
              onClick={() => toggleStatus(s.id)}
              className={`px-3 py-1 rounded text-sm ${
                records[s.id] === 'present'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {records[s.id] === 'present' ? 'Present' : 'Absent'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// ATTENDANCE SHEET SKELETON
// ============================================

export function AttendanceSheetSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 animate-pulse">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>
      <div className="divide-y divide-gray-200">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default AttendanceSheet