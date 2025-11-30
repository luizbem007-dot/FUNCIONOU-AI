import React, { useState } from 'react'
import { Calendar, Clock, Plus, Phone, Users, BarChart3, Edit2, Trash2, MoreVertical } from 'lucide-react'
import PagePlaceholder from '@/components/PagePlaceholder'
import { mockData } from '@/mocks/premium-mock-data'

export default function AgendamentoPage() {
  const [events, setEvents] = useState(mockData.schedules)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const getEventIcon = (type: string) => {
    switch(type) {
      case 'call':
      case 'retorno':
        return <Phone className="h-4 w-4" />
      case 'meeting':
      case 'reuniao':
        return <Users className="h-4 w-4" />
      case 'presentation':
      case 'demonstracao':
      case 'acompanhamento':
        return <BarChart3 className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch(type) {
      case 'call':
      case 'retorno':
        return { bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-300', badge: 'bg-blue-500/20 text-blue-300' }
      case 'meeting':
      case 'reuniao':
        return { bg: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-300', badge: 'bg-purple-500/20 text-purple-300' }
      case 'presentation':
      case 'demonstracao':
      case 'acompanhamento':
        return { bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-300', badge: 'bg-emerald-500/20 text-emerald-300' }
      default:
        return { bg: 'from-gray-500/10 to-gray-500/5', border: 'border-gray-500/20', text: 'text-gray-300', badge: 'bg-gray-500/20 text-gray-300' }
    }
  }

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => null)

  const monthName = today.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PagePlaceholder
        title="Agendamento"
        description="Gerencie suas reuniões e chamadas"
        icon="📅"
        actions={[
          {
            label: '+ Novo Agendamento',
            onClick: () => console.log('Create event'),
            variant: 'primary'
          }
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mt-4">
          {/* Calendar */}
          <div className="lg:col-span-1 border border-[#1a1a2e] rounded-2xl bg-[#0f0f1e] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#1a1a2e]">
              <h3 className="text-lg font-semibold text-white capitalize">{monthName}</h3>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day) => (
                  <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2 flex-1">
                {emptyDays.map((_, idx) => (
                  <div key={`empty-${idx}`} />
                ))}

                {days.map((day) => {
                  const hasEvents = events.some(e => {
                    const eventDate = new Date(e.date)
                    return eventDate.getDate() === day && 
                           eventDate.getMonth() === currentMonth && 
                           eventDate.getFullYear() === currentYear
                  })

                  const isToday = day === today.getDate()

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition-all relative ${
                        selectedDate === day
                          ? 'bg-[#00FF84] text-black shadow-lg shadow-[#00FF84]/30'
                          : isToday
                          ? 'bg-[#00FF84]/20 text-[#00FF84] border border-[#00FF84]/50'
                          : hasEvents
                          ? 'bg-white/10 text-white border border-[#1a1a2e]'
                          : 'text-gray-600 hover:bg-white/5'
                      }`}
                    >
                      {day}
                      {hasEvents && !selectedDate && (
                        <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-[#00FF84]" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="border-t border-[#1a1a2e] p-4">
              <p className="text-xs text-gray-400 font-semibold mb-3 uppercase">Próximos 3</p>
              <div className="space-y-2">
                {events.slice(0, 3).map((event) => {
                  const colors = getEventColor(event.type)
                  return (
                    <div key={event.id} className={`p-2 rounded-lg border ${colors.border} bg-gradient-to-br ${colors.bg}`}>
                      <p className="text-xs text-white font-semibold truncate">{event.title}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2 border border-[#1a1a2e] rounded-2xl bg-[#0f0f1e] overflow-hidden flex flex-col max-h-[calc(100vh-200px)]">
            <div className="p-6 border-b border-[#1a1a2e]">
              <h3 className="text-lg font-semibold text-white">Agendamentos</h3>
              <p className="text-sm text-gray-400">{events.length} eventos agendados</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {events.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center text-gray-500">
                  <div>
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Nenhum agendamento</p>
                  </div>
                </div>
              ) : (
                events.map((event) => {
                  const colors = getEventColor(event.type)
                  // Parse date from "DD/MM/YYYY" format to Date object
                  const [day, month, year] = event.date.split('/').map(Number)
                  const eventDate = new Date(year, month - 1, day)
                  const formattedDate = eventDate.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })

                  return (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-lg hover:bg-white/5 bg-gradient-to-br ${colors.bg} ${colors.border}`}
                      style={{ borderLeftColor: colors.text.split('-')[1] ? colors.text : '#00FF84' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-lg bg-white/5 ${colors.text}`}>
                            {getEventIcon(event.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white mb-0.5">{event.title}</h3>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              {event.attendees.join(', ')}
                            </p>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-white/10 rounded transition-colors">
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{event.time} • {Math.floor(event.duration)}min</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className={`flex-1 px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${colors.badge} hover:opacity-80`}>
                          <Edit2 className="h-3 w-3 inline mr-1" />
                          Editar
                        </button>
                        <button className="flex-1 px-3 py-1.5 text-xs rounded-lg font-semibold bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all">
                          <Trash2 className="h-3 w-3 inline mr-1" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </PagePlaceholder>
    </div>
  )
}
