'use client'

import React, { useState } from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  category?: string
}

export interface GalleryProps {
  title?: string
  subtitle?: string
  images?: GalleryImage[]
  columns?: 2 | 3 | 4
  showCategories?: boolean
  className?: string
}

// ============================================
// DEFAULT GALLERY IMAGES
// ============================================

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500',
    alt: 'School building',
    title: 'Our School',
    category: 'campus'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500',
    alt: 'Students in classroom',
    title: 'Classroom Learning',
    category: 'academics'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500',
    alt: 'Sports day',
    title: 'Sports Day',
    category: 'sports'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
    alt: 'Library',
    title: 'School Library',
    category: 'facilities'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=500',
    alt: 'Science lab',
    title: 'Science Lab',
    category: 'facilities'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500',
    alt: 'Cultural event',
    title: 'Cultural Day',
    category: 'events'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500',
    alt: 'Computer lab',
    title: 'Computer Lab',
    category: 'facilities'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500',
    alt: 'Graduation',
    title: 'Graduation Ceremony',
    category: 'events'
  }
]

// ============================================
// LIGHTBOX COMPONENT
// ============================================

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Previous button */}
      <button
        onClick={onPrev}
        className="absolute left-4 text-white text-4xl hover:text-gray-300 z-10"
        aria-label="Previous image"
      >
        ←
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        className="absolute right-4 text-white text-4xl hover:text-gray-300 z-10"
        aria-label="Next image"
      >
        →
      </button>

      {/* Image */}
      <div className="max-w-5xl max-h-[80vh] px-4">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="w-full h-full object-contain"
        />
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
          <h3 className="text-lg font-semibold">{currentImage.title}</h3>
          {currentImage.category && (
            <p className="text-sm opacity-75">{currentImage.category}</p>
          )}
          <p className="text-xs mt-1">{currentIndex + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// GALLERY IMAGE CARD
// ============================================

interface GalleryCardProps {
  image: GalleryImage
  onClick: () => void
}

function GalleryCard({ image, onClick }: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square"
    >
      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className="text-sm font-semibold">{image.title}</h3>
          {image.category && (
            <p className="text-xs opacity-75">{image.category}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// CATEGORY FILTER
// ============================================

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 text-sm rounded-full transition-colors ${
          activeCategory === 'all'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 text-sm rounded-full capitalize transition-colors ${
            activeCategory === category
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

// ============================================
// MAIN GALLERY COMPONENT
// ============================================

export function Gallery({
  title = 'School Gallery',
  subtitle = 'Take a look at our campus, events, and activities',
  images = DEFAULT_IMAGES,
  columns = 3,
  showCategories = true,
  className = ''
}: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = images.map(img => img.category).filter(Boolean) as string[]
    return [...new Set(cats)]
  }, [images])

  // Filter images by category
  const filteredImages = React.useMemo(() => {
    if (activeCategory === 'all') return images
    return images.filter(img => img.category === activeCategory)
  }, [images, activeCategory])

  // Grid columns class
  const getGridClass = (): string => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2'
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  // Lightbox navigation
  const handleNext = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length)
  }

  const handlePrev = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex(
      (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
    )
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Category Filter */}
        {showCategories && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        {/* Image Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No images found in this category</p>
          </div>
        ) : (
          <div className={`grid ${getGridClass()} gap-4`}>
            {filteredImages.map((image, index) => (
              <GalleryCard
                key={image.id}
                image={image}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        )}

        {/* View More Link */}
        <div className="text-center mt-8">
          <a
            href="/gallery"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <span>View full gallery</span>
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  )
}

// ============================================
// SIMPLE GALLERY (Minimal Version)
// ============================================

export function SimpleGallery({
  images = DEFAULT_IMAGES.slice(0, 4)
}: {
  images?: GalleryImage[]
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map(image => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className="w-full h-24 object-cover rounded-lg"
        />
      ))}
    </div>
  )
}

// ============================================
// GALLERY GRID (No Lightbox)
// ============================================

export function GalleryGrid({
  images = DEFAULT_IMAGES,
  columns = 3
}: {
  images?: GalleryImage[]
  columns?: 2 | 3 | 4
}) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }[columns]

  return (
    <div className={`grid ${gridClass} gap-2`}>
      {images.map(image => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className="w-full aspect-square object-cover rounded-lg"
        />
      ))}
    </div>
  )
}

// ============================================
// GALLERY CAROUSEL
// ============================================

export function GalleryCarousel({ images = DEFAULT_IMAGES.slice(0, 5) }: { images?: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) return null

  return (
    <div className="relative rounded-lg overflow-hidden">
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="w-full h-64 object-cover"
      />
      
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
      >
        →
      </button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ============================================
// GALLERY SKELETON LOADER
// ============================================

export function GallerySkeleton() {
  return (
    <div className="py-16 bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-96 max-w-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  Gallery,
  SimpleGallery,
  GalleryGrid,
  GalleryCarousel,
  GallerySkeleton
}