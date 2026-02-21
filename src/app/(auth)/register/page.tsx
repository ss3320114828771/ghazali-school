'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ============================================
// SIMPLE TYPES
// ============================================

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: 'student' | 'teacher' | 'parent' | 'admin'
  acceptTerms: boolean
}

// ============================================
// REGISTER PAGE COMPONENT
// ============================================

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    acceptTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Step 1 validation
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
        newErrors.email = 'Invalid email format'
      }
    }

    // Step 2 validation
    if (currentStep === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    // Step 3 validation
    if (currentStep === 3) {
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next step
  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    // Simulate registration API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful registration
      console.log('Registration data:', formData)
      
      // Store user info (mock)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', formData.email)
      localStorage.setItem('userName', formData.name)
      localStorage.setItem('userRole', formData.role)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setErrors({ form: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  // Get step title
  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Personal Information'
      case 2: return 'Security'
      case 3: return 'Terms & Conditions'
      default: return 'Register'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-teal-700 flex items-center justify-center p-4">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full opacity-20"></div>
      </div>

      {/* Register Card */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl mx-auto mb-3 flex items-center justify-center transform rotate-45">
            <span className="text-white text-xl font-bold transform -rotate-45">GHS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Join Ghazali High School</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex-1 flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step === currentStep 
                  ? 'bg-green-600 text-white' 
                  : step < currentStep 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }
              `}>
                {step < currentStep ? '✓' : step}
              </div>
              {step < 3 && (
                <div className={`
                  flex-1 h-1 mx-2
                  ${step < currentStep ? 'bg-green-600' : 'bg-gray-200'}
                `}></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{getStepTitle()}</h2>

        {/* Form Error */}
        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.form}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  I am a <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isLoading}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </>
          )}

          {/* Step 2: Security */}
          {currentStep === 2 && (
            <>
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>

              <p className="text-xs text-gray-500">
                Password must be at least 6 characters long
              </p>
            </>
          )}

          {/* Step 3: Terms & Conditions */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg h-48 overflow-y-auto text-sm text-gray-600">
                <h3 className="font-bold text-gray-800 mb-2">Terms and Conditions</h3>
                <p className="mb-2">
                  Welcome to Ghazali High School. By registering, you agree to comply with our policies.
                </p>
                <p className="mb-2">
                  1. You will provide accurate and complete information.
                </p>
                <p className="mb-2">
                  2. You are responsible for maintaining the confidentiality of your account.
                </p>
                <p className="mb-2">
                  3. The school may contact you via email or phone regarding important updates.
                </p>
                <p className="mb-2">
                  4. You agree to follow the school's code of conduct and policies.
                </p>
                <p className="mb-2">
                  5. The school reserves the right to modify or terminate services with notice.
                </p>
              </div>

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I accept the terms and conditions <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-xs text-red-600">{errors.acceptTerms}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                disabled={isLoading}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            )}
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-green-600 font-medium hover:text-green-700">
              Sign in
            </Link>
          </p>
        </div>

        {/* School Info */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Ghazali High School • Adlana, Bhawana, Chiniot
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Principal: Hafiz Sajid Syed • 📞 0308-4591993
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SIMPLE REGISTER FORM (Standalone)
// ============================================

export function SimpleRegisterForm({
  onSuccess,
  onError
}: {
  onSuccess?: () => void
  onError?: (error: string) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (name && email && password) {
      onSuccess?.()
    } else {
      onError?.('Please fill all fields')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="w-full px-3 py-2 border border-gray-300 rounded"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-300 rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-300 rounded"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Register'}
      </button>
    </form>
  )
}

// ============================================
// REGISTER PAGE SKELETON
// ============================================

export function RegisterSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-pulse">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>

        <div className="flex justify-between mb-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              {i < 3 && <div className="flex-1 h-1 bg-gray-200 mx-2"></div>}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}