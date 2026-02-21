'use client'

import React from 'react'

interface TableProps {
  children: React.ReactNode
  className?: string
}

interface TableHeaderProps {
  children: React.ReactNode
  className?: string
}

interface TableBodyProps {
  children: React.ReactNode
  className?: string
}

interface TableRowProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

interface TableCellProps {
  children: React.ReactNode
  className?: string
  colSpan?: number
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-left ${className}`}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className = '' }: TableHeaderProps) {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className = '' }: TableBodyProps) {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className = '', onClick }: TableRowProps) {
  return (
    <tr 
      className={`hover:bg-gray-50 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export function TableHeaderCell({ children, className = '' }: TableCellProps) {
  return (
    <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  )
}

export function TableCell({ children, className = '', colSpan }: TableCellProps) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`} colSpan={colSpan}>
      {children}
    </td>
  )
}