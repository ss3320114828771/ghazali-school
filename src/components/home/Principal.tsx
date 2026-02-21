'use client'

import React from 'react'
import Link from 'next/link'

// ============================================
// SIMPLE TYPES
// ============================================

export interface PrincipalProps {
  name?: string
  qualification?: string
  experience?: string
  message?: string
  image?: string
  phone?: string
  email?: string
  showContact?: boolean
  showMessage?: boolean
  className?: string
}

// ============================================
// PRINCIPAL CARD COMPONENT
// ============================================

export function PrincipalCard({
  name = 'Hafiz Sajid Syed',
  qualification = 'M.A. Education, Hafiz-e-Quran',
  experience = '25+ years',
  message = 'Welcome to Ghazali High School, where we nurture future leaders with quality education and Islamic values.',
  image,
  phone = '0308-4591993',
  email = 'principal@ghazalihigh.edu.pk',
  showContact = true,
  showMessage = true,
  className = ''
}: PrincipalProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm ${className}`}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Image Section */}
          <div className="flex-shrink-0">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-5xl">
                👤
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{name}</h3>
            <p className="text-green-600 font-medium mb-2">{qualification}</p>
            <p className="text-gray-500 text-sm mb-3">Experience: {experience}</p>
            
            {showMessage && (
              <p className="text-gray-600 italic border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                "{message}"
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        {showContact && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-green-600"
              >
                <span className="text-xl">📞</span>
                <span>{phone}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-green-600"
              >
                <span className="text-xl">✉️</span>
                <span>{email}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// PRINCIPAL MESSAGE SECTION
// ============================================

export function PrincipalMessage({
  name = 'Hafiz Sajid Syed',
  message = 'Welcome to Ghazali High School, where we nurture future leaders with quality education and Islamic values.',
  image,
  className = ''
}: {
  name?: string
  message?: string
  image?: string
  className?: string
}) {
  return (
    <section className={`py-12 bg-gradient-to-br from-green-50 to-teal-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image */}
            <div className="flex-shrink-0">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-green-200"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-4xl">
                  👤
                </div>
              )}
            </div>

            {/* Message */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-5xl text-green-200 mb-2">"</div>
              <p className="text-lg text-gray-700 italic mb-4">{message}</p>
              <div className="text-5xl text-green-200 text-right">"</div>
              <div className="mt-4">
                <p className="font-bold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">Principal, Ghazali High School</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRINCIPAL STATS
// ============================================

export function PrincipalStats({
  name = 'Hafiz Sajid Syed',
  stats = [
    { label: 'Years of Service', value: '25+' },
    { label: 'Students', value: '5000+' },
    { label: 'Awards', value: '15+' },
    { label: 'Publications', value: '5' }
  ]
}: {
  name?: string
  stats?: Array<{ label: string; value: string }>
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        {name} - At a Glance
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// PRINCIPAL CONTACT CARD
// ============================================

export function PrincipalContact({
  name = 'Hafiz Sajid Syed',
  phone = '0308-4591993',
  email = 'principal@ghazalihigh.edu.pk',
  officeHours = 'Mon-Fri: 9:00 AM - 2:00 PM'
}: {
  name?: string
  phone?: string
  email?: string
  officeHours?: string
}) {
  return (
    <div className="bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-3">Contact Principal</h3>
      <p className="text-sm opacity-90 mb-4">{name}</p>
      
      <div className="space-y-3">
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 hover:underline"
        >
          <span>📞</span>
          <span>{phone}</span>
        </a>
        
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 hover:underline"
        >
          <span>✉️</span>
          <span className="text-sm break-all">{email}</span>
        </a>
        
        <div className="flex items-center gap-2 text-sm opacity-80">
          <span>🕒</span>
          <span>{officeHours}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PRINCIPAL GALLERY
// ============================================

export function PrincipalGallery() {
  const images = [
    { id: 1, title: 'Award Ceremony', emoji: '🏆' },
    { id: 2, title: 'Graduation Day', emoji: '🎓' },
    { id: 3, title: 'School Event', emoji: '🎉' },
    { id: 4, title: 'Meeting', emoji: '🤝' }
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Principal's Gallery</h3>
      <div className="grid grid-cols-2 gap-2">
        {images.map(img => (
          <div
            key={img.id}
            className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-4xl hover:bg-gray-200 transition-colors"
          >
            {img.emoji}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// SIMPLE PRINCIPAL CARD (Minimal)
// ============================================

export function SimplePrincipal({
  name = 'Hafiz Sajid Syed',
  title = 'Principal',
  phone = '0308-4591993'
}: {
  name?: string
  title?: string
  phone?: string
}) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
        👤
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{title}</p>
        <a href={`tel:${phone}`} className="text-xs text-green-600 hover:underline">
          {phone}
        </a>
      </div>
    </div>
  )
}

// ============================================
// PRINCIPAL SECTION (Full)
// ============================================

export default function Principal({
  name = 'Hafiz Sajid Syed',
  qualification = 'M.A. Education, Hafiz-e-Quran',
  experience = '25+ years',
  message = 'Welcome to Ghazali High School, where we nurture future leaders with quality education and Islamic values.',
  phone = '0308-4591993',
  email = 'principal@ghazalihigh.edu.pk',
  showStats = true
}: {
  name?: string
  qualification?: string
  experience?: string
  message?: string
  phone?: string
  email?: string
  showStats?: boolean
}) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Principal</h2>
          <p className="text-gray-600">Leading with wisdom and experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Stats & Contact */}
          <div className="space-y-4">
            <PrincipalStats name={name} />
            <PrincipalContact name={name} phone={phone} email={email} />
          </div>

          {/* Middle Column - Main Card */}
          <div className="md:col-span-2">
            <PrincipalCard
              name={name}
              qualification={qualification}
              experience={experience}
              message={message}
              phone={phone}
              email={email}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRINCIPAL SKELETON LOADER
// ============================================

export function PrincipalSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
        <div className="flex-1 w-full">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2 mx-auto md:mx-0"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-3 mx-auto md:mx-0"></div>
          <div className="h-16 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-center gap-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export {
  
  
  
  
  
  
  
}