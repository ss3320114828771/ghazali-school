'use client'

import React from 'react'

// ============================================
// SIMPLE STATS CARDS
// ============================================

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  change?: number
  color?: string
}

function StatCard({ title, value, icon, change, color = 'bg-blue-500' }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {change !== undefined && (
            <p className={`text-xs mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function StatsCards() {
  const stats = [
    { title: 'Total Students', value: '1,234', icon: '👥', change: 5, color: 'bg-blue-500' },
    { title: 'Total Teachers', value: '85', icon: '👨‍🏫', change: 2, color: 'bg-green-500' },
    { title: 'Total Classes', value: '30', icon: '📚', change: 0, color: 'bg-purple-500' },
    { title: 'Attendance', value: '92%', icon: '📊', change: -1, color: 'bg-yellow-500' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

// ============================================
// COMPACT STATS CARDS (Smaller)
// ============================================

export function CompactStatsCards() {
  const stats = [
    { title: 'Students', value: '1.2k', icon: '👥' },
    { title: 'Teachers', value: '85', icon: '👨‍🏫' },
    { title: 'Classes', value: '30', icon: '📚' },
    { title: 'Attendance', value: '92%', icon: '📊' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-gray-500">{stat.title}</p>
              <p className="text-base font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// HORIZONTAL STATS ROW
// ============================================

export function StatsRow() {
  const stats = [
    { label: 'Students', value: '1,234' },
    { label: 'Teachers', value: '85' },
    { label: 'Classes', value: '30' },
    { label: 'Attendance', value: '92%' },
  ]

  return (
    <div className="flex flex-wrap gap-4 justify-between bg-white rounded-lg border border-gray-200 p-4">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

// ============================================
// STATS CARD WITH ICON BACKGROUND
// ============================================

export function IconStatsCards() {
  const stats = [
    { title: 'Students', value: '1,234', icon: '👥', bg: 'bg-blue-100', text: 'text-blue-600' },
    { title: 'Teachers', value: '85', icon: '👨‍🏫', bg: 'bg-green-100', text: 'text-green-600' },
    { title: 'Classes', value: '30', icon: '📚', bg: 'bg-purple-100', text: 'text-purple-600' },
    { title: 'Attendance', value: '92%', icon: '📊', bg: 'bg-yellow-100', text: 'text-yellow-600' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center text-2xl ${stat.text}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// MINIMAL STATS (Text only)
// ============================================

export function MinimalStats() {
  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div>
        <p className="text-2xl font-bold text-gray-900">1.2k</p>
        <p className="text-xs text-gray-500">Students</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">85</p>
        <p className="text-xs text-gray-500">Teachers</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">30</p>
        <p className="text-xs text-gray-500">Classes</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">92%</p>
        <p className="text-xs text-gray-500">Attendance</p>
      </div>
    </div>
  )
}

// ============================================
// STATS CARD WITH TREND INDICATOR
// ============================================

export function TrendingStatsCards() {
  const stats = [
    { title: 'Revenue', value: 'Rs. 2.4M', trend: '+12%', up: true },
    { title: 'Expenses', value: 'Rs. 1.2M', trend: '-5%', up: false },
    { title: 'Profit', value: 'Rs. 1.2M', trend: '+18%', up: true },
    { title: 'Students', value: '1,234', trend: '+45', up: true },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
          <p className="text-xl font-bold text-gray-900 mb-2">{stat.value}</p>
          <p className={`text-xs ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
            {stat.trend} from last month
          </p>
        </div>
      ))}
    </div>
  )
}

// ============================================
// CUSTOM STATS CARD (With props)
// ============================================

interface CustomStatsCardsProps {
  stats?: Array<{
    title: string
    value: string | number
    icon?: string
    change?: number
    color?: string
  }>
  columns?: 2 | 3 | 4
}

export function CustomStatsCards({ 
  stats = [
    { title: 'Total', value: '1,234', icon: '📊', change: 5 },
    { title: 'Active', value: '1,200', icon: '✓', change: 3 },
    { title: 'Inactive', value: '34', icon: '✗', change: -2 },
  ],
  columns = 3
}: CustomStatsCardsProps) {
  
  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }[columns]

  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-4`}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.change !== undefined && (
                <p className={`text-xs mt-1 ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                </p>
              )}
            </div>
            {stat.icon && (
              <div className="text-2xl text-gray-400">{stat.icon}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// STATS CARDS SKELETON
// ============================================

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export {
  StatCard,
  
  
  
  
  

  
}