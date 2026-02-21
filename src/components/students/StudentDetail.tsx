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
  motherName?: string
  dateOfBirth: string
  gender: string
  phone: string
  email: string
  address: string
  feesStatus: string
  attendance: number
  status: string
}

export interface StudentDetailProps {
  student: Student
  onEdit?: () => void
  onBack?: () => void
  onDelete?: () => void
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getStatusColor = (status: string): string => {
  if (status === 'active') return 'bg-green-100 text-green-800'
  if (status === 'inactive') return 'bg-gray-100 text-gray-800'
  return 'bg-gray-100 text-gray-800'
}

const getFeesColor = (fees: string): string => {
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

const formatDate = (date: string): string => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// ============================================
// INFO ROW COMPONENT
// ============================================

interface InfoRowProps {
  label: string
  value: string | number
  className?: string
}

function InfoRow({ label, value, className = '' }: InfoRowProps) {
  return (
    <div className={`flex py-2 border-b border-gray-100 ${className}`}>
      <span className="w-32 text-sm text-gray-500">{label}</span>
      <span className="flex-1 text-sm text-gray-900 font-medium">{value || 'N/A'}</span>
    </div>
  )
}

// ============================================
// MAIN STUDENT DETAIL COMPONENT
// ============================================

export function StudentDetail({
  student,
  onEdit,
  onBack,
  onDelete
}: StudentDetailProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Student Profile</h2>
          <div className="flex space-x-2">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm rounded hover:bg-opacity-30"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="p-6">
        {/* Basic Info Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
              {student.name.charAt(0)}
            </div>
            
            {/* Name and Status */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <p className="text-gray-500">Roll No: {student.rollNo}</p>
              <div className="flex space-x-2 mt-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${getFeesColor(student.feesStatus)}`}>
                  Fees: {student.feesStatus}
                </span>
                <span className={`px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800`}>
                  Class {student.class}-{student.section}
                </span>
              </div>
            </div>

            {/* Attendance Badge */}
            <div className="text-center">
              <div className={`text-3xl font-bold ${getAttendanceColor(student.attendance)}`}>
                {student.attendance}%
              </div>
              <div className="text-xs text-gray-500">Attendance</div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <InfoRow label="Father's Name" value={student.fatherName} />
              {student.motherName && <InfoRow label="Mother's Name" value={student.motherName} />}
              <InfoRow label="Date of Birth" value={formatDate(student.dateOfBirth)} />
              <InfoRow label="Gender" value={student.gender} />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <InfoRow label="Phone" value={student.phone} />
              <InfoRow label="Email" value={student.email} />
              <InfoRow label="Address" value={student.address} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
            >
              ✏️ Edit Student
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              🗑️ Delete Student
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// SKELETON LOADER
// ============================================

export function StudentDetailSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-16"></div>
      
      <div className="p-6">
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="flex space-x-2 mt-2">
                <div className="h-5 bg-gray-300 rounded w-16"></div>
                <div className="h-5 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="h-8 bg-gray-300 rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-12"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-5 bg-gray-300 rounded w-32 mb-3"></div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="h-5 bg-gray-300 rounded w-32 mb-3"></div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <div className="h-8 bg-gray-300 rounded w-24"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// ULTRA SIMPLE STATS CARD
// ============================================

export function StudentStats({ student }: { student: Student }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div className="bg-blue-50 p-3 rounded-lg text-center">
        <div className="text-xl font-bold text-blue-700">{student.attendance}%</div>
        <div className="text-xs text-blue-600">Attendance</div>
      </div>
      <div className="bg-green-50 p-3 rounded-lg text-center">
        <div className="text-xl font-bold text-green-700">{student.class}</div>
        <div className="text-xs text-green-600">Class</div>
      </div>
      <div className="bg-purple-50 p-3 rounded-lg text-center">
        <div className="text-xl font-bold text-purple-700">{student.section}</div>
        <div className="text-xs text-purple-600">Section</div>
      </div>
      <div className="bg-yellow-50 p-3 rounded-lg text-center">
        <div className="text-xl font-bold text-yellow-700 capitalize">{student.feesStatus}</div>
        <div className="text-xs text-yellow-600">Fees</div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default StudentDetail