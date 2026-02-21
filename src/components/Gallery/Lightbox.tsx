'use client'

import React, { useEffect } from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface LightboxImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

export interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  showCaptions?: boolean
  showCounter?: boolean
  className?: string
}

// ============================================
// LIGHTBOX HEADER
// ============================================

interface HeaderProps {
  currentIndex: number
  totalImages: number
  onClose: () => void
  showCounter: boolean
}

function Header({ currentIndex, totalImages, onClose, showCounter }: HeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
      {showCounter ? (
        <span className="text-white text-sm">
          {currentIndex + 1} / {totalImages}
        </span>
      ) : (
        <div></div>
      )}
      <button
        onClick={onClose}
        className="w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Close lightbox"
      >
        ✕
      </button>
    </div>
  )
}

// ============================================
// LIGHTBOX FOOTER
// ============================================

interface FooterProps {
  title?: string
  description?: string
  showCaptions: boolean
}

function Footer({ title, description, showCaptions }: FooterProps) {
  if (!showCaptions || (!title && !description)) return null

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/50 to-transparent text-white">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {description && <p className="text-sm opacity-90">{description}</p>}
    </div>
  )
}

// ============================================
// LIGHTBOX ARROWS
// ============================================

interface ArrowsProps {
  onPrev?: () => void
  onNext?: () => void
  hasMultiple: boolean
}

function Arrows({ onPrev, onNext, hasMultiple }: ArrowsProps) {
  if (!hasMultiple) return null

  return (
    <>
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Previous image"
        >
          ←
        </button>
      )}
      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Next image"
        >
          →
        </button>
      )}
    </>
  )
}

// ============================================
// MAIN LIGHTBOX COMPONENT
// ============================================

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  showCaptions = true,
  showCounter = true,
  className = ''
}: LightboxProps) {
  const currentImage = images[currentIndex]

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (onPrev) onPrev()
          break
        case 'ArrowRight':
          if (onNext) onNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onPrev, onNext])

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!currentImage) return null

  const hasMultiple = images.length > 1

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Main content */}
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        {/* Header */}
        <Header
          currentIndex={currentIndex}
          totalImages={images.length}
          onClose={onClose}
          showCounter={showCounter}
        />

        {/* Image */}
        <div className="max-w-7xl max-h-[80vh] px-4">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Footer */}
        <Footer
          title={currentImage.title}
          description={currentImage.description}
          showCaptions={showCaptions}
        />

        {/* Navigation Arrows */}
        <Arrows
          onPrev={onPrev}
          onNext={onNext}
          hasMultiple={hasMultiple}
        />
      </div>
    </div>
  )
}

// ============================================
// SIMPLE LIGHTBOX (Minimal Version)
// ============================================

export function SimpleLightbox({
  src,
  alt,
  onClose
}: {
  src: string
  alt: string
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
      >
        ✕
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] object-contain"
      />
    </div>
  )
}

// ============================================
// LIGHTBOX GALLERY (With thumbnails)
// ============================================

export function LightboxGallery({
  images,
  initialIndex = 0,
  onClose
}: {
  images: LightboxImage[]
  initialIndex?: number
  onClose: () => void
}) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Lightbox
      images={images}
      currentIndex={currentIndex}
      onClose={onClose}
      onNext={handleNext}
      onPrev={handlePrev}
      showCaptions={true}
      showCounter={true}
    />
  )
}

// ============================================
// LIGHTBOX SKELETON LOADER
// ============================================

export function LightboxSkeleton() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center animate-pulse">
      <div className="w-96 h-96 bg-gray-700 rounded-lg"></div>
    </div>
  )
}

// ============================================
// CUSTOM HOOK FOR LIGHTBOX
// ============================================

export function useLightbox() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [images, setImages] = React.useState<LightboxImage[]>([])

  const openLightbox = (imageIndex: number, imageList: LightboxImage[]) => {
    setImages(imageList)
    setCurrentIndex(imageIndex)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
    setImages([])
    setCurrentIndex(0)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return {
    isOpen,
    currentIndex,
    images,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage
  }
}

// ============================================
// LIGHTBOX PROVIDER (Context for global usage)
// ============================================

interface LightboxContextType {
  openLightbox: (imageIndex: number, images: LightboxImage[]) => void
  closeLightbox: () => void
}

const LightboxContext = React.createContext<LightboxContextType | undefined>(undefined)

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [images, setImages] = React.useState<LightboxImage[]>([])

  const openLightbox = (imageIndex: number, imageList: LightboxImage[]) => {
    setImages(imageList)
    setCurrentIndex(imageIndex)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      {isOpen && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </LightboxContext.Provider>
  )
}

export function useLightboxContext() {
  const context = React.useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightboxContext must be used within LightboxProvider')
  }
  return context
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  Lightbox,
  SimpleLightbox,
  LightboxGallery,
  LightboxSkeleton,
  useLightbox,
  LightboxProvider,
  useLightboxContext
}