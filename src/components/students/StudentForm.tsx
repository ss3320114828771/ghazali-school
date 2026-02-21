'use client'

import React, { useState } from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface StudentFormData {
  name: string
  rollNo: string
  class: string
  section: string
  fatherName: string
  phone: string
  email: string
  address: string
  dateOfBirth: string
  gender: 'male' | 'female'
  feesStatus: 'paid' | 'pending' | 'partial'
  status: 'active' | 'inactive'
}

export interface StudentFormProps {
  initialData?: Partial<StudentFormData>
  onSubmit: (data: StudentFormData) => void
  onCancel?: () => void
  isLoading?: boolean
}

// ============================================
// CONSTANTS
// ============================================

const CLASSES = ['Nursery', 'Prep', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const SECTIONS = ['A', 'B', 'C', 'D']
const GENDERS = ['male', 'female'] as const
const FEE_STATUSES = ['paid', 'pending', 'partial'] as const
const STATUSES = ['active', 'inactive'] as const

// ============================================
// INPUT FIELD COMPONENT
// ============================================

interface InputFieldProps {
  label: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error
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
        className={`
          w-full px-3 py-2 border rounded-lg text-sm
          focus:outline-none focus:ring-2 focus:ring-green-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

// ============================================
// SELECT FIELD COMPONENT
// ============================================

interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  required?: boolean
  error?: string
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error
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
        className={`
          w-full px-3 py-2 border rounded-lg text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-green-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

// ============================================
// TEXTAREA FIELD COMPONENT
// ============================================

interface TextAreaFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  placeholder?: string
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  rows = 3,
  placeholder
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
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  )
}

// ============================================
// RADIO GROUP COMPONENT
// ============================================

interface RadioGroupProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  options: readonly string[]
  required?: boolean
}

function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  required = false
}: RadioGroupProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex space-x-4">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 capitalize">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// ============================================
// MAIN STUDENT FORM COMPONENT
// ============================================

export function StudentForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    rollNo: '',
    class: '',
    section: '',
    fatherName: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    gender: 'male',
    feesStatus: 'paid',
    status: 'active',
    ...initialData
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle radio change
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.rollNo) newErrors.rollNo = 'Roll number is required'
    if (!formData.class) newErrors.class = 'Class is required'
    if (!formData.section) newErrors.section = 'Section is required'
    if (!formData.fatherName) newErrors.fatherName = "Father's name is required"
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            error={errors.name}
            placeholder="Enter student name"
          />

          <InputField
            label="Roll Number"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
            error={errors.rollNo}
            placeholder="e.g., 101"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SelectField
            label="Class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            options={CLASSES}
            required
            error={errors.class}
          />

          <SelectField
            label="Section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            options={SECTIONS}
            required
            error={errors.section}
          />
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Father's Name"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
            error={errors.fatherName}
            placeholder="Enter father's name"
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            error={errors.phone}
            placeholder="03XX-XXXXXXX"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
            placeholder="student@example.com"
          />

          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            error={errors.dateOfBirth}
          />
        </div>

        <div className="mt-4">
          <RadioGroup
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleRadioChange}
            options={GENDERS}
            required
          />
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
        
        <TextAreaField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter complete address"
          rows={3}
        />
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Fee Status"
            name="feesStatus"
            value={formData.feesStatus}
            onChange={handleChange}
            options={FEE_STATUSES as unknown as string[]}
          />

          <SelectField
            label="Student Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={STATUSES as unknown as string[]}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Student' : 'Add Student'}
        </button>
      </div>
    </form>
  )
}

// ============================================
// SKELETON LOADER
// ============================================

export function StudentFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <div className="h-8 bg-gray-200 rounded w-16"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default StudentForm