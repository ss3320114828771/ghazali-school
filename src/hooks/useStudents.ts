import { useState, useEffect } from 'react'

interface Student {
  id: string
  name: string
  class: string
  section: string
  rollNo: string
  fatherName: string
  contact: string
  address: string
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      // Mock data - replace with actual API call
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'Ali Ahmed',
          class: '10',
          section: 'A',
          rollNo: '101',
          fatherName: 'Ahmed Khan',
          contact: '03001234567',
          address: 'Adlana, Bhawana'
        },
        // Add more mock students
      ]
      setStudents(mockStudents)
    } catch (err) {
      setError('Failed to fetch students')
    } finally {
      setLoading(false)
    }
  }

  const addStudent = async (student: Omit<Student, 'id'>) => {
    // API call to add student
    console.log('Adding student:', student)
  }

  const updateStudent = async (id: string, student: Partial<Student>) => {
    // API call to update student
    console.log('Updating student:', id, student)
  }

  const deleteStudent = async (id: string) => {
    // API call to delete student
    console.log('Deleting student:', id)
  }

  return {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    refresh: fetchStudents
  }
}