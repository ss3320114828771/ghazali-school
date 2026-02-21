'use client'

import React from 'react'
import Link from 'next/link'

// ============================================
// SIMPLE TYPES
// ============================================

export interface FooterProps {
  schoolName?: string
  schoolAddress?: string
  schoolPhone?: string
  schoolEmail?: string
  currentYear?: number
  showSocialLinks?: boolean
  showQuickLinks?: boolean
  className?: string
}

// ============================================
// CONSTANTS
// ============================================

const CURRENT_YEAR = new Date().getFullYear()

const QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Contact', href: '/contact' }
]

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: '📘', href: '#' },
  { name: 'Twitter', icon: '🐦', href: '#' },
  { name: 'Instagram', icon: '📷', href: '#' },
  { name: 'YouTube', icon: '▶️', href: '#' },
  { name: 'WhatsApp', icon: '📱', href: '#' }
]

// ============================================
// FOOTER COMPONENT
// ============================================

export function Footer({
  schoolName = 'Ghazali High School',
  schoolAddress = 'Adlana, Tehsil Bhawana, District Chiniot',
  schoolPhone = '0308-4591993',
  schoolEmail = 'info@ghazalihigh.edu.pk',
  currentYear = CURRENT_YEAR,
  showSocialLinks = true,
  showQuickLinks = true,
  className = ''
}: FooterProps) {
  return (
    <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GHS</span>
              </div>
              <h3 className="font-bold text-gray-800">{schoolName}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">{schoolAddress}</p>
            <p className="text-sm text-gray-600 mb-1">📞 {schoolPhone}</p>
            <p className="text-sm text-gray-600">✉️ {schoolEmail}</p>
          </div>

          {/* Quick Links */}
          {showQuickLinks && (
            <div className="col-span-1">
              <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
              <ul className="space-y-2">
                {QUICK_LINKS.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/resources/library" className="text-sm text-gray-600 hover:text-green-600">
                  📚 Library
                </Link>
              </li>
              <li>
                <Link href="/resources/calendar" className="text-sm text-gray-600 hover:text-green-600">
                  📅 Academic Calendar
                </Link>
              </li>
              <li>
                <Link href="/resources/results" className="text-sm text-gray-600 hover:text-green-600">
                  📊 Exam Results
                </Link>
              </li>
              <li>
                <Link href="/resources/fees" className="text-sm text-gray-600 hover:text-green-600">
                  💰 Fee Structure
                </Link>
              </li>
              <li>
                <Link href="/resources/forms" className="text-sm text-gray-600 hover:text-green-600">
                  📝 Download Forms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-3">Contact Us</h4>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">📍</span>
                <span>{schoolAddress}</span>
              </li>
              <li className="text-sm text-gray-600">
                <Link href={`tel:${schoolPhone}`} className="hover:text-green-600">
                  📞 {schoolPhone}
                </Link>
              </li>
              <li className="text-sm text-gray-600">
                <Link href={`mailto:${schoolEmail}`} className="hover:text-green-600">
                  ✉️ {schoolEmail}
                </Link>
              </li>
            </ul>

            {/* Social Links */}
            {showSocialLinks && (
              <>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Follow Us</h5>
                <div className="flex space-x-3">
                  {SOCIAL_LINKS.map(social => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 bg-gray-200 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center text-sm transition-colors"
                      title={social.name}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-2 md:mb-0">
            © {currentYear} {schoolName}. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-green-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-600">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-green-600">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// SIMPLE FOOTER (Minimal Version)
// ============================================

export function SimpleFooter({
  schoolName = 'Ghazali High School',
  className = ''
}: {
  schoolName?: string
  className?: string
}) {
  const year = new Date().getFullYear()

  return (
    <footer className={`bg-gray-50 border-t border-gray-200 py-4 text-center text-sm text-gray-600 ${className}`}>
      <p>© {year} {schoolName}. All rights reserved.</p>
    </footer>
  )
}

// ============================================
// FOOTER WITH PRINCIPAL MESSAGE
// ============================================

export function FooterWithPrincipal({
  principalName = 'Hafiz Sajid Syed',
  principalContact = '0308-4591993',
  schoolName = 'Ghazali High School'
}: {
  principalName?: string
  principalContact?: string
  schoolName?: string
}) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-green-800 to-teal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Principal Info */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-sm opacity-90">Principal's Office</p>
                <p className="font-bold">{principalName}</p>
              </div>
            </div>
            <p className="text-sm opacity-90">📞 {principalContact}</p>
          </div>

          {/* School Name */}
          <div className="text-center mb-4 md:mb-0">
            <h3 className="font-bold text-lg">{schoolName}</h3>
            <p className="text-sm opacity-90">Excellence in Education</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm opacity-90">© {year} All Rights Reserved</p>
            <p className="text-xs opacity-75 mt-1">Adlana, Tehsil Bhawana, District Chiniot</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// FOOTER SKELETON LOADER
// ============================================

export function FooterSkeleton() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(col => (
            <div key={col} className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="h-3 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default Footer