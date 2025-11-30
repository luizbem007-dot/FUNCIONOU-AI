import React from 'react'

interface MessageBubbleProps {
  text: string
  time: string
  isSent: boolean
}

export default function MessageBubble({ text, time, isSent }: MessageBubbleProps) {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl ${
        isSent
          ? 'bg-[#00FF9A] text-black rounded-br-none'
          : 'bg-[#1A1A1A] text-white rounded-bl-none'
      } shadow-sm`}>
        <p className="text-sm break-words leading-relaxed">{text}</p>
        <p className={`text-xs mt-1.5 font-medium ${
          isSent ? 'text-black/60' : 'text-white/50'
        }`}>
          {time}
        </p>
      </div>
    </div>
  )
}
