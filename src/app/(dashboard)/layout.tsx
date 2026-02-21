// src/app/(dashboard)/layout.tsx
'use client'

import { useState } from 'react'           // ✅ React built-in
import Link from 'next/link'                // ✅ Next.js built-in

// ❌ NO OTHER IMPORTS NEEDED
// All components are defined within this file
// No external component imports

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Sidebar - defined here, not imported */}
      <div className={`fixed left-0 top-0 h-full bg-white/10 backdrop-blur-lg transition-all duration-500 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Sidebar content */}
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Navbar - defined here, not imported */}
        <nav className="bg-white/10 backdrop-blur-lg p-4">
          {/* Navbar content */}
        </nav>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}