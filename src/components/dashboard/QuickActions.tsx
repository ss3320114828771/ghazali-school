'use client'

import React from 'react'
import Link from 'next/link'

// ============================================
// SIMPLE QUICK ACTIONS
// ============================================

interface Action {
  id: string
  label: string
  icon: string
  href: string
  color?: string
}

export default function QuickActions() {
  const actions: Action[] = [
    { id: '1', label: 'Add Student', icon: '👥', href: '/dashboard/students/add', color: 'bg-blue-500' },
    { id: '2', label: 'Add Teacher', icon: '👨‍🏫', href: '/dashboard/teachers/add', color: 'bg-green-500' },
    { id: '3', label: 'Mark Attendance', icon: '📋', href: '/dashboard/attendance', color: 'bg-purple-500' },
    { id: '4', label: 'Create Exam', icon: '📝', href: '/dashboard/exams/create', color: 'bg-yellow-500' },
    { id: '5', label: 'Schedule Event', icon: '📅', href: '/dashboard/events/create', color: 'bg-pink-500' },
    { id: '6', label: 'View Reports', icon: '📊', href: '/dashboard/reports', color: 'bg-indigo-500' },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={`${action.color} text-white rounded-lg p-3 text-center hover:opacity-90 transition-opacity`}
          >
            <div className="text-2xl mb-1">{action.icon}</div>
            <div className="text-xs font-medium">{action.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ============================================
// COMPACT VERSION (Smaller)
// ============================================

export function CompactQuickActions() {
  const actions = [
    { id: '1', label: 'Add', icon: '👥', href: '/students/add' },
    { id: '2', label: 'Mark', icon: '📋', href: '/attendance' },
    { id: '3', label: 'Exam', icon: '📝', href: '/exams/create' },
    { id: '4', label: 'Event', icon: '📅', href: '/events/create' },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <h4 className="text-sm font-medium mb-2">Quick</h4>
      <div className="grid grid-cols-4 gap-1">
        {actions.map(a => (
          <Link
            key={a.id}
            href={a.href}
            className="bg-gray-100 p-2 rounded text-center hover:bg-gray-200"
          >
            <div className="text-xl">{a.icon}</div>
            <div className="text-xs text-gray-600">{a.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ============================================
// HORIZONTAL VERSION (Row layout)
// ============================================

export function HorizontalQuickActions() {
  const actions = [
    { id: '1', label: 'Add Student', icon: '👥', href: '/students/add' },
    { id: '2', label: 'Add Teacher', icon: '👨‍🏫', href: '/teachers/add' },
    { id: '3', label: 'Attendance', icon: '📋', href: '/attendance' },
    { id: '4', label: 'Exams', icon: '📝', href: '/exams' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map(a => (
        <Link
          key={a.id}
          href={a.href}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <span className="text-lg">{a.icon}</span>
          <span className="text-sm text-gray-700">{a.label}</span>
        </Link>
      ))}
    </div>
  )
}

// ============================================
// ICON ONLY VERSION (Minimal)
// ============================================

export function IconQuickActions() {
  const actions = [
    { id: '1', icon: '👥', href: '/students/add', label: 'Students' },
    { id: '2', icon: '👨‍🏫', href: '/teachers/add', label: 'Teachers' },
    { id: '3', icon: '📋', href: '/attendance', label: 'Attendance' },
    { id: '4', icon: '📝', href: '/exams', label: 'Exams' },
  ]

  return (
    <div className="flex gap-2">
      {actions.map(a => (
        <Link
          key={a.id}
          href={a.href}
          className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl hover:bg-gray-200"
          title={a.label}
        >
          {a.icon}
        </Link>
      ))}
    </div>
  )
}

// ============================================
// CUSTOM QUICK ACTIONS (With props)
// ============================================

interface CustomQuickActionsProps {
  actions?: Action[]
  columns?: 2 | 3 | 4
  title?: string
}

export function CustomQuickActions({ 
  actions = [
    { id: '1', label: 'Add', icon: '➕', href: '#', color: 'bg-blue-500' },
    { id: '2', label: 'Edit', icon: '✏️', href: '#', color: 'bg-green-500' },
    { id: '3', label: 'Delete', icon: '🗑️', href: '#', color: 'bg-red-500' },
  ],
  columns = 3,
  title = 'Actions'
}: CustomQuickActionsProps) {
  
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }[columns]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      <div className={`grid ${gridClass} gap-2`}>
        {actions.map(action => (
          <Link
            key={action.id}
            href={action.href}
            className={`${action.color || 'bg-gray-500'} text-white rounded-lg p-2 text-center hover:opacity-90`}
          >
            <div className="text-xl mb-1">{action.icon}</div>
            <div className="text-xs">{action.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ============================================
// QUICK ACTIONS SKELETON
// ============================================

export function QuickActionsSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-24 mb-3"></div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-16 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export {
  
  

  
  
}