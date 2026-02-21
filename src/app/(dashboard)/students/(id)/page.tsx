'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function StudentDetailPage() {
  const params = useParams()
  const studentId = params.id
  
  const [activeTab, setActiveTab] = useState('overview')
  const [student, setStudent] = useState<any>(null)

  useEffect(() => {
    // Mock data - replace with actual API call
    setStudent({
      id: studentId,
      name: 'Ali Ahmed',
      rollNo: '101',
      class: '10',
      section: 'A',
      fatherName: 'Ahmed Khan',
      motherName: 'Fatima Bibi',
      dateOfBirth: '2010-05-15',
      contact: '03001234567',
      address: 'Adlana, Bhawana',
      bloodGroup: 'B+',
      admissionDate: '2020-03-01',
      previousSchool: 'Govt Primary School',
      busRoute: 'Route 1',
      feesStatus: 'paid',
      attendance: 95,
      results: [
        { subject: 'Mathematics', marks: 85, total: 100, grade: 'A' },
        { subject: 'Science', marks: 78, total: 100, grade: 'B+' },
        { subject: 'English', marks: 92, total: 100, grade: 'A+' },
        { subject: 'Urdu', marks: 88, total: 100, grade: 'A' },
        { subject: 'Islamiat', marks: 95, total: 100, grade: 'A+' },
      ]
    })
  }, [studentId])

  if (!student) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-center">
          <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
          <p>Loading student details...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/students" className="text-blue-300 hover:text-blue-400 mb-4 inline-block">
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Students
        </Link>
        
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl font-bold text-white">
              {student.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{student.name}</h1>
              <p className="text-white/80 text-lg">Roll No: {student.rollNo} | Class {student.class}-{student.section}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {['overview', 'attendance', 'results', 'fees', 'documents'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-bold capitalize transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Father's Name</p>
                  <p className="text-white text-lg">{student.fatherName}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Mother's Name</p>
                  <p className="text-white text-lg">{student.motherName}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Date of Birth</p>
                  <p className="text-white text-lg">{student.dateOfBirth}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Blood Group</p>
                  <p className="text-white text-lg">{student.bloodGroup}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Contact</p>
                  <p className="text-white text-lg">{student.contact}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Address</p>
                  <p className="text-white text-lg">{student.address}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mt-8 mb-6">Academic Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Admission Date</p>
                  <p className="text-white text-lg">{student.admissionDate}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Previous School</p>
                  <p className="text-white text-lg">{student.previousSchool}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Bus Route</p>
                  <p className="text-white text-lg">{student.busRoute}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-300 text-sm">Fees Status</p>
                  <p className={`text-lg ${student.feesStatus === 'paid' ? 'text-green-400' : 'text-red-400'}`}>
                    {student.feesStatus.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Attendance</span>
                    <span className="text-2xl font-bold text-white">{student.attendance}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full" style={{ width: `${student.attendance}%` }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Average Marks</span>
                    <span className="text-2xl font-bold text-white">87.6%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-teal-500 h-3 rounded-full" style={{ width: '87.6%' }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Rank in Class</span>
                    <span className="text-2xl font-bold text-white">#5</span>
                  </div>
                  <p className="text-white/60 text-sm">Top 10% of class</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Academic Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-4 text-white">Subject</th>
                    <th className="text-left py-4 px-4 text-white">Marks</th>
                    <th className="text-left py-4 px-4 text-white">Total</th>
                    <th className="text-left py-4 px-4 text-white">Percentage</th>
                    <th className="text-left py-4 px-4 text-white">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.results.map((result: any, index: number) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-4 px-4 text-white">{result.subject}</td>
                      <td className="py-4 px-4 text-white">{result.marks}</td>
                      <td className="py-4 px-4 text-white">{result.total}</td>
                      <td className="py-4 px-4 text-white">{((result.marks/result.total)*100).toFixed(1)}%</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          result.grade === 'A+' ? 'bg-green-500/20 text-green-300' :
                          result.grade === 'A' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {result.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}