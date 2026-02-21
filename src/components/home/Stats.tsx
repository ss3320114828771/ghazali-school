'use client'

import React from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface StatItem {
  id: string
  icon: string
  label: string
  value: string
  color?: string
}

export interface StatsProps {
  title?: string
  subtitle?: string
  stats?: StatItem[]
  columns?: 2 | 3 | 4 | 6
  background?: 'white' | 'gray' | 'gradient'
  className?: string
}

// ============================================
// DEFAULT STATS DATA
// ============================================

const DEFAULT_STATS: StatItem[] = [
  {
    id: '1',
    icon: '👥',
    label: 'Students',
    value: '1000+'
  },
  {
    id: '2',
    icon: '👨‍🏫',
    label: 'Teachers',
    value: '85+'
  },
  {
    id: '3',
    icon: '📚',
    label: 'Classes',
    value: '30+'
  },
  {
    id: '4',
    icon: '🎓',
    label: 'Years',
    value: '25+'
  },
  {
    id: '5',
    icon: '🏆',
    label: 'Awards',
    value: '50+'
  },
  {
    id: '6',
    icon: '🎉',
    label: 'Events',
    value: '100+'
  }
]

// ============================================
// STAT CARD COMPONENT
// ============================================

interface StatCardProps {
  stat: StatItem
  index: number
}

function StatCard({ stat, index }: StatCardProps) {
  // Different colors based on index
  const getColor = (i: number): string => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-green-500 to-teal-500',
      'from-purple-500 to-pink-500',
      'from-yellow-500 to-orange-500',
      'from-red-500 to-pink-500',
      'from-indigo-500 to-purple-500'
    ]
    return colors[i % colors.length]
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group">
      <div className="flex flex-col items-center text-center">
        {/* Icon with gradient background */}
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getColor(index)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <span className="text-3xl">{stat.icon}</span>
        </div>

        {/* Value */}
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {stat.value}
        </div>

        {/* Label */}
        <div className="text-sm text-gray-500">
          {stat.label}
        </div>
      </div>
    </div>
  )
}

// ============================================
// SIMPLE STAT CARD (Minimal)
// ============================================

function SimpleStatCard({ stat }: { stat: StatItem }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className="text-3xl mb-2">{stat.icon}</div>
      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
      <div className="text-xs text-gray-500">{stat.label}</div>
    </div>
  )
}

// ============================================
// STATS GRID COMPONENT
// ============================================

export function Stats({
  title = 'Our Achievements',
  subtitle = 'Numbers that speak for themselves',
  stats = DEFAULT_STATS,
  columns = 4,
  background = 'white',
  className = ''
}: StatsProps) {
  // Background class based on prop
  const getBackgroundClass = (): string => {
    switch (background) {
      case 'gray': return 'bg-gray-50'
      case 'gradient': return 'bg-gradient-to-br from-green-600 to-teal-600 text-white'
      default: return 'bg-white'
    }
  }

  // Text color for gradient background
  const isGradient = background === 'gradient'

  // Grid columns class
  const getGridClass = (): string => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2'
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      case 6: return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    }
  }

  return (
    <section className={`py-16 ${getBackgroundClass()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${isGradient ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`max-w-2xl mx-auto ${isGradient ? 'text-white/90' : 'text-gray-600'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className={`grid ${getGridClass()} gap-6`}>
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// SIMPLE STATS (Minimal Version)
// ============================================

export function SimpleStats({
  stats = DEFAULT_STATS.slice(0, 4),
  columns = 4
}: {
  stats?: StatItem[]
  columns?: 2 | 3 | 4
}) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }[columns]

  return (
    <div className={`grid ${gridClass} gap-2`}>
      {stats.map(stat => (
        <SimpleStatCard key={stat.id} stat={stat} />
      ))}
    </div>
  )
}

// ============================================
// STATS WITH NUMBERS (Animated)
// ============================================

export function StatsWithNumbers({
  stats = DEFAULT_STATS.slice(0, 4)
}: {
  stats?: StatItem[]
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div key={stat.id} className="text-center">
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-green-600">{stat.value}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// STATS ROW (Horizontal)
// ============================================

export function StatsRow({
  stats = DEFAULT_STATS.slice(0, 4)
}: {
  stats?: StatItem[]
}) {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
      {stats.map(stat => (
        <div key={stat.id} className="text-center">
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// STATS CARD (Compact)
// ============================================

export function StatsCard({
  stats = DEFAULT_STATS.slice(0, 3),
  title = 'Quick Facts'
}: {
  stats?: StatItem[]
  title?: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {stats.map(stat => (
          <div key={stat.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <span className="font-bold text-gray-900">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// STATS SKELETON LOADER
// ============================================

export function StatsSkeleton() {
  return (
    <div className="py-16 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-96 max-w-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-100 rounded-xl p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// STATS GRID PRESETS
// ============================================

export const StatPresets = {
  // School stats
  school: [
    { id: 's1', icon: '👥', label: 'Students', value: '1000+' },
    { id: 's2', icon: '👨‍🏫', label: 'Teachers', value: '85+' },
    { id: 's3', icon: '📚', label: 'Classes', value: '30+' },
    { id: 's4', icon: '🎓', label: 'Years', value: '25+' }
  ],

  // Achievement stats
  achievements: [
    { id: 'a1', icon: '🏆', label: 'Awards', value: '50+' },
    { id: 'a2', icon: '📝', label: 'Exams Passed', value: '95%' },
    { id: 'a3', icon: '⭐', label: 'Top Rankers', value: '25+' },
    { id: 'a4', icon: '🌍', label: 'Alumni', value: '5000+' }
  ],

  // Facility stats
  facilities: [
    { id: 'f1', icon: '💻', label: 'Computers', value: '200+' },
    { id: 'f2', icon: '🔬', label: 'Labs', value: '5' },
    { id: 'f3', icon: '📖', label: 'Books', value: '15k+' },
    { id: 'f4', icon: '🚌', label: 'Buses', value: '8' }
  ]
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  Stats,
  SimpleStats,
  StatsWithNumbers,
  StatsRow,
  StatsCard,
  StatsSkeleton,
  StatPresets
}