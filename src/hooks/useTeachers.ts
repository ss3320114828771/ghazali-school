'use client'

import { useState, useEffect } from 'react'

// ============================================
// TEACHER TYPES
// ============================================

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  employeeId: string
  qualification: string
  specialization: string
  experience: number
  subjects: string[]
  classes: string[]
  joiningDate: string
  gender: 'male' | 'female'
  isClassTeacher: boolean
  classTeacherOf?: string
  status: 'active' | 'on-leave' | 'resigned'
  salary?: number
  address?: string
  emergencyContact?: string
}

// ============================================
// MOCK TEACHERS DATA
// ============================================

const MOCK_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Prof. Ahmad Raza',
    email: 'ahmad.raza@ghazali.edu.pk',
    phone: '0300-1112233',
    employeeId: 'T-101',
    qualification: 'M.Sc Mathematics',
    specialization: 'Pure Mathematics',
    experience: 10,
    subjects: ['Mathematics', 'Physics'],
    classes: ['10-A', '10-B', '9-A'],
    joiningDate: '2014-03-01',
    gender: 'male',
    isClassTeacher: true,
    classTeacherOf: '10-A',
    status: 'active',
    salary: 75000,
    address: 'Street 1, Adlana, Bhawana',
    emergencyContact: '0300-1112234'
  },
  {
    id: '2',
    name: 'Mrs. Fatima Hassan',
    email: 'fatima.hassan@ghazali.edu.pk',
    phone: '0300-2223344',
    employeeId: 'T-102',
    qualification: 'MA English',
    specialization: 'English Literature',
    experience: 8,
    subjects: ['English', 'Urdu'],
    classes: ['9-A', '9-B', '8-A'],
    joiningDate: '2016-03-01',
    gender: 'female',
    isClassTeacher: true,
    classTeacherOf: '9-A',
    status: 'active',
    salary: 65000,
    address: 'Street 2, Adlana, Bhawana',
    emergencyContact: '0300-2223345'
  },
  {
    id: '3',
    name: 'Mr. Mohammad Ali',
    email: 'mohammad.ali@ghazali.edu.pk',
    phone: '0300-3334455',
    employeeId: 'T-103',
    qualification: 'M.Sc Physics',
    specialization: 'Nuclear Physics',
    experience: 12,
    subjects: ['Physics', 'Chemistry'],
    classes: ['10-A', '10-B'],
    joiningDate: '2012-03-01',
    gender: 'male',
    isClassTeacher: false,
    status: 'active',
    salary: 80000,
    address: 'Street 3, Adlana, Bhawana',
    emergencyContact: '0300-3334456'
  },
  {
    id: '4',
    name: 'Ms. Sara Khan',
    email: 'sara.khan@ghazali.edu.pk',
    phone: '0300-4445566',
    employeeId: 'T-104',
    qualification: 'M.Sc Chemistry',
    specialization: 'Organic Chemistry',
    experience: 5,
    subjects: ['Chemistry', 'Biology'],
    classes: ['9-A', '9-B'],
    joiningDate: '2019-03-01',
    gender: 'female',
    isClassTeacher: false,
    status: 'on-leave',
    salary: 55000,
    address: 'Street 4, Adlana, Bhawana',
    emergencyContact: '0300-4445567'
  }
]

// ============================================
// HOOK RETURN TYPE
// ============================================

export interface UseTeachersReturn {
  teachers: Teacher[]
  loading: boolean
  error: string | null
  getTeacher: (id: string) => Teacher | undefined
  getTeachersByClass: (className: string) => Teacher[]
  getTeachersBySubject: (subject: string) => Teacher[]
  getActiveTeachers: () => Teacher[]
  getClassTeachers: () => Teacher[]
  addTeacher: (teacher: Omit<Teacher, 'id'>) => Promise<boolean>
  updateTeacher: (id: string, updates: Partial<Teacher>) => Promise<boolean>
  deleteTeacher: (id: string) => Promise<boolean>
  refreshTeachers: () => void
  searchTeachers: (query: string) => Teacher[]
}

// ============================================
// MAIN HOOK
// ============================================

export function useTeachers(): UseTeachersReturn {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Load teachers on mount
  useEffect(() => {
    loadTeachers()
  }, [])

  // Load teachers function
  const loadTeachers = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setTeachers(MOCK_TEACHERS)
    } catch (err) {
      setError('Failed to load teachers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Get single teacher by ID
  const getTeacher = (id: string): Teacher | undefined => {
    return teachers.find(teacher => teacher.id === id)
  }

  // Get teachers by class
  const getTeachersByClass = (className: string): Teacher[] => {
    return teachers.filter(teacher => 
      teacher.classes.some(cls => cls.includes(className))
    )
  }

  // Get teachers by subject
  const getTeachersBySubject = (subject: string): Teacher[] => {
    return teachers.filter(teacher => 
      teacher.subjects.some(sub => 
        sub.toLowerCase().includes(subject.toLowerCase())
      )
    )
  }

  // Get active teachers only
  const getActiveTeachers = (): Teacher[] => {
    return teachers.filter(teacher => teacher.status === 'active')
  }

  // Get class teachers only
  const getClassTeachers = (): Teacher[] => {
    return teachers.filter(teacher => teacher.isClassTeacher === true)
  }

  // Add new teacher
  const addTeacher = async (teacher: Omit<Teacher, 'id'>): Promise<boolean> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newTeacher: Teacher = {
        ...teacher,
        id: Date.now().toString()
      }
      
      setTeachers(prev => [...prev, newTeacher])
      return true
    } catch (err) {
      setError('Failed to add teacher')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Update existing teacher
  const updateTeacher = async (id: string, updates: Partial<Teacher>): Promise<boolean> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setTeachers(prev => 
        prev.map(teacher => 
          teacher.id === id 
            ? { ...teacher, ...updates } 
            : teacher
        )
      )
      
      return true
    } catch (err) {
      setError('Failed to update teacher')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete teacher
  const deleteTeacher = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setTeachers(prev => prev.filter(teacher => teacher.id !== id))
      return true
    } catch (err) {
      setError('Failed to delete teacher')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Refresh teachers list
  const refreshTeachers = (): void => {
    loadTeachers()
  }

  // Search teachers by name, subject, or qualification
  const searchTeachers = (query: string): Teacher[] => {
    if (!query.trim()) return teachers
    
    const lowerQuery = query.toLowerCase()
    
    return teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(lowerQuery) ||
      teacher.subjects.some(sub => sub.toLowerCase().includes(lowerQuery)) ||
      teacher.qualification.toLowerCase().includes(lowerQuery) ||
      teacher.specialization.toLowerCase().includes(lowerQuery) ||
      teacher.employeeId.toLowerCase().includes(lowerQuery)
    )
  }

  // Return hook data and functions
  return {
    teachers,
    loading,
    error,
    getTeacher,
    getTeachersByClass,
    getTeachersBySubject,
    getActiveTeachers,
    getClassTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    refreshTeachers,
    searchTeachers
  }
}

// ============================================
// STATISTICS HELPER FUNCTIONS
// ============================================

export function getTeacherStats(teachers: Teacher[]): Record<string, any> {
  const total = teachers.length
  const active = teachers.filter(t => t.status === 'active').length
  const onLeave = teachers.filter(t => t.status === 'on-leave').length
  const resigned = teachers.filter(t => t.status === 'resigned').length
  const male = teachers.filter(t => t.gender === 'male').length
  const female = teachers.filter(t => t.gender === 'female').length
  const classTeachers = teachers.filter(t => t.isClassTeacher).length

  // Subject distribution
  const subjectCount: Record<string, number> = {}
  teachers.forEach(teacher => {
    teacher.subjects.forEach(subject => {
      subjectCount[subject] = (subjectCount[subject] || 0) + 1
    })
  })

  // Experience distribution
  const experienceRanges = {
    '0-2 years': teachers.filter(t => t.experience <= 2).length,
    '3-5 years': teachers.filter(t => t.experience > 2 && t.experience <= 5).length,
    '6-10 years': teachers.filter(t => t.experience > 5 && t.experience <= 10).length,
    '10+ years': teachers.filter(t => t.experience > 10).length
  }

  return {
    total,
    active,
    onLeave,
    resigned,
    male,
    female,
    classTeachers,
    subjectDistribution: subjectCount,
    experienceDistribution: experienceRanges,
    averageExperience: teachers.reduce((sum, t) => sum + t.experience, 0) / total || 0
  }
}

// ============================================
// TEACHER FORM VALIDATION
// ============================================

export interface TeacherFormErrors {
  name?: string
  email?: string
  phone?: string
  employeeId?: string
  qualification?: string
  experience?: string
  subjects?: string
  salary?: string
}

export function validateTeacherForm(data: Partial<Teacher>): TeacherFormErrors {
  const errors: TeacherFormErrors = {}

  // Name validation
  if (!data.name) {
    errors.name = 'Name is required'
  } else if (data.name.length < 3) {
    errors.name = 'Name must be at least 3 characters'
  }

  // Email validation
  if (!data.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format'
  }

  // Phone validation
  if (!data.phone) {
    errors.phone = 'Phone number is required'
  } else if (!/^03[0-9]{2}[0-9]{7}$/.test(data.phone.replace(/-/g, ''))) {
    errors.phone = 'Invalid phone number (format: 03XX-XXXXXXX)'
  }

  // Employee ID validation
  if (!data.employeeId) {
    errors.employeeId = 'Employee ID is required'
  }

  // Qualification validation
  if (!data.qualification) {
    errors.qualification = 'Qualification is required'
  }

  // Experience validation
  if (data.experience === undefined) {
    errors.experience = 'Experience is required'
  } else if (data.experience < 0) {
    errors.experience = 'Experience cannot be negative'
  } else if (data.experience > 50) {
    errors.experience = 'Experience cannot exceed 50 years'
  }

  // Subjects validation
  if (!data.subjects || data.subjects.length === 0) {
    errors.subjects = 'At least one subject is required'
  }

  // Salary validation
  if (data.salary !== undefined && data.salary < 15000) {
    errors.salary = 'Salary must be at least 15,000'
  }

  return errors
}

// ============================================
// TEACHER UTILITY FUNCTIONS
// ============================================

export function formatTeacherName(teacher: Teacher): string {
  const prefix = teacher.gender === 'male' ? 'Prof.' : 'Prof.'
  return `${prefix} ${teacher.name}`
}

export function getTeacherInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getTeacherStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'on-leave':
      return 'bg-yellow-100 text-yellow-800'
    case 'resigned':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getTeacherExperienceYears(joiningDate: string): number {
  const join = new Date(joiningDate)
  const now = new Date()
  const years = now.getFullYear() - join.getFullYear()
  
  if (now.getMonth() < join.getMonth() || 
      (now.getMonth() === join.getMonth() && now.getDate() < join.getDate())) {
    return years - 1
  }
  
  return years
}

export function getTeacherSubjectsList(teacher: Teacher): string {
  return teacher.subjects.join(', ')
}

export function getTeacherClassesList(teacher: Teacher): string {
  return teacher.classes.join(', ')
}

// ============================================
// EXPORT ALL
// ============================================

export default useTeachers