export const SCHOOL_INFO = {
  name: 'Ghazali High School',
  principal: 'Hafiz Sajid Syed',
  contact: '0308-4591993',
  address: 'Adlana, Tehsil Bhawana, District Chiniot',
  email: 'info@ghazalihigh.edu.pk',
  established: 1995
}

export const CLASSES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
export const SECTIONS = ['A', 'B', 'C', 'D']

export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Urdu',
  'Islamiat',
  'Computer',
  'Science'
]

export const EXAM_TYPES = {
  midterm: 'Mid-Term',
  final: 'Final Term',
  quarterly: 'Quarterly'
} as const

export const ATTENDANCE_STATUS = {
  present: 'Present',
  absent: 'Absent',
  late: 'Late',
  leave: 'Leave'
} as const

export const USER_ROLES = {
  admin: 'Administrator',
  teacher: 'Teacher',
  student: 'Student',
  parent: 'Parent'
} as const

export const GRADES = [
  { grade: 'A+', min: 90, max: 100 },
  { grade: 'A', min: 80, max: 89 },
  { grade: 'B', min: 70, max: 79 },
  { grade: 'C', min: 60, max: 69 },
  { grade: 'D', min: 50, max: 59 },
  { grade: 'F', min: 0, max: 49 }
]