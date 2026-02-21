interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export default function Card({ children, className = '', hover = true, glass = true }: CardProps) {
  return (
    <div
      className={`
        ${glass ? 'backdrop-blur-lg bg-white/10 border border-white/20' : 'bg-white'}
        rounded-2xl p-6
        ${hover ? 'transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}