'use client'

import { useState } from 'react'

interface TimeSlot {
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
}

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState('10-A')
  const [selectedDay, setSelectedDay] = useState('all')
  const [showEditModal, setShowEditModal] = useState(false)

  const [timetable] = useState<TimeSlot[]>([
    { time: '08:00 - 08:45', monday: 'Mathematics', tuesday: 'Physics', wednesday: 'Chemistry', thursday: 'English', friday: 'Urdu' },
    { time: '08:45 - 09:30', monday: 'Physics', tuesday: 'Chemistry', wednesday: 'Mathematics', thursday: 'Urdu', friday: 'English' },
    { time: '09:30 - 10:15', monday: 'Chemistry', tuesday: 'Mathematics', wednesday: 'Physics', thursday: 'Islamiat', friday: 'Computer' },
    { time: '10:15 - 10:45', monday: 'Break', tuesday: 'Break', wednesday: 'Break', thursday: 'Break', friday: 'Break' },
    { time: '10:45 - 11:30', monday: 'English', tuesday: 'Urdu', wednesday: 'Islamiat', thursday: 'Mathematics', friday: 'Physics' },
    { time: '11:30 - 12:15', monday: 'Urdu', tuesday: 'English', wednesday: 'Computer', thursday: 'Chemistry', friday: 'Mathematics' },
    { time: '12:15 - 13:00', monday: 'Islamiat', tuesday: 'Computer', wednesday: 'English', thursday: 'Physics', friday: 'Chemistry' },
  ])

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Class Timetable</h1>
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-edit mr-2"></i>
          Edit Timetable
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white mb-2">Select Class</label>
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
            <label className="block text-white mb-2">Filter by Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all" className="bg-gray-800">All Days</option>
              {days.map(day => (
                <option key={day} value={day} className="bg-gray-800 capitalize">{day}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-500 hover:to-teal-600">
              <i className="fas fa-print mr-2"></i>
              Print Timetable
            </button>
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-4 px-4 text-white">Time / Day</th>
              <th className="text-left py-4 px-4 text-white">Monday</th>
              <th className="text-left py-4 px-4 text-white">Tuesday</th>
              <th className="text-left py-4 px-4 text-white">Wednesday</th>
              <th className="text-left py-4 px-4 text-white">Thursday</th>
              <th className="text-left py-4 px-4 text-white">Friday</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((slot, index) => (
              <tr key={index} className={`border-b border-white/10 hover:bg-white/5 ${slot.time.includes('Break') ? 'bg-yellow-500/10' : ''}`}>
                <td className="py-4 px-4 text-white font-medium">{slot.time}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    slot.monday === 'Break' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {slot.monday}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    slot.tuesday === 'Break' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'
                  }`}>
                    {slot.tuesday}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    slot.wednesday === 'Break' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-purple-500/20 text-purple-300'
                  }`}>
                    {slot.wednesday}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    slot.thursday === 'Break' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-pink-500/20 text-pink-300'
                  }`}>
                    {slot.thursday}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    slot.friday === 'Break' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {slot.friday}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Timetable Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Timetable - Class {selectedClass}</h2>
              <button onClick={() => setShowEditModal(false)} className="text-white/60 hover:text-white">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {timetable.map((slot, index) => (
                <div key={index} className={`p-4 rounded-lg ${slot.time.includes('Break') ? 'bg-yellow-500/10' : 'bg-white/5'}`}>
                  <div className="grid grid-cols-6 gap-2 items-center">
                    <span className="text-white font-medium col-span-1">{slot.time}</span>
                    <input 
                      type="text" 
                      defaultValue={slot.monday} 
                      className="col-span-1 px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={slot.monday === 'Break'}
                    />
                    <input 
                      type="text" 
                      defaultValue={slot.tuesday} 
                      className="col-span-1 px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={slot.tuesday === 'Break'}
                    />
                    <input 
                      type="text" 
                      defaultValue={slot.wednesday} 
                      className="col-span-1 px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={slot.wednesday === 'Break'}
                    />
                    <input 
                      type="text" 
                      defaultValue={slot.thursday} 
                      className="col-span-1 px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={slot.thursday === 'Break'}
                    />
                    <input 
                      type="text" 
                      defaultValue={slot.friday} 
                      className="col-span-1 px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={slot.friday === 'Break'}
                    />
                  </div>
                </div>
              ))}
              
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-3 rounded-xl font-bold hover:from-blue-500 hover:to-purple-600">
                  <i className="fas fa-save mr-2"></i>
                  Save Changes
                </button>
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-red-500/20 text-red-300 py-3 rounded-xl font-bold hover:bg-red-500/30">
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