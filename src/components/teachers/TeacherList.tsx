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
}

export interface TeacherListProps {
  teachers: Teacher[]
  onView?: (teacher: Teacher) => void
  onEdit?: (teacher: Teacher) => void
  onDelete?: (teacher: Teacher) => void
  onStatusChange?: (teacher: Teacher, status: Teacher['status']) => void
  isLoading?: boolean
  className?: string
}

// ============================================
// TEACHER CARD COMPONENT
// ============================================

interface TeacherCardProps {
  teacher: Teacher
  onView?: (teacher: Teacher) => void
  onEdit?: (teacher: Teacher) => void
  onDelete?: (teacher: Teacher) => void
  onStatusChange?: (teacher: Teacher, status: Teacher['status']) => void
}

function TeacherCard({ teacher, onView, onEdit, onDelete, onStatusChange }: TeacherCardProps) {
  const [showActions, setShowActions] = useState(false)
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'on-leave': return 'bg-yellow-100 text-yellow-800'
      case 'resigned': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
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

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false)
        setShowStatusMenu(false)
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            {teacher.profileImage ? (
              <img
                src={teacher.profileImage}
                alt={teacher.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {getInitials(teacher.name)}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
              <p className="text-sm text-gray-600">{teacher.employeeId}</p>
            </div>
          </div>
          <div className="relative">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(teacher.status)}`}>
              {teacher.status}
            </span>
            
            {/* Status Change Menu */}
            {showActions && onStatusChange && (
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            )}

            {/* Status Menu Dropdown */}
            {showStatusMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onStatusChange?.(teacher, 'active')
                      setShowStatusMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => {
                      onStatusChange?.(teacher, 'on-leave')
                      setShowStatusMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700"
                  >
                    On Leave
                  </button>
                  <button
                    onClick={() => {
                      onStatusChange?.(teacher, 'resigned')
                      setShowStatusMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-700"
                  >
                    Resigned
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {teacher.qualification} in {teacher.specialization}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {teacher.experience} years experience
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Subjects: {teacher.subjects.join(', ')}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Classes: {teacher.classes.join(', ')}
          </div>

          {teacher.isClassTeacher && (
            <div className="flex items-center text-sm text-green-600 font-medium">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Class Teacher: Class {teacher.classTeacherOf}
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {teacher.phone}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {teacher.email}
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2 pt-4 border-t border-gray-100">
            {onView && (
              <button
                onClick={() => onView(teacher)}
                className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                View
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(teacher)}
                className="flex-1 px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(teacher)}
                className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
// TEACHER TABLE COMPONENT
// ============================================

interface TeacherTableProps {
  teachers: Teacher[]
  onView?: (teacher: Teacher) => void
  onEdit?: (teacher: Teacher) => void
  onDelete?: (teacher: Teacher) => void
  onStatusChange?: (teacher: Teacher, status: Teacher['status']) => void
}

function TeacherTable({ teachers, onView, onEdit, onDelete, onStatusChange }: TeacherTableProps) {
  const [sortField, setSortField] = useState<keyof Teacher>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: keyof Teacher) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedTeachers = [...teachers].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'on-leave': return 'bg-yellow-100 text-yellow-800'
      case 'resigned': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Name
                {sortField === 'name' && (
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortDirection === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    )}
                  </svg>
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Employee ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Qualification</th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('experience')}
            >
              <div className="flex items-center">
                Experience
                {sortField === 'experience' && (
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortDirection === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    )}
                  </svg>
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Subjects</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Classes</th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status
                {sortField === 'status' && (
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortDirection === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    )}
                  </svg>
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedTeachers.map(teacher => (
            <tr key={teacher.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  {teacher.profileImage ? (
                    <img src={teacher.profileImage} alt={teacher.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {teacher.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-900">{teacher.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{teacher.employeeId}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{teacher.qualification}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{teacher.experience} years</td>
              <td className="px-4 py-3 text-sm text-gray-600">{teacher.subjects.join(', ')}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{teacher.classes.join(', ')}</td>
              <td className="px-4 py-3">
                {onStatusChange ? (
                  <select
                    value={teacher.status}
                    onChange={(e) => onStatusChange(teacher, e.target.value as Teacher['status'])}
                    className={`text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(teacher.status)} focus:outline-none`}
                  >
                    <option value="active">Active</option>
                    <option value="on-leave">On Leave</option>
                    <option value="resigned">Resigned</option>
                  </select>
                ) : (
                  <span className={`text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(teacher.status)}`}>
                    {teacher.status}
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  {onView && (
                    <button
                      onClick={() => onView(teacher)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(teacher)}
                      className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(teacher)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
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
// MAIN TEACHER LIST COMPONENT
// ============================================

export function TeacherList({
  teachers,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  isLoading = false,
  className = ''
}: TeacherListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterSubject, setFilterSubject] = useState<string>('all')

  // Get unique subjects for filter
  const allSubjects = React.useMemo(() => {
    const subjects = new Set<string>()
    teachers.forEach(teacher => {
      teacher.subjects.forEach(subject => subjects.add(subject))
    })
    return Array.from(subjects).sort()
  }, [teachers])

  // Filter teachers
  const filteredTeachers = React.useMemo(() => {
    return teachers.filter(teacher => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.qualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))

      // Status filter
      const matchesStatus = filterStatus === 'all' || teacher.status === filterStatus

      // Subject filter
      const matchesSubject = filterSubject === 'all' || teacher.subjects.includes(filterSubject)

      return matchesSearch && matchesStatus && matchesSubject
    })
  }, [teachers, searchTerm, filterStatus, filterSubject])

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="resigned">Resigned</option>
          </select>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Subjects</option>
            {allSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg border ${viewMode === 'grid' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg border ${viewMode === 'table' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredTeachers.length} of {teachers.length} teachers
      </div>

      {/* Teachers Display */}
      {filteredTeachers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No teachers found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeachers.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <TeacherTable
          teachers={filteredTeachers}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      )}
    </div>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default TeacherList