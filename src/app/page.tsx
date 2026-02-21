'use client'

import React, { useEffect, useRef } from 'react'
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-teal-800 to-blue-900">
      {/* Animated background particles (simple CSS) */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        {/* Logo/Icon */}
        <div className="mb-6 inline-block">
          <div className="w-20 h-20 bg-white rounded-2xl transform rotate-45 animate-spin-slow mx-auto"></div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          {schoolName}
        </h1>

        {/* Location */}
        <p className="text-xl md:text-2xl mb-6 text-green-200 animate-fade-in delay-200">
          Adlana • Tehsil Bhawana • District Chiniot
        </p>

        {/* Description */}
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-200 animate-fade-in delay-400">
          Where future leaders are made. Providing quality education since 1995 with a focus on academic excellence and character development.
        </p>

        {/* Principal Message */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 mb-8 inline-block animate-fade-in delay-600">
          <p className="text-sm text-green-200">Principal's Message</p>
          <p className="font-semibold">{principalName}</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-800">
          <Link
            href="/about"
            className="px-8 py-3 bg-white text-green-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Learn More
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-900 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
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
    { label: 'Years', value: '25+', icon: '🎓' },
    { label: 'Awards', value: '50+', icon: '🏆' },
    { label: 'Events', value: '100+', icon: '🎉' }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Our Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
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
    { icon: '📚', title: 'Quality Education', desc: 'Comprehensive curriculum with focus on excellence' },
    { icon: '👨‍🏫', title: 'Expert Teachers', desc: 'Dedicated faculty with years of experience' },
    { icon: '🏆', title: 'Sports', desc: 'Modern sports facilities and coaching' },
    { icon: '🎨', title: 'Arts & Culture', desc: 'Rich programs in arts and cultural activities' },
    { icon: '💻', title: 'Computer Labs', desc: 'State-of-the-art computer facilities' },
    { icon: '🔬', title: 'Science Labs', desc: 'Well-equipped laboratories' },
    { icon: '📖', title: 'Library', desc: 'Extensive collection of books' },
    { icon: '🚌', title: 'Transport', desc: 'Safe and reliable transport' }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
          Why Choose Us?
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          We provide the best environment for your child's growth and development
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <span className="text-white text-9xl">🏫</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-600 text-white p-4 rounded-lg">
              <p className="text-2xl font-bold">25+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>

          {/* Right column - Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              About Ghazali High School
            </h2>
            <p className="text-gray-600 mb-6">
              Established in 1995, Ghazali High School has been a beacon of quality education in the region. 
              We are committed to nurturing young minds and preparing them for the challenges of tomorrow.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Comprehensive curriculum from Nursery to Class 10</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Qualified and experienced teaching staff</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Modern facilities including labs and library</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Focus on character building and Islamic values</span>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Read More
              <span className="ml-2">→</span>
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
    <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
            <div>
              <p className="text-sm opacity-90">Principal's Message</p>
              <h3 className="text-2xl font-bold">{principalName}</h3>
              <p className="text-sm opacity-75">Leading with wisdom and care</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm opacity-90">Contact Principal Directly</p>
            <a
              href={`tel:${principalContact}`}
              className="text-2xl font-bold hover:underline"
            >
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
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Give your child the best education. Admissions open for the academic year 2024-2025.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/admissions"
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
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
  principalContact = '0308-4591993',
  address = 'Adlana, Tehsil Bhawana, District Chiniot'
}: HomeProps) {
  // Add animation styles to document
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
      }
      .animate-fade-in {
        animation: fadeIn 1s ease-out forwards;
        opacity: 0;
      }
      .delay-200 { animation-delay: 0.2s; }
      .delay-400 { animation-delay: 0.4s; }
      .delay-600 { animation-delay: 0.6s; }
      .delay-800 { animation-delay: 0.8s; }
      .delay-1000 { animation-delay: 1s; }
      .delay-700 { animation-delay: 0.7s; }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

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