'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Class {
  id: number
  name: string
  section: string
  students: number
  classTeacher: string
  subjects: string[]
  classroom: string
}

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const [classes] = useState<Class[]>([
    { id: 1, name: '10', section: 'A', students: 45, classTeacher: 'Prof. Ahmad Raza', subjects: ['Math', 'Physics', 'Chemistry', 'English', 'Urdu'], classroom: 'Room 101' },
    { id: 2, name: '10', section: 'B', students: 42, classTeacher: 'Mr. Mohammad Ali', subjects: ['Math', 'Physics', 'Chemistry', 'English', 'Urdu'], classroom: 'Room 102' },
    { id: 3, name: '9', section: 'A', students: 48, classTeacher: 'Mrs. Fatima Hassan', subjects: ['Math', 'Science', 'English', 'Urdu', 'Islamiat'], classroom: 'Room 103' },
    { id: 4, name: '9', section: 'B', students: 46, classTeacher: 'Ms. Sara Khan', subjects: ['Math', 'Science', 'English', 'Urdu', 'Islamiat'], classroom: 'Room 104' },
    { id: 5, name: '8', section: 'A', students: 50, classTeacher: 'Mr. Usman Ahmed', subjects: ['Math', 'Science', 'English', 'Urdu', 'Islamiat'], classroom: 'Room 105' },
    { id: 6, name: '8', section: 'B', students: 47, classTeacher: 'Ms. Aisha Bibi', subjects: ['Math', 'Science', 'English', 'Urdu', 'Islamiat'], classroom: 'Room 106' },
  ])

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.classroom.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === 'all' || cls.name === selectedClass
    return matchesSearch && matchesClass
  })

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Classes Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-500 hover:to-teal-600 transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Class
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by teacher or room..."
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="all" className="bg-gray-800">All Classes</option>
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num.toString()} className="bg-gray-800">Class {num}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-500 hover:to-purple-600">
              <i className="fas fa-chart-bar mr-2"></i>
              View Statistics
            </button>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map(cls => (
          <div key={cls.id} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Class {cls.name}-{cls.section}</h3>
                <p className="text-green-300">{cls.classroom}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                <i className="fas fa-users text-white text-xl"></i>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <p className="text-white/80">
                <i className="fas fa-user-tie w-6 text-blue-300"></i> 
                Class Teacher: {cls.classTeacher}
              </p>
              <p className="text-white/80">
                <i className="fas fa-users w-6 text-yellow-300"></i> 
                Total Students: {cls.students}
              </p>
              <div>
                <p className="text-white/80 mb-2">
                  <i className="fas fa-book w-6 text-purple-300"></i> 
                  Subjects:
                </p>
                <div className="flex flex-wrap gap-2 ml-6">
                  {cls.subjects.map(subject => (
                    <span key={subject} className="bg-white/10 px-3 py-1 rounded-full text-sm text-white">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Link href={`/dashboard/classes/${cls.id}`} className="flex-1 bg-blue-500/20 text-blue-300 text-center py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
                <i className="fas fa-eye mr-2"></i>Details
              </Link>
              <Link href={`/dashboard/attendance?class=${cls.name}-${cls.section}`} className="flex-1 bg-green-500/20 text-green-300 text-center py-2 rounded-lg hover:bg-green-500/30 transition-colors">
                <i className="fas fa-calendar-check mr-2"></i>Attendance
              </Link>
              <button className="flex-1 bg-yellow-500/20 text-yellow-300 py-2 rounded-lg hover:bg-yellow-500/30 transition-colors">
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-green-900 rounded-3xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Class</h2>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <form className="space-y-4">
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
                    {['A','B','C','D'].map(sec => (
                      <option key={sec} className="bg-gray-800">Section {sec}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-2">Class Teacher</label>
                <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white">
                  <option className="bg-gray-800">Prof. Ahmad Raza</option>
                  <option className="bg-gray-800">Mrs. Fatima Hassan</option>
                  <option className="bg-gray-800">Mr. Mohammad Ali</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2">Classroom</label>
                <input type="text" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white" placeholder="e.g., Room 101" />
              </div>
              
              <div>
                <label className="block text-white mb-2">Subjects</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'Urdu', 'Islamiat', 'Computer'].map(subject => (
                    <label key={subject} className="flex items-center space-x-2 text-white">
                      <input type="checkbox" className="form-checkbox bg-white/20 border-white/30" />
                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 rounded-xl font-bold">
                  Create Class
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