'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ============================================
// SIMPLE TYPES
// ============================================

export interface SidebarItem {
  name: string
  href: string
  icon: string
  badge?: number
}

export interface SidebarProps {
  items?: SidebarItem[]
  userName?: string
  userRole?: string
  schoolName?: string
  onLogout?: () => void
  collapsed?: boolean
  onToggle?: () => void
}

// ============================================
// DEFAULT NAVIGATION ITEMS
// ============================================

const DEFAULT_ITEMS: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Students', href: '/dashboard/students', icon: '👥' },
  { name: 'Teachers', href: '/dashboard/teachers', icon: '👨‍🏫' },
  { name: 'Classes', href: '/dashboard/classes', icon: '📚' },
  { name: 'Attendance', href: '/dashboard/attendance', icon: '📋' },
  { name: 'Exams', href: '/dashboard/exams', icon: '📝' },
  { name: 'Events', href: '/dashboard/events', icon: '📅' },
  { name: 'Gallery', href: '/dashboard/gallery', icon: '🖼️' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' }
]

// ============================================
// SIDEBAR COMPONENT
// ============================================

export function Sidebar({
  items = DEFAULT_ITEMS,
  userName = 'Admin User',
  userRole = 'Administrator',
  schoolName = 'Ghazali High',
  onLogout,
  collapsed = false,
  onToggle
}: SidebarProps) {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Check if item is active
  const isActive = (href: string): boolean => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
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
  }

  return (
    <>
      {/* Mobile Menu Button (visible when sidebar collapsed on mobile) */}
      <button
        onClick={toggleMobileMenu}
        className="fixed bottom-4 right-4 md:hidden z-50 w-12 h-12 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full bg-white border-r border-gray-200
          transition-all duration-300 z-40
          ${collapsed ? 'w-20' : 'w-64'}
          hidden md:block
        `}
      >
        {/* Logo Area */}
        <div className={`h-16 flex items-center ${collapsed ? 'justify-center' : 'px-4'}`}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
              G
            </div>
            {!collapsed && (
              <span className="font-bold text-gray-800">{schoolName}</span>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        {onToggle && (
          <button
            onClick={onToggle}
            className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50"
          >
            {collapsed ? '→' : '←'}
          </button>
        )}

        {/* User Info */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="mt-4 px-2">
          {items.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-lg mb-1
                transition-colors relative
                ${isActive(item.href)
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="text-sm flex-1">{item.name}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-0 right-0 px-2">
          {onLogout ? (
            <button
              onClick={handleLogout}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-lg w-full
                text-gray-700 hover:bg-red-50 hover:text-red-600
                transition-colors
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <span className="text-lg">🚪</span>
              {!collapsed && <span className="text-sm">Logout</span>}
            </button>
          ) : (
            <Link
              href="/login"
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-lg
                text-gray-700 hover:bg-red-50 hover:text-red-600
                transition-colors
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <span className="text-lg">🚪</span>
              {!collapsed && <span className="text-sm">Logout</span>}
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-white z-50 md:hidden overflow-y-auto">
            {/* Mobile Sidebar Content */}
            <div className="p-4">
              {/* Logo */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <span className="font-bold text-gray-800">{schoolName}</span>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* User Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">{userName}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {items.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-lg
                      ${isActive(item.href)
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm flex-1">{item.name}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Logout */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                {onLogout ? (
                  <button
                    onClick={() => {
                      handleLogout()
                      toggleMobileMenu()
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    <span className="text-lg">🚪</span>
                    <span className="text-sm">Logout</span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={toggleMobileMenu}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    <span className="text-lg">🚪</span>
                    <span className="text-sm">Logout</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main content padding for desktop */}
      <div className={`hidden md:block transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`} />
    </>
  )
}

// ============================================
// SIMPLE SIDEBAR (Minimal Version)
// ============================================

export function SimpleSidebar({ 
  items = DEFAULT_ITEMS.slice(0, 5),
  collapsed = false 
}: {
  items?: SidebarItem[]
  collapsed?: boolean
}) {
  const pathname = usePathname()

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className={`bg-white border-r border-gray-200 h-full ${collapsed ? 'w-16' : 'w-48'}`}>
      <div className="p-2">
        {items.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center ${collapsed ? 'justify-center' : 'space-x-2'} 
              p-2 rounded-lg mb-1
              ${isActive(item.href) ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}
            `}
          >
            <span>{item.icon}</span>
            {!collapsed && <span className="text-sm">{item.name}</span>}
          </Link>
        ))}
      </div>
    </aside>
  )
}

// ============================================
// SIDEBAR ITEM COMPONENT
// ============================================

export interface SidebarItemProps {
  item: SidebarItem
  active?: boolean
  collapsed?: boolean
  onClick?: () => void
}

export function SidebarItem({ item, active, collapsed, onClick }: SidebarItemProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`
        flex items-center ${collapsed ? 'justify-center' : 'space-x-2'} 
        p-2 rounded-lg mb-1 transition-colors
        ${active 
          ? 'bg-green-100 text-green-700' 
          : 'text-gray-600 hover:bg-gray-100'
        }
      `}
    >
      <span className="text-lg">{item.icon}</span>
      {!collapsed && (
        <>
          <span className="text-sm flex-1">{item.name}</span>
          {item.badge && item.badge > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

// ============================================
// SIDEBAR SKELETON LOADER
// ============================================

export function SidebarSkeleton() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full animate-pulse">
      <div className="p-4">
        <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    </aside>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default Sidebar