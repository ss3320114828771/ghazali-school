'use client'

import { useState } from 'react'

interface Student {
  id: number
  name: string
  rollNo: string
  status: 'present' | 'absent' | 'late' | 'leave'
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedClass, setSelectedClass] = useState('10-A')
  const [showSummary, setShowSummary] = useState(false)

  const [students] = useState<Student[]>([
    { id: 1, name: 'Ali Ahmed', rollNo: '101', status: 'present' },
    { id: 2, name: 'Bilal Hassan', rollNo: '102', status: 'present' },
    { id: 3, name: 'Sara Fatima', rollNo: '103', status: 'absent' },
    { id: 4, name: 'Zainab Bibi', rollNo: '104', status: 'late' },
    { id: 5, name: 'Hamza Ali', rollNo: '105', status: 'present' },
    { id: 6, name: 'Ayesha Khan', rollNo: '106', status: 'leave' },
    { id: 7, name: 'Usman Ali', rollNo: '107', status: 'present' },
    { id: 8, name: 'Fatima Zahra', rollNo: '108', status: 'present' },
  ])

  const updateStatus = (studentId: number, newStatus: Student['status']) => {
    // Update status logic here
    console.log('Updating student', studentId, 'to', newStatus)
  }

  const stats = {
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
    leave: students.filter(s => s.status === 'leave').length,
    total: students.length
  }

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-8">Attendance Management</h1>

      {/* Controls */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-white mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {['9-A', '9-B', '10-A', '10-B', '8-A', '8-B'].map(cls => (
                <option key={cls} className="bg-gray-800">{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">Action</label>
            <button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-500 hover:to-purple-600">
              <i className="fas fa-save mr-2"></i>
              Save Attendance
            </button>
          </div>
          <div>
            <label className="block text-white mb-2">Report</label>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-500 hover:to-teal-600"
            >
              <i className="fas fa-chart-pie mr-2"></i>
              {showSummary ? 'Hide' : 'Show'} Summary
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {showSummary && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4">
            <p className="text-white/80 text-sm">Total Students</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4">
            <p className="text-white/80 text-sm">Present</p>
            <p className="text-3xl font-bold text-white">{stats.present}</p>
            <p className="text-white/60 text-sm">{((stats.present/stats.total)*100).toFixed(1)}%</p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4">
            <p className="text-white/80 text-sm">Absent</p>
            <p className="text-3xl font-bold text-white">{stats.absent}</p>
            <p className="text-white/60 text-sm">{((stats.absent/stats.total)*100).toFixed(1)}%</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4">
            <p className="text-white/80 text-sm">Late</p>
            <p className="text-3xl font-bold text-white">{stats.late}</p>
            <p className="text-white/60 text-sm">{((stats.late/stats.total)*100).toFixed(1)}%</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4">
            <p className="text-white/80 text-sm">On Leave</p>
            <p className="text-3xl font-bold text-white">{stats.leave}</p>
            <p className="text-white/60 text-sm">{((stats.leave/stats.total)*100).toFixed(1)}%</p>
          </div>
        </div>
      )}

      {/* Attendance Table */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-4 px-4 text-white">Roll No</th>
                <th className="text-left py-4 px-4 text-white">Student Name</th>
                <th className="text-left py-4 px-4 text-white">Status</th>
                <th className="text-left py-4 px-4 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-4 px-4 text-white">{student.rollNo}</td>
                  <td className="py-4 px-4 text-white">{student.name}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      student.status === 'present' ? 'bg-green-500/20 text-green-300' :
                      student.status === 'absent' ? 'bg-red-500/20 text-red-300' :
                      student.status === 'late' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateStatus(student.id, 'present')}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          student.status === 'present' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        }`}
                      >
                        P
                      </button>
                      <button
                        onClick={() => updateStatus(student.id, 'absent')}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          student.status === 'absent' 
                            ? 'bg-red-500 text-white' 
                            : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                        }`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => updateStatus(student.id, 'late')}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          student.status === 'late' 
                            ? 'bg-yellow-500 text-white' 
                            : 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'
                        }`}
                      >
                        L
                      </button>
                      <button
                        onClick={() => updateStatus(student.id, 'leave')}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          student.status === 'leave' 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                        }`}
                      >
                        LV
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}