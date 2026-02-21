'use client'

import React, { useState } from 'react'

// ============================================
// SIMPLE TYPES
// ============================================

export interface ContactProps {
  schoolName?: string
  address?: string
  phone?: string
  email?: string
  principalName?: string
  principalContact?: string
  mapUrl?: string
  className?: string
}

// ============================================
// CONTACT INFO CARD COMPONENT
// ============================================

interface ContactCardProps {
  icon: string
  title: string
  content: string
  link?: string
}

function ContactCard({ icon, title, content, link }: ContactCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-700 mb-1">{title}</h3>
          {link ? (
            <a
              href={link}
              className="text-green-600 hover:text-green-700 text-sm break-all"
            >
              {content}
            </a>
          ) : (
            <p className="text-gray-600 text-sm break-all">{content}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// CONTACT FORM COMPONENT
// ============================================

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to an API
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-600">Your message has been sent. We'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="03XX-XXXXXXX"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type your message here..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-lg hover:from-green-700 hover:to-teal-700 transition-colors"
      >
        Send Message
      </button>
    </form>
  )
}

// ============================================
// MAP COMPONENT (Simple Placeholder)
// ============================================

export function MapPlaceholder({ address }: { address: string }) {
  return (
    <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-200">
      <div className="text-5xl mb-3">🗺️</div>
      <p className="text-gray-600 mb-2">Map Location</p>
      <p className="text-sm text-gray-500">{address}</p>
      <p className="text-xs text-gray-400 mt-4">Interactive map would be embedded here</p>
    </div>
  )
}

// ============================================
// MAIN CONTACT COMPONENT
// ============================================

export function Contact({
  schoolName = 'Ghazali High School',
  address = 'Adlana, Tehsil Bhawana, District Chiniot',
  phone = '0308-4591993',
  email = 'info@ghazalihigh.edu.pk',
  principalName = 'Hafiz Sajid Syed',
  principalContact = '0308-4591993',
  mapUrl,
  className = ''
}: ContactProps) {
  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any queries or information about admissions, academics, or general inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
            
            <div className="space-y-3">
              <ContactCard
                icon="📍"
                title="Address"
                content={address}
              />
              
              <ContactCard
                icon="📞"
                title="Phone"
                content={phone}
                link={`tel:${phone}`}
              />
              
              <ContactCard
                icon="✉️"
                title="Email"
                content={email}
                link={`mailto:${email}`}
              />
              
              <ContactCard
                icon="👤"
                title="Principal"
                content={`${principalName} - ${principalContact}`}
                link={`tel:${principalContact}`}
              />
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  f
                </a>
                <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  t
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                  ig
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  yt
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Send a Message</h3>
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Location</h3>
          {mapUrl ? (
            <iframe
              src={mapUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
              title="School Location"
            />
          ) : (
            <MapPlaceholder address={address} />
          )}
        </div>

        {/* Principal Message Card */}
        <div className="mt-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <p className="text-sm opacity-90">Principal's Message</p>
                <p className="text-xl font-bold">{principalName}</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm opacity-90">Direct Contact</p>
              <a href={`tel:${principalContact}`} className="text-xl font-bold hover:underline">
                {principalContact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// SIMPLE CONTACT (Minimal Version)
// ============================================

export function SimpleContact({
  phone = '0308-4591993',
  email = 'info@ghazalihigh.edu.pk'
}: {
  phone?: string
  email?: string
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Contact Info</h3>
      <div className="space-y-2 text-sm">
        <p className="flex items-center text-gray-600">
          <span className="w-6">📞</span>
          <a href={`tel:${phone}`} className="hover:text-green-600">{phone}</a>
        </p>
        <p className="flex items-center text-gray-600">
          <span className="w-6">✉️</span>
          <a href={`mailto:${email}`} className="hover:text-green-600">{email}</a>
        </p>
        <p className="flex items-center text-gray-600">
          <span className="w-6">📍</span>
          <span>Adlana, Bhawana, Chiniot</span>
        </p>
      </div>
    </div>
  )
}

// ============================================
// QUICK CONTACT BUTTONS
// ============================================

export function QuickContactButtons() {
  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col space-y-2">
      <a
        href="tel:03084591993"
        className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
        title="Call Us"
      >
        📞
      </a>
      <a
        href="https://wa.me/923084591993"
        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        title="WhatsApp"
      >
        💬
      </a>
      <a
        href="mailto:info@ghazalihigh.edu.pk"
        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        title="Email"
      >
        ✉️
      </a>
    </div>
  )
}

// ============================================
// CONTACT SKELETON LOADER
// ============================================

export function ContactSkeleton() {
  return (
    <div className="py-12 bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-96 max-w-full mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i}>
                  <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default Contact