import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AdminUsers from './AdminUsers'
import AdminSectors from './AdminSectors'

type AdminTab = 'usuarios' | 'setores'

interface AdminPanelProps {
  activeTab?: AdminTab
}

export default function AdminPanel({ activeTab: initialTab = 'usuarios' }: AdminPanelProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // Determine active tab from route
  const getActiveTabFromRoute = (): AdminTab => {
    if (location.pathname.includes('/adm/setores')) return 'setores'
    return 'usuarios'
  }

  const activeTab = getActiveTabFromRoute()

  return (
    <div className="min-h-screen bg-[#070707]">
      {/* Content */}
      <main>
        {activeTab === 'usuarios' && <AdminUsers />}
        {activeTab === 'setores' && <AdminSectors />}
      </main>
    </div>
  )
}
