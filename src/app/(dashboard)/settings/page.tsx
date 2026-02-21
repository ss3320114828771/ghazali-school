'use client'

import { useState } from 'react'

interface Settings {
  schoolName: string
  principalName: string
  contact: string
  email: string
  address: string
  website: string
  established: string
  registrationNo: string
  academicYear: string
  semesterSystem: boolean
  lateFeeCharges: number
  examSystem: 'annual' | 'semester'
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  
  const [settings, setSettings] = useState<Settings>({
    schoolName: 'Ghazali High School',
    principalName: 'Hafiz Sajid Syed',
    contact: '0308-4591993',
    email: 'info@ghazalihigh.edu.pk',
    address: 'Adlana, Tehsil Bhawana, District Chiniot',
    website: 'www.ghazalihigh.edu.pk',
    established: '1995',
    registrationNo: 'GHS-2024-001',
    academicYear: '2024-2025',
    semesterSystem: true,
    lateFeeCharges: 50,
    examSystem: 'annual'
  })

  const handleSave = () => {
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">School Settings</h1>
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-save mr-2"></i>
          Save Changes
        </button>
      </div>

      {/* Success Message */}
      {showSaveSuccess && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
          <i className="fas fa-check-circle mr-2"></i>
          Settings saved successfully!
        </div>
      )}

      {/* Settings Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'general', label: 'General', icon: 'school' },
          { id: 'academic', label: 'Academic', icon: 'book' },
          { id: 'fees', label: 'Fees & Finance', icon: 'money-bill' },
          { id: 'notifications', label: 'Notifications', icon: 'bell' },
          { id: 'backup', label: 'Backup & Restore', icon: 'database' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-bold capitalize transition-all duration-300 flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <i className={`fas fa-${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">General Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">School Name</label>
                <input
                  type="text"
                  value={settings.schoolName}
                  onChange={(e) => setSettings({...settings, schoolName: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Principal Name</label>
                <input
                  type="text"
                  value={settings.principalName}
                  onChange={(e) => setSettings({...settings, principalName: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Contact Number</label>
                <input
                  type="text"
                  value={settings.contact}
                  onChange={(e) => setSettings({...settings, contact: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-white mb-2">Address</label>
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-white mb-2">Website</label>
                <input
                  type="text"
                  value={settings.website}
                  onChange={(e) => setSettings({...settings, website: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Established Year</label>
                <input
                  type="text"
                  value={settings.established}
                  onChange={(e) => setSettings({...settings, established: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Registration Number</label>
                <input
                  type="text"
                  value={settings.registrationNo}
                  onChange={(e) => setSettings({...settings, registrationNo: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Academic Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Academic Year</label>
                <select
                  value={settings.academicYear}
                  onChange={(e) => setSettings({...settings, academicYear: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option className="bg-gray-800">2023-2024</option>
                  <option className="bg-gray-800">2024-2025</option>
                  <option className="bg-gray-800">2025-2026</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2">Exam System</label>
                <select
                  value={settings.examSystem}
                  onChange={(e) => setSettings({...settings, examSystem: e.target.value as 'annual' | 'semester'})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="annual" className="bg-gray-800">Annual System</option>
                  <option value="semester" className="bg-gray-800">Semester System</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2">Enable Semester System</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSettings({...settings, semesterSystem: true})}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                      settings.semesterSystem 
                        ? 'bg-green-500/20 text-green-300 border-2 border-green-500' 
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setSettings({...settings, semesterSystem: false})}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                      !settings.semesterSystem 
                        ? 'bg-red-500/20 text-red-300 border-2 border-red-500' 
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Fees & Finance Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Late Fee Charges (per day)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">Rs.</span>
                  <input
                    type="number"
                    value={settings.lateFeeCharges}
                    onChange={(e) => setSettings({...settings, lateFeeCharges: parseInt(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">Fee Structure</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-yellow-500/30">
                      <th className="text-left py-3 px-4 text-yellow-300">Class</th>
                      <th className="text-left py-3 px-4 text-yellow-300">Monthly Fee</th>
                      <th className="text-left py-3 px-4 text-yellow-300">Annual Charges</th>
                      <th className="text-left py-3 px-4 text-yellow-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1,2,3,4,5,6,7,8,9,10].map(cls => (
                      <tr key={cls} className="border-b border-yellow-500/20">
                        <td className="py-3 px-4 text-white">Class {cls}</td>
                        <td className="py-3 px-4">
                          <input type="number" defaultValue={2000 + cls * 100} className="w-24 px-2 py-1 bg-white/10 border border-yellow-500/30 rounded text-white" />
                        </td>
                        <td className="py-3 px-4">
                          <input type="number" defaultValue={500 + cls * 50} className="w-24 px-2 py-1 bg-white/10 border border-yellow-500/30 rounded text-white" />
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-green-300 hover:text-green-400">
                            <i className="fas fa-save"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
            
            <div className="space-y-4">
              {[
                { id: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
                { id: 'sms', label: 'SMS Alerts', description: 'Get important alerts on phone' },
                { id: 'attendance', label: 'Attendance Alerts', description: 'Daily attendance reports' },
                { id: 'results', label: 'Result Notifications', description: 'Exam results announcements' },
                { id: 'events', label: 'Event Reminders', description: 'Upcoming event notifications' },
                { id: 'fees', label: 'Fee Reminders', description: 'Monthly fee due alerts' }
              ].map(notification => (
                <div key={notification.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h3 className="text-white font-bold">{notification.label}</h3>
                    <p className="text-white/60 text-sm">{notification.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:bg-gradient-to-r from-green-400 to-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Backup & Restore</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 text-center">
                <i className="fas fa-database text-5xl text-blue-300 mb-4"></i>
                <h3 className="text-xl font-bold text-white mb-2">Create Backup</h3>
                <p className="text-white/60 mb-4">Download a complete backup of all school data</p>
                <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-500 hover:to-purple-600">
                  <i className="fas fa-download mr-2"></i>
                  Download Backup
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-6 text-center">
                <i className="fas fa-upload text-5xl text-green-300 mb-4"></i>
                <h3 className="text-xl font-bold text-white mb-2">Restore Data</h3>
                <p className="text-white/60 mb-4">Restore from a previous backup file</p>
                <button className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-500 hover:to-teal-600">
                  <i className="fas fa-upload mr-2"></i>
                  Upload Backup
                </button>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Recent Backups</h3>
              <div className="space-y-3">
                {[
                  { date: '2024-03-15 10:30 AM', size: '245 MB', type: 'Auto' },
                  { date: '2024-03-14 06:00 PM', size: '243 MB', type: 'Manual' },
                  { date: '2024-03-13 10:30 AM', size: '242 MB', type: 'Auto' }
                ].map((backup, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-file-archive text-2xl text-yellow-300"></i>
                      <div>
                        <p className="text-white font-medium">Backup {backup.date}</p>
                        <p className="text-white/60 text-sm">{backup.size} • {backup.type}</p>
                      </div>
                    </div>
                    <button className="text-blue-300 hover:text-blue-400">
                      <i className="fas fa-download"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}