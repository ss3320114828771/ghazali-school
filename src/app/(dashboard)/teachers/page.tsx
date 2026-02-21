'use client'

import { useState } from 'react'

interface Teacher {
  id: number
  name: string
  subject: string
  qualification: string
  experience: string
  contact: string
  email: string
  classes: string[]
  status: 'active' | 'on-leave'
}

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const [teachers] = useState<Teacher[]>([
    { id: 1, name: 'Prof. Ahmad Raza', subject: 'Mathematics', qualification: 'M.Sc Mathematics', experience: '10 years', contact: '03011234567', email: 'ahmad.raza@ghazali.edu', classes: ['10-A', '10-B', '9-A'], status: 'active' },
    { id: 2, name: 'Mrs. Fatima Hassan', subject: 'English', qualification: 'MA English', experience: '8 years', contact: '03022345678', email: 'fatima.hassan@ghazali.edu', classes: ['9-A', '9-B', '8-A'], status: 'active' },
    { id: 3, name: 'Mr. Mohammad Ali', subject: 'Physics', qualification: 'M.Sc Physics', experience: '12 years', contact: '03033456789', email: 'mohammad.ali@ghazali.edu', classes: ['10-A', '10-B'], status: 'active' },
    { id: 4, name: 'Ms. Sara Khan', subject: 'Chemistry', qualification: 'M.Sc Chemistry', experience: '5 years', contact: '03044567890', email: 'sara.khan@ghazali.edu', classes: ['9-A', '9-B'], status: 'on-leave' },
  ])

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.qualification.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Teachers Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Teacher
        </button>
      </div>

      {/* Search */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search teachers by name, subject, or qualification..."
            className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-chalkboard-teacher text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{teacher.name}</h3>
                  <p className="text-purple-200">{teacher.subject} Teacher</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                teacher.status === 'active' 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-yellow-500/20 text-yellow-300'
              }`}>
                {teacher.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <p className="text-white/80"><i className="fas fa-graduation-cap w-6 text-purple-300"></i> {teacher.qualification}</p>
              <p className="text-white/80"><i className="fas fa-clock w-6 text-green-300"></i> {teacher.experience} experience</p>
              <p className="text-white/80"><i className="fas fa-phone w-6 text-yellow-300"></i> {teacher.contact}</p>
              <p className="text-white/80"><i className="fas fa-envelope w-6 text-blue-300"></i> {teacher.email}</p>
              <div>
                <p className="text-white/80 mb-2"><i className="fas fa-users w-6 text-pink-300"></i> Classes:</p>
                <div className="flex flex-wrap gap-2 ml-6">
                  {teacher.classes.map(cls => (
                    <span key={cls} className="bg-white/10 px-3 py-1 rounded-full text-sm text-white">
                      Class {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-500/20 text-blue-300 py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
                <i className="fas fa-eye mr-2"></i>Profile
              </button>
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

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Teacher</h2>
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
                  <label className="block text-white mb-2">Subject</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="Enter subject" />
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-2">Qualification</label>
                <input type="text" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="Enter qualification" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Experience</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="e.g., 5 years" />
                </div>
                <div>
                  <label className="block text-white mb-2">Contact</label>
                  <input type="tel" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="03XX-XXXXXXX" />
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="teacher@ghazali.edu" />
              </div>
              
              <div>
                <label className="block text-white mb-2">Assign Classes</label>
                <div className="grid grid-cols-3 gap-2">
                  {['9-A', '9-B', '10-A', '10-B', '8-A', '8-B'].map(cls => (
                    <label key={cls} className="flex items-center space-x-2 text-white">
                      <input type="checkbox" className="form-checkbox bg-white/20 border-white/30" />
                      <span>Class {cls}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 rounded-xl font-bold">
                  Save Teacher
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-red-500/20 text-red-300 py-3 rounded-xl font-bold">
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