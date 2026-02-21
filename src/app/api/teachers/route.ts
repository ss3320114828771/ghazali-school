import { NextResponse } from 'next/server'

// Simple teacher data
const teachers = [
  { id: '1', name: 'Prof. Ahmad Raza', subject: 'Mathematics', experience: '10 years' },
  { id: '2', name: 'Mrs. Fatima Hassan', subject: 'English', experience: '8 years' },
  { id: '3', name: 'Mr. Mohammad Ali', subject: 'Physics', experience: '12 years' },
  { id: '4', name: 'Ms. Sara Khan', subject: 'Chemistry', experience: '5 years' }
]

// GET - Get all teachers
export async function GET() {
  return NextResponse.json(teachers)
}

// POST - Add new teacher
export async function POST(request: Request) {
  const body = await request.json()
  const newTeacher = { id: String(Date.now()), ...body }
  teachers.push(newTeacher)
  return NextResponse.json(newTeacher, { status: 201 })
}