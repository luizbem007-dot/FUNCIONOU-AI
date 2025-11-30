import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuSubItem } from '@/config/menu'
import { cn } from '@/lib/utils'

interface DropdownMenuProps {
  items: MenuSubItem[]
  onItemClick?: () => void
}

export default function DropdownMenu({ items, onItemClick }: DropdownMenuProps) {
  const navigate = useNavigate()

  const handleItemClick = (route: string) => {
    navigate(route)
    onItemClick?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent, route: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleItemClick(route)
    } else if (e.key === 'Escape') {
      onItemClick?.()
    }
  }

  return (
    <div
      className={cn(
        'absolute top-full left-0 mt-2 w-64 bg-[#1a1a1a] rounded-xl border border-[#00FF9A]/20',
        'shadow-2xl backdrop-blur-sm z-50',
        'animate-in fade-in slide-in-from-top-2 duration-200'
      )}
      role="menu"
      aria-orientation="vertical"
    >
      <div className="p-2 space-y-1">
        {items.map((item, index) => (
          <button
            key={`${item.route}-${index}`}
            onClick={() => handleItemClick(item.route)}
            onKeyDown={(e) => handleKeyDown(e, item.route)}
            className={cn(
              'w-full text-left px-4 py-3 rounded-lg text-sm font-medium',
              'text-gray-300 hover:text-white hover:bg-[#00FF9A]/10',
              'transition-all duration-150 focus:outline-none focus:bg-[#00FF9A]/20 focus:ring-2 focus:ring-[#00FF9A]/50'
            )}
            role="menuitem"
            tabIndex={0}
          >
            <div className="flex items-center justify-between">
              <span>{item.label}</span>
              {index < items.length - 1 && (
                <span className="h-px flex-1 mx-2 bg-gradient-to-r from-transparent via-[#00FF9A]/20 to-transparent" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
