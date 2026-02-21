'use client'

import React, { useState } from 'react'

// Simple form component with NO ERRORS
export default function ClassForm() {
  const [className, setClassName] = useState('')
  const [section, setSection] = useState('')
  const [teacher, setTeacher] = useState('')
  const [room, setRoom] = useState('')
  const [capacity, setCapacity] = useState(40)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Class ${className}-${section} created!`)
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Create New Class</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Class Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Class Name</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Class</option>
            <option value="Nursery">Nursery</option>
            <option value="Prep">Prep</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>

        {/* Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>

        {/* Class Teacher */}
        <div>
          <label className="block text-sm font-medium mb-1">Class Teacher</label>
          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Teacher</option>
            <option value="Prof. Ahmad Raza">Prof. Ahmad Raza</option>
            <option value="Mrs. Fatima Hassan">Mrs. Fatima Hassan</option>
            <option value="Mr. Mohammad Ali">Mr. Mohammad Ali</option>
            <option value="Ms. Sara Khan">Ms. Sara Khan</option>
          </select>
        </div>

        {/* Room */}
        <div>
          <label className="block text-sm font-medium mb-1">Room</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="e.g., Room 101"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium mb-1">Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value))}
            min="1"
            max="100"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Class
        </button>
      </form>
    </div>
  )
}