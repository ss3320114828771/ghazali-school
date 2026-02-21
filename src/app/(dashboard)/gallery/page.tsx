'use client'

import { useState } from 'react'

interface GalleryImage {
  id: number
  title: string
  category: string
  date: string
  url: string
  description: string
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const [images] = useState<GalleryImage[]>([
    { id: 1, title: 'Sports Day 2024', category: 'events', date: '2024-02-15', url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=500', description: 'Annual sports day celebration' },
    { id: 2, title: 'Science Exhibition', category: 'academic', date: '2024-02-10', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500', description: 'Students showcasing science projects' },
    { id: 3, title: 'Independence Day', category: 'events', date: '2024-03-23', url: 'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=500', description: 'Flag hoisting ceremony' },
    { id: 4, title: 'Classroom Activities', category: 'academic', date: '2024-02-20', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500', description: 'Students in classroom' },
    { id: 5, title: 'Library Session', category: 'academic', date: '2024-02-18', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500', description: 'Reading session in library' },
    { id: 6, title: 'Cricket Match', category: 'sports', date: '2024-02-05', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500', description: 'Inter-class cricket tournament' },
    { id: 7, title: 'Art Competition', category: 'cultural', date: '2024-01-25', url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500', description: 'Student art exhibition' },
    { id: 8, title: 'Award Ceremony', category: 'events', date: '2024-01-30', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500', description: 'Annual prize distribution' },
  ])

  const categories = ['all', 'academic', 'sports', 'cultural', 'events']

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  const currentImage = selectedImage ? images.find(img => img.id === selectedImage) : null
  const currentIndex = selectedImage ? filteredImages.findIndex(img => img.id === selectedImage) : -1

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Photo Gallery</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:from-pink-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-upload mr-2"></i>
          Upload Photos
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-xl font-bold capitalize transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map(image => (
            <div
              key={image.id}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="aspect-square">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold">{image.title}</h3>
                  <p className="text-white/60 text-sm">{image.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
          <i className="fas fa-images text-6xl text-white/30 mb-4"></i>
          <p className="text-white/60 text-xl">No images found in this category</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && currentImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl z-10"
            aria-label="Close"
          >
            <i className="fas fa-times"></i>
          </button>
          
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setSelectedImage(filteredImages[currentIndex - 1].id)
              }
            }}
            className={`absolute left-4 text-white/60 hover:text-white text-4xl z-10 transition-all ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex === 0}
            aria-label="Previous image"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button
            onClick={() => {
              if (currentIndex < filteredImages.length - 1) {
                setSelectedImage(filteredImages[currentIndex + 1].id)
              }
            }}
            className={`absolute right-4 text-white/60 hover:text-white text-4xl z-10 transition-all ${
              currentIndex === filteredImages.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex === filteredImages.length - 1}
            aria-label="Next image"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="relative max-w-4xl max-h-[80vh] w-full px-4">
            <img 
              src={currentImage.url} 
              alt={currentImage.title}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-2xl font-bold text-white">{currentImage.title}</h3>
              <p className="text-white/80">{currentImage.description}</p>
              <p className="text-white/60 text-sm mt-2">
                {currentImage.date} • {currentImage.category}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-pink-900 rounded-3xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Upload Photos</h2>
              <button 
                onClick={() => setShowUploadModal(false)} 
                className="text-white/60 hover:text-white transition-colors"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-pink-400 transition-colors cursor-pointer">
                <i className="fas fa-cloud-upload-alt text-4xl text-white/50 mb-4"></i>
                <p className="text-white/80 mb-2">Drag & drop photos here</p>
                <p className="text-white/60 text-sm mb-4">or</p>
                <button className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-lg font-bold hover:from-pink-500 hover:to-purple-600">
                  Browse Files
                </button>
                <p className="text-white/40 text-xs mt-4">Supported: JPG, PNG, GIF (Max 10MB)</p>
              </div>
              
              <div>
                <label className="block text-white mb-2">Category</label>
                <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400">
                  <option className="bg-gray-800">Academic</option>
                  <option className="bg-gray-800">Sports</option>
                  <option className="bg-gray-800">Cultural</option>
                  <option className="bg-gray-800">Events</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2">Description</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400" 
                  placeholder="Enter image description"
                ></textarea>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-xl font-bold hover:from-pink-500 hover:to-purple-600">
                  Upload Photos
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowUploadModal(false)} 
                  className="flex-1 bg-red-500/20 text-red-300 py-3 rounded-xl font-bold hover:bg-red-500/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}