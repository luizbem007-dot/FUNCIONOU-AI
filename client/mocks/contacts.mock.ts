export interface MockContact {
  id: string
  name: string
  phone: string
  email?: string
  avatar?: string
  tags: string[]
  status: 'novo' | 'em-atendimento' | 'pendente' | 'convertido'
  lastMessage?: string
  lastMessageAt?: string
  createdAt: string
}

export const MOCK_CONTACTS: MockContact[] = [
  {
    id: 'c1',
    name: 'João Silva',
    phone: '(11) 99876-5432',
    email: 'joao.silva@email.com',
    tags: ['novo', 'vip'],
    status: 'em-atendimento',
    lastMessage: 'Gostaria de saber mais sobre o produto',
    lastMessageAt: '2024-11-20 14:30',
    createdAt: '2024-11-15'
  },
  {
    id: 'c2',
    name: 'Maria Santos',
    phone: '(21) 98765-4321',
    email: 'maria.santos@email.com',
    tags: ['quente'],
    status: 'convertido',
    lastMessage: 'Muito obrigada pela ajuda!',
    lastMessageAt: '2024-11-19 16:20',
    createdAt: '2024-11-10'
  },
  {
    id: 'c3',
    name: 'Pedro Costa',
    phone: '(31) 97654-3210',
    tags: ['frio', 'aguardando'],
    status: 'pendente',
    lastMessage: 'Vou verificar e retorno',
    lastMessageAt: '2024-11-18 10:15',
    createdAt: '2024-11-01'
  },
  {
    id: 'c4',
    name: 'Ana Paula',
    phone: '(41) 96543-2109',
    email: 'ana.paula@email.com',
    tags: ['respondido'],
    status: 'novo',
    lastMessage: 'Qual é o horário de funcionamento?',
    lastMessageAt: '2024-11-20 09:45',
    createdAt: '2024-11-20'
  },
  {
    id: 'c5',
    name: 'Carlos Mendes',
    phone: '(51) 95432-1098',
    tags: ['vip'],
    status: 'convertido',
    lastMessage: 'Perfeito! Já realizei a compra',
    lastMessageAt: '2024-11-17 13:00',
    createdAt: '2024-10-25'
  }
]
