'use client'

import React, { useState } from 'react'

// ============================================
// SIMPLE NOTIFICATIONS
// ============================================

interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New Student Registered',
      message: 'Ali Ahmed has been registered in Class 10-A',
      time: '5 min ago',
      read: false,
      type: 'info'
    },
    {
      id: 2,
      title: 'Attendance Marked',
      message: 'Attendance for Class 9-B has been completed',
      time: '15 min ago',
      read: false,
      type: 'success'
    },
    {
      id: 3,
      title: 'Fee Payment Due',
      message: '5 students have pending fee payments',
      time: '1 hour ago',
      read: true,
      type: 'warning'
    },
    {
      id: 4,
      title: 'Exam Results Published',
      message: 'Mid-term results for Class 10 are now available',
      time: '2 hours ago',
      read: true,
      type: 'info'
    },
    {
      id: 5,
      title: 'Teacher Meeting',
      message: 'Staff meeting at 2:00 PM in the conference room',
      time: '3 hours ago',
      read: false,
      type: 'warning'
    }
  ])

  const [showAll, setShowAll] = useState(false)

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-600'
      case 'warning': return 'bg-yellow-100 text-yellow-600'
      case 'error': return 'bg-red-100 text-red-600'
      default: return 'bg-blue-100 text-blue-600'
    }
  }

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'success': return '✓'
      case 'warning': return '⚠'
      case 'error': return '✗'
      default: return 'ℹ'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              {showAll ? 'Show Less' : 'View All'}
            </button>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-green-600 hover:text-green-700"
              >
                Mark All Read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {displayedNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          displayedNotifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50/50' : ''
              }`}
            >
              <div className="flex gap-3">
                {/* Icon */}
                <div className={`w-8 h-8 rounded-full ${getTypeColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                  {getTypeIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {notification.message}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {notification.time}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-green-600 hover:text-green-700"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
        <button className="text-xs text-gray-500 hover:text-gray-700">
          Notification Settings
        </button>
      </div>
    </div>
  )
}

// ============================================
// SIMPLE NOTIFICATION BELL
// ============================================

export function NotificationBell() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [count, setCount] = useState(3)

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <span className="text-xl">🔔</span>
        {count > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {count}
          </span>
        )}
      </button>

      {showDropdown && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-200 font-medium text-sm">
              Notifications
            </div>
            <div className="p-3 text-sm text-gray-500">
              3 new notifications
            </div>
            <div className="border-t border-gray-200 p-2">
              <button className="w-full text-center text-xs text-green-600 hover:text-green-700">
                View All
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ============================================
// COMPACT NOTIFICATION LIST
// ============================================

export function CompactNotifications() {
  const items = [
    { id: 1, text: 'New student enrolled', time: '5m', unread: true },
    { id: 2, text: 'Attendance marked', time: '15m', unread: true },
    { id: 3, text: 'Fee received', time: '1h', unread: false },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <h4 className="text-sm font-medium mb-2">Recent</h4>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              {item.unread && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
              <span className={item.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                {item.text}
              </span>
            </div>
            <span className="text-gray-400">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// MINIMAL NOTIFICATION (Icon Only)
// ============================================

export function MinimalNotification() {
  const [hasNotification, setHasNotification] = useState(true)

  return (
    <button className="relative p-1">
      <span className="text-xl">🔔</span>
      {hasNotification && (
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      )}
    </button>
  )
}

// ============================================
// NOTIFICATION TOAST
// ============================================

export function NotificationToast({ 
  message = 'New notification',
  type = 'info',
  onClose 
}: { 
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  onClose?: () => void
}) {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    error: 'bg-red-50 border-red-200 text-red-700'
  }

  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  }

  return (
    <div className={`${colors[type]} border rounded-lg p-3 flex items-center gap-2 shadow-lg`}>
      <span>{icons[type]}</span>
      <span className="text-sm flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-sm hover:opacity-70">✕</button>
      )}
    </div>
  )
}

// ============================================
// NOTIFICATION SKELETON
// ============================================

export function NotificationSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-5 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
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
// EXPORT ALL
// ============================================

export {
  
  
  
  
  
}