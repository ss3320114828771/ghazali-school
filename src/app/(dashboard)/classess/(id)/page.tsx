'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// ============================================
// SIMPLE TYPES
// ============================================

export interface ClassDetail {
  id: string
  name: string
  displayName: string
  section: string
  academicYear: string
  classTeacher: {
    id: string
    name: string
    email: string
    phone: string
  }
  totalStudents: number
  totalSubjects: number
  students: Array<{
    id: string
    name: string
    rollNo: string
    attendance: number
  }>
  subjects: Array<{
    id: string
    name: string
    teacher: string
    totalMarks: number
  }>
  schedule: Array<{
    day: string
    periods: Array<{
      period: number
      subject: string
      teacher: string
      time: string
    }>
  }>
}

// ============================================
// MOCK DATA FUNCTION
// ============================================

const getMockClassData = (id: string): ClassDetail => {
  return {
    id: id,
    name: '10',
    displayName: 'Class 10',
    section: 'A',
    academicYear: '2024-2025',
    classTeacher: {
      id: 't1',
      name: 'Prof. Ahmad Raza',
      email: 'ahmad.raza@ghazali.edu.pk',
      phone: '0300-1112233'
    },
    totalStudents: 45,
    totalSubjects: 7,
    students: [
      { id: 's1', name: 'Ali Ahmed', rollNo: '101', attendance: 95 },
      { id: 's2', name: 'Bilal Hassan', rollNo: '102', attendance: 88 },
      { id: 's3', name: 'Sara Fatima', rollNo: '103', attendance: 92 },
      { id: 's4', name: 'Zainab Bibi', rollNo: '104', attendance: 78 },
      { id: 's5', name: 'Hamza Ali', rollNo: '105', attendance: 96 }
    ],
    subjects: [
      { id: 'sub1', name: 'Mathematics', teacher: 'Prof. Ahmad Raza', totalMarks: 100 },
      { id: 'sub2', name: 'Physics', teacher: 'Mr. Mohammad Ali', totalMarks: 100 },
      { id: 'sub3', name: 'Chemistry', teacher: 'Ms. Sara Khan', totalMarks: 100 },
      { id: 'sub4', name: 'English', teacher: 'Mrs. Fatima Hassan', totalMarks: 100 },
      { id: 'sub5', name: 'Urdu', teacher: 'Mrs. Fatima Hassan', totalMarks: 100 },
      { id: 'sub6', name: 'Islamiat', teacher: 'Hafiz Khalid', totalMarks: 100 },
      { id: 'sub7', name: 'Computer', teacher: 'Mr. Usman', totalMarks: 100 }
    ],
    schedule: [
      {
        day: 'Monday',
        periods: [
          { period: 1, subject: 'Mathematics', teacher: 'Prof. Ahmad Raza', time: '08:00-08:45' },
          { period: 2, subject: 'Physics', teacher: 'Mr. Mohammad Ali', time: '08:45-09:30' },
          { period: 3, subject: 'Chemistry', teacher: 'Ms. Sara Khan', time: '09:30-10:15' },
          { period: 4, subject: 'Break', teacher: '-', time: '10:15-10:45' },
          { period: 5, subject: 'English', teacher: 'Mrs. Fatima Hassan', time: '10:45-11:30' },
          { period: 6, subject: 'Urdu', teacher: 'Mrs. Fatima Hassan', time: '11:30-12:15' },
          { period: 7, subject: 'Islamiat', teacher: 'Hafiz Khalid', time: '12:15-13:00' }
        ]
      },
      {
        day: 'Tuesday',
        periods: [
          { period: 1, subject: 'Physics', teacher: 'Mr. Mohammad Ali', time: '08:00-08:45' },
          { period: 2, subject: 'Chemistry', teacher: 'Ms. Sara Khan', time: '08:45-09:30' },
          { period: 3, subject: 'Mathematics', teacher: 'Prof. Ahmad Raza', time: '09:30-10:15' },
          { period: 4, subject: 'Break', teacher: '-', time: '10:15-10:45' },
          { period: 5, subject: 'Computer', teacher: 'Mr. Usman', time: '10:45-11:30' },
          { period: 6, subject: 'English', teacher: 'Mrs. Fatima Hassan', time: '11:30-12:15' },
          { period: 7, subject: 'Urdu', teacher: 'Mrs. Fatima Hassan', time: '12:15-13:00' }
        ]
      }
    ]
  }
}

// ============================================
// STATS CARD COMPONENT
// ============================================

interface StatsCardProps {
  title: string
  value: string | number
  icon: string
  color: string
}

function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}

// ============================================
// STUDENT ROW COMPONENT
// ============================================

interface StudentRowProps {
  student: { id: string; name: string; rollNo: string; attendance: number }
  index: number
}

function StudentRow({ student, index }: StudentRowProps) {
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 75) return 'text-blue-600'
    if (attendance >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
      <td className="px-4 py-2 text-sm text-gray-900">{student.rollNo}</td>
      <td className="px-4 py-2 text-sm text-gray-900">{student.name}</td>
      <td className="px-4 py-2 text-sm">
        <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
          {student.attendance}%
        </span>
      </td>
      <td className="px-4 py-2 text-sm">
        <Link
          href={`/dashboard/students/${student.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          View
        </Link>
      </td>
    </tr>
  )
}

// ============================================
// SUBJECT ROW COMPONENT
// ============================================

interface SubjectRowProps {
  subject: { id: string; name: string; teacher: string; totalMarks: number }
  index: number
}

function SubjectRow({ subject, index }: SubjectRowProps) {
  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
      <td className="px-4 py-2 text-sm text-gray-900">{subject.name}</td>
      <td className="px-4 py-2 text-sm text-gray-600">{subject.teacher}</td>
      <td className="px-4 py-2 text-sm text-gray-600 text-center">{subject.totalMarks}</td>
    </tr>
  )
}

// ============================================
// MAIN CLASS DETAIL PAGE
// ============================================

export default function ClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [classData, setClassData] = useState<ClassDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'subjects' | 'schedule'>('overview')

  // Load class data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const id = params.id as string
      const data = getMockClassData(id)
      setClassData(data)
      setLoading(false)
    }

    loadData()
  }, [params.id])

  // Handle back button
  const handleBack = () => {
    router.push('/dashboard/classes')
  }

  // Handle edit
  const handleEdit = () => {
    router.push(`/dashboard/classes/${params.id}/edit`)
  }

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>

          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!classData) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Class Not Found</h2>
        <p className="text-gray-600 mb-4">The class you're looking for doesn't exist.</p>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-700 mb-2 flex items-center"
          >
            ← Back to Classes
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {classData.displayName} - Section {classData.section}
          </h1>
          <p className="text-sm text-gray-500">Academic Year: {classData.academicYear}</p>
        </div>
        <button
          onClick={handleEdit}
          className="mt-4 md:mt-0 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Edit Class
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Students"
          value={classData.totalStudents}
          icon="👥"
          color="bg-blue-50"
        />
        <StatsCard
          title="Total Subjects"
          value={classData.totalSubjects}
          icon="📚"
          color="bg-green-50"
        />
        <StatsCard
          title="Class Teacher"
          value={classData.classTeacher.name.split(' ').pop() || ''}
          icon="👨‍🏫"
          color="bg-purple-50"
        />
        <StatsCard
          title="Average Attendance"
          value="88%"
          icon="📊"
          color="bg-yellow-50"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'students'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'subjects'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Subjects
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'schedule'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Schedule
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Class Teacher Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Class Teacher</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    👤
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{classData.classTeacher.name}</p>
                    <p className="text-sm text-gray-500">{classData.classTeacher.email}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">📞 {classData.classTeacher.phone}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-700">{classData.totalStudents}</div>
                <div className="text-sm text-blue-600">Enrolled Students</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-700">{classData.totalSubjects}</div>
                <div className="text-sm text-green-600">Subjects Offered</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-700">45</div>
                <div className="text-sm text-purple-600">Class Capacity</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-700">0</div>
                <div className="text-sm text-yellow-600">Vacant Seats</div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link
                  href={`/dashboard/attendance?class=${classData.name}-${classData.section}`}
                  className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100"
                >
                  <span className="text-2xl block mb-1">📋</span>
                  <span className="text-xs">Attendance</span>
                </Link>
                <Link
                  href={`/dashboard/exams?class=${classData.name}-${classData.section}`}
                  className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100"
                >
                  <span className="text-2xl block mb-1">📝</span>
                  <span className="text-xs">Exams</span>
                </Link>
                <Link
                  href={`/dashboard/timetable?class=${classData.name}-${classData.section}`}
                  className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100"
                >
                  <span className="text-2xl block mb-1">⏰</span>
                  <span className="text-xs">Timetable</span>
                </Link>
                <Link
                  href={`/dashboard/results?class=${classData.name}-${classData.section}`}
                  className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100"
                >
                  <span className="text-2xl block mb-1">📊</span>
                  <span className="text-xs">Results</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Student List</h3>
              <Link
                href={`/dashboard/students/add?class=${classData.name}-${classData.section}`}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                + Add Student
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Roll No</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Attendance</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classData.students.map((student, index) => (
                    <StudentRow key={student.id} student={student} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Subjects Offered</h3>
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                + Add Subject
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Subject</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Teacher</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Total Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classData.subjects.map((subject, index) => (
                    <SubjectRow key={subject.id} subject={subject} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
            <div className="space-y-4">
              {classData.schedule.map(day => (
                <div key={day.day} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 font-medium text-gray-700">
                    {day.day}
                  </div>
                  <div className="divide-y divide-gray-200">
                    {day.periods.map((period, idx) => (
                      <div key={idx} className="px-4 py-2 flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            Period {period.period}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">{period.time}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-900">{period.subject}</span>
                          {period.teacher !== '-' && (
                            <span className="text-xs text-gray-500 block">{period.teacher}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end space-x-3">
        <Link
          href="/dashboard/classes"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
        >
          Back to Classes
        </Link>
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Edit Class
        </button>
      </div>
    </div>
  )
}