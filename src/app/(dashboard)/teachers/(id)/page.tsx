'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// ============================================
// SIMPLE TYPES
// ============================================

export interface TeacherDetail {
  id: string
  name: string
  employeeId: string
  qualification: string
  specialization: string
  experience: number
  subjects: string[]
  classes: string[]
  phone: string
  email: string
  gender: 'male' | 'female'
  isClassTeacher: boolean
  classTeacherOf?: string
  status: 'active' | 'on-leave' | 'resigned'
  profileImage?: string
  address?: string
  emergencyContact?: string
  joiningDate: string
  salary?: number
  bankAccount?: string
  bankName?: string
}

// ============================================
// MOCK DATA FUNCTION
// ============================================

const getMockTeacherData = (id: string): TeacherDetail => {
  return {
    id: id,
    name: 'Prof. Ahmad Raza',
    employeeId: 'T-101',
    qualification: 'M.Sc Mathematics',
    specialization: 'Pure Mathematics',
    experience: 10,
    subjects: ['Mathematics', 'Physics'],
    classes: ['10-A', '10-B', '9-A'],
    phone: '0300-1112233',
    email: 'ahmad.raza@ghazali.edu.pk',
    gender: 'male',
    isClassTeacher: true,
    classTeacherOf: '10-A',
    status: 'active',
    joiningDate: '2014-03-01',
    address: 'Street 1, Adlana, Bhawana',
    emergencyContact: '0300-1112234',
    salary: 75000,
    bankAccount: '1234567890123',
    bankName: 'Habib Bank'
  }
}

// ============================================
// INFO CARD COMPONENT
// ============================================

interface InfoCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

function InfoCard({ title, children, className = '' }: InfoCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

// ============================================
// INFO ROW COMPONENT
// ============================================

interface InfoRowProps {
  label: string
  value: string | number | React.ReactNode
  icon?: string
}

function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <div className="flex py-2 border-b border-gray-100 last:border-0">
      <div className="w-32 flex items-center text-sm text-gray-500">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </div>
      <div className="flex-1 text-sm text-gray-900 font-medium">{value}</div>
    </div>
  )
}

// ============================================
// STATS CARD COMPONENT
// ============================================

interface StatsCardProps {
  value: string | number
  label: string
  icon: string
  color: string
}

function StatsCard({ value, label, icon, color }: StatsCardProps) {
  return (
    <div className={`${color} rounded-lg p-4 text-center`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

// ============================================
// STATUS BADGE COMPONENT
// ============================================

interface StatusBadgeProps {
  status: string
}

function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'on-leave': return 'bg-yellow-100 text-yellow-800'
      case 'resigned': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(status)}`}>
      {status === 'on-leave' ? 'On Leave' : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// ============================================
// MAIN TEACHER DETAIL PAGE
// ============================================

export default function TeacherDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [teacher, setTeacher] = useState<TeacherDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'classes' | 'contact' | 'financial'>('profile')

  // Load teacher data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const id = params.id as string
      const data = getMockTeacherData(id)
      setTeacher(data)
      setLoading(false)
    }

    loadData()
  }, [params.id])

  // Handle back button
  const handleBack = () => {
    router.push('/dashboard/teachers')
  }

  // Handle edit
  const handleEdit = () => {
    router.push(`/dashboard/teachers/${params.id}/edit`)
  }

  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      // Delete logic here
      router.push('/dashboard/teachers')
    }
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

  if (!teacher) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Teacher Not Found</h2>
        <p className="text-gray-600 mb-4">The teacher you're looking for doesn't exist.</p>
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
            ← Back to Teachers
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{teacher.name}</h1>
            <StatusBadge status={teacher.status} />
          </div>
          <p className="text-sm text-gray-500">{teacher.employeeId}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          value={`${teacher.experience}+`}
          label="Years Experience"
          icon="⏳"
          color="bg-blue-50"
        />
        <StatsCard
          value={teacher.subjects.length}
          label="Subjects"
          icon="📚"
          color="bg-green-50"
        />
        <StatsCard
          value={teacher.classes.length}
          label="Classes"
          icon="👥"
          color="bg-purple-50"
        />
        <StatsCard
          value={teacher.isClassTeacher ? 'Yes' : 'No'}
          label="Class Teacher"
          icon="👨‍🏫"
          color="bg-yellow-50"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'classes'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Classes & Subjects
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contact'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'financial'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Financial
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Image */}
        <div className="lg:col-span-1">
          <InfoCard title="Profile">
            <div className="text-center">
              {teacher.profileImage ? (
                <img
                  src={teacher.profileImage}
                  alt={teacher.name}
                  className="w-32 h-32 rounded-full mx-auto mb-3 object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-teal-600 mx-auto mb-3 flex items-center justify-center text-white text-4xl">
                  {teacher.name.charAt(0)}
                </div>
              )}
              <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
              <p className="text-sm text-gray-500">{teacher.employeeId}</p>
              <p className="text-sm text-gray-600 mt-2">{teacher.qualification}</p>
              <p className="text-xs text-gray-400">{teacher.specialization}</p>
            </div>
          </InfoCard>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <InfoCard title="Personal Information">
              <InfoRow label="Full Name" value={teacher.name} icon="👤" />
              <InfoRow label="Employee ID" value={teacher.employeeId} icon="🆔" />
              <InfoRow label="Gender" value={teacher.gender} icon="⚥" />
              <InfoRow label="Qualification" value={teacher.qualification} icon="🎓" />
              <InfoRow label="Specialization" value={teacher.specialization} icon="🔬" />
              <InfoRow label="Experience" value={`${teacher.experience} years`} icon="⏳" />
              <InfoRow label="Joining Date" value={teacher.joiningDate} icon="📅" />
              <InfoRow label="Status" value={<StatusBadge status={teacher.status} />} icon="📊" />
            </InfoCard>
          )}

          {/* Classes & Subjects Tab */}
          {activeTab === 'classes' && (
            <InfoCard title="Classes & Subjects">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Subjects Taught</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map(subject => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Classes Assigned</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.classes.map(cls => (
                    <Link
                      key={cls}
                      href={`/dashboard/classes/${cls.split('-')[0]}`}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full hover:bg-green-200"
                    >
                      Class {cls}
                    </Link>
                  ))}
                </div>
              </div>

              {teacher.isClassTeacher && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    👨‍🏫 Class Teacher of Class {teacher.classTeacherOf}
                  </p>
                </div>
              )}
            </InfoCard>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <InfoCard title="Contact Information">
              <InfoRow label="Phone" value={teacher.phone} icon="📞" />
              <InfoRow label="Email" value={teacher.email} icon="✉️" />
              <InfoRow label="Address" value={teacher.address || 'Not provided'} icon="📍" />
              <InfoRow label="Emergency Contact" value={teacher.emergencyContact || 'Not provided'} icon="🆘" />
            </InfoCard>
          )}

          {/* Financial Tab */}
          {activeTab === 'financial' && (
            <InfoCard title="Financial Details">
              <InfoRow label="Monthly Salary" value={`Rs. ${teacher.salary?.toLocaleString() || 'Not set'}`} icon="💰" />
              <InfoRow label="Bank Name" value={teacher.bankName || 'Not provided'} icon="🏦" />
              <InfoRow label="Account Number" value={teacher.bankAccount || 'Not provided'} icon="🔢" />
            </InfoCard>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end space-x-3">
        <Link
          href="/dashboard/teachers"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
        >
          Back to Teachers
        </Link>
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Edit Teacher
        </button>
      </div>
    </div>
  )
}