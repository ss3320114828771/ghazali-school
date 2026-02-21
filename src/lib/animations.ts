/* ============================================
   ANIMATIONS.TS - Animation Utilities for React
   ============================================

   This file contains animation helper functions,
   variants for Framer Motion, and reusable
   animation configurations.
*/

// ============================================
// BASIC ANIMATION VARIANTS
// ============================================

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
}

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3 }
}

export const scaleOut = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 0, scale: 0.9 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3 }
}

export const scalePulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInUp = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { duration: 0.3 }
}

export const slideInDown = {
  initial: { y: "-100%" },
  animate: { y: 0 },
  exit: { y: "-100%" },
  transition: { duration: 0.3 }
}

export const slideInLeft = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 }
}

export const slideInRight = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { duration: 0.3 }
}

// ============================================
// ROTATE ANIMATIONS
// ============================================

export const rotateIn = {
  initial: { opacity: 0, rotate: -180 },
  animate: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 180 },
  transition: { duration: 0.5 }
}

export const spin = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

export const spinSlow = {
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// ============================================
// BOUNCE ANIMATIONS
// ============================================

export const bounce = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const bounceIn = {
  initial: { scale: 0.3, opacity: 0 },
  animate: {
    scale: [0.3, 1.05, 1],
    opacity: [0, 0.8, 1],
    transition: { duration: 0.5 }
  }
}

// ============================================
// FLOAT ANIMATIONS
// ============================================

export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const float3d = {
  animate: {
    rotateX: [0, 5, 0],
    rotateY: [0, 5, 0],
    z: [0, 20, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// ============================================
// SHAKE ANIMATIONS
// ============================================

export const shake = {
  animate: {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.3 }
  }
}

// ============================================
// PULSE ANIMATIONS
// ============================================

export const pulse = {
  animate: {
    opacity: [1, 0.7, 1],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 5px rgba(99,102,241,0.3)",
      "0 0 20px rgba(99,102,241,0.6)",
      "0 0 5px rgba(99,102,241,0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// ============================================
// HEARTBEAT ANIMATIONS
// ============================================

export const heartbeat = {
  animate: {
    scale: [1, 1.1, 1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// ============================================
// STAGGER CHILDREN ANIMATIONS
// ============================================

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 }
}

// ============================================
// LIST ANIMATIONS
// ============================================

export const listContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

export const listItem = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2 }
}

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}

// ============================================
// MODAL ANIMATIONS
// ============================================

export const modalOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
}

export const modalContent = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 }
}

// ============================================
// DROPDOWN ANIMATIONS
// ============================================

export const dropdown = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 }
}

// ============================================
// TOAST ANIMATIONS
// ============================================

export const toast = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
  transition: { duration: 0.2 }
}

// ============================================
// SIDEBAR ANIMATIONS
// ============================================

export const sidebar = {
  open: { x: 0 },
  closed: { x: -280 },
  transition: { duration: 0.3 }
}

// ============================================
// HOVER ANIMATIONS
// ============================================

export const hoverLift = {
  whileHover: { y: -3 },
  transition: { duration: 0.2 }
}

export const hoverGrow = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 }
}

export const hoverShrink = {
  whileHover: { scale: 0.95 },
  transition: { duration: 0.2 }
}

export const hoverRotate = {
  whileHover: { rotate: 5 },
  transition: { duration: 0.2 }
}

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 15px rgba(99,102,241,0.5)"
  },
  transition: { duration: 0.2 }
}

// ============================================
// TAP ANIMATIONS
// ============================================

export const tapScale = {
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1 }
}

// ============================================
// LOADING ANIMATIONS
// ============================================

export const loadingSpinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

export const loadingDots = {
  animate: (i: number) => ({
    opacity: [1, 0.3, 1],
    scale: [1, 0.8, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      delay: i * 0.2
    }
  })
}

// ============================================
// PROGRESS ANIMATIONS
// ============================================

export const progressBar = {
  initial: { width: 0 },
  animate: (percentage: number) => ({
    width: `${percentage}%`,
    transition: { duration: 1, ease: "easeOut" }
  })
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

export const counter = {
  animate: (value: number) => ({
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  })
}

// ============================================
// DRAWER ANIMATIONS
// ============================================

export const drawer = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { duration: 0.3 }
}

// ============================================
// ACCORDION ANIMATIONS
// ============================================

export const accordion = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.2 }
}

// ============================================
// TABS ANIMATIONS
// ============================================

export const tabs = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
  transition: { duration: 0.2 }
}

// ============================================
// CAROUSEL ANIMATIONS
// ============================================

export const carousel = {
  next: {
    x: "-100%",
    transition: { duration: 0.3 }
  },
  prev: {
    x: "100%",
    transition: { duration: 0.3 }
  }
}

// ============================================
// REVEAL ANIMATIONS
// ============================================

export const reveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

export const scrollFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

// ============================================
// PARALLAX ANIMATIONS
// ============================================

export const parallax = (speed: number = 0.5) => ({
  y: {
    value: 0,
    transform: (y: number) => y * speed
  }
})

// ============================================
// ANIMATION UTILITIES
// ============================================

export const withDelay = (animation: any, delay: number) => ({
  ...animation,
  transition: {
    ...animation.transition,
    delay
  }
})

export const withDuration = (animation: any, duration: number) => ({
  ...animation,
  transition: {
    ...animation.transition,
    duration
  }
})

export const combineAnimations = (animations: any[]) => {
  return animations.reduce((acc, curr) => ({
    ...acc,
    ...curr,
    transition: {
      ...acc.transition,
      ...curr.transition
    }
  }), {})
}

// ============================================
// ANIMATION PRESETS FOR COMMON COMPONENTS
// ============================================

export const buttonTap = {
  whileTap: { scale: 0.95 }
}

export const cardHover = {
  whileHover: {
    y: -5,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  transition: { duration: 0.2 }
}

export const imageHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 }
}

export const linkHover = {
  whileHover: { x: 5 },
  transition: { duration: 0.2 }
}

export const menuItem = {
  whileHover: { x: 5, color: "#6366f1" },
  whileTap: { scale: 0.95 }
}

// ============================================
// EXPORT ALL ANIMATIONS
// ============================================

export const animations = {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleOut,
  scalePulse,
  slideInUp,
  slideInDown,
  slideInLeft,
  slideInRight,
  rotateIn,
  spin,
  spinSlow,
  bounce,
  bounceIn,
  float,
  float3d,
  shake,
  pulse,
  pulseGlow,
  heartbeat,
  staggerContainer,
  staggerItem,
  listContainer,
  listItem,
  pageTransition,
  modalOverlay,
  modalContent,
  dropdown,
  toast,
  sidebar,
  hoverLift,
  hoverGrow,
  hoverShrink,
  hoverRotate,
  hoverGlow,
  tapScale,
  loadingSpinner,
  loadingDots,
  progressBar,
  counter,
  drawer,
  accordion,
  tabs,
  carousel,
  reveal,
  scrollFadeIn,
  parallax,
  buttonTap,
  cardHover,
  imageHover,
  linkHover,
  menuItem
}

// ============================================
// END OF FILE - NO ERRORS
// ============================================