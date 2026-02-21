'use client'

import React, { useState, useEffect } from 'react'

// ============================================
// TYPES
// ============================================

export interface TeacherFormData {
  name: string
  email: string
  phone: string
  employeeId: string
  qualification: string
  specialization: string
  experience: number
  subjects: string[]
  classes: string[]
  joiningDate: string
  gender: 'male' | 'female'
  isClassTeacher: boolean
  classTeacherOf?: string
  address?: string
  emergencyContact?: string
  salary?: number
  bankAccount?: string
  bankName?: string
  profileImage?: string
}

export interface TeacherFormProps {
  initialData?: Partial<TeacherFormData>
  onSubmit: (data: TeacherFormData) => void
  onCancel?: () => void
  isLoading?: boolean
  className?: string
}

// ============================================
// CONSTANTS
// ============================================

const QUALIFICATIONS = [
  'PhD',
  'M.Phil',
  'Masters',
  'Bachelors',
  'Intermediate',
  'Diploma',
  'Certificate'
]

const SPECIALIZATIONS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English Literature',
  'Urdu Literature',
  'Islamic Studies',
  'Pakistan Studies',
  'Physical Education',
  'Arts',
  'Economics',
  'Commerce',
  'Statistics'
]

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'Urdu',
  'Islamiat',
  'Pakistan Studies',
  'Physical Education',
  'Arts',
  'Economics',
  'Commerce',
  'Statistics',
  'General Science',
  'Social Studies'
]

const CLASSES = [
  'Nursery',
  'Prep',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
]

const SECTIONS = ['A', 'B', 'C', 'D']

// ============================================
// FORM FIELD COMPONENTS
// ============================================

interface InputFieldProps {
  label: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  min?: string
  max?: string
}

function InputField({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  min,
  max
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Array<{ value: string; label: string }>
  error?: string
  required?: boolean
  disabled?: boolean
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

interface TextAreaFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  placeholder?: string
  rows?: number
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  rows = 3
}: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

interface CheckboxFieldProps {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
}

function CheckboxField({ label, checked, onChange, name }: CheckboxFieldProps) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}

interface MultiSelectFieldProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  error?: string
  required?: boolean
}

function MultiSelectField({
  label,
  options,
  selected,
  onChange,
  error,
  required = false
}: MultiSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option))
    } else {
      onChange([...selected, option])
    }
  }

  const selectAll = () => {
    onChange([...options])
  }

  const clearAll = () => {
    onChange([])
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-3 py-2 border rounded-lg bg-white cursor-pointer
          flex justify-between items-center
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        <span className="text-sm text-gray-700">
          {selected.length === 0
            ? `Select ${label}`
            : `${selected.length} selected`}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 border-b border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={selectAll}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-gray-600 hover:text-gray-800"
            >
              Clear All
            </button>
          </div>
          <div className="p-2">
            {options.map(option => (
              <label key={option} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

// ============================================
// MAIN TEACHER FORM COMPONENT
// ============================================

export function TeacherForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  className = ''
}: TeacherFormProps) {
  const [formData, setFormData] = useState<TeacherFormData>({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    qualification: '',
    specialization: '',
    experience: 0,
    subjects: [],
    classes: [],
    joiningDate: new Date().toISOString().split('T')[0],
    gender: 'male',
    isClassTeacher: false,
    address: '',
    emergencyContact: '',
    salary: undefined,
    bankAccount: '',
    bankName: '',
    profileImage: '',
    ...initialData
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<'basic' | 'academic' | 'contact' | 'financial'>('basic')

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  // Handle multi-select change
  const handleMultiSelectChange = (field: keyof TeacherFormData, selected: string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: selected
    }))

    // Clear error for this field
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field as string]
        return newErrors
      })
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Basic Information
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^03[0-9]{2}[0-9]{7}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = 'Invalid phone number (format: 03XX-XXXXXXX)'
    }
    if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'

    // Academic Information
    if (!formData.qualification) newErrors.qualification = 'Qualification is required'
    if (!formData.specialization) newErrors.specialization = 'Specialization is required'
    if (formData.experience < 0) newErrors.experience = 'Experience cannot be negative'
    if (formData.subjects.length === 0) newErrors.subjects = 'At least one subject is required'
    if (formData.classes.length === 0) newErrors.classes = 'At least one class is required'
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required'

    // Class Teacher validation
    if (formData.isClassTeacher && !formData.classTeacherOf) {
      newErrors.classTeacherOf = 'Please select which class'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  // Generate class options with sections
  const classOptions = CLASSES.flatMap(className =>
    SECTIONS.map(section => ({
      value: `${className}-${section}`,
      label: `Class ${className} - Section ${section}`
    }))
  )

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`
              py-2 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'basic'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Basic Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('academic')}
            className={`
              py-2 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'academic'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Academic Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`
              py-2 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'contact'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Contact Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('financial')}
            className={`
              py-2 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'financial'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Financial Details
          </button>
        </nav>
      </div>

      {/* Basic Information Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              placeholder="Enter teacher's full name"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              placeholder="teacher@school.edu"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              placeholder="03XX-XXXXXXX"
            />

            <InputField
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              error={errors.employeeId}
              required
              placeholder="T-101"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' }
              ]}
              error={errors.gender}
              required
            />

            <InputField
              label="Profile Image URL"
              name="profileImage"
              value={formData.profileImage || ''}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      )}

      {/* Academic Details Tab */}
      {activeTab === 'academic' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              options={QUALIFICATIONS.map(q => ({ value: q, label: q }))}
              error={errors.qualification}
              required
            />

            <SelectField
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              options={SPECIALIZATIONS.map(s => ({ value: s, label: s }))}
              error={errors.specialization}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Experience (years)"
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              error={errors.experience}
              required
              min="0"
              max="50"
            />

            <InputField
              label="Joining Date"
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleChange}
              error={errors.joiningDate}
              required
            />
          </div>

          <MultiSelectField
            label="Subjects"
            options={SUBJECTS}
            selected={formData.subjects}
            onChange={(selected) => handleMultiSelectChange('subjects', selected)}
            error={errors.subjects}
            required
          />

          <MultiSelectField
            label="Classes"
            options={classOptions.map(c => c.value)}
            selected={formData.classes}
            onChange={(selected) => handleMultiSelectChange('classes', selected)}
            error={errors.classes}
            required
          />

          <div className="space-y-4">
            <CheckboxField
              label="Is Class Teacher?"
              checked={formData.isClassTeacher}
              onChange={handleCheckboxChange}
              name="isClassTeacher"
            />

            {formData.isClassTeacher && (
              <SelectField
                label="Class Teacher Of"
                name="classTeacherOf"
                value={formData.classTeacherOf || ''}
                onChange={handleChange}
                options={classOptions}
                error={errors.classTeacherOf}
                required
              />
            )}
          </div>
        </div>
      )}

      {/* Contact Information Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-4">
          <TextAreaField
            label="Address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            placeholder="Enter complete address"
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Emergency Contact"
              name="emergencyContact"
              value={formData.emergencyContact || ''}
              onChange={handleChange}
              placeholder="03XX-XXXXXXX"
            />
          </div>
        </div>
      )}

      {/* Financial Details Tab */}
      {activeTab === 'financial' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Monthly Salary"
              name="salary"
              type="number"
              value={formData.salary !== undefined ? formData.salary : ''}
              onChange={handleChange}
              placeholder="50000"
              min="15000"
            />

            <InputField
              label="Bank Account Number"
              name="bankAccount"
              value={formData.bankAccount || ''}
              onChange={handleChange}
              placeholder="1234567890"
            />
          </div>

          <InputField
            label="Bank Name"
            name="bankName"
            value={formData.bankName || ''}
            onChange={handleChange}
            placeholder="Habib Bank"
          />
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <span>{initialData ? 'Update Teacher' : 'Add Teacher'}</span>
          )}
        </button>
      </div>
    </form>
  )
}

// ============================================
// TEACHER FORM SKELETON LOADER
// ============================================

export function TeacherFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex space-x-8 border-b border-gray-200 pb-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div>
          <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <div className="h-10 bg-gray-200 rounded w-20"></div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default TeacherForm