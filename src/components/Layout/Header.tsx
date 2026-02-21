'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// ============================================
// SIMPLE TYPES
// ============================================

export interface HeaderProps {
  title?: string
  showBackButton?: boolean
  onBack?: () => void
  showActions?: boolean
  actions?: React.ReactNode
  className?: string
}

// ============================================
// HEADER COMPONENT
// ============================================

export function Header({
  title = 'Dashboard',
  showBackButton = false,
  onBack,
  showActions = false,
  actions,
  className = ''
}: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false)

  // Handle back button click
  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  return (
    <header className={`bg-white border-b border-gray-200 py-3 px-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left section - Back button and title */}
        <div className="flex items-center space-x-3">
          {/* Back button */}
          {showBackButton && (
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}

          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>

        {/* Right section - Search and actions */}
        <div className="flex items-center space-x-2">
          {/* Search toggle button (mobile) */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Search bar (desktop) */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

          {/* Actions */}
          {showActions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Mobile search bar */}
      {showSearch && (
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
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
        </div>
      )}
    </header>
  )
}

// ============================================
// PAGE HEADER (With breadcrumbs)
// ============================================

export interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center text-sm text-gray-500 mb-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="mx-2">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-green-600">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-700">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Title and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
    </div>
  )
}

// ============================================
// DASHBOARD HEADER (With stats)
// ============================================

export interface DashboardHeaderProps {
  greeting?: string
  userName?: string
  stats?: Array<{ label: string; value: string | number }>
  className?: string
}

export function DashboardHeader({
  greeting = 'Welcome back',
  userName = 'Admin',
  stats = [],
  className = ''
}: DashboardHeaderProps) {
  // Get time-based greeting
  const getGreeting = (): string => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const timeGreeting = getGreeting()

  return (
    <div className={`mb-6 ${className}`}>
      {/* Greeting */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {timeGreeting}, {userName}!
        </h1>
        <p className="text-gray-500 text-sm mt-1">{greeting}</p>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// SIMPLE HEADER (Minimal version)
// ============================================

export function SimpleHeader({ 
  title, 
  onBack 
}: { 
  title?: string
  onBack?: () => void 
}) {
  return (
    <div className="flex items-center space-x-3 py-2">
      {onBack && (
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          ←
        </button>
      )}
      {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
    </div>
  )
}

// ============================================
// MODAL HEADER
// ============================================

export interface ModalHeaderProps {
  title: string
  onClose?: () => void
  subtitle?: string
}

export function ModalHeader({ title, onClose, subtitle }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-gray-200">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  )
}

// ============================================
// SECTION HEADER
// ============================================

export interface SectionHeaderProps {
  title: string
  action?: React.ReactNode
  subtitle?: string
}

export function SectionHeader({ title, action, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-md font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// ============================================
// CARD HEADER
// ============================================

export interface CardHeaderProps {
  title: string
  icon?: string
  action?: React.ReactNode
}

export function CardHeader({ title, icon, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
      <div className="flex items-center space-x-2">
        {icon && <span className="text-lg">{icon}</span>}
        <h4 className="font-medium text-gray-700">{title}</h4>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// ============================================
// HEADER SKELETON LOADER
// ============================================

export function HeaderSkeleton() {
  return (
    <div className="bg-white border-b border-gray-200 py-3 px-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-8 bg-gray-200 rounded w-48"></div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  Header,
  PageHeader,
  DashboardHeader,
  SimpleHeader,
  ModalHeader,
  SectionHeader,
  CardHeader,
  HeaderSkeleton
}