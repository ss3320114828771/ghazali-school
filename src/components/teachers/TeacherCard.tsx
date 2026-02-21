'use client'

import React, { useState } from 'react'

// ============================================
// TYPES
// ============================================

export interface Teacher {
  id: string
  name: string
  employeeId: string
  qualification: string
  specialization: string
  experience: number
  subjects: string[]
  classes: string[]
  phone: string
  email: string
  gender: 'male' | 'female'
  isClassTeacher: boolean
  classTeacherOf?: string
  status: 'active' | 'on-leave' | 'resigned'
  profileImage?: string
  address?: string
  emergencyContact?: string
}

export interface TeacherCardProps {
  teacher: Teacher
  onView?: (teacher: Teacher) => void
  onEdit?: (teacher: Teacher) => void
  onDelete?: (teacher: Teacher) => void
  onStatusChange?: (teacher: Teacher, status: Teacher['status']) => void
  variant?: 'grid' | 'compact' | 'detailed'
  className?: string
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'on-leave':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'resigned':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'active':
      return '✓'
    case 'on-leave':
      return '⏳'
    case 'resigned':
      return '✗'
    default:
      return '•'
  }
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatExperience = (years: number): string => {
  if (years === 1) return '1 year'
  if (years === 0) return 'Less than a year'
  return `${years} years`
}

// ============================================
// TEACHER CARD COMPONENT
// ============================================

export function TeacherCard({
  teacher,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  variant = 'grid',
  className = ''
}: TeacherCardProps) {
  const [showActions, setShowActions] = useState(false)
  const [showStatusMenu, setShowStatusMenu] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Handle view click
  const handleView = () => {
    if (onView) {
      onView(teacher)
    }
  }

  // Handle edit click
  const handleEdit = () => {
    if (onEdit) {
      onEdit(teacher)
    }
  }

  // Handle delete click
  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  // Confirm delete
  const confirmDelete = () => {
    if (onDelete) {
      onDelete(teacher)
    }
    setShowDeleteConfirm(false)
  }

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  // Handle status change
  const handleStatusChange = (status: Teacher['status']) => {
    if (onStatusChange) {
      onStatusChange(teacher, status)
    }
    setShowStatusMenu(false)
  }

  // Handle image error
  const handleImageError = () => {
    setImageError(true)
  }

  // ============================================
  // GRID VARIANT (Default)
  // ============================================

  if (variant === 'grid') {
    return (
      <div
        className={`
          relative bg-white rounded-lg border border-gray-200 shadow-sm
          hover:shadow-md transition-all duration-200
          ${className}
        `}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => {
          setShowActions(false)
          setShowStatusMenu(false)
        }}
      >
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-white bg-opacity-90 rounded-lg flex items-center justify-center p-4 z-20">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 mb-3">
                Delete {teacher.name}?
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={confirmDelete}
                  className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                >
                  Yes
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              {teacher.profileImage && !imageError ? (
                <img
                  src={teacher.profileImage}
                  alt={teacher.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {getInitials(teacher.name)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                <p className="text-sm text-gray-500">{teacher.employeeId}</p>
              </div>
            </div>

            {/* Status Badge with Dropdown */}
            <div className="relative">
              <button
                onClick={() => onStatusChange && setShowStatusMenu(!showStatusMenu)}
                className={`
                  px-2 py-1 text-xs font-medium rounded-full border
                  flex items-center space-x-1
                  ${getStatusColor(teacher.status)}
                  ${onStatusChange ? 'cursor-pointer hover:shadow-sm' : 'cursor-default'}
                `}
              >
                <span>{getStatusIcon(teacher.status)}</span>
                <span className="capitalize">{teacher.status.replace('-', ' ')}</span>
              </button>

              {/* Status Menu Dropdown */}
              {showStatusMenu && onStatusChange && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleStatusChange('active')}
                      className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700"
                    >
                      ✓ Active
                    </button>
                    <button
                      onClick={() => handleStatusChange('on-leave')}
                      className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-yellow-50 hover:text-yellow-700"
                    >
                      ⏳ On Leave
                    </button>
                    <button
                      onClick={() => handleStatusChange('resigned')}
                      className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-gray-700"
                    >
                      ✗ Resigned
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-start text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="flex-1">{teacher.qualification} in {teacher.specialization}</span>
            </div>

            <div className="flex items-start text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="flex-1">{formatExperience(teacher.experience)} experience</span>
            </div>

            <div className="flex items-start text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="flex-1 line-clamp-1">{teacher.subjects.join(', ')}</span>
            </div>

            <div className="flex items-start text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="flex-1 line-clamp-1">{teacher.classes.join(', ')}</span>
            </div>

            {teacher.isClassTeacher && teacher.classTeacherOf && (
              <div className="flex items-start text-sm text-green-600 font-medium">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="flex-1">Class Teacher: Class {teacher.classTeacherOf}</span>
              </div>
            )}

            <div className="flex items-start text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="flex-1">{teacher.phone}</span>
            </div>
          </div>

          {/* Actions */}
          {(showActions || onView || onEdit || onDelete) && (
            <div className="flex space-x-2 pt-4 border-t border-gray-100">
              {onView && (
                <button
                  onClick={handleView}
                  className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View teacher details"
                >
                  View
                </button>
              )}
              {onEdit && (
                <button
                  onClick={handleEdit}
                  className="flex-1 px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                  title="Edit teacher"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete teacher"
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
  // COMPACT VARIANT
  // ============================================

  if (variant === 'compact') {
    return (
      <div
        className={`
          relative bg-white rounded-lg border border-gray-200 p-4
          hover:shadow-sm transition-all duration-200
          ${className}
        `}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          {teacher.profileImage && !imageError ? (
            <img
              src={teacher.profileImage}
              alt={teacher.name}
              className="w-10 h-10 rounded-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {getInitials(teacher.name)}
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900 truncate">{teacher.name}</h4>
              <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(teacher.status)}`}>
                {teacher.status === 'active' ? 'Active' : teacher.status === 'on-leave' ? 'Leave' : 'Resigned'}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">{teacher.subjects.slice(0, 2).join(', ')}</p>
            <p className="text-xs text-gray-400">{teacher.employeeId}</p>
          </div>

          {/* Actions */}
          {showActions && (onView || onEdit) && (
            <div className="flex space-x-1">
              {onView && (
                <button
                  onClick={handleView}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  title="View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              )}
              {onEdit && (
                <button
                  onClick={handleEdit}
                  className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ============================================
  // DETAILED VARIANT
  // ============================================

  if (variant === 'detailed') {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            {teacher.profileImage && !imageError ? (
              <img
                src={teacher.profileImage}
                alt={teacher.name}
                className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                onError={handleImageError}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl border-2 border-white shadow-md">
                {getInitials(teacher.name)}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{teacher.name}</h2>
              <p className="text-blue-100 text-sm">{teacher.employeeId}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(teacher.status)}`}>
                  {teacher.status === 'active' ? 'Active' : teacher.status === 'on-leave' ? 'On Leave' : 'Resigned'}
                </span>
                {teacher.isClassTeacher && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Class Teacher
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Qualification</p>
                <p className="text-sm text-gray-900">{teacher.qualification} in {teacher.specialization}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Experience</p>
                <p className="text-sm text-gray-900">{formatExperience(teacher.experience)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Subjects</p>
                <p className="text-sm text-gray-900">{teacher.subjects.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Classes</p>
                <p className="text-sm text-gray-900">{teacher.classes.join(', ')}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Phone</p>
                <p className="text-sm text-gray-900">{teacher.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Email</p>
                <p className="text-sm text-gray-900 break-all">{teacher.email}</p>
              </div>
              {teacher.address && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Address</p>
                  <p className="text-sm text-gray-900">{teacher.address}</p>
                </div>
              )}
              {teacher.emergencyContact && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Emergency Contact</p>
                  <p className="text-sm text-gray-900">{teacher.emergencyContact}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            {onView && (
              <button
                onClick={handleView}
                className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                View Profile
              </button>
            )}
            {onEdit && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}

// ============================================
// TEACHER CARD SKELETON LOADER
// ============================================

export function TeacherCardSkeleton({ variant = 'grid' }: { variant?: 'grid' | 'compact' | 'detailed' }) {
  if (variant === 'grid') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          <div className="flex-1 h-8 bg-gray-200 rounded"></div>
          <div className="flex-1 h-8 bg-gray-200 rounded"></div>
          <div className="flex-1 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-24"></div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-4">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default TeacherCard