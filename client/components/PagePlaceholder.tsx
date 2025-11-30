import React from 'react'
import { cn } from '@/lib/utils'

interface PagePlaceholderProps {
  title: string
  description?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }>
}

export default function PagePlaceholder({
  title,
  description,
  icon,
  children,
  actions = []
}: PagePlaceholderProps) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Page Header */}
      <div className="border-b border-[#00FF9A]/20 p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          {icon && <div className="text-4xl">{icon}</div>}
          <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            {description && <p className="text-gray-400 text-sm mt-2">{description}</p>}
          </div>
        </div>

        {actions.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                  action.variant === 'primary'
                    ? 'bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-[#00FF9A]/20'
                )}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Page Content */}
      <div className="flex-1 px-6 pb-6 overflow-auto">
        {children && children}
      </div>
    </div>
  )
}
