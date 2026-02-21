'use client'

import React, { useEffect } from 'react'

// ============================================
// ALERT TYPES
// ============================================

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'default'

export interface AlertProps {
  /** Alert message content */
  message: string
  /** Type of alert that determines color scheme */
  type?: AlertType
  /** Optional title for the alert */
  title?: string
  /** Whether alert can be dismissed */
  dismissible?: boolean
  /** Auto-dismiss after specified milliseconds (0 = no auto-dismiss) */
  autoDismiss?: number
  /** Callback when alert is closed */
  onClose?: () => void
  /** Additional CSS classes */
  className?: string
  /** Icon to show (overrides default type icon) */
  icon?: React.ReactNode
  /** Action buttons to show */
  actions?: React.ReactNode
  /** Whether to show the icon */
  showIcon?: boolean
}

// ============================================
// ICON COMPONENTS
// ============================================

const SuccessIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

const ErrorIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
)

const WarningIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
)

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// ============================================
// MAIN ALERT COMPONENT
// ============================================

export function Alert({
  message,
  type = 'default',
  title,
  dismissible = false,
  autoDismiss = 0,
  onClose,
  className = '',
  icon,
  actions,
  showIcon = true
}: AlertProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  // Handle auto-dismiss
  useEffect(() => {
    if (autoDismiss > 0 && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, autoDismiss)

      return () => clearTimeout(timer)
    }
  }, [autoDismiss, isVisible, onClose])

  // Handle close
  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  // Get alert styles based on type
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-400',
          icon: 'text-green-400',
          title: 'text-green-800',
          message: 'text-green-700',
          closeButton: 'text-green-400 hover:text-green-600'
        }
      case 'error':
        return {
          container: 'bg-red-50 border-red-400',
          icon: 'text-red-400',
          title: 'text-red-800',
          message: 'text-red-700',
          closeButton: 'text-red-400 hover:text-red-600'
        }
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-400',
          icon: 'text-yellow-400',
          title: 'text-yellow-800',
          message: 'text-yellow-700',
          closeButton: 'text-yellow-400 hover:text-yellow-600'
        }
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-400',
          icon: 'text-blue-400',
          title: 'text-blue-800',
          message: 'text-blue-700',
          closeButton: 'text-blue-400 hover:text-blue-600'
        }
      default:
        return {
          container: 'bg-gray-50 border-gray-400',
          icon: 'text-gray-400',
          title: 'text-gray-800',
          message: 'text-gray-700',
          closeButton: 'text-gray-400 hover:text-gray-600'
        }
    }
  }

  const styles = getAlertStyles()

  // Get icon based on type
  const getDefaultIcon = () => {
    switch (type) {
      case 'success':
        return <SuccessIcon />
      case 'error':
        return <ErrorIcon />
      case 'warning':
        return <WarningIcon />
      case 'info':
        return <InfoIcon />
      default:
        return null
    }
  }

  const displayIcon = icon || (showIcon && getDefaultIcon())

  return (
    <div
      className={`
        rounded-lg border p-4
        ${styles.container}
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start">
        {/* Icon */}
        {displayIcon && (
          <div className={`flex-shrink-0 mr-3 ${styles.icon}`}>
            {displayIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.title}`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${title ? 'mt-1' : ''} ${styles.message}`}>
            {message}
          </div>
          {actions && (
            <div className="mt-3 flex space-x-2">
              {actions}
            </div>
          )}
        </div>

        {/* Close button */}
        {dismissible && (
          <button
            onClick={handleClose}
            className={`
              flex-shrink-0 ml-3
              ${styles.closeButton}
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${type === 'success' ? 'focus:ring-green-500' : ''}
              ${type === 'error' ? 'focus:ring-red-500' : ''}
              ${type === 'warning' ? 'focus:ring-yellow-500' : ''}
              ${type === 'info' ? 'focus:ring-blue-500' : ''}
              ${type === 'default' ? 'focus:ring-gray-500' : ''}
            `}
            aria-label="Close alert"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================
// ALERT TITLE COMPONENT
// ============================================

interface AlertTitleProps {
  children: React.ReactNode
  className?: string
}

export function AlertTitle({ children, className = '' }: AlertTitleProps) {
  return (
    <h3 className={`text-sm font-medium ${className}`}>
      {children}
    </h3>
  )
}

// ============================================
// ALERT DESCRIPTION COMPONENT
// ============================================

interface AlertDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function AlertDescription({ children, className = '' }: AlertDescriptionProps) {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  )
}

// ============================================
// ALERT ACTIONS COMPONENT
// ============================================

interface AlertActionsProps {
  children: React.ReactNode
  className?: string
}

export function AlertActions({ children, className = '' }: AlertActionsProps) {
  return (
    <div className={`mt-3 flex space-x-2 ${className}`}>
      {children}
    </div>
  )
}

// ============================================
// ALERT CONTEXT FOR TOAST NOTIFICATIONS
// ============================================

interface AlertContextType {
  showAlert: (props: AlertProps) => void
  hideAlert: (id: string) => void
  alerts: Array<AlertProps & { id: string }>
}

const AlertContext = React.createContext<AlertContextType | undefined>(undefined)

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = React.useState<Array<AlertProps & { id: string }>>([])

  const showAlert = (props: AlertProps) => {
    const id = Math.random().toString(36).substr(2, 9)
    setAlerts(prev => [...prev, { ...props, id }])

    if (props.autoDismiss && props.autoDismiss > 0) {
      setTimeout(() => {
        hideAlert(id)
      }, props.autoDismiss)
    }
  }

  const hideAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alerts }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 w-96">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            {...alert}
            dismissible={true}
            onClose={() => hideAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  )
}

export function useAlert() {
  const context = React.useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}

// ============================================
// USAGE EXAMPLES (commented out)
// ============================================

/*
// Basic usage
<Alert 
  type="success" 
  message="Student record saved successfully!" 
/>

// With title and dismissible
<Alert 
  type="error" 
  title="Error" 
  message="Failed to save student record. Please try again."
  dismissible={true}
  onClose={() => console.log('Alert closed')}
/>

// With actions
<Alert 
  type="warning" 
  message="Are you sure you want to delete this record?"
  actions={
    <>
      <Button size="sm" variant="danger">Delete</Button>
      <Button size="sm" variant="outline">Cancel</Button>
    </>
  }
/>

// Auto-dismiss after 5 seconds
<Alert 
  type="info" 
  message="Your changes have been saved."
  autoDismiss={5000}
/>

// Using AlertProvider for toast notifications
function App() {
  return (
    <AlertProvider>
      <YourComponent />
    </AlertProvider>
  )
}

function YourComponent() {
  const { showAlert } = useAlert()
  
  return (
    <button onClick={() => showAlert({
      type: 'success',
      message: 'Operation completed!',
      autoDismiss: 3000
    })}>
      Show Toast
    </button>
  )
}
*/

// ============================================
// EXPORT DEFAULT
// ============================================

export default Alert