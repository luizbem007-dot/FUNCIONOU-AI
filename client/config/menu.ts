export interface MenuSubItem {
  label: string
  route: string
  icon?: string
  badge?: string | number
}

export interface MenuItem {
  id: string
  label: string
  icon: string
  route?: string
  submenu?: MenuSubItem[]
  badge?: string | number
}

export const MAIN_MENU: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Painel',
    icon: 'BarChart3',
    route: '/dashboard'
  },
  {
    id: 'conversas',
    label: 'Conversas',
    icon: 'MessageSquare',
    route: '/conversas',
    badge: 12
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: 'Database',
    submenu: [
      { label: 'Visão geral', route: '/crm/visao' },
      { label: 'Contatos', route: '/contatos' },
      { label: 'Leads', route: '/crm/leads' },
      { label: 'Relatórios', route: '/crm/relatorios' }
    ]
  },
  {
    id: 'disparo',
    label: 'Disparo',
    icon: 'Send',
    route: '/disparo'
  },
  {
    id: 'atendimentos',
    label: 'Atendimentos',
    icon: 'Headphones',
    submenu: [
      { label: 'Modo Kanban', route: '/atendimentos/kanban' },
      { label: 'Contatos', route: '/contatos' },
      { label: 'Mensagens', route: '/mensagens' },
      { label: 'Agendamento', route: '/agendamento' },
      { label: 'Tags', route: '/tags' }
    ],
    badge: 5
  },
  {
    id: 'config',
    label: 'Configurações',
    icon: 'Settings',
    submenu: [
      { label: 'Conexões', route: '/config/conexoes' },
      { label: 'Preferências', route: '/config/preferencias' }
    ]
  }
]

export const ICON_MAP: Record<string, any> = {
  BarChart3: 'BarChart3',
  MessageSquare: 'MessageSquare',
  Database: 'Database',
  Send: 'Send',
  Headphones: 'Headphones',
  Shield: 'Shield',
  Settings: 'Settings',
  ChevronDown: 'ChevronDown',
  X: 'X',
  Menu: 'Menu',
  Bell: 'Bell',
  LogOut: 'LogOut',
  Home: 'Home',
  Users: 'Users',
  Building: 'Building',
  Calendar: 'Calendar',
  Tag: 'Tag',
  FileText: 'FileText',
  Zap: 'Zap'
}
