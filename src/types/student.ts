export interface Student {
  id: string
  name: string
  dateOfBirth: string
  gender: 'male' | 'female'
  class: string
  section: string
  rollNo: string
  fatherName: string
  fatherOccupation: string
  motherName: string
  contact: string
  alternateContact?: string
  address: string
  city: string
  bloodGroup?: string
  admissionDate: string
  previousSchool?: string
  busRoute?: string
  feesStatus: 'paid' | 'pending' | 'partial'
  profileImage?: string
}

export interface StudentAttendance {
  studentId: string
  date: string
  status: 'present' | 'absent' | 'late' | 'leave'
  remarks?: string
}

export interface StudentResult {
  studentId: string
  examId: string
  subjects: {
    name: string
    marks: number
    totalMarks: number
    grade: string
  }[]
  percentage: number
  rank?: number
  remarks?: string
}