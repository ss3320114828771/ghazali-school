'use client'

import React from 'react'

// ============================================
// SIMPLE BAR CHART - NO ERRORS
// ============================================

interface SimpleBarChartProps {
  data?: number[]
}

export function SimpleBarChart({ data = [92, 88, 95, 89, 93, 91] }: SimpleBarChartProps) {
  return (
    <div className="bg-white p-4 border rounded">
      <h3 className="text-sm font-medium mb-3">Attendance</h3>
      <div className="flex items-end h-32 gap-1">
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-green-500 rounded-t" 
              style={{ height: `${value}%` }}
            ></div>
            <span className="text-xs mt-1">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// STATS CARD - NO ERRORS
// ============================================

interface StatsCardProps {
  title?: string
  value?: string
  change?: number
}

export function StatsCard({ 
  title = 'Attendance', 
  value = '92%',
  change = 5 
}: StatsCardProps) {
  return (
    <div className="bg-white p-4 border rounded">
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        <span className={`text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      </div>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <div className="flex h-1 gap-1 mt-3">
        <div className="h-full bg-green-500 w-3/4 rounded-l"></div>
        <div className="h-full bg-yellow-500 w-1/6"></div>
        <div className="h-full bg-red-500 w-1/12 rounded-r"></div>
      </div>
    </div>
  )
}

// ============================================
// PROGRESS CIRCLE - NO ERRORS
// ============================================

interface ProgressCircleProps {
  percentage?: number
  label?: string
}

export function ProgressCircle({ percentage = 85, label = 'Attendance' }: ProgressCircleProps) {
  return (
    <div className="bg-white p-4 border rounded text-center">
      <div className="relative w-24 h-24 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#22c55e"
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{percentage}%</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">{label}</p>
    </div>
  )
}

// ============================================
// WEEKLY CALENDAR - NO ERRORS
// ============================================

export function WeeklyCalendar() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const statuses = ['P', 'P', 'L', 'P', 'A', 'H', 'H']
  const colors = ['bg-green-500', 'bg-green-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-blue-500']

  return (
    <div className="bg-white p-4 border rounded">
      <h3 className="text-sm font-medium mb-3">This Week</h3>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <div key={i} className="text-center">
            <div className="text-xs text-gray-500 mb-1">{day}</div>
            <div className={`w-8 h-8 mx-auto rounded-full ${colors[i]} flex items-center justify-center text-white text-xs`}>
              {statuses[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// SKELETON LOADER - NO ERRORS
// ============================================

export function ChartSkeleton() {
  return (
    <div className="bg-white p-4 border rounded animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
      <div className="flex gap-1 h-32">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="flex-1 bg-gray-200 rounded-t h-24"></div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export default SimpleBarChart