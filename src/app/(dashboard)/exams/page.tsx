'use client'

import { useState } from 'react'

interface Exam {
  id: number
  name: string
  type: 'midterm' | 'final' | 'quarterly'
  class: string
  date: string
  subjects: {
    name: string
    date: string
    time: string
    duration: string
  }[]
  status: 'upcoming' | 'ongoing' | 'completed'
}

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'completed'>('upcoming')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)

  const [exams] = useState<Exam[]>([
    {
      id: 1,
      name: 'Mid-Term Examinations 2024',
      type: 'midterm',
      class: '10',
      date: '2024-03-15',
      subjects: [
        { name: 'Mathematics', date: '2024-03-15', time: '09:00 AM', duration: '3 hours' },
        { name: 'Physics', date: '2024-03-16', time: '09:00 AM', duration: '3 hours' },
        { name: 'Chemistry', date: '2024-03-17', time: '09:00 AM', duration: '3 hours' },
        { name: 'English', date: '2024-03-18', time: '09:00 AM', duration: '3 hours' },
        { name: 'Urdu', date: '2024-03-19', time: '09:00 AM', duration: '3 hours' },
      ],
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Final Term Examinations 2024',
      type: 'final',
      class: '9',
      date: '2024-02-01',
      subjects: [
        { name: 'Mathematics', date: '2024-02-01', time: '09:00 AM', duration: '3 hours' },
        { name: 'Science', date: '2024-02-02', time: '09:00 AM', duration: '3 hours' },
        { name: 'English', date: '2024-02-03', time: '09:00 AM', duration: '3 hours' },
        { name: 'Urdu', date: '2024-02-04', time: '09:00 AM', duration: '3 hours' },
        { name: 'Islamiat', date: '2024-02-05', time: '09:00 AM', duration: '3 hours' },
      ],
      status: 'ongoing'
    },
    {
      id: 3,
      name: 'Quarterly Examinations 2024',
      type: 'quarterly',
      class: '8',
      date: '2024-01-10',
      subjects: [
        { name: 'Mathematics', date: '2024-01-10', time: '09:00 AM', duration: '3 hours' },
        { name: 'Science', date: '2024-01-11', time: '09:00 AM', duration: '3 hours' },
        { name: 'English', date: '2024-01-12', time: '09:00 AM', duration: '3 hours' },
        { name: 'Urdu', date: '2024-01-13', time: '09:00 AM', duration: '3 hours' },
      ],
      status: 'completed'
    }
  ])

  const filteredExams = exams.filter(exam => exam.status === activeTab)

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Examinations Management</h1>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-plus mr-2"></i>
          Schedule New Exam
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        {(['upcoming', 'ongoing', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-bold capitalize transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {tab} Exams
          </button>
        ))}
      </div>

      {/* Exams List */}
      <div className="space-y-6">
        {filteredExams.length > 0 ? (
          filteredExams.map(exam => (
            <div key={exam.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{exam.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                      Class {exam.class}
                    </span>
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      Start: {exam.date}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      exam.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-300' :
                      exam.status === 'ongoing' ? 'bg-green-500/20 text-green-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {exam.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {exam.status === 'ongoing' && (
                    <button
                      onClick={() => setShowResultsModal(true)}
                      className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      <i className="fas fa-edit mr-2"></i>
                      Enter Results
                    </button>
                  )}
                  <button className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
                    <i className="fas fa-eye mr-2"></i>
                    View Details
                  </button>
                </div>
              </div>

              {/* Subjects Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-white">Subject</th>
                      <th className="text-left py-3 px-4 text-white">Date</th>
                      <th className="text-left py-3 px-4 text-white">Time</th>
                      <th className="text-left py-3 px-4 text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.subjects.map((subject, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4 text-white">{subject.name}</td>
                        <td className="py-3 px-4 text-white">{subject.date}</td>
                        <td className="py-3 px-4 text-white">{subject.time}</td>
                        <td className="py-3 px-4 text-white">{subject.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
            <i className="fas fa-calendar-times text-6xl text-white/30 mb-4"></i>
            <p className="text-white/60 text-xl">No {activeTab} exams found</p>
          </div>
        )}
      </div>

      {/* Schedule Exam Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Schedule New Examination</h2>
              <button 
                onClick={() => setShowScheduleModal(false)} 
                className="text-white/60 hover:text-white transition-colors"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-white mb-2">Exam Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  placeholder="e.g., Mid-Term Examinations 2024" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Exam Type</label>
                  <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option className="bg-gray-800">Mid-Term</option>
                    <option className="bg-gray-800">Final Term</option>
                    <option className="bg-gray-800">Quarterly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">Class</label>
                  <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} className="bg-gray-800">Class {num}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-2">Subjects Schedule</label>
                <div className="space-y-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <input 
                        type="text" 
                        placeholder="Subject" 
                        className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" 
                      />
                      <input 
                        type="date" 
                        className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" 
                      />
                      <input 
                        type="time" 
                        className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" 
                      />
                      <input 
                        type="text" 
                        placeholder="Duration" 
                        className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 rounded-xl font-bold hover:from-purple-500 hover:to-pink-600 transition-all duration-300"
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Schedule Exam
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowScheduleModal(false)} 
                  className="flex-1 bg-red-500/20 text-red-300 py-3 rounded-xl font-bold hover:bg-red-500/30 transition-colors"
                >
                  <i className="fas fa-times mr-2"></i>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enter Results Modal */}
      {showResultsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-green-900 rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Enter Exam Results</h2>
              <button 
                onClick={() => setShowResultsModal(false)} 
                className="text-white/60 hover:text-white transition-colors"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-white mb-2">Select Subject</label>
              <select className="w-full md:w-64 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400">
                <option className="bg-gray-800">Mathematics</option>
                <option className="bg-gray-800">Physics</option>
                <option className="bg-gray-800">Chemistry</option>
                <option className="bg-gray-800">English</option>
                <option className="bg-gray-800">Urdu</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-white">Roll No</th>
                    <th className="text-left py-3 px-4 text-white">Student Name</th>
                    <th className="text-left py-3 px-4 text-white">Marks (100)</th>
                    <th className="text-left py-3 px-4 text-white">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { roll: '101', name: 'Ali Ahmed' },
                    { roll: '102', name: 'Bilal Hassan' },
                    { roll: '103', name: 'Sara Fatima' },
                    { roll: '104', name: 'Zainab Bibi' },
                    { roll: '105', name: 'Hamza Ali' }
                  ].map((student, i) => (
                    <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4 text-white">{student.roll}</td>
                      <td className="py-3 px-4 text-white">{student.name}</td>
                      <td className="py-3 px-4">
                        <input 
                          type="number" 
                          min="0" 
                          max="100" 
                          className="w-20 px-2 py-1 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-400" 
                          placeholder="Marks"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select className="px-2 py-1 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-400">
                          <option className="bg-gray-800">A+</option>
                          <option className="bg-gray-800">A</option>
                          <option className="bg-gray-800">B</option>
                          <option className="bg-gray-800">C</option>
                          <option className="bg-gray-800">D</option>
                          <option className="bg-gray-800">F</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex space-x-4 pt-6">
              <button className="flex-1 bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 rounded-xl font-bold hover:from-green-500 hover:to-teal-600 transition-all duration-300">
                <i className="fas fa-save mr-2"></i>
                Save All Results
              </button>
              <button 
                onClick={() => setShowResultsModal(false)} 
                className="flex-1 bg-red-500/20 text-red-300 py-3 rounded-xl font-bold hover:bg-red-500/30 transition-colors"
              >
                <i className="fas fa-times mr-2"></i>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}