import { NextResponse } from 'next/server'

// Simple student data
const students = [
  { id: '1', name: 'Ali Ahmed', rollNo: '101', class: '10', section: 'A' },
  { id: '2', name: 'Bilal Hassan', rollNo: '102', class: '10', section: 'A' },
  { id: '3', name: 'Sara Fatima', rollNo: '201', class: '9', section: 'B' },
  { id: '4', name: 'Zainab Bibi', rollNo: '202', class: '9', section: 'B' },
  { id: '5', name: 'Hamza Ali', rollNo: '301', class: '8', section: 'A' }
]

// GET - Get all students
export async function GET() {
  return NextResponse.json(students)
}

// POST - Add new student
export async function POST(request: Request) {
  const body = await request.json()
  const newStudent = { id: String(Date.now()), ...body }
  students.push(newStudent)
  return NextResponse.json(newStudent, { status: 201 })
}