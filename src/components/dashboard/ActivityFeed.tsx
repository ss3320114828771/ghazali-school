'use client'

import React from 'react'

// ============================================
// SIMPLE ACTIVITY FEED
// ============================================

interface Activity {
  id: number
  text: string
  time: string
  icon?: string
  user?: string
}

export default function ActivityFeed() {
  const activities: Activity[] = [
    { id: 1, text: 'New student enrolled', time: '5 min ago', icon: '👤', user: 'Admin' },
    { id: 2, text: 'Attendance marked for Class 10', time: '15 min ago', icon: '📋', user: 'Prof. Ahmad' },
    { id: 3, text: 'Fee payment received', time: '1 hour ago', icon: '💰', user: 'Accounts' },
    { id: 4, text: 'Exam results published', time: '2 hours ago', icon: '📝', user: 'Exam Dept' },
    { id: 5, text: 'New teacher joined', time: '1 day ago', icon: '👨‍🏫', user: 'HR' },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">Recent Activity</h3>
        <span className="text-xs text-gray-400">{activities.length} items</span>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
            {/* Icon */}
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
              {activity.icon || '📌'}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-800">{activity.text}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">{activity.time}</span>
                {activity.user && (
                  <>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{activity.user}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-3 pt-2 text-center">
        <button className="text-sm text-green-600 hover:text-green-700">
          View All Activities →
        </button>
      </div>
    </div>
  )
}

// ============================================
// COMPACT VERSION
// ============================================

export function CompactActivityFeed() {
  const activities = [
    { id: 1, text: 'New student enrolled', time: '5 min' },
    { id: 2, text: 'Attendance marked', time: '15 min' },
    { id: 3, text: 'Fee received', time: '1 hr' },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <h4 className="text-sm font-medium mb-2">Activity</h4>
      <div className="space-y-2">
        {activities.map(a => (
          <div key={a.id} className="flex justify-between text-xs">
            <span className="text-gray-600">{a.text}</span>
            <span className="text-gray-400">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// SIMPLE LIST VERSION
// ============================================

export function SimpleActivityList() {
  const items = [
    '📝 Exam results published',
    '👤 New student enrolled',
    '💰 Fee payment received',
    '📋 Attendance marked',
  ]

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
          {item}
        </li>
      ))}
    </ul>
  )
}

// ============================================
// MINIMAL VERSION (Just icons)
// ============================================

export function MinimalActivityFeed() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">👤</div>
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">📋</div>
      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">💰</div>
      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">📝</div>
    </div>
  )
}

// ============================================
// ACTIVITY FEED WITH LOADING
// ============================================

export function ActivityFeedWithLoading() {
  const [loading, setLoading] = React.useState(true)
  const [activities, setActivities] = React.useState<Activity[]>([])

  React.useEffect(() => {
    setTimeout(() => {
      setActivities([
        { id: 1, text: 'New student enrolled', time: '5 min ago' },
        { id: 2, text: 'Attendance marked', time: '15 min ago' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <ActivityFeedSkeleton />
  }

  return (
    <div className="space-y-2">
      {activities.map(a => (
        <div key={a.id} className="p-2 bg-gray-50 rounded text-sm">
          {a.text} - {a.time}
        </div>
      ))}
    </div>
  )
}

// ============================================
// SKELETON LOADER
// ============================================

export function ActivityFeedSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// CUSTOM ACTIVITY FEED (with props)
// ============================================

interface CustomActivityFeedProps {
  activities?: Activity[]
  title?: string
  showViewAll?: boolean
}

export function CustomActivityFeed({ 
  activities = [
    { id: 1, text: 'Sample activity', time: 'Just now', icon: '📌' }
  ],
  title = 'Activities',
  showViewAll = true
}: CustomActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {activities.map(a => (
          <div key={a.id} className="flex items-center gap-2 text-sm">
            <span>{a.icon || '•'}</span>
            <span className="flex-1 text-gray-700">{a.text}</span>
            <span className="text-xs text-gray-400">{a.time}</span>
          </div>
        ))}
      </div>
      {showViewAll && (
        <button className="text-xs text-green-600 mt-3 hover:text-green-700">
          View all
        </button>
      )}
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export {
  
  
  
  
  
  
}