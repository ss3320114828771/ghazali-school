'use client'

import { useState, useRef } from 'react'

// ============================================
// SUPER SIMPLE - NO COMPLEX TYPES
// ============================================

export function useFade() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const show = () => {
    setIsVisible(true)
    if (ref.current) {
      ref.current.style.opacity = '1'
      ref.current.style.transition = 'opacity 0.3s ease'
    }
  }

  const hide = () => {
    setIsVisible(false)
    if (ref.current) {
      ref.current.style.opacity = '0'
    }
  }

  return { ref, isVisible, show, hide }
}

// ============================================
// SLIDE ANIMATION
// ============================================

export function useSlide() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const slideDown = () => {
    setIsOpen(true)
    if (ref.current) {
      ref.current.style.transform = 'translateY(0)'
      ref.current.style.transition = 'transform 0.3s ease'
    }
  }

  const slideUp = () => {
    setIsOpen(false)
    if (ref.current) {
      ref.current.style.transform = 'translateY(-100%)'
    }
  }

  return { ref, isOpen, slideDown, slideUp }
}

// ============================================
// SCALE ANIMATION
// ============================================

export function useScale() {
  const [isScaled, setIsScaled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const scaleIn = () => {
    setIsScaled(true)
    if (ref.current) {
      ref.current.style.transform = 'scale(1)'
      ref.current.style.transition = 'transform 0.3s ease'
    }
  }

  const scaleOut = () => {
    setIsScaled(false)
    if (ref.current) {
      ref.current.style.transform = 'scale(0)'
    }
  }

  return { ref, isScaled, scaleIn, scaleOut }
}

// ============================================
// BOUNCE ANIMATION
// ============================================

export function useBounce() {
  const ref = useRef<HTMLDivElement>(null)

  const bounce = () => {
    if (ref.current) {
      ref.current.style.transform = 'translateY(0)'
      ref.current.style.animation = 'bounce 0.5s ease'
      
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.animation = ''
        }
      }, 500)
    }
  }

  return { ref, bounce }
}

// ============================================
// PULSE ANIMATION
// ============================================

export function usePulse() {
  const ref = useRef<HTMLDivElement>(null)

  const pulse = () => {
    if (ref.current) {
      ref.current.style.animation = 'pulse 1s ease'
      
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.animation = ''
        }
      }, 1000)
    }
  }

  return { ref, pulse }
}

// ============================================
// COUNT ANIMATION
// ============================================

export function useCount() {
  const [count, setCount] = useState(0)

  const startCounting = (end: number, duration: number = 1000) => {
    let start = 0
    const step = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }

  return { count, startCounting }
}

// ============================================
// TYPING ANIMATION
// ============================================

export function useTyping() {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const typeText = (fullText: string, speed: number = 50) => {
    setIsTyping(true)
    let i = 0
    setText('')

    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(prev => prev + fullText[i])
        i++
      } else {
        clearInterval(timer)
        setIsTyping(false)
      }
    }, speed)

    return () => clearInterval(timer)
  }

  return { text, isTyping, typeText }
}

// ============================================
// HOVER ANIMATION
// ============================================

export function useHover() {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (ref.current) {
      ref.current.style.transform = 'scale(1.05)'
      ref.current.style.transition = 'transform 0.2s ease'
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (ref.current) {
      ref.current.style.transform = 'scale(1)'
    }
  }

  return { ref, isHovered, handleMouseEnter, handleMouseLeave }
}

// ============================================
// LOADING ANIMATION
// ============================================

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return { isLoading, startLoading, stopLoading }
}

// ============================================
// CSS TO ADD TO GLOBAL.CSS
// ============================================

/*

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

*/

// ============================================
// EXPORT ALL
// ============================================

export default {
  useFade,
  useSlide,
  useScale,
  useBounce,
  usePulse,
  useCount,
  useTyping,
  useHover,
  useLoading
}