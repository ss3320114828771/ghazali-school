'use client'

import React, { useState } from 'react'

// ============================================
// SIMPLE EVENT FORM
// ============================================

interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  endTime?: string
  venue: string
  type: 'academic' | 'sports' | 'cultural' | 'holiday' | 'meeting'
  allDay: boolean
}

interface EventFormProps {
  initialData?: Partial<EventFormData>
  onSubmit?: (data: EventFormData) => void
  onCancel?: () => void
  isLoading?: boolean
}

const DEFAULT_DATA: EventFormData = {
  title: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  time: '09:00',
  endTime: '17:00',
  venue: '',
  type: 'academic',
  allDay: false
}

export default function EventForm({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false
}: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    ...DEFAULT_DATA,
    ...initialData
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const updatedErrors = { ...prev }
        delete updatedErrors[name]
        return updatedErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.venue) newErrors.venue = 'Venue is required'
    
    if (!formData.allDay) {
      if (!formData.time) newErrors.time = 'Start time is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm() && onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">
        {initialData.title ? 'Edit Event' : 'Create New Event'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Sports Gala 2024"
            className={`w-full px-3 py-2 border rounded-lg ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Enter event description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Date and All Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
          </div>

          <div className="flex items-center mt-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="allDay"
                checked={formData.allDay}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">All Day Event</span>
            </label>
          </div>
        </div>

        {/* Time (if not all day) */}
        {!formData.allDay && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Venue <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="e.g., School Auditorium"
            className={`w-full px-3 py-2 border rounded-lg ${
              errors.venue ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.venue && <p className="text-xs text-red-500 mt-1">{errors.venue}</p>}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="academic">Academic</option>
            <option value="sports">Sports</option>
            <option value="cultural">Cultural</option>
            <option value="holiday">Holiday</option>
            <option value="meeting">Meeting</option>
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex gap-2 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : initialData.title ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  )
}

// ============================================
// SIMPLE EVENT FORM (Minimal)
// ============================================

export function SimpleEventForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) onSubmit({ title, date, time })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">
        Add Event
      </button>
    </form>
  )
}

// ============================================
// QUICK EVENT FORM (Compact)
// ============================================

export function QuickEventForm() {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title) {
      alert(`Event "${title}" created!`)
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quick add event..."
        className="flex-1 p-2 border rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        Add
      </button>
    </form>
  )
}

// ============================================
// EVENT FORM SKELETON
// ============================================

export function EventFormSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="space-y-4">
        <div>
          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-2 pt-4">
          <div className="flex-1 h-10 bg-gray-200 rounded"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}