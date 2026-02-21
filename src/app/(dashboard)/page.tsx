'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ============================================
// SIMPLE TYPES
// ============================================

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  totalStaff: number
  todayAttendance: number
  pendingFees: number
  upcomingEvents: number
  newAdmissions: number
}

export interface Activity {
  id: string
  type: 'student' | 'teacher' | 'attendance' | 'fee' | 'event' | 'exam'
  title: string
  time: string
  user?: string
}

export interface QuickAction {
  id: string
  title: string
  icon: string
  href: string
  color: string
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_STATS: DashboardStats = {
  totalStudents: 1234,
  totalTeachers: 85,
  totalClasses: 30,
  totalStaff: 45,
  todayAttendance: 92,
  pendingFees: 28,
  upcomingEvents: 5,
  newAdmissions: 12
}

const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', type: 'student', title: 'New student enrolled: Ali Ahmed', time: '5 min ago', user: 'Admin' },
  { id: '2', type: 'attendance', title: 'Attendance marked for Class 10-A', time: '15 min ago', user: 'Prof. Ahmad' },
  { id: '3', type: 'fee', title: 'Fee payment received from 5 students', time: '1 hour ago', user: 'Accounts' },
  { id: '4', type: 'event', title: 'Sports Gala scheduled for March 15', time: '2 hours ago', user: 'Sports Dept' },
  { id: '5', type: 'exam', title: 'Mid-term exam results published', time: '3 hours ago', user: 'Exam Dept' },
  { id: '6', type: 'teacher', title: 'New teacher joined: Ms. Sara Khan', time: '1 day ago', user: 'HR' }
]

const QUICK_ACTIONS: QuickAction[] = [
  { id: '1', title: 'Add Student', icon: '👥', href: '/dashboard/students/add', color: 'bg-blue-500' },
  { id: '2', title: 'Add Teacher', icon: '👨‍🏫', href: '/dashboard/teachers/add', color: 'bg-green-500' },
  { id: '3', title: 'Mark Attendance', icon: '📋', href: '/dashboard/attendance', color: 'bg-purple-500' },
  { id: '4', title: 'Create Exam', icon: '📝', href: '/dashboard/exams/create', color: 'bg-yellow-500' },
  { id: '5', title: 'Schedule Event', icon: '📅', href: '/dashboard/events/create', color: 'bg-pink-500' },
  { id: '6', title: 'View Reports', icon: '📊', href: '/dashboard/reports', color: 'bg-indigo-500' }
]

// ============================================
// STAT CARD COMPONENT
// ============================================

interface StatCardProps {
  title: string
  value: number | string
  icon: string
  trend?: number
  color: string
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className={`${color} rounded-lg p-5 shadow-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white text-opacity-80 text-sm mb-1">{title}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
          {trend !== undefined && (
            <p className="text-white text-opacity-80 text-xs mt-1">
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <span className="text-white text-3xl opacity-80">{icon}</span>
      </div>
    </div>
  )
}

// ============================================
// ACTIVITY ITEM COMPONENT
// ============================================

interface ActivityItemProps {
  activity: Activity
}

function ActivityItem({ activity }: ActivityItemProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'student': return '👥'
      case 'teacher': return '👨‍🏫'
      case 'attendance': return '📋'
      case 'fee': return '💰'
      case 'event': return '📅'
      case 'exam': return '📝'
      default: return '📌'
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'student': return 'bg-blue-100 text-blue-600'
      case 'teacher': return 'bg-green-100 text-green-600'
      case 'attendance': return 'bg-purple-100 text-purple-600'
      case 'fee': return 'bg-yellow-100 text-yellow-600'
      case 'event': return 'bg-pink-100 text-pink-600'
      case 'exam': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
      <div className={`w-8 h-8 rounded-full ${getColor(activity.type)} flex items-center justify-center flex-shrink-0`}>
        <span>{getIcon(activity.type)}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{activity.title}</p>
        <div className="flex items-center mt-1 text-xs text-gray-400">
          <span>{activity.time}</span>
          {activity.user && (
            <>
              <span className="mx-1">•</span>
              <span>{activity.user}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// QUICK ACTION BUTTON COMPONENT
// ============================================

interface QuickActionButtonProps {
  action: QuickAction
}

function QuickActionButton({ action }: QuickActionButtonProps) {
  return (
    <Link
      href={action.href}
      className={`${action.color} text-white rounded-lg p-4 hover:opacity-90 transition-opacity block`}
    >
      <div className="text-3xl mb-2">{action.icon}</div>
      <div className="text-sm font-medium">{action.title}</div>
    </Link>
  )
}

// ============================================
// CHART PLACEHOLDER COMPONENT
// ============================================

function AttendanceChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const data = [92, 88, 95, 89, 93, 91]

  return (
    <div className="h-40 flex items-end justify-between gap-2">
      {days.map((day, index) => (
        <div key={day} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-gradient-to-t from-green-500 to-teal-500 rounded-t"
            style={{ height: `${data[index]}%` }}
          ></div>
          <span className="text-xs text-gray-500 mt-1">{day}</span>
        </div>
      ))}
    </div>
  )
}

// ============================================
// MAIN DASHBOARD PAGE
// ============================================

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState('')

  // Load dashboard data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      setStats(MOCK_STATS)
      setActivities(MOCK_ACTIVITIES)

      // Set greeting based on time
      const hour = new Date().getHours()
      if (hour < 12) setGreeting('Good Morning')
      else if (hour < 17) setGreeting('Good Afternoon')
      else setGreeting('Good Evening')

      setLoading(false)
    }

    loadData()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{greeting}, Admin!</h1>
        <p className="text-gray-500">Here's what's happening at Ghazali High School today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon="👥"
          trend={5}
          color="bg-gradient-to-br from-blue-600 to-blue-700"
        />
        <StatCard
          title="Total Teachers"
          value={stats?.totalTeachers || 0}
          icon="👨‍🏫"
          trend={2}
          color="bg-gradient-to-br from-green-600 to-green-700"
        />
        <StatCard
          title="Total Classes"
          value={stats?.totalClasses || 0}
          icon="📚"
          trend={0}
          color="bg-gradient-to-br from-purple-600 to-purple-700"
        />
        <StatCard
          title="Today's Attendance"
          value={`${stats?.todayAttendance || 0}%`}
          icon="📊"
          trend={-1}
          color="bg-gradient-to-br from-yellow-600 to-yellow-700"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">Staff</p>
          <p className="text-lg font-bold text-gray-900">{stats?.totalStaff}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">Pending Fees</p>
          <p className="text-lg font-bold text-yellow-600">{stats?.pendingFees}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">Upcoming Events</p>
          <p className="text-lg font-bold text-purple-600">{stats?.upcomingEvents}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">New Admissions</p>
          <p className="text-lg font-bold text-green-600">{stats?.newAdmissions}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts and Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance Chart Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-gray-800">Weekly Attendance</h2>
              <span className="text-xs text-gray-400">Last 6 days</span>
            </div>
            <AttendanceChart />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-800 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {QUICK_ACTIONS.map(action => (
                <QuickActionButton key={action.id} action={action} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activities */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-gray-800">Recent Activities</h2>
              <Link href="/dashboard/activities" className="text-xs text-green-600 hover:text-green-700">
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {activities.slice(0, 5).map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
              {activities.length === 0 && (
                <p className="text-center text-gray-400 py-4">No recent activities</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Important Links */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link
          href="/dashboard/students"
          className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100"
        >
          <span className="text-2xl block mb-1">👥</span>
          <span className="text-xs">Manage Students</span>
        </Link>
        <Link
          href="/dashboard/teachers"
          className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100"
        >
          <span className="text-2xl block mb-1">👨‍🏫</span>
          <span className="text-xs">Manage Teachers</span>
        </Link>
        <Link
          href="/dashboard/classes"
          className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100"
        >
          <span className="text-2xl block mb-1">📚</span>
          <span className="text-xs">Manage Classes</span>
        </Link>
        <Link
          href="/dashboard/attendance"
          className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100"
        >
          <span className="text-2xl block mb-1">📋</span>
          <span className="text-xs">Attendance</span>
        </Link>
      </div>
    </div>
  )
}