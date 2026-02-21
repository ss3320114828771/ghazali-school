'use client'

import React from 'react'

// ============================================
// BAR CHART
// ============================================

interface BarChartProps {
  data?: number[]
  labels?: string[]
  height?: number
  color?: string
}

export function BarChart({ 
  data = [65, 75, 85, 70, 90, 80, 95],
  labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  height = 200,
  color = 'bg-green-500'
}: BarChartProps) {
  
  const maxValue = Math.max(...data, 100)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Weekly Overview</h3>
      
      <div className="flex items-end justify-between gap-1" style={{ height: `${height}px` }}>
        {data.map((value, index) => {
          const barHeight = (value / maxValue) * (height - 40)
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div className="relative w-full">
                <div 
                  className={`w-full ${color} rounded-t transition-all hover:opacity-80`}
                  style={{ height: `${barHeight}px` }}
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {value}%
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{labels[index]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// LINE CHART (Simple)
// ============================================

interface LineChartProps {
  data?: number[]
  labels?: string[]
  height?: number
  color?: string
}

export function LineChart({ 
  data = [65, 75, 85, 70, 90, 80, 95],
  labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  height = 200,
  color = 'text-green-500'
}: LineChartProps) {
  
  const maxValue = Math.max(...data, 100)
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - (value / maxValue) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Trend</h3>
      
      <div style={{ height: `${height}px` }} className="relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={color}
          />
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - (value / maxValue) * 100
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="currentColor"
                className={color}
              />
            )
          })}
        </svg>
        
        {/* Labels */}
        <div className="flex justify-between mt-2">
          {labels.map((label, i) => (
            <span key={i} className="text-xs text-gray-500">{label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// PIE CHART (Simple)
// ============================================

interface PieChartProps {
  data?: number[]
  labels?: string[]
  colors?: string[]
  size?: number
}

export function PieChart({ 
  data = [85, 10, 5],
  labels = ['Present', 'Absent', 'Late'],
  colors = ['#22c55e', '#ef4444', '#eab308'],
  size = 200
}: PieChartProps) {
  
  const total = data.reduce((sum, val) => sum + val, 0)
  let cumulativeAngle = 0

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Attendance Breakdown</h3>
      
      <div className="flex flex-col items-center">
        <svg width={size} height={size} viewBox="0 0 100 100" className="mb-4">
          {data.map((value, index) => {
            const angle = (value / total) * 360
            const startAngle = cumulativeAngle
            const endAngle = cumulativeAngle + angle
            cumulativeAngle += angle

            const startRad = (startAngle - 90) * Math.PI / 180
            const endRad = (endAngle - 90) * Math.PI / 180

            const x1 = 50 + 40 * Math.cos(startRad)
            const y1 = 50 + 40 * Math.sin(startRad)
            const x2 = 50 + 40 * Math.cos(endRad)
            const y2 = 50 + 40 * Math.sin(endRad)

            const largeArc = angle > 180 ? 1 : 0

            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="1"
              />
            )
          })}
          <circle cx="50" cy="50" r="20" fill="white" />
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3">
          {data.map((value, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }}></div>
              <span className="text-xs text-gray-600">
                {labels[index]}: {value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// DONUT CHART
// ============================================

interface DonutChartProps {
  percentage?: number
  size?: number
  color?: string
  label?: string
}

export function DonutChart({ 
  percentage = 85, 
  size = 120,
  color = 'text-green-500',
  label = 'Attendance'
}: DonutChartProps) {
  
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
      <div className="relative inline-flex" style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
            className={color}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-gray-900">{percentage}%</span>
          {label && <span className="text-xs text-gray-500">{label}</span>}
        </div>
      </div>
    </div>
  )
}

// ============================================
// STATS CARD WITH MINI CHART
// ============================================

interface StatsCardProps {
  title?: string
  value?: string
  change?: number
  data?: number[]
  color?: string
}

export function StatsCard({ 
  title = 'Total Students',
  value = '1,234',
  change = 5,
  data = [65, 75, 85, 70, 90],
  color = 'bg-green-500'
}: StatsCardProps) {
  
  const maxValue = Math.max(...data, 100)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {change !== 0 && (
          <span className={`text-xs font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      
      <div className="flex items-end h-12 gap-1 mt-2">
        {data.slice(-7).map((val, i) => (
          <div
            key={i}
            className="flex-1 bg-gray-100 rounded-t relative"
            style={{ height: '100%' }}
          >
            <div
              className={`absolute bottom-0 left-0 right-0 ${color} rounded-t transition-all`}
              style={{ height: `${(val / maxValue) * 100}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// HORIZONTAL BAR CHART
// ============================================

interface HorizontalBarProps {
  data?: Array<{ label: string; value: number; color?: string }>
  title?: string
}

export function HorizontalBarChart({ 
  data = [
    { label: 'Present', value: 85, color: 'bg-green-500' },
    { label: 'Absent', value: 10, color: 'bg-red-500' },
    { label: 'Late', value: 5, color: 'bg-yellow-500' },
  ],
  title = 'Distribution'
}: HorizontalBarProps) {
  
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">{item.label}</span>
              <span className="text-gray-900 font-medium">{item.value}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color || 'bg-green-500'} rounded-full`}
                style={{ width: `${(item.value / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// CHART SKELETON
// ============================================

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="flex items-end h-32 gap-1">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="flex-1 bg-gray-200 rounded-t" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
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

export default BarChart