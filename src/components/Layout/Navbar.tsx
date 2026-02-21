'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// ============================================
// SIMPLE TYPES
// ============================================

export interface NavbarProps {
  userName?: string
  userRole?: string
  userAvatar?: string
  onLogout?: () => void
  notificationCount?: number
}

// ============================================
// NAVBAR COMPONENT
// ============================================

export function Navbar({
  userName = 'Guest',
  userRole = 'Student',
  userAvatar,
  onLogout,
  notificationCount = 0
}: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Toggle user menu
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    setShowUserMenu(false)
  }

  // Get user initials
  const getUserInitials = (): string => {
    if (userName === 'Guest') return 'G'
    return userName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
      <div className="px-4 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Left section - Logo and mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GHS</span>
              </div>
              <span className="font-bold text-gray-800 hidden sm:block">Ghazali High</span>
            </Link>
          </div>

          {/* Center section - Search (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg
                className="absolute left-2.5 top-2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right section - Icons and User */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* Messages (hidden on mobile) */}
            <button className="hidden sm:block p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
              >
                {/* Avatar */}
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
                    {getUserInitials()}
                  </div>
                )}
                
                {/* User info (hidden on mobile) */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700">{userName}</p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                </div>

                {/* Dropdown arrow */}
                <svg className="w-4 h-4 text-gray-400 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    👤 Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    ⚙️ Settings
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  {onLogout ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Logout
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg"
            />
            <svg
              className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowMobileMenu(false)}
            >
              🏠 Dashboard
            </Link>
            <Link
              href="/dashboard/students"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowMobileMenu(false)}
            >
              👥 Students
            </Link>
            <Link
              href="/dashboard/teachers"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowMobileMenu(false)}
            >
              👨‍🏫 Teachers
            </Link>
            <Link
              href="/dashboard/classes"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowMobileMenu(false)}
            >
              📚 Classes
            </Link>
            <Link
              href="/dashboard/attendance"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowMobileMenu(false)}
            >
              📋 Attendance
            </Link>
            <Link
              href="/dashboard/exams"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowMobileMenu(false)}
            >
              📝 Exams
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

// ============================================
// SIMPLE NAVBAR (Minimal Version)
// ============================================

export function SimpleNavbar({ title = 'Dashboard' }: { title?: string }) {
  return (
    <nav className="bg-white border-b border-gray-200 h-14 flex items-center px-4">
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600"></div>
      </div>
    </nav>
  )
}

// ============================================
// NAVBAR SKELETON LOADER
// ============================================

export function NavbarSkeleton() {
  return (
    <nav className="bg-white border-b border-gray-200 h-16 flex items-center px-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        <div className="h-4 bg-gray-200 rounded w-24 hidden sm:block"></div>
      </div>
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg hidden sm:block"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </nav>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default Navbar