import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface ContactSidebarContact {
  id: string
  name: string
  phone: string
  avatar?: string
  stage?: 'new' | 'attending' | 'waiting' | 'completed'
  tags?: string[]
  notes_internal?: string
}

interface ContactSidebarContextType {
  isOpen: boolean
  contact: ContactSidebarContact | null
  openContactSidebar: (contact: ContactSidebarContact) => void
  closeContactSidebar: () => void
}

const ContactSidebarContext = createContext<ContactSidebarContextType | undefined>(undefined)

export function ContactSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [contact, setContact] = useState<ContactSidebarContact | null>(null)

  const openContactSidebar = useCallback((contactData: ContactSidebarContact) => {
    setContact(contactData)
    setIsOpen(true)
  }, [])

  const closeContactSidebar = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setContact(null), 300)
  }, [])

  return React.createElement(ContactSidebarContext.Provider, { value: { isOpen, contact, openContactSidebar, closeContactSidebar } }, children)
}

export function useContactSidebar() {
  const context = useContext(ContactSidebarContext)
  if (!context) {
    throw new Error('useContactSidebar must be used within ContactSidebarProvider')
  }
  return context
}
