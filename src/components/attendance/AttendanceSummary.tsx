'use client'

import React from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

interface SummaryData {
  totalStudents: number
  present: number
  absent: number
  late: number
  leave: number
  percentage: number
}

interface AttendanceSummaryProps {
  data?: SummaryData
  title?: string
  showChart?: boolean
}

// ============================================
// DEFAULT DATA
// ============================================

const DEFAULT_DATA: SummaryData = {
  totalStudents: 45,
  present: 38,
  absent: 4,
  late: 2,
  leave: 1,
  percentage: 84.4
}

// ============================================
// SUMMARY CARD COMPONENT
// ============================================

export function SummaryCard({ 
  label, 
  value, 
  color,
  icon 
}: { 
  label: string
  value: number | string
  color: string
  icon: string
}) {
  return (
    <div className={`${color} rounded-lg p-4`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-white opacity-90">{label}</div>
    </div>
  )
}

// ============================================
// MAIN SUMMARY COMPONENT
// ============================================

export function AttendanceSummary({ 
  data = DEFAULT_DATA,
  title = 'Attendance Summary',
  showChart = true
}: AttendanceSummaryProps) {
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <SummaryCard
          label="Present"
          value={data.present}
          color="bg-green-600"
          icon="✅"
        />
        <SummaryCard
          label="Absent"
          value={data.absent}
          color="bg-red-600"
          icon="❌"
        />
        <SummaryCard
          label="Late"
          value={data.late}
          color="bg-yellow-600"
          icon="⏰"
        />
        <SummaryCard
          label="Leave"
          value={data.leave}
          color="bg-blue-600"
          icon="📝"
        />
      </div>

      {/* Percentage Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Attendance Rate</span>
          <span className="font-bold text-gray-900">{data.percentage}%</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${data.percentage}%` }}
          />
        </div>
      </div>

      {/* Mini Chart */}
      {showChart && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Today's Breakdown</h4>
          <div className="flex h-6 rounded-full overflow-hidden">
            <div 
              className="bg-green-500" 
              style={{ width: `${(data.present / data.totalStudents) * 100}%` }}
            />
            <div 
              className="bg-red-500" 
              style={{ width: `${(data.absent / data.totalStudents) * 100}%` }}
            />
            <div 
              className="bg-yellow-500" 
              style={{ width: `${(data.late / data.totalStudents) * 100}%` }}
            />
            <div 
              className="bg-blue-500" 
              style={{ width: `${(data.leave / data.totalStudents) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Present: {data.present}</span>
            <span>Absent: {data.absent}</span>
            <span>Late: {data.late}</span>
            <span>Leave: {data.leave}</span>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Total Students: <span className="font-bold text-gray-900">{data.totalStudents}</span>
      </div>
    </div>
  )
}

// ============================================
// SIMPLE SUMMARY (Compact)
// ============================================

export function SimpleSummary({ data = DEFAULT_DATA }: { data?: SummaryData }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium">Today</h4>
        <span className="text-2xl font-bold text-green-600">{data.percentage}%</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-green-600">✅</span>
          <span>Present: {data.present}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-red-600">❌</span>
          <span>Absent: {data.absent}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-600">⏰</span>
          <span>Late: {data.late}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-blue-600">📝</span>
          <span>Leave: {data.leave}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================
// WEEKLY SUMMARY
// ============================================

export function WeeklySummary() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const data = [92, 88, 95, 89, 93]
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium mb-3">This Week</h3>
      <div className="space-y-2">
        {days.map((day, i) => (
          <div key={day} className="flex items-center gap-2">
            <span className="w-10 text-sm text-gray-600">{day}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${data[i]}%` }}
              />
            </div>
            <span className="text-sm font-medium w-12 text-right">{data[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// SUMMARY SKELETON
// ============================================

export function SummarySkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export default AttendanceSummary