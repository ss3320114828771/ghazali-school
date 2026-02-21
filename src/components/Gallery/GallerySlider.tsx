'use client'

import React, { useState, useEffect } from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

export interface GallerySliderProps {
  images?: GalleryImage[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  showCaptions?: boolean
  height?: string
  className?: string
}

// ============================================
// DEFAULT SLIDER IMAGES
// ============================================

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    alt: 'School building',
    title: 'Our School Campus',
    description: 'Beautiful campus with modern facilities'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
    alt: 'Students in classroom',
    title: 'Classroom Learning',
    description: 'Engaged students in interactive learning'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    alt: 'Sports day',
    title: 'Sports Day',
    description: 'Annual sports competition'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    alt: 'Library',
    title: 'School Library',
    description: 'Quiet reading and research space'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800',
    alt: 'Science lab',
    title: 'Science Laboratory',
    description: 'Hands-on experiments and learning'
  }
]

// ============================================
// SLIDER ARROW BUTTONS
// ============================================

interface ArrowProps {
  direction: 'left' | 'right'
  onClick: () => void
}

function Arrow({ direction, onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all"
      style={{ [direction]: '1rem' }}
      aria-label={`${direction} slide`}
    >
      {direction === 'left' ? '←' : '→'}
    </button>
  )
}

// ============================================
// SLIDER DOTS INDICATOR
// ============================================

interface DotsProps {
  total: number
  current: number
  onDotClick: (index: number) => void
}

function Dots({ total, current, onDotClick }: DotsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === current
              ? 'w-6 bg-white'
              : 'bg-white bg-opacity-50 hover:bg-opacity-75'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

// ============================================
// SLIDER CAPTION
// ============================================

interface CaptionProps {
  title?: string
  description?: string
}

function Caption({ title, description }: CaptionProps) {
  if (!title && !description) return null

  return (
    <div className="absolute bottom-16 left-0 right-0 text-center text-white z-10 px-4">
      {title && (
        <h3 className="text-xl md:text-2xl font-bold mb-1 drop-shadow-lg">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm md:text-base drop-shadow-lg opacity-90">
          {description}
        </p>
      )}
    </div>
  )
}

// ============================================
// MAIN SLIDER COMPONENT
// ============================================

export function GallerySlider({
  images = DEFAULT_IMAGES,
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  showCaptions = true,
  height = 'h-96',
  className = ''
}: GallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto play
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [currentIndex, autoPlay, autoPlayInterval])

  // Next slide
  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // Previous slide
  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // Go to specific slide
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  if (images.length === 0) {
    return (
      <div className={`${height} bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">No images to display</p>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <div className={`relative overflow-hidden rounded-lg ${height} ${className}`}>
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      {/* Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <Arrow direction="left" onClick={prevSlide} />
          <Arrow direction="right" onClick={nextSlide} />
        </>
      )}

      {/* Dots */}
      {showDots && images.length > 1 && (
        <Dots
          total={images.length}
          current={currentIndex}
          onDotClick={goToSlide}
        />
      )}

      {/* Caption */}
      {showCaptions && (
        <Caption
          title={currentImage.title}
          description={currentImage.description}
        />
      )}
    </div>
  )
}

// ============================================
// SIMPLE SLIDER (Minimal Version)
// ============================================

export function SimpleSlider({
  images = DEFAULT_IMAGES.slice(0, 3),
  height = 'h-64'
}: {
  images?: GalleryImage[]
  height?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) return null

  return (
    <div className={`relative ${height} rounded-lg overflow-hidden`}>
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="w-full h-full object-cover"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full"
          >
            →
          </button>
        </>
      )}
    </div>
  )
}

// ============================================
// AUTOPLAY SLIDER (Auto only)
// ============================================

export function AutoSlider({
  images = DEFAULT_IMAGES,
  interval = 4000,
  height = 'h-80'
}: {
  images?: GalleryImage[]
  interval?: number
  height?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  if (images.length === 0) return null

  return (
    <div className={`relative ${height} rounded-lg overflow-hidden`}>
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

// ============================================
// THUMBNAIL SLIDER
// ============================================

export function ThumbnailSlider({
  images = DEFAULT_IMAGES,
  height = 'h-96'
}: {
  images?: GalleryImage[]
  height?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="space-y-2">
      {/* Main Image */}
      <div className={`${height} rounded-lg overflow-hidden`}>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-green-500 opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// SLIDER SKELETON LOADER
// ============================================

export function GallerySliderSkeleton({
  height = 'h-96'
}: {
  height?: string
}) {
  return (
    <div className={`${height} bg-gray-200 rounded-lg animate-pulse ${height}`}>
      <div className="w-full h-full bg-gray-300"></div>
    </div>
  )
}

// ============================================
// SLIDER PRESETS
// ============================================

export const SliderPresets = {
  // Campus tour
  campus: DEFAULT_IMAGES.filter((_, i) => i < 3),
  
  // Events
  events: DEFAULT_IMAGES.filter((_, i) => i >= 3 && i < 5),
  
  // Featured
  featured: DEFAULT_IMAGES.slice(0, 4),
  
  // All images
  all: DEFAULT_IMAGES
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  GallerySlider,
  SimpleSlider,
  AutoSlider,
  ThumbnailSlider,
  GallerySliderSkeleton,
  SliderPresets
}