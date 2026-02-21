export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  phone?: string
  address?: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Student extends User {
  rollNo: string
  class: string
  section: string
  fatherName: string
  motherName?: string
  dateOfBirth: Date
  bloodGroup?: string
  busRoute?: string
  feesStatus: 'paid' | 'pending' | 'partial'
  admissionDate: Date
}

export interface Teacher extends User {
  qualification: string
  experience: string
  subjects: string[]
  classes: string[]
  joiningDate: Date
  employeeId: string
  specialization?: string
  isClassTeacher?: boolean
  classTeacherOf?: string
  salary?: number
  bankAccount?: string
  emergencyContact?: string
}