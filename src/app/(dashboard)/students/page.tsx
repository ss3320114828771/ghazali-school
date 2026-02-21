'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Student {
  id: number
  name: string
  class: string
  section: string
  rollNo: string
  fatherName: string
  contact: string
  attendance: number
  status: 'active' | 'inactive'
}

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  
  const [students] = useState<Student[]>([
    { id: 1, name: 'Ali Ahmed', class: '10', section: 'A', rollNo: '101', fatherName: 'Ahmed Khan', contact: '03001234567', attendance: 95, status: 'active' },
    { id: 2, name: 'Bilal Hassan', class: '10', section: 'A', rollNo: '102', fatherName: 'Hassan Ali', contact: '03012345678', attendance: 88, status: 'active' },
    { id: 3, name: 'Sara Fatima', class: '9', section: 'B', rollNo: '201', fatherName: 'Mohammad Ali', contact: '03023456789', attendance: 92, status: 'active' },
    { id: 4, name: 'Zainab Bibi', class: '9', section: 'B', rollNo: '202', fatherName: 'Usman Khan', contact: '03034567890', attendance: 78, status: 'inactive' },
    { id: 5, name: 'Hamza Ali', class: '8', section: 'A', rollNo: '301', fatherName: 'Ali Raza', contact: '03045678901', attendance: 96, status: 'active' },
  ])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm) ||
                         student.fatherName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === 'all' || student.class === selectedClass
    return matchesSearch && matchesClass
  })

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Students Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Student
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white mb-2">Search</label>
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, roll no, or father name"
                className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-white mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all" className="bg-gray-800">All Classes</option>
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num.toString()} className="bg-gray-800">Class {num}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-500 hover:to-pink-600">
              <i className="fas fa-download mr-2"></i>
              Export List
            </button>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <div key={student.id} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-graduate text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{student.name}</h3>
                  <p className="text-blue-200">Roll No: {student.rollNo}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                student.status === 'active' 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
              }`}>
                {student.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-white/80"><i className="fas fa-school w-6 text-blue-300"></i> Class {student.class}-{student.section}</p>
              <p className="text-white/80"><i className="fas fa-user w-6 text-green-300"></i> {student.fatherName}</p>
              <p className="text-white/80"><i className="fas fa-phone w-6 text-yellow-300"></i> {student.contact}</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-white mb-1">
                <span>Attendance</span>
                <span>{student.attendance}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                  style={{ width: `${student.attendance}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Link href={`/dashboard/students/${student.id}`} className="flex-1 bg-blue-500/20 text-blue-300 text-center py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
                <i className="fas fa-eye mr-2"></i>View
              </Link>
              <button className="flex-1 bg-yellow-500/20 text-yellow-300 py-2 rounded-lg hover:bg-yellow-500/30 transition-colors">
                <i className="fas fa-edit mr-2"></i>Edit
              </button>
              <button className="flex-1 bg-red-500/20 text-red-300 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                <i className="fas fa-trash mr-2"></i>Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Student</h2>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="Enter full name" />
                </div>
                <div>
                  <label className="block text-white mb-2">Roll Number</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="Enter roll number" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Class</label>
                  <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} className="bg-gray-800">Class {num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">Section</label>
                  <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white">
                    {['A','B','C'].map(sec => (
                      <option key={sec} className="bg-gray-800">Section {sec}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-2">Father's Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="Enter father's name" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Contact Number</label>
                  <input type="tel" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="03XX-XXXXXXX" />
                </div>
                <div>
                  <label className="block text-white mb-2">Date of Birth</label>
                  <input type="date" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" />
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-2">Address</label>
                <textarea className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" rows={3} placeholder="Enter address"></textarea>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl font-bold hover:from-green-500 hover:to-blue-600">
                  <i className="fas fa-save mr-2"></i>
                  Save Student
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-red-500/20 text-red-300 py-3 rounded-xl font-bold hover:bg-red-500/30">
                  <i className="fas fa-times mr-2"></i>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}