export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-PK', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const calculatePercentage = (obtained: number, total: number): number => {
  return Math.round((obtained / total) * 100)
}

export const getGradeFromPercentage = (percentage: number): string => {
  if (percentage >= 90) return 'A+'
  if (percentage >= 80) return 'A'
  if (percentage >= 70) return 'B'
  if (percentage >= 60) return 'C'
  if (percentage >= 50) return 'D'
  return 'F'
}

export const generateRollNumber = (classNum: string, section: string, index: number): string => {
  return `${classNum}${section}${String(index + 1).padStart(3, '0')}`
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
  }).format(amount)
}