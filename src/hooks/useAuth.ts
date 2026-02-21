'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  avatar?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setLoading(true)
      // Check local storage for user data (mock implementation)
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (err) {
      setError('Failed to check authentication')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: '1',
        name: 'Hafiz Sajid Syed',
        email: email,
        role: 'admin'
      }
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      return { success: true }
    } catch (err) {
      setError('Login failed')
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const register = async (userData: any) => {
    try {
      setLoading(true)
      // Mock registration - replace with actual API call
      const mockUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role
      }
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      return { success: true }
    } catch (err) {
      setError('Registration failed')
      return { success: false, error: 'Registration failed' }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user
  }
}