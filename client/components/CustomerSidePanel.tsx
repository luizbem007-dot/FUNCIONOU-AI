import React, { useState } from 'react'
import { X, Plus, Trash2, Tag, CheckCircle2, Circle, Calendar, Copy, MessageSquare, Archive, Pin, PinOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCRM } from '@/context/CRMContext'
import CustomerJourney from './CustomerJourney'

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  novo: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  quente: { bg: 'bg-red-500/20', text: 'text-red-400' },
  frio: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  aguardando: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  respondido: { bg: 'bg-green-500/20', text: 'text-green-400' },
  vip: { bg: 'bg-purple-500/20', text: 'text-purple-400' }
}

const STAGE_LABELS = {
  new: 'Novos contatos',
  attending: 'Em atendimento',
  waiting: 'Aguardando retorno',
  completed: 'Concluído'
}

export default function CustomerSidePanel() {
  const {
    customers,
    selectedCustomerId,
    selectCustomer,
    updateCustomer,
    addNote,
    deleteNote,
    pinNote,
    addTag,
    removeTag,
    addTask,
    completeTask,
    deleteTask,
    moveToStage,
    availableTags,
    sectors,
    users,
    assignToUser,
    setSector
  } = useCRM()

  const [noteInput, setNoteInput] = useState('')
  const [taskInput, setTaskInput] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [editingName, setEditingName] = useState('')
  const [editingPhone, setEditingPhone] = useState('')
  const [activeTab, setActiveTab] = useState<'info' | 'journey'>('info')

  if (!selectedCustomerId) return null

  const customer = customers.find(c => c.id === selectedCustomerId)
  if (!customer) return null

  const handleSaveCustomer = () => {
    if (editingName || editingPhone) {
      updateCustomer(selectedCustomerId, {
        name: editingName || customer.name,
        phone: editingPhone || customer.phone
      })
      setEditingName('')
      setEditingPhone('')
    }
  }

  const handleAddNote = () => {
    if (noteInput.trim()) {
      addNote(selectedCustomerId, noteInput)
      setNoteInput('')
    }
  }

  const handleAddTask = () => {
    if (taskInput.trim() && taskDeadline) {
      addTask(selectedCustomerId, taskInput, taskDeadline, taskPriority)
      setTaskInput('')
      setTaskDeadline('')
      setTaskPriority('medium')
    }
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(customer.phone)
  }

  const handleOpenConversation = () => {
    window.open(`/dashboard?contact=${customer.id}`, '_blank')
  }

  const pendingTasks = customer.tasks.filter(t => !t.completed)

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[28rem] bg-[#0F0F0F] border-l border-[rgba(0,255,154,0.1)] z-40 flex flex-col overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="border-b border-[rgba(0,255,154,0.1)] p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold truncate">{customer.name}</h2>
          <p className="text-xs text-[#666] truncate">{customer.phone}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={handleCopyPhone}
            className="p-2 hover:bg-[#1A1A1A] rounded transition-colors"
            title="Copiar telefone"
          >
            <Copy className="h-4 w-4 text-[#00D4FF]" />
          </button>
          <button
            onClick={handleOpenConversation}
            className="p-2 hover:bg-[#1A1A1A] rounded transition-colors"
            title="Abrir conversa"
          >
            <MessageSquare className="h-4 w-4 text-[#FF006E]" />
          </button>
          <button
            onClick={() => selectCustomer(null)}
            className="p-1 hover:bg-[#1A1A1A] rounded transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-4 border-b border-[rgba(0,255,154,0.1)]" style={{ backgroundColor: 'rgba(0,255,154,0.02)' }}>
        <button
          onClick={() => setActiveTab('info')}
          className={cn(
            'px-4 py-3 font-semibold text-sm transition-colors border-b-2',
            activeTab === 'info'
              ? 'text-[#00FF9A] border-[#00FF9A]'
              : 'text-[#666] border-transparent hover:text-white'
          )}
        >
          Informações
        </button>
        <button
          onClick={() => setActiveTab('journey')}
          className={cn(
            'px-4 py-3 font-semibold text-sm transition-colors border-b-2',
            activeTab === 'journey'
              ? 'text-[#00FF9A] border-[#00FF9A]'
              : 'text-[#666] border-transparent hover:text-white'
          )}
        >
          Jornada
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'info' ? (
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#666] uppercase tracking-wide">Nome</label>
                <input
                  type="text"
                  defaultValue={customer.name}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-[#666] uppercase tracking-wide">Telefone</label>
                <input
                  type="text"
                  defaultValue={customer.phone}
                  onChange={(e) => setEditingPhone(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-[#666] uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  defaultValue={customer.email || ''}
                  onChange={(e) => updateCustomer(selectedCustomerId, { ...customer, email: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                />
              </div>

              {(editingName || editingPhone) && (
                <button
                  onClick={handleSaveCustomer}
                  className="w-full px-3 py-2 rounded-lg font-semibold text-sm text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30"
                  style={{ backgroundColor: '#00FF9A' }}
                >
                  Salvar
                </button>
              )}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(0,255,154,0.05)' }}>
              <div>
                <div className="text-xs text-[#666]">Status</div>
                <div className="text-sm font-semibold flex items-center gap-1 mt-1">
                  <span className={cn('h-2 w-2 rounded-full', customer.online ? 'bg-green-400' : 'bg-gray-500')} />
                  {customer.online ? 'Online' : 'Offline'}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#666]">Etapa</div>
                <div className="text-sm font-semibold mt-1">{STAGE_LABELS[customer.stage]}</div>
              </div>
              <div>
                <div className="text-xs text-[#666]">Criado em</div>
                <div className="text-sm font-semibold mt-1">{new Date(customer.createdAt).toLocaleDateString('pt-BR')}</div>
              </div>
              <div>
                <div className="text-xs text-[#666]">Última msg</div>
                <div className="text-sm font-semibold mt-1">{new Date(customer.lastMessageAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#00FF9A]">Organização</h3>
              
              <div>
                <label className="text-xs text-[#666] uppercase tracking-wide">Setor</label>
                <select
                  value={customer.sector || ''}
                  onChange={(e) => setSector(selectedCustomerId, e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                >
                  <option value="">Sem setor</option>
                  {sectors.map(sector => (
                    <option key={sector.id} value={sector.id}>{sector.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-[#666] uppercase tracking-wide">Atribuído a</label>
                <select
                  value={customer.assignedTo || ''}
                  onChange={(e) => assignToUser(selectedCustomerId, e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                >
                  <option value="">Sem atribuição</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-[#666] uppercase tracking-wide">Origem</label>
                <input
                  type="text"
                  defaultValue={customer.origin || 'Manual'}
                  onChange={(e) => updateCustomer(selectedCustomerId, { ...customer, origin: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                />
              </div>
            </div>

            {/* Move to Stage */}
            <div>
              <label className="text-xs text-[#666] uppercase tracking-wide block mb-2">Mover para Etapa</label>
              <select
                value={customer.stage}
                onChange={(e) => moveToStage(selectedCustomerId, e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
              >
                <option value="new">Novos contatos</option>
                <option value="attending">Em atendimento</option>
                <option value="waiting">Aguardando retorno</option>
                <option value="completed">Concluído</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="text-xs text-[#666] uppercase tracking-wide block mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const isSelected = customer.tags.includes(tag)
                  const colors = TAG_COLORS[tag]
                  return (
                    <button
                      key={tag}
                      onClick={() => isSelected ? removeTag(selectedCustomerId, tag) : addTag(selectedCustomerId, tag)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border',
                        isSelected
                          ? `${colors.bg} ${colors.text} border-current opacity-100`
                          : 'bg-[#1A1A1A] text-[#666] border-[rgba(255,255,255,0.1)] opacity-60 hover:opacity-100'
                      )}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs text-[#666] uppercase tracking-wide block mb-2">Notas Internas</label>
              <div className="space-y-2">
                {customer.notes.filter(n => n.pinned).map((note) => (
                  <div key={note.id} className="p-3 rounded-lg border-2" style={{ borderColor: 'rgba(0,255,154,0.3)', backgroundColor: 'rgba(0,255,154,0.05)' }}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Pin className="h-3 w-3 text-[#00FF9A]" />
                          <p className="text-sm text-white">{note.text}</p>
                        </div>
                        <p className="text-xs text-[#666]">{new Date(note.date).toLocaleString('pt-BR')}</p>
                      </div>
                      <button
                        onClick={() => pinNote(selectedCustomerId, note.id)}
                        className="p-1 hover:bg-[#1A1A1A] rounded transition-colors flex-shrink-0"
                      >
                        <PinOff className="h-3 w-3 text-[#FFB800]" />
                      </button>
                    </div>
                  </div>
                ))}

                {customer.notes.filter(n => !n.pinned).map((note) => (
                  <div key={note.id} className="p-3 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm text-white">{note.text}</p>
                        <p className="text-xs text-[#666] mt-1">{new Date(note.date).toLocaleString('pt-BR')}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => pinNote(selectedCustomerId, note.id)}
                          className="p-1 hover:bg-[#1A1A1A] rounded transition-colors"
                        >
                          <Pin className="h-3 w-3 text-[#666]" />
                        </button>
                        <button
                          onClick={() => deleteNote(selectedCustomerId, note.id)}
                          className="p-1 hover:bg-red-500/20 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Adicionar nota..."
                    className="w-full px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors resize-none h-20"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!noteInput.trim()}
                    className="w-full px-3 py-2 rounded-lg font-semibold text-sm text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30 disabled:opacity-50"
                    style={{ backgroundColor: '#00FF9A' }}
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    Adicionar Nota
                  </button>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div>
              <label className="text-xs text-[#666] uppercase tracking-wide block mb-2">Tarefas ({pendingTasks.length})</label>
              <div className="space-y-2">
                {customer.tasks.map((task) => (
                  <div key={task.id} className="p-3 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)]">
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => completeTask(selectedCustomerId, task.id)}
                        className="mt-0.5 p-0.5 hover:bg-green-500/20 rounded transition-colors flex-shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                        ) : (
                          <Circle className="h-4 w-4 text-[#666]" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={cn('text-sm', task.completed && 'line-through text-[#666]')}>{task.text}</p>
                        <div className="flex items-center gap-2 text-xs text-[#666] mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.deadline).toLocaleDateString('pt-BR')}
                          {task.priority && (
                            <span className={cn(
                              'px-2 py-0.5 rounded text-xs font-semibold',
                              task.priority === 'high' && 'bg-red-500/20 text-red-400',
                              task.priority === 'medium' && 'bg-yellow-500/20 text-yellow-400',
                              task.priority === 'low' && 'bg-green-500/20 text-green-400'
                            )}>
                              {task.priority === 'high' && 'Alta'}
                              {task.priority === 'medium' && 'Média'}
                              {task.priority === 'low' && 'Baixa'}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTask(selectedCustomerId, task.id)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors flex-shrink-0"
                      >
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 p-3 rounded-lg bg-[#1A1A1A] border border-[rgba(0,255,154,0.1)]">
                  <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Nova tarefa..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0F0F0F] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={taskDeadline}
                      onChange={(e) => setTaskDeadline(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[#0F0F0F] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                    />
                    <select
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value as any)}
                      className="px-3 py-2 rounded-lg bg-[#0F0F0F] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                  <button
                    onClick={handleAddTask}
                    disabled={!taskInput.trim() || !taskDeadline}
                    className="w-full px-3 py-2 rounded-lg font-semibold text-sm text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30 disabled:opacity-50"
                    style={{ backgroundColor: '#00FF9A' }}
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    Adicionar Tarefa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <CustomerJourney customerId={selectedCustomerId} />
        )}
      </div>
    </div>
  )
}
