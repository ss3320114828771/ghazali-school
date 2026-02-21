'use client'

import React from 'react'
import Link from 'next/link'

// ============================================
// SIMPLE TYPES
// ============================================

export interface HomeProps {
  schoolName?: string
  principalName?: string
  principalContact?: string
  address?: string
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection({
  schoolName = 'Ghazali High School',
  principalName = 'Hafiz Sajid Syed'
}: {
  schoolName?: string
  principalName?: string
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 to-teal-700 text-white">
      {/* Simple overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* School Name */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {schoolName}
        </h1>

        {/* Location */}
        <p className="text-xl md:text-2xl mb-6 text-green-100">
          Adlana • Tehsil Bhawana • District Chiniot
        </p>

        {/* Principal Message */}
        <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-8 inline-block">
          <p className="text-sm">Principal's Message</p>
          <p className="font-semibold text-xl">{principalName}</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/about"
            className="px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100"
          >
            Learn More
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-700"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Simple scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full"></div>
      </div>
    </section>
  )
}

// ============================================
// STATS SECTION
// ============================================

function StatsSection() {
  const stats = [
    { label: 'Students', value: '1000+', icon: '👥' },
    { label: 'Teachers', value: '85+', icon: '👨‍🏫' },
    { label: 'Classes', value: '30+', icon: '📚' },
    { label: 'Years', value: '25+', icon: '🎓' }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Our Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-green-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// FEATURES SECTION
// ============================================

function FeaturesSection() {
  const features = [
    { icon: '📚', title: 'Quality Education', desc: 'Comprehensive curriculum' },
    { icon: '👨‍🏫', title: 'Expert Teachers', desc: 'Dedicated faculty' },
    { icon: '🏆', title: 'Sports', desc: 'Modern facilities' },
    { icon: '💻', title: 'Computer Labs', desc: 'Latest technology' }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// ABOUT SECTION
// ============================================

function AboutSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column - Image Placeholder */}
          <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-lg p-12 text-center">
            <span className="text-8xl">🏫</span>
          </div>

          {/* Right column - Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About Our School
            </h2>
            <p className="text-gray-600 mb-4">
              Established in 1995, Ghazali High School has been providing quality education 
              to students from Nursery to Class 10.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Qualified teachers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Modern facilities</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Islamic values</span>
              </li>
            </ul>
            <Link
              href="/about"
              className="text-green-600 font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRINCIPAL SECTION
// ============================================

function PrincipalSection({
  principalName = 'Hafiz Sajid Syed',
  principalContact = '0308-4591993'
}: {
  principalName?: string
  principalContact?: string
}) {
  return (
    <section className="py-12 bg-green-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mr-4">
              👤
            </div>
            <div>
              <p className="text-sm opacity-90">Principal</p>
              <h3 className="text-xl font-bold">{principalName}</h3>
            </div>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Contact Principal</p>
            <a href={`tel:${principalContact}`} className="text-xl font-bold hover:underline">
              {principalContact}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// CTA SECTION
// ============================================

function CTASection() {
  return (
    <section className="py-12 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Join Ghazali High School</h2>
        <p className="text-gray-300 mb-6">
          Admissions open for academic year 2024-2025
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/admissions"
            className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-gray-800"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================
// MAIN HOME COMPONENT
// ============================================

export default function Home({
  schoolName = 'Ghazali High School',
  principalName = 'Hafiz Sajid Syed',
  principalContact = '0308-4591993'
}: HomeProps) {
  return (
    <main className="min-h-screen">
      <HeroSection schoolName={schoolName} principalName={principalName} />
      <StatsSection />
      <FeaturesSection />
      <AboutSection />
      <PrincipalSection principalName={principalName} principalContact={principalContact} />
      <CTASection />
    </main>
  )
}