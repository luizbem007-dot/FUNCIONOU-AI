import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface CustomerNote {
  id: string
  text: string
  date: string
  pinned?: boolean
}

export interface CustomerTask {
  id: string
  text: string
  deadline: string
  completed: boolean
  priority?: 'low' | 'medium' | 'high'
}

export interface ActivityLog {
  id: string
  customerId: string
  type: 'tag_added' | 'tag_removed' | 'stage_changed' | 'note_added' | 'task_created' | 'task_completed' | 'conversation_started' | 'contact_created' | 'contact_imported' | 'imported_contact_added'
  description: string
  previousValue?: string
  newValue?: string
  timestamp: string
  userId?: string
}

export interface Sector {
  id: string
  name: string
  color: string
  greetingMessage: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  status: 'online' | 'offline' | 'away'
  role: 'admin' | 'attendant'
  avatar: string
  sector?: string
  createdAt: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  stage: 'new' | 'attending' | 'waiting' | 'completed'
  avatar: string
  online: boolean
  createdAt: string
  lastMessage: string
  lastMessageAt: string
  tags: string[]
  notes: CustomerNote[]
  tasks: CustomerTask[]
  notes_internal: string
  sector?: string
  assignedTo?: string
  origin?: string
  activities: ActivityLog[]
}

type TagType = 'novo' | 'quente' | 'frio' | 'aguardando' | 'respondido' | 'vip'

const AVAILABLE_TAGS: TagType[] = ['novo', 'quente', 'frio', 'aguardando', 'respondido', 'vip']

const MOCK_SECTORS: Sector[] = [
  {
    id: '1',
    name: 'Atendimento',
    color: '#00FF9A',
    greetingMessage: 'Olá! Bem-vindo ao nosso atendimento. Como posso ajudá-lo?',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Vendas',
    color: '#00D4FF',
    greetingMessage: 'Oi! Temos ótimas promoções para você. Quer saber mais?',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Suporte',
    color: '#FF006E',
    greetingMessage: 'Olá! Estamos aqui para resolver seus problemas. O que precisa?',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Marlon Silva',
    email: 'marlon@funcionou.ai',
    status: 'online',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marlon',
    sector: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-2',
    name: 'Ana Costa',
    email: 'ana@funcionou.ai',
    status: 'online',
    role: 'attendant',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    sector: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-3',
    name: 'Carlos Santos',
    email: 'carlos@funcionou.ai',
    status: 'offline',
    role: 'attendant',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    sector: '2',
    createdAt: new Date().toISOString()
  }
]

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Mariana Pereira',
    phone: '(85) 98765-4321',
    email: 'mariana@email.com',
    stage: 'new',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
    online: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    lastMessage: 'Tem vaga ainda?',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    tags: ['novo', 'quente'],
    notes: [{ id: '1', text: 'Cliente muito interessado', date: new Date().toISOString(), pinned: true }],
    tasks: [{ id: '1', text: 'Enviar proposta', deadline: new Date(Date.now() + 86400000).toISOString(), completed: false, priority: 'high' }],
    notes_internal: 'Cliente em potencial, muito engajado',
    sector: '1',
    assignedTo: 'user-2',
    origin: 'WhatsApp',
    activities: [
      { id: 'a1', customerId: '1', type: 'contact_created', description: 'Contato criado', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
      { id: 'a2', customerId: '1', type: 'tag_added', description: 'Tag "novo" adicionada', newValue: 'novo', timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString() }
    ]
  },
  {
    id: '2',
    name: 'João Mendes',
    phone: '(85) 98765-4322',
    email: 'joao@email.com',
    stage: 'attending',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=João',
    online: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    lastMessage: 'Qual horário funciona?',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    tags: ['respondido'],
    notes: [],
    tasks: [],
    notes_internal: 'Dúvidas sobre horários',
    sector: '1',
    assignedTo: 'user-2',
    origin: 'Instagram',
    activities: [
      { id: 'a3', customerId: '2', type: 'contact_created', description: 'Contato criado', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
      { id: 'a4', customerId: '2', type: 'stage_changed', description: 'Etapa alterada para "Em atendimento"', previousValue: 'new', newValue: 'attending', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() }
    ]
  },
  {
    id: '3',
    name: 'Ana Ferreira',
    phone: '(85) 98765-4323',
    email: 'ana@email.com',
    stage: 'new',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    online: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    lastMessage: 'Promoção ainda está ativa?',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    tags: ['novo'],
    notes: [],
    tasks: [],
    notes_internal: 'Perguntou sobre promoções',
    sector: '2',
    assignedTo: 'user-3',
    origin: 'Telefone',
    activities: []
  },
  {
    id: '4',
    name: 'Lucas Costa',
    phone: '(85) 98765-4324',
    email: 'lucas@email.com',
    stage: 'waiting',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    online: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    lastMessage: 'Vocês entregam?',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    tags: ['aguardando'],
    notes: [],
    tasks: [],
    notes_internal: 'Interessado em entrega',
    sector: '1',
    assignedTo: 'user-2',
    origin: 'WhatsApp',
    activities: []
  },
  {
    id: '5',
    name: 'Carla Gomes',
    phone: '(85) 98765-4325',
    email: 'carla@email.com',
    stage: 'attending',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla',
    online: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    lastMessage: 'Pode confirmar pra mim?',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    tags: ['vip'],
    notes: [],
    tasks: [],
    notes_internal: 'Aguardando confirmação',
    sector: '3',
    assignedTo: 'user-2',
    origin: 'Email',
    activities: []
  },
  {
    id: '6',
    name: 'Pedro Silva',
    phone: '(85) 98765-4326',
    email: 'pedro@email.com',
    stage: 'completed',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    online: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    lastMessage: 'Qual o valor?',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    tags: ['respondido'],
    notes: [],
    tasks: [],
    notes_internal: 'Pergunta sobre preço',
    sector: '2',
    assignedTo: 'user-3',
    origin: 'Site',
    activities: []
  },
  {
    id: '7',
    name: 'Fernanda Costa',
    phone: '(85) 98765-4327',
    email: 'fernanda@email.com',
    stage: 'new',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda',
    online: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    lastMessage: 'Fechado o pedido!',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    tags: ['novo', 'quente'],
    notes: [],
    tasks: [],
    notes_internal: 'Pedido confirmado',
    sector: '1',
    assignedTo: 'user-2',
    origin: 'WhatsApp',
    activities: []
  },
  {
    id: '8',
    name: 'Ricardo Mendes',
    phone: '(85) 98765-4328',
    email: 'ricardo@email.com',
    stage: 'waiting',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo',
    online: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    lastMessage: 'Tudo certo!',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    tags: [],
    notes: [],
    tasks: [],
    notes_internal: 'Conversa finalizada',
    sector: '3',
    assignedTo: 'user-2',
    origin: 'Referência',
    activities: []
  }
]

interface FilterOptions {
  stage: string | null
  tag: string | null
  status: string | null
  search: string
  dateFrom: string | null
  dateTo: string | null
  sector: string | null
  assignedTo: string | null
}

interface CRMContextType {
  customers: Customer[]
  selectedCustomerId: string | null
  filters: FilterOptions
  filteredCustomers: Customer[]
  sectors: Sector[]
  users: User[]
  activities: ActivityLog[]

  selectCustomer: (customerId: string | null) => void
  updateCustomer: (customerId: string, updates: Partial<Customer>) => void
  addNote: (customerId: string, note: string) => void
  deleteNote: (customerId: string, noteId: string) => void
  pinNote: (customerId: string, noteId: string) => void
  addTag: (customerId: string, tag: TagType) => void
  removeTag: (customerId: string, tag: TagType) => void
  addTask: (customerId: string, task: string, deadline: string, priority?: 'low' | 'medium' | 'high') => void
  completeTask: (customerId: string, taskId: string) => void
  deleteTask: (customerId: string, taskId: string) => void
  moveToStage: (customerId: string, stage: 'new' | 'attending' | 'waiting' | 'completed') => void
  assignToUser: (customerId: string, userId: string) => void
  setSector: (customerId: string, sectorId: string) => void
  setFilters: (filters: Partial<FilterOptions>) => void
  clearFilters: () => void

  addSector: (sector: Omit<Sector, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateSector: (sectorId: string, updates: Partial<Sector>) => void
  deleteSector: (sectorId: string) => void

  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void
  updateUser: (userId: string, updates: Partial<User>) => void
  deleteUser: (userId: string) => void

  getCustomerActivities: (customerId: string) => ActivityLog[]
  getActivityLog: () => ActivityLog[]

  availableTags: TagType[]
}

export const CRMContext = createContext<CRMContextType | undefined>(undefined)

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [sectors, setSectors] = useState<Sector[]>(MOCK_SECTORS)
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [filters, setFiltersState] = useState<FilterOptions>({
    stage: null,
    tag: null,
    status: null,
    search: '',
    dateFrom: null,
    dateTo: null,
    sector: null,
    assignedTo: null
  })

  // Auto-apply tags based on business rules
  useEffect(() => {
    const interval = setInterval(() => {
      setCustomers(prev => prev.map(customer => {
        let updatedTags = [...customer.tags]
        const lastMessageTime = new Date(customer.lastMessageAt).getTime()
        const now = Date.now()
        const hoursSinceMessage = (now - lastMessageTime) / (1000 * 60 * 60)

        // Rule: No response in 2 hours → add "aguardando" tag
        if (hoursSinceMessage > 2 && !updatedTags.includes('aguardando') && customer.stage === 'attending') {
          updatedTags = [...updatedTags, 'aguardando']
        }

        return { ...customer, tags: updatedTags }
      }))
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const filteredCustomers = customers.filter(customer => {
    if (filters.stage && customer.stage !== filters.stage) return false
    if (filters.tag && !customer.tags.includes(filters.tag)) return false
    if (filters.status === 'online' && !customer.online) return false
    if (filters.status === 'offline' && customer.online) return false
    if (filters.search && !customer.name.toLowerCase().includes(filters.search.toLowerCase()) && !customer.phone.includes(filters.search)) return false
    if (filters.dateFrom && new Date(customer.createdAt) < new Date(filters.dateFrom)) return false
    if (filters.dateTo && new Date(customer.createdAt) > new Date(filters.dateTo)) return false
    if (filters.sector && customer.sector !== filters.sector) return false
    if (filters.assignedTo && customer.assignedTo !== filters.assignedTo) return false
    return true
  })

  const selectCustomer = useCallback((customerId: string | null) => {
    setSelectedCustomerId(customerId)
  }, [])

  const updateCustomer = useCallback((customerId: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, ...updates } : c))
  }, [])

  const addNote = useCallback((customerId: string, noteText: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const newNote: CustomerNote = {
          id: Date.now().toString(),
          text: noteText,
          date: new Date().toISOString()
        }
        return { ...c, notes: [...c.notes, newNote] }
      }
      return c
    }))
  }, [])

  const deleteNote = useCallback((customerId: string, noteId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return { ...c, notes: c.notes.filter(n => n.id !== noteId) }
      }
      return c
    }))
  }, [])

  const pinNote = useCallback((customerId: string, noteId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          notes: c.notes.map(n => n.id === noteId ? { ...n, pinned: !n.pinned } : n)
        }
      }
      return c
    }))
  }, [])

  const addTag = useCallback((customerId: string, tag: TagType) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId && !c.tags.includes(tag)) {
        const newActivity: ActivityLog = {
          id: `activity-${Date.now()}`,
          customerId,
          type: 'tag_added',
          description: `Tag "${tag}" adicionada`,
          newValue: tag,
          timestamp: new Date().toISOString()
        }
        setActivities(prev => [...prev, newActivity])
        return { ...c, tags: [...c.tags, tag] }
      }
      return c
    }))
  }, [])

  const removeTag = useCallback((customerId: string, tag: TagType) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const newActivity: ActivityLog = {
          id: `activity-${Date.now()}`,
          customerId,
          type: 'tag_removed',
          description: `Tag "${tag}" removida`,
          previousValue: tag,
          timestamp: new Date().toISOString()
        }
        setActivities(prev => [...prev, newActivity])
        return { ...c, tags: c.tags.filter(t => t !== tag) }
      }
      return c
    }))
  }, [])

  const addTask = useCallback((customerId: string, taskText: string, deadline: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const newTask: CustomerTask = {
          id: Date.now().toString(),
          text: taskText,
          deadline,
          completed: false,
          priority
        }
        const updatedCustomer = { ...c, tasks: [...c.tasks, newTask] }
        const newActivity: ActivityLog = {
          id: `activity-${Date.now()}`,
          customerId,
          type: 'task_created',
          description: `Tarefa criada: "${taskText}"`,
          newValue: taskText,
          timestamp: new Date().toISOString()
        }
        setActivities(prev => [...prev, newActivity])
        return updatedCustomer
      }
      return c
    }))
  }, [])

  const completeTask = useCallback((customerId: string, taskId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          tasks: c.tasks.map(t => t.id === taskId ? { ...t, completed: true } : t)
        }
      }
      return c
    }))
  }, [])

  const deleteTask = useCallback((customerId: string, taskId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return { ...c, tasks: c.tasks.filter(t => t.id !== taskId) }
      }
      return c
    }))
  }, [])

  const moveToStage = useCallback((customerId: string, stage: 'new' | 'attending' | 'waiting' | 'completed') => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const stageLabels: Record<string, string> = {
          'new': 'Novo',
          'attending': 'Em atendimento',
          'waiting': 'Aguardando',
          'completed': 'Concluído'
        }
        const newActivity: ActivityLog = {
          id: `activity-${Date.now()}`,
          customerId,
          type: 'stage_changed',
          description: `Etapa alterada para "${stageLabels[stage]}"`,
          previousValue: c.stage,
          newValue: stage,
          timestamp: new Date().toISOString()
        }
        setActivities(prev => [...prev, newActivity])
        return { ...c, stage }
      }
      return c
    }))
  }, [])

  const assignToUser = useCallback((customerId: string, userId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const user = users.find(u => u.id === userId)
        const newActivity: ActivityLog = {
          id: `activity-${Date.now()}`,
          customerId,
          type: 'tag_added',
          description: `Atribuído a ${user?.name || 'Desconhecido'}`,
          newValue: userId,
          timestamp: new Date().toISOString(),
          userId
        }
        setActivities(prev => [...prev, newActivity])
        return { ...c, assignedTo: userId }
      }
      return c
    }))
  }, [users])

  const setSector = useCallback((customerId: string, sectorId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const sector = sectors.find(s => s.id === sectorId)
        const newActivity: ActivityLog = {
          id: `activity-${Date.now()}`,
          customerId,
          type: 'tag_added',
          description: `Setor alterado para "${sector?.name || 'Desconhecido'}"`,
          newValue: sectorId,
          timestamp: new Date().toISOString()
        }
        setActivities(prev => [...prev, newActivity])
        return { ...c, sector: sectorId }
      }
      return c
    }))
  }, [sectors])

  const setFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }))
  }, [])

  const clearFilters = useCallback(() => {
    setFiltersState({
      stage: null,
      tag: null,
      status: null,
      search: '',
      dateFrom: null,
      dateTo: null,
      sector: null,
      assignedTo: null
    })
  }, [])

  const addSector = useCallback((sector: Omit<Sector, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSector: Sector = {
      ...sector,
      id: `sector-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setSectors(prev => [...prev, newSector])
  }, [])

  const updateSector = useCallback((sectorId: string, updates: Partial<Sector>) => {
    setSectors(prev => prev.map(s => s.id === sectorId ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s))
  }, [])

  const deleteSector = useCallback((sectorId: string) => {
    setSectors(prev => prev.filter(s => s.id !== sectorId))
    setCustomers(prev => prev.map(c => c.sector === sectorId ? { ...c, sector: undefined } : c))
  }, [])

  const addUser = useCallback((user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    setUsers(prev => [...prev, newUser])
  }, [])

  const updateUser = useCallback((userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u))
  }, [])

  const deleteUser = useCallback((userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId))
    setCustomers(prev => prev.map(c => c.assignedTo === userId ? { ...c, assignedTo: undefined } : c))
  }, [])

  const getCustomerActivities = useCallback((customerId: string) => {
    const customerActivities = customers.find(c => c.id === customerId)?.activities || []
    const globalActivities = activities.filter(a => a.customerId === customerId)
    return [...customerActivities, ...globalActivities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [customers, activities])

  const getActivityLog = useCallback(() => {
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [activities])

  const value: CRMContextType = {
    customers,
    selectedCustomerId,
    filters,
    filteredCustomers,
    sectors,
    users,
    activities,
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
    assignToUser,
    setSector,
    setFilters,
    clearFilters,
    addSector,
    updateSector,
    deleteSector,
    addUser,
    updateUser,
    deleteUser,
    getCustomerActivities,
    getActivityLog,
    availableTags: AVAILABLE_TAGS
  }

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>
}

export function useCRM() {
  const context = useContext(CRMContext)
  if (!context) {
    throw new Error('useCRM must be used within CRMProvider')
  }
  return context
}
