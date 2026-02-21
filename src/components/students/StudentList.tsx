'use client'

import React, { useState } from 'react'

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

export interface StudentListProps {
  students: Student[]
  onView?: (student: Student) => void
  onEdit?: (student: Student) => void
  onDelete?: (student: Student) => void
  isLoading?: boolean
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

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ============================================
// STUDENT CARD COMPONENT
// ============================================

interface StudentCardProps {
  student: Student
  onView?: (student: Student) => void
  onEdit?: (student: Student) => void
  onDelete?: (student: Student) => void
}

function StudentCard({ student, onView, onEdit, onDelete }: StudentCardProps) {
  const [showActions, setShowActions] = useState(false)

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold">
            {getInitials(student.name)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{student.name}</h3>
            <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-1 text-sm mb-3">
          <p className="text-gray-600">
            <span className="font-medium">Father:</span> {student.fatherName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Class:</span> {student.class}-{student.section}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Phone:</span> {student.phone}
          </p>
          <p className={`font-medium ${getAttendanceColor(student.attendance)}`}>
            Attendance: {student.attendance}%
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex space-x-2 mb-3">
          <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(student.status)}`}>
            {student.status}
          </span>
          <span className={`px-2 py-0.5 text-xs rounded-full ${getFeesColor(student.feesStatus)}`}>
            {student.feesStatus}
          </span>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2 pt-2 border-t border-gray-100">
            {onView && (
              <button
                onClick={() => onView(student)}
                className="flex-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
              >
                View
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(student)}
                className="flex-1 px-2 py-1 text-xs text-yellow-600 hover:bg-yellow-50 rounded"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(student)}
                className="flex-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// STUDENT TABLE COMPONENT
// ============================================

interface StudentTableProps {
  students: Student[]
  onView?: (student: Student) => void
  onEdit?: (student: Student) => void
  onDelete?: (student: Student) => void
}

function StudentTable({ students, onView, onEdit, onDelete }: StudentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Student</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Roll No</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Class</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Father</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Phone</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Attendance</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map(student => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-900">{student.name}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{student.rollNo}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{student.class}-{student.section}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{student.fatherName}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{student.phone}</td>
              <td className="px-4 py-2 text-sm">
                <span className={getAttendanceColor(student.attendance)}>
                  {student.attendance}%
                </span>
              </td>
              <td className="px-4 py-2">
                <div className="flex space-x-1">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getFeesColor(student.feesStatus)}`}>
                    {student.feesStatus}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  {onView && (
                    <button
                      onClick={() => onView(student)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(student)}
                      className="text-xs text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(student)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ============================================
// MAIN STUDENT LIST COMPONENT
// ============================================

export function StudentList({
  students,
  onView,
  onEdit,
  onDelete,
  isLoading = false
}: StudentListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [search, setSearch] = useState('')

  // Filter students based on search
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
    s.fatherName.toLowerCase().includes(search.toLowerCase())
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <span className="absolute left-2 top-2 text-gray-400">🔍</span>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 text-sm border rounded ${
              viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 text-sm border rounded ${
              viewMode === 'table' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600">
        Showing {filteredStudents.length} of {students.length} students
      </p>

      {/* Student Display */}
      {filteredStudents.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No students found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default StudentList