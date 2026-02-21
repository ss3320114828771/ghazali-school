'use client'

import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: string
}

export default function Input({ 
  label, 
  error, 
  icon, 
  className = '', 
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-white mb-2">
          {icon && <i className={`fas fa-${icon} mr-2`}></i>}
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          className={`
            w-full px-4 py-3 
            bg-white/20 border 
            ${error ? 'border-red-400' : 'border-white/30'} 
            rounded-xl text-white 
            placeholder-white/50 
            focus:outline-none focus:ring-2 
            ${error ? 'focus:ring-red-400' : 'focus:ring-blue-400'}
            transition-all duration-300
            ${className}
          `}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">
          <i className="fas fa-exclamation-circle mr-1"></i>
          {error}
        </p>
      )}
    </div>
  )
}