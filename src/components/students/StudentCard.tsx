'use client'

import React from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface Student {
  id: string
  name: string
  rollNo: string
  class: string
  section: string
  fatherName: string
  phone: string
  attendance: number
  feesStatus: 'paid' | 'pending' | 'partial'
  status: 'active' | 'inactive'
}

export interface StudentCardProps {
  student: Student
  onView?: (student: Student) => void
  onEdit?: (student: Student) => void
  onDelete?: (student: Student) => void
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getStatusBadge = (status: string): string => {
  if (status === 'active') return 'bg-green-100 text-green-800'
  if (status === 'inactive') return 'bg-gray-100 text-gray-800'
  return 'bg-gray-100 text-gray-800'
}

const getFeesBadge = (fees: string): string => {
  if (fees === 'paid') return 'bg-green-100 text-green-800'
  if (fees === 'pending') return 'bg-yellow-100 text-yellow-800'
  if (fees === 'partial') return 'bg-orange-100 text-orange-800'
  return 'bg-gray-100 text-gray-800'
}

const getAttendanceColor = (attendance: number): string => {
  if (attendance >= 90) return 'text-green-600'
  if (attendance >= 75) return 'text-blue-600'
  return 'text-yellow-600'
}

const getInitials = (name: string): string => {
  const words = name.split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// ============================================
// STUDENT CARD COMPONENT
// ============================================

export function StudentCard({
  student,
  onView,
  onEdit,
  onDelete
}: StudentCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Header with Avatar and Name */}
        <div className="flex items-center space-x-3 mb-3">
          {/* Avatar with Initials */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {getInitials(student.name)}
          </div>
          
          {/* Name and Roll Number */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{student.name}</h3>
            <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
          </div>

          {/* Three-dot menu indicator (just visual) */}
          <div className="text-gray-400 text-sm">•••</div>
        </div>

        {/* Student Details */}
        <div className="space-y-2 text-sm mb-3">
          {/* Father Name */}
          <div className="flex items-center text-gray-600">
            <span className="w-16 text-gray-400">Father:</span>
            <span className="flex-1 font-medium">{student.fatherName}</span>
          </div>

          {/* Class */}
          <div className="flex items-center text-gray-600">
            <span className="w-16 text-gray-400">Class:</span>
            <span className="flex-1 font-medium">{student.class}-{student.section}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center text-gray-600">
            <span className="w-16 text-gray-400">Phone:</span>
            <span className="flex-1 font-medium">{student.phone}</span>
          </div>

          {/* Attendance with color */}
          <div className="flex items-center">
            <span className="w-16 text-gray-400">Attendance:</span>
            <span className={`flex-1 font-bold ${getAttendanceColor(student.attendance)}`}>
              {student.attendance}%
            </span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadge(student.status)}`}>
            {student.status}
          </span>
          <span className={`px-2 py-0.5 text-xs rounded-full ${getFeesBadge(student.feesStatus)}`}>
            Fees: {student.feesStatus}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2 border-t border-gray-100">
          {onView && (
            <button
              onClick={() => onView(student)}
              className="flex-1 py-1.5 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
            >
              View
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(student)}
              className="flex-1 py-1.5 text-xs bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(student)}
              className="flex-1 py-1.5 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// COMPACT VERSION (Small Card)
// ============================================

export function StudentCardCompact({ student, onClick }: { student: Student; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm cursor-pointer transition-shadow"
    >
      <div className="flex items-center space-x-3">
        {/* Small Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
          {getInitials(student.name)}
        </div>
        
        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">{student.name}</h4>
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${getStatusBadge(student.status)}`}>
              {student.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">Roll: {student.rollNo} | Class: {student.class}-{student.section}</p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MINIMAL VERSION (For lists)
// ============================================

export function StudentCardMinimal({ student, onClick }: { student: Student; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
    >
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
        {getInitials(student.name)}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{student.name}</div>
        <div className="text-xs text-gray-500">{student.rollNo} • {student.class}-{student.section}</div>
      </div>
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${getAttendanceColor(student.attendance)} bg-opacity-10`}>
        {student.attendance}%
      </span>
    </div>
  )
}

// ============================================
// SKELETON LOADER
// ============================================

export function StudentCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      <div className="flex space-x-2">
        <div className="flex-1 h-6 bg-gray-200 rounded"></div>
        <div className="flex-1 h-6 bg-gray-200 rounded"></div>
        <div className="flex-1 h-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default StudentCard