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
  date?: string
}

export interface GalleryGridProps {
  images?: GalleryImage[]
  columns?: 2 | 3 | 4 | 5 | 6
  gap?: 'sm' | 'md' | 'lg'
  aspect?: 'square' | 'video' | 'portrait' | 'auto'
  showTitles?: boolean
  showCategories?: boolean
  onClick?: (image: GalleryImage) => void
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
    title: 'School Building',
    category: 'campus',
    date: '2024'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500',
    alt: 'Students in classroom',
    title: 'Classroom Learning',
    category: 'academics',
    date: '2024'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500',
    alt: 'Sports day',
    title: 'Sports Day',
    category: 'sports',
    date: '2024'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
    alt: 'Library',
    title: 'School Library',
    category: 'facilities',
    date: '2024'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=500',
    alt: 'Science lab',
    title: 'Science Lab',
    category: 'facilities',
    date: '2024'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500',
    alt: 'Cultural event',
    title: 'Cultural Day',
    category: 'events',
    date: '2024'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500',
    alt: 'Computer lab',
    title: 'Computer Lab',
    category: 'facilities',
    date: '2024'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500',
    alt: 'Graduation',
    title: 'Graduation Ceremony',
    category: 'events',
    date: '2024'
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

const getGridClass = (columns: number): string => {
  switch (columns) {
    case 2: return 'grid-cols-2'
    case 3: return 'grid-cols-3'
    case 4: return 'grid-cols-4'
    case 5: return 'grid-cols-5'
    case 6: return 'grid-cols-6'
    default: return 'grid-cols-3'
  }
}

const getGapClass = (gap: string): string => {
  switch (gap) {
    case 'sm': return 'gap-2'
    case 'md': return 'gap-4'
    case 'lg': return 'gap-6'
    default: return 'gap-4'
  }
}

const getAspectClass = (aspect: string): string => {
  switch (aspect) {
    case 'square': return 'aspect-square'
    case 'video': return 'aspect-video'
    case 'portrait': return 'aspect-[3/4]'
    case 'auto': return ''
    default: return 'aspect-square'
  }
}

// ============================================
// GALLERY ITEM COMPONENT
// ============================================

interface GalleryItemProps {
  image: GalleryImage
  aspect: string
  showTitle: boolean
  showCategory: boolean
  onClick?: (image: GalleryImage) => void
}

function GalleryItem({ image, aspect, showTitle, showCategory, onClick }: GalleryItemProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick(image)
    }
  }

  const aspectClass = getAspectClass(aspect)

  return (
    <div
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-lg cursor-pointer ${aspectClass}`}
    >
      {/* Image */}
      {!hasError ? (
        <img
          src={image.src}
          alt={image.alt}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-4xl">🖼️</span>
        </div>
      )}

      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          {showTitle && image.title && (
            <h3 className="text-sm font-semibold">{image.title}</h3>
          )}
          {showCategory && image.category && (
            <p className="text-xs opacity-80 capitalize">{image.category}</p>
          )}
          {image.date && (
            <p className="text-xs opacity-60 mt-1">{image.date}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN GALLERY GRID COMPONENT
// ============================================

export function GalleryGrid({
  images = DEFAULT_IMAGES,
  columns = 3,
  gap = 'md',
  aspect = 'square',
  showTitles = true,
  showCategories = true,
  onClick,
  className = ''
}: GalleryGridProps) {
  const gridClass = getGridClass(columns)
  const gapClass = getGapClass(gap)

  if (images.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No images to display</p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridClass} ${gapClass} ${className}`}>
      {images.map(image => (
        <GalleryItem
          key={image.id}
          image={image}
          aspect={aspect}
          showTitle={showTitles}
          showCategory={showCategories}
          onClick={onClick}
        />
      ))}
    </div>
  )
}

// ============================================
// SIMPLE GRID (No overlays)
// ============================================

export function SimpleGrid({
  images = DEFAULT_IMAGES.slice(0, 4),
  columns = 2
}: {
  images?: GalleryImage[]
  columns?: 2 | 3 | 4
}) {
  const gridClass = getGridClass(columns)

  return (
    <div className={`grid ${gridClass} gap-2`}>
      {images.map(image => (
        <div key={image.id} className="aspect-square">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}

// ============================================
// GALLERY GRID WITH CATEGORIES
// ============================================

export function GalleryGridWithCategories({
  images = DEFAULT_IMAGES
}: {
  images?: GalleryImage[]
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = images.map(img => img.category).filter(Boolean) as string[]
    return ['all', ...new Set(cats)]
  }, [images])

  // Filter images by category
  const filteredImages = React.useMemo(() => {
    if (selectedCategory === 'all') return images
    return images.filter(img => img.category === selectedCategory)
  }, [images, selectedCategory])

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <GalleryGrid
        images={filteredImages}
        columns={3}
        onClick={(img) => console.log('Clicked:', img)}
      />
    </div>
  )
}

// ============================================
// GALLERY GRID SKELETON
// ============================================

export function GalleryGridSkeleton({
  count = 6,
  columns = 3
}: {
  count?: number
  columns?: 2 | 3 | 4
}) {
  const gridClass = getGridClass(columns)

  return (
    <div className={`grid ${gridClass} gap-4 animate-pulse`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  )
}

// ============================================
// GALLERY GRID PRESETS
// ============================================

export const GalleryPresets = {
  // Campus images
  campus: DEFAULT_IMAGES.filter(img => img.category === 'campus'),
  
  // Academics images
  academics: DEFAULT_IMAGES.filter(img => img.category === 'academics'),
  
  // Sports images
  sports: DEFAULT_IMAGES.filter(img => img.category === 'sports'),
  
  // Facilities images
  facilities: DEFAULT_IMAGES.filter(img => img.category === 'facilities'),
  
  // Events images
  events: DEFAULT_IMAGES.filter(img => img.category === 'events'),
  
  // Recent images (first 4)
  recent: DEFAULT_IMAGES.slice(0, 4)
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  GalleryGrid,
  SimpleGrid,
  GalleryGridWithCategories,
  GalleryGridSkeleton,
  GalleryPresets
}