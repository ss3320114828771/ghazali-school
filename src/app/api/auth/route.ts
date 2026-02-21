import { NextResponse } from 'next/server'

const users = [
  { id: '1', name: 'Admin', email: 'admin@school.com', password: '123456', role: 'admin' },
  { id: '2', name: 'Teacher', email: 'teacher@school.com', password: '123456', role: 'teacher' },
]

export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    return NextResponse.json({ error: 'Invalid' }, { status: 401 })
  }

  const { password: _, ...userData } = user
  const token = Buffer.from(JSON.stringify(userData)).toString('base64')
  
  return NextResponse.json({ 
    success: true, 
    user: userData,
    token 
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  
  if (!token) {
    return NextResponse.json({ error: 'No token' }, { status: 401 })
  }

  try {
    const userData = JSON.parse(Buffer.from(token, 'base64').toString())
    return NextResponse.json({ user: userData })
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}