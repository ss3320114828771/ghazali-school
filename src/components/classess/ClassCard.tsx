'use client'

import React from 'react'
import Link from 'next/link'

// ============================================
// SIMPLE TYPES
// ============================================

interface ClassData {
  id: string
  name: string
  section: string
  students: number
  teacher: string
  room?: string
}

interface ClassCardProps {
  classData?: ClassData
  onView?: (id: string) => void
  onEdit?: (id: string) => void
}

// ============================================
// DEFAULT DATA
// ============================================

const DEFAULT_CLASS: ClassData = {
  id: '1',
  name: '10',
  section: 'A',
  students: 45,
  teacher: 'Prof. Ahmad Raza',
  room: 'Room 101'
}

// ============================================
// MAIN CLASS CARD
// ============================================

export function ClassCard({ 
  classData = DEFAULT_CLASS,
  onView,
  onEdit 
}: ClassCardProps) {
  
  const handleView = () => {
    if (onView) onView(classData.id)
  }

  const handleEdit = () => {
    if (onEdit) onEdit(classData.id)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header with color accent */}
      <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>
      
      <div className="p-4">
        {/* Class Title */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Class {classData.name}-{classData.section}
            </h3>
            <p className="text-sm text-gray-500">{classData.room || 'No room assigned'}</p>
          </div>
          <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
            {classData.students} Students
          </div>
        </div>

        {/* Teacher Info */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            👤
          </div>
          <div>
            <p className="text-xs text-gray-500">Class Teacher</p>
            <p className="text-sm font-medium text-gray-900">{classData.teacher}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 p-2 rounded text-center">
            <div className="text-xs text-gray-500">Students</div>
            <div className="text-lg font-bold text-gray-900">{classData.students}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded text-center">
            <div className="text-xs text-gray-500">Subjects</div>
            <div className="text-lg font-bold text-gray-900">7</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleView}
            className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded hover:bg-blue-100"
          >
            View Class
          </button>
          <button
            onClick={handleEdit}
            className="flex-1 px-3 py-2 bg-yellow-50 text-yellow-600 text-sm rounded hover:bg-yellow-100"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SIMPLE CLASS CARD (Compact)
// ============================================

export function SimpleClassCard({ 
  classData = DEFAULT_CLASS 
}: { 
  classData?: ClassData 
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900">
          {classData.name}-{classData.section}
        </h4>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          {classData.students}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-2">{classData.teacher}</p>
      <Link 
        href={`/dashboard/classes/${classData.id}`}
        className="text-xs text-green-600 hover:text-green-700"
      >
        View Details →
      </Link>
    </div>
  )
}

// ============================================
// CLASS CARD WITH PROGRESS
// ============================================

export function ClassProgressCard({ 
  classData = DEFAULT_CLASS,
  attendance = 92
}: { 
  classData?: ClassData
  attendance?: number
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900">Class {classData.name}-{classData.section}</h3>
          <p className="text-xs text-gray-500">{classData.teacher}</p>
        </div>
        <span className="text-2xl">{classData.students}</span>
      </div>

      {/* Attendance Bar */}
      <div className="space-y-1 mb-3">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Attendance</span>
          <span className="font-medium text-gray-900">{attendance}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${attendance}%` }}
          />
        </div>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div>Boys: {Math.floor(classData.students * 0.6)}</div>
        <div>Girls: {Math.floor(classData.students * 0.4)}</div>
      </div>
    </div>
  )
}

// ============================================
// CLASS GRID (Multiple Cards)
// ============================================

export function ClassGrid({ 
  classes = [
    { id: '1', name: '10', section: 'A', students: 45, teacher: 'Prof. Ahmad' },
    { id: '2', name: '10', section: 'B', students: 42, teacher: 'Mr. Ali' },
    { id: '3', name: '9', section: 'A', students: 48, teacher: 'Mrs. Fatima' },
    { id: '4', name: '9', section: 'B', students: 46, teacher: 'Ms. Sara' },
  ]
}: { 
  classes?: ClassData[] 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {classes.map((cls) => (
        <ClassCard key={cls.id} classData={cls} />
      ))}
    </div>
  )
}

// ============================================
// CLASS STATS CARD
// ============================================

export function ClassStatsCard() {
  const stats = [
    { label: 'Total Classes', value: '30', icon: '📚' },
    { label: 'Total Students', value: '1234', icon: '👥' },
    { label: 'Avg. Class Size', value: '41', icon: '📊' },
    { label: 'Sections', value: '60', icon: '📋' },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Class Statistics</h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-50 p-2 rounded text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// CARD SKELETON
// ============================================

export function ClassCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="h-2 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
      <div className="flex gap-2 mb-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 h-8 bg-gray-200 rounded"></div>
        <div className="flex-1 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export default ClassCard