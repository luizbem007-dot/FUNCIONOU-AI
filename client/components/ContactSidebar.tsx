import React, { useEffect, useRef, useState } from 'react'
import { X, Plus, Trash2, Tag, CheckCircle2, Circle, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useContactSidebar } from '@/hooks/useContactSidebar'
import { useCRM } from '@/context/CRMContext'

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

export default function ContactSidebar() {
  const { isOpen, contact: sidebarContact, closeContactSidebar } = useContactSidebar()
  const {
    customers,
    updateCustomer,
    addNote,
    deleteNote,
    addTag,
    removeTag,
    addTask,
    completeTask,
    deleteTask,
    moveToStage,
    availableTags
  } = useCRM()

  const panelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const [noteInput, setNoteInput] = useState('')
  const [taskInput, setTaskInput] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [editingName, setEditingName] = useState('')
  const [editingPhone, setEditingPhone] = useState('')

  // Get full customer data from CRM context
  const customer = customers.find(c => c.id === sidebarContact?.id)

  // Handle escape key to close sidebar
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeContactSidebar()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeContactSidebar])

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      closeContactSidebar()
    }
  }

  const handleSaveCustomer = () => {
    if (customer && (editingName || editingPhone)) {
      updateCustomer(customer.id, {
        name: editingName || customer.name,
        phone: editingPhone || customer.phone
      })
      setEditingName('')
      setEditingPhone('')
    }
  }

  const handleAddNote = () => {
    if (noteInput.trim() && customer) {
      addNote(customer.id, noteInput)
      setNoteInput('')
    }
  }

  const handleAddTask = () => {
    if (taskInput.trim() && taskDeadline && customer) {
      addTask(customer.id, taskInput, taskDeadline)
      setTaskInput('')
      setTaskDeadline('')
    }
  }

  if (!isOpen || !sidebarContact || !customer) return null

  const pendingTasks = customer.tasks.filter(t => !t.completed)

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 bg-black/60' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-[#0F0F0F] border-l border-[rgba(0,255,154,0.1)] z-50 flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-[rgba(0,255,154,0.1)] p-4 flex items-center justify-between bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A]">
          <h2 className="text-lg font-bold">Detalhes do Cliente</h2>
          <button
            onClick={closeContactSidebar}
            className="p-1 hover:bg-[#1A1A1A] rounded transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content - scrollable, all sections expanded */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
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

          {/* Move to Stage */}
          <div>
            <label className="text-xs text-[#666] uppercase tracking-wide block mb-2">Mover para Etapa</label>
            <select
              value={customer.stage}
              onChange={(e) => moveToStage(customer.id, e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
            >
              <option value="new">Novos contatos</option>
              <option value="attending">Em atendimento</option>
              <option value="waiting">Aguardando retorno</option>
              <option value="completed">Concluído</option>
            </select>
          </div>

          {/* Tags - Always expanded */}
          <div>
            <label className="text-xs text-[#666] uppercase tracking-wide block mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = customer.tags.includes(tag)
                const colors = TAG_COLORS[tag]
                return (
                  <button
                    key={tag}
                    onClick={() => isSelected ? removeTag(customer.id, tag) : addTag(customer.id, tag)}
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

          {/* Notes - Always expanded */}
          <div>
            <label className="text-xs text-[#666] uppercase tracking-wide block mb-2">Notas Internas</label>
            <div className="space-y-2">
              {customer.notes.map((note) => (
                <div key={note.id} className="p-3 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm text-white">{note.text}</p>
                      <p className="text-xs text-[#666] mt-1">{new Date(note.date).toLocaleString('pt-BR')}</p>
                    </div>
                    <button
                      onClick={() => deleteNote(customer.id, note.id)}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
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

          {/* Tasks - Always expanded */}
          <div>
            <label className="text-xs text-[#666] uppercase tracking-wide block mb-2">Tarefas ({pendingTasks.length})</label>
            <div className="space-y-2">
              {customer.tasks.map((task) => (
                <div key={task.id} className="p-3 rounded-lg bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)]">
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => completeTask(customer.id, task.id)}
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
                      <div className="flex items-center gap-1 text-xs text-[#666] mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.deadline).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(customer.id, task.id)}
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
                <input
                  type="date"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0F0F0F] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#00FF9A] transition-colors"
                />
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

        {/* Action buttons - footer, always visible */}
        <div className="flex-shrink-0 border-t border-[rgba(0,255,154,0.1)] p-4 space-y-2 bg-gradient-to-t from-[#0F0F0F] to-[#0A0A0A]">
          <button
            onClick={closeContactSidebar}
            className="w-full px-4 py-3 rounded-xl font-semibold text-sm text-black bg-[#00FF9A] hover:bg-[#00E089] transition-all duration-200 shadow-lg shadow-[#00FF9A]/20"
          >
            Salvar Alterações
          </button>
          <button
            onClick={closeContactSidebar}
            className="w-full px-4 py-3 rounded-xl font-semibold text-sm text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[rgba(0,255,154,0.1)] transition-all duration-200"
          >
            Ver no CRM
          </button>
        </div>
      </div>
    </>
  )
}
