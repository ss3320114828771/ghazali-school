interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  fullWidth?: boolean
}

export default function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  onClick,
  fullWidth = false 
}: ButtonProps) {
  const variants = {
    primary: 'from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600',
    secondary: 'from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600',
    danger: 'from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return (
    <button
      onClick={onClick}
      className={`
        bg-gradient-to-r ${variants[variant]}
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''}
        text-white font-bold rounded-xl
        transform transition-all duration-300
        hover:scale-105 hover:shadow-xl
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
      `}
    >
      {children}
    </button>
  )
}