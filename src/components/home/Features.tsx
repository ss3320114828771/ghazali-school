'use client'

import React from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface Feature {
  id: string
  icon: string
  title: string
  description: string
  color?: string
}

export interface FeaturesProps {
  title?: string
  subtitle?: string
  features?: Feature[]
  columns?: 2 | 3 | 4
  className?: string
}

// ============================================
// DEFAULT FEATURES DATA
// ============================================

const DEFAULT_FEATURES: Feature[] = [
  {
    id: '1',
    icon: '📚',
    title: 'Quality Education',
    description: 'Comprehensive curriculum designed to develop critical thinking and academic excellence.'
  },
  {
    id: '2',
    icon: '👨‍🏫',
    title: 'Experienced Teachers',
    description: 'Dedicated faculty with years of experience and passion for teaching.'
  },
  {
    id: '3',
    icon: '🏆',
    title: 'Sports & Athletics',
    description: 'State-of-the-art sports facilities and competitive athletic programs.'
  },
  {
    id: '4',
    icon: '🎨',
    title: 'Arts & Culture',
    description: 'Rich arts programs including music, drama, and visual arts.'
  },
  {
    id: '5',
    icon: '💻',
    title: 'Computer Labs',
    description: 'Modern computer labs with latest technology and software.'
  },
  {
    id: '6',
    icon: '🔬',
    title: 'Science Labs',
    description: 'Well-equipped science laboratories for hands-on learning.'
  },
  {
    id: '7',
    icon: '📖',
    title: 'Library',
    description: 'Extensive library with thousands of books and digital resources.'
  },
  {
    id: '8',
    icon: '🚌',
    title: 'Transport',
    description: 'Safe and reliable transport service covering all major routes.'
  }
]

// ============================================
// FEATURE CARD COMPONENT
// ============================================

interface FeatureCardProps {
  feature: Feature
  index: number
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  // Different gradient colors based on index
  const getGradient = (i: number): string => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-green-500 to-teal-500',
      'from-purple-500 to-pink-500',
      'from-yellow-500 to-orange-500',
      'from-red-500 to-pink-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-green-500',
      'from-orange-500 to-red-500'
    ]
    return gradients[i % gradients.length]
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group">
      {/* Icon with gradient background */}
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getGradient(index)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <span className="text-3xl">{feature.icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Learn more link (optional) */}
      <div className="mt-4 text-green-600 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
        <span>Learn more</span>
        <span className="ml-1">→</span>
      </div>
    </div>
  )
}

// ============================================
// FEATURES GRID COMPONENT
// ============================================

export function Features({
  title = 'Why Choose Ghazali High School?',
  subtitle = 'We provide quality education with modern facilities and experienced faculty to nurture future leaders.',
  features = DEFAULT_FEATURES,
  columns = 3,
  className = ''
}: FeaturesProps) {
  // Grid columns class based on columns prop
  const getGridClass = (): string => {
    switch (columns) {
      case 2: return 'md:grid-cols-2'
      case 3: return 'md:grid-cols-2 lg:grid-cols-3'
      case 4: return 'md:grid-cols-2 lg:grid-cols-4'
      default: return 'md:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 ${getGridClass()} gap-6`}>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <a
            href="/about"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <span>View all features</span>
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// SIMPLE FEATURES (Minimal Version)
// ============================================

export function SimpleFeatures({
  features = DEFAULT_FEATURES.slice(0, 4)
}: {
  features?: Feature[]
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {features.map(feature => (
        <div key={feature.id} className="bg-white rounded-lg border border-gray-200 p-3 text-center">
          <div className="text-2xl mb-1">{feature.icon}</div>
          <h4 className="text-xs font-medium text-gray-900">{feature.title}</h4>
        </div>
      ))}
    </div>
  )
}

// ============================================
// FEATURE WITH STATS
// ============================================

export interface FeatureWithStatsProps {
  features?: Feature[]
  stats?: Array<{ label: string; value: string; icon: string }>
}

export function FeatureWithStats({
  features = DEFAULT_FEATURES.slice(0, 4),
  stats = [
    { label: 'Students', value: '1000+', icon: '👥' },
    { label: 'Teachers', value: '85+', icon: '👨‍🏫' },
    { label: 'Classes', value: '30+', icon: '📚' },
    { label: 'Years', value: '25+', icon: '🎓' }
  ]
}: FeatureWithStatsProps) {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {features.map(feature => (
          <div key={feature.id} className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl mb-1">{feature.icon}</div>
            <h4 className="text-sm font-medium text-gray-900">{feature.title}</h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// HIGHLIGHTED FEATURE
// ============================================

export interface HighlightedFeatureProps {
  feature: Feature
  reverse?: boolean
}

export function HighlightedFeature({ feature, reverse = false }: HighlightedFeatureProps) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 bg-white rounded-xl border border-gray-200 p-6`}>
      {/* Icon */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-4xl shrink-0">
        {feature.icon}
      </div>

      {/* Content */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
        
        {/* Feature points */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-green-500 mr-2">✓</span>
            Quality assured
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-green-500 mr-2">✓</span>
            Expert teachers
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-green-500 mr-2">✓</span>
            Modern facilities
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-green-500 mr-2">✓</span>
            Proven results
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// FEATURES SKELETON LOADER
// ============================================

export function FeaturesSkeleton() {
  return (
    <div className="py-16 bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 max-w-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// FEATURES CAROUSEL (Simple)
// ============================================

export function FeaturesCarousel({ features = DEFAULT_FEATURES.slice(0, 4) }: { features?: Feature[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  if (features.length === 0) return null

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 p-6">
      {/* Current Feature */}
      <div className="text-center">
        <div className="text-5xl mb-3">{features[currentIndex].icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{features[currentIndex].title}</h3>
        <p className="text-gray-600">{features[currentIndex].description}</p>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to feature ${index + 1}`}
          />
        ))}
      </div>

      {/* Prev/Next Buttons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50"
        aria-label="Previous feature"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50"
        aria-label="Next feature"
      >
        →
      </button>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  Features,
  SimpleFeatures,
  FeatureWithStats,
  HighlightedFeature,
  FeaturesCarousel,
  FeaturesSkeleton
}