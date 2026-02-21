'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ============================================
// SIMPLE TYPES
// ============================================

export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

// ============================================
// LOGIN PAGE COMPONENT
// ============================================

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user types
    if (error) setError('')
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    // Simulate login API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful login
      // In real app, you would validate credentials with backend
      if (formData.email === 'admin@ghazali.edu.pk' && formData.password === 'password') {
        // Store auth token (mock)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', formData.email)
        
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-teal-700 flex items-center justify-center p-4">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full opacity-20"></div>
      </div>

      {/* Login Card */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center transform rotate-45">
            <span className="text-white text-2xl font-bold transform -rotate-45">GHS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@ghazali.edu.pk"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-green-600 hover:text-green-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-green-600 font-medium hover:text-green-700">
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-500 mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-gray-600">
            <p><span className="font-medium">Admin:</span> admin@ghazali.edu.pk / password</p>
            <p><span className="font-medium">Teacher:</span> teacher@ghazali.edu.pk / password</p>
            <p><span className="font-medium">Student:</span> student@ghazali.edu.pk / password</p>
          </div>
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
// SIMPLE LOGIN FORM (Standalone)
// ============================================

export function SimpleLoginForm({
  onSuccess,
  onError
}: {
  onSuccess?: () => void
  onError?: (error: string) => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email && password) {
      onSuccess?.()
    } else {
      onError?.('Please enter email and password')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}

// ============================================
// LOGIN PAGE SKELETON
// ============================================

export function LoginSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-pulse">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
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