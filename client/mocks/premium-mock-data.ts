// Mock data realista para preenchimento visual do sistema
// Apenas dados fictícios, sem impacto em lógica, rotas ou funcionalidade

export interface MockConversation {
  id: string
  clientName: string
  clientPhone: string
  clientAvatar: string
  lastMessage: string
  lastMessageTime: string
  status: 'online' | 'away' | 'offline'
  tags: string[]
  unreadCount: number
  assignedTo: string
}

export interface MockMessage {
  id: string
  conversationId: string
  sender: 'client' | 'agent'
  text: string
  timestamp: string
  read: boolean
}

export interface MockContact {
  id: string
  name: string
  phone: string
  email: string
  avatar: string
  stage: 'novo' | 'em_atendimento' | 'negociacao' | 'pos_venda'
  tags: string[]
  lastInteraction: string
  source: string
  value?: number
}

export interface MockTag {
  id: string
  name: string
  color: string
  textColor: string
}

export interface MockSchedule {
  id: string
  title: string
  date: string
  time: string
  duration: number
  attendees: string[]
  type: 'reuniao' | 'demonstracao' | 'retorno' | 'acompanhamento'
  status: 'agendado' | 'em_progresso' | 'concluido' | 'cancelado'
}

export interface MockUser {
  id: string
  name: string
  email: string
  avatar: string
  role: 'Administrador' | 'Gerente' | 'Atendente' | 'Colaborador'
  status: 'online' | 'away' | 'offline'
  sector: string
  active: boolean
}

// Tags bonitas no estilo Helena CRM
export const MOCK_TAGS: MockTag[] = [
  { id: '1', name: 'SUPORTE', color: '#10B981', textColor: '#ECFDF5' },
  { id: '2', name: 'PRIORIDADE', color: '#EF4444', textColor: '#FEF2F2' },
  { id: '3', name: 'LEAD QUENTE', color: '#F59E0B', textColor: '#FFFBEB' },
  { id: '4', name: 'VIP', color: '#8B5CF6', textColor: '#F5F3FF' },
  { id: '5', name: 'IMPLANTAÇÃO', color: '#0EA5E9', textColor: '#F0F9FF' },
  { id: '6', name: 'RENOVAÇÃO', color: '#06B6D4', textColor: '#ECF0F1' },
  { id: '7', name: 'AGENDADO', color: '#6366F1', textColor: '#EEF2FF' },
  { id: '8', name: 'LEAD FRIO', color: '#6B7280', textColor: '#F3F4F6' },
  { id: '9', name: 'DEMO', color: '#EC4899', textColor: '#FDF2F8' },
  { id: '10', name: 'WHITE LABEL', color: '#3B82F6', textColor: '#EFF6FF' },
]

// Conversas fictícias realistas
export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: '1',
    clientName: 'Lucas Pereira',
    clientPhone: '(11) 99456-7890',
    clientAvatar: '👨‍💼',
    lastMessage: 'Perfeito, entendi. Podemos agendar uma reunião para amanhã às 14h?',
    lastMessageTime: '09:58',
    status: 'online',
    tags: ['SUPORTE', 'PRIORIDADE', 'LEAD QUENTE'],
    unreadCount: 2,
    assignedTo: 'Ana Ferreira',
  },
  {
    id: '2',
    clientName: 'Isabela Costa',
    clientPhone: '(21) 98765-4321',
    clientAvatar: '👩‍💼',
    lastMessage: 'Sucesso! Cliente aprovado para segunda fase.',
    lastMessageTime: '15:23',
    status: 'offline',
    tags: ['PRIORIDADE', 'IMPLANTAÇÃO'],
    unreadCount: 0,
    assignedTo: 'Bruno Xavier',
  },
  {
    id: '3',
    clientName: 'Fernanda Lima',
    clientPhone: '(85) 99234-5678',
    clientAvatar: '👩',
    lastMessage: 'Quando vocês conseguem ter uma demonstração?',
    lastMessageTime: '11:45',
    status: 'away',
    tags: ['DEMO', 'LEAD FRIO'],
    unreadCount: 1,
    assignedTo: 'Daniel Lima',
  },
  {
    id: '4',
    clientName: 'Ana Clara',
    clientPhone: '(31) 97654-3210',
    clientAvatar: '👩‍🦰',
    lastMessage: 'Tudo certo! Estamos prontos para começar.',
    lastMessageTime: '09:12',
    status: 'online',
    tags: ['IMPLANTAÇÃO', 'VIP'],
    unreadCount: 0,
    assignedTo: 'Ana Ferreira',
  },
  {
    id: '5',
    clientName: 'Marcos Oliveira',
    clientPhone: '(41) 99876-5432',
    clientAvatar: '👨',
    lastMessage: 'Qual o valor da renovação anual?',
    lastMessageTime: '08:34',
    status: 'online',
    tags: ['RENOVAÇÃO'],
    unreadCount: 3,
    assignedTo: 'Bruno Xavier',
  },
  {
    id: '6',
    clientName: 'Thiago Almeida',
    clientPhone: '(47) 98765-4321',
    clientAvatar: '🧑‍💼',
    lastMessage: 'Obrigado! Ficou excelente mesmo.',
    lastMessageTime: '16:56',
    status: 'offline',
    tags: ['SUPORTE', 'WHITE LABEL'],
    unreadCount: 0,
    assignedTo: 'Daniel Lima',
  },
  {
    id: '7',
    clientName: 'Carla Mendes',
    clientPhone: '(65) 99123-4567',
    clientAvatar: '👩‍🎓',
    lastMessage: 'Vocês têm suporte 24/7?',
    lastMessageTime: '13:42',
    status: 'away',
    tags: ['SUPORTE'],
    unreadCount: 1,
    assignedTo: 'Ana Ferreira',
  },
  {
    id: '8',
    clientName: 'Felipe Santos',
    clientPhone: '(75) 99456-7890',
    clientAvatar: '👨‍🎨',
    lastMessage: 'Vamos ver os números com gerência.',
    lastMessageTime: '10:28',
    status: 'online',
    tags: ['PRIORIDADE', 'AGENDADO'],
    unreadCount: 0,
    assignedTo: 'Bruno Xavier',
  },
]

// Mensagens fictícias
export const MOCK_MESSAGES: MockMessage[] = [
  {
    id: '1',
    conversationId: '1',
    sender: 'client',
    text: 'Olá! Gostaria de saber mais sobre o plano premium.',
    timestamp: '09:15',
    read: true,
  },
  {
    id: '2',
    conversationId: '1',
    sender: 'agent',
    text: 'Olá Lucas! Ótimo! Vou te passar todas as informações. 📋',
    timestamp: '09:16',
    read: true,
  },
  {
    id: '3',
    conversationId: '1',
    sender: 'agent',
    text: 'O plano premium inclui: Suporte 24/7, API unlimited, até 100k contatos. Interesse?',
    timestamp: '09:17',
    read: true,
  },
  {
    id: '4',
    conversationId: '1',
    sender: 'client',
    text: 'Perfeito! Qual o valor?',
    timestamp: '09:20',
    read: true,
  },
  {
    id: '5',
    conversationId: '1',
    sender: 'agent',
    text: 'Tabela atualizada: Premium R$ 2.990/mês ou R$ 29.900/ano (com 15% desc)',
    timestamp: '09:21',
    read: true,
  },
  {
    id: '6',
    conversationId: '1',
    sender: 'client',
    text: 'Perfeito, entendi. Podemos agendar uma reunião para amanhã às 14h?',
    timestamp: '09:58',
    read: false,
  },
]

// Contatos CRM - estágios diferentes
export const MOCK_CONTACTS: MockContact[] = [
  // Novos
  {
    id: '1',
    name: 'Lucas Pereira',
    phone: '(11) 99456-7890',
    email: 'lucas.pereira@eztech.com.br',
    avatar: '👨‍💼',
    stage: 'novo',
    tags: ['LEAD QUENTE', 'SUPORTE'],
    lastInteraction: 'Hoje - 09:58',
    source: 'Instagram',
    value: 2990,
  },
  {
    id: '2',
    name: 'Marina Costa',
    phone: '(21) 98765-4321',
    email: 'marina@startup.com.br',
    avatar: '👩‍💼',
    stage: 'novo',
    tags: ['LEAD FRIO'],
    lastInteraction: 'Ontem - 14:20',
    source: 'Google Ads',
    value: 1990,
  },
  {
    id: '3',
    name: 'Roberto Silva',
    phone: '(85) 99234-5678',
    email: 'robert@company.com',
    avatar: '👨',
    stage: 'novo',
    tags: ['VIP', 'PRIORIDADE'],
    lastInteraction: '2 dias atrás',
    source: 'Indicação',
    value: 5990,
  },
  // Em atendimento
  {
    id: '4',
    name: 'Fernanda Lima',
    phone: '(31) 97654-3210',
    email: 'fernanda@demo.com.br',
    avatar: '👩',
    stage: 'em_atendimento',
    tags: ['DEMO', 'AGENDADO'],
    lastInteraction: 'Hoje - 11:45',
    source: 'Website',
    value: 2990,
  },
  {
    id: '5',
    name: 'Carlos Mendes',
    phone: '(41) 99876-5432',
    email: 'carlos@tech.com.br',
    avatar: '👨‍🎯',
    stage: 'em_atendimento',
    tags: ['IMPLANTAÇÃO'],
    lastInteraction: 'Hoje - 08:34',
    source: 'Referral',
    value: 3990,
  },
  // Negociação
  {
    id: '6',
    name: 'Ana Clara',
    phone: '(47) 98765-4321',
    email: 'ana.clara@global.com',
    avatar: '👩‍🦰',
    stage: 'negociacao',
    tags: ['WHITE LABEL', 'VIP', 'PRIORIDADE'],
    lastInteraction: 'Hoje - 09:12',
    source: 'LinkedIn',
    value: 9990,
  },
  {
    id: '7',
    name: 'Thiago Almeida',
    phone: '(65) 99123-4567',
    email: 'thiago@solution.com.br',
    avatar: '🧑‍💼',
    stage: 'negociacao',
    tags: ['IMPLANTAÇÃO', 'AGENDADO'],
    lastInteraction: 'Hoje - 16:56',
    source: 'Cold Call',
    value: 4990,
  },
  // Pós-venda
  {
    id: '8',
    name: 'Isabela Costa',
    phone: '(75) 99456-7890',
    email: 'isabela@client.com.br',
    avatar: '👩‍🎓',
    stage: 'pos_venda',
    tags: ['SUPORTE', 'RENOVAÇÃO'],
    lastInteraction: 'Ontem - 15:23',
    source: 'Contrato',
    value: 2990,
  },
  {
    id: '9',
    name: 'Felipe Santos',
    phone: '(49) 99234-5678',
    email: 'felipe@company.com',
    avatar: '👨‍🎨',
    stage: 'pos_venda',
    tags: ['SUPORTE'],
    lastInteraction: '3 dias atrás',
    source: 'Contrato',
    value: 1990,
  },
]

// Agendamentos fictícios
export const MOCK_SCHEDULES: MockSchedule[] = [
  {
    id: '1',
    title: 'Reunião comercial - Lucas Pereira',
    date: '29/11/2025',
    time: '14:00',
    duration: 60,
    attendees: ['Ana Ferreira', 'Lucas Pereira'],
    type: 'reuniao',
    status: 'agendado',
  },
  {
    id: '2',
    title: 'Demonstração do sistema - Marina Costa',
    date: '01/12/2025',
    time: '10:00',
    duration: 45,
    attendees: ['Bruno Xavier', 'Marina Costa'],
    type: 'demonstracao',
    status: 'agendado',
  },
  {
    id: '3',
    title: 'Retorno de suporte - Fernanda Lima',
    date: '29/11/2025',
    time: '15:30',
    duration: 30,
    attendees: ['Daniel Lima', 'Fernanda Lima'],
    type: 'retorno',
    status: 'agendado',
  },
  {
    id: '4',
    title: 'Acompanhamento de implantação',
    date: '02/12/2025',
    time: '11:00',
    duration: 90,
    attendees: ['Ana Ferreira', 'Bruno Xavier', 'Carlos Mendes'],
    type: 'acompanhamento',
    status: 'agendado',
  },
  {
    id: '5',
    title: 'Review mensal - Time de Vendas',
    date: '03/12/2025',
    time: '09:00',
    duration: 120,
    attendees: ['Ana Ferreira', 'Bruno Xavier', 'Daniel Lima'],
    type: 'reuniao',
    status: 'agendado',
  },
]

// Usuários fictícios realistas
export const MOCK_USERS_DATA: MockUser[] = [
  {
    id: '1',
    name: 'Ana Ferreira',
    email: 'ana@funcionou.ai',
    avatar: '👩‍💼',
    role: 'Administrador',
    status: 'online',
    sector: 'Administrativo',
    active: true,
  },
  {
    id: '2',
    name: 'Bruno Xavier',
    email: 'bruno@funcionou.ai',
    avatar: '👨‍💼',
    role: 'Gerente',
    status: 'online',
    sector: 'Vendas',
    active: true,
  },
  {
    id: '3',
    name: 'Daniel Lima',
    email: 'daniel@funcionou.ai',
    avatar: '🧑‍💼',
    role: 'Atendente',
    status: 'away',
    sector: 'Suporte',
    active: true,
  },
  {
    id: '4',
    name: 'Carla Mendes',
    email: 'carla@funcionou.ai',
    avatar: '👩‍🎓',
    role: 'Atendente',
    status: 'offline',
    sector: 'Suporte',
    active: true,
  },
  {
    id: '5',
    name: 'Felipe Costa',
    email: 'felipe@funcionou.ai',
    avatar: '👨‍🎨',
    role: 'Colaborador',
    status: 'online',
    sector: 'Operações',
    active: true,
  },
]

// Setores fictícios
export const MOCK_SECTORS = [
  {
    id: '1',
    name: 'Atendimento',
    color: '#10B981',
    description: 'Suporte ao cliente e atendimento técnico',
  },
  {
    id: '2',
    name: 'Comercial',
    color: '#F59E0B',
    description: 'Prospecção e fechamento de novos negócios',
  },
  {
    id: '3',
    name: 'Suporte',
    color: '#0EA5E9',
    description: 'Resolução de problemas técnicos',
  },
  {
    id: '4',
    name: 'Financeiro',
    color: '#8B5CF6',
    description: 'Gestão de pagamentos e contratos',
  },
]

export const mockData = {
  conversations: MOCK_CONVERSATIONS,
  messages: MOCK_MESSAGES,
  contacts: MOCK_CONTACTS,
  tags: MOCK_TAGS,
  schedules: MOCK_SCHEDULES,
  users: MOCK_USERS_DATA,
  sectors: MOCK_SECTORS,
}
