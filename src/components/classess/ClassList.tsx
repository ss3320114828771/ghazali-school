'use client'

import React from 'react'
import Link from 'next/link'

// ============================================
// SIMPLE CLASS CARD
// ============================================

interface ClassCardProps {
  id: string
  name: string
  section: string
  students: number
  teacher: string
}

function ClassCard({ id, name, section, students, teacher }: ClassCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-gray-900">Class {name}-{section}</h3>
          <p className="text-sm text-gray-500">{teacher}</p>
        </div>
        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
          {students} Students
        </span>
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-400">ID: {id}</span>
        <Link 
          href={`/dashboard/classes/${id}`}
          className="text-sm text-green-600 hover:text-green-700"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

// ============================================
// MAIN CLASS LIST
// ============================================

export default function ClassList() {
  // Mock data
  const classes = [
    { id: '1', name: '10', section: 'A', students: 45, teacher: 'Prof. Ahmad Raza' },
    { id: '2', name: '10', section: 'B', students: 42, teacher: 'Mr. Mohammad Ali' },
    { id: '3', name: '9', section: 'A', students: 48, teacher: 'Mrs. Fatima Hassan' },
    { id: '4', name: '9', section: 'B', students: 46, teacher: 'Ms. Sara Khan' },
    { id: '5', name: '8', section: 'A', students: 50, teacher: 'Mr. Usman Ahmed' },
    { id: '6', name: '8', section: 'B', students: 47, teacher: 'Ms. Aisha Bibi' },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">All Classes</h2>
        <Link 
          href="/dashboard/classes/add"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Class
        </Link>
      </div>

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(cls => (
          <ClassCard key={cls.id} {...cls} />
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
        Total Classes: {classes.length} | Total Students: {classes.reduce((sum, c) => sum + c.students, 0)}
      </div>
    </div>
  )
}