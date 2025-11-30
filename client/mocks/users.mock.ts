export interface MockUser {
  id: string
  name: string
  email: string
  role: 'Administrador' | 'Atendente' | 'Gerente'
  status: 'online' | 'offline' | 'away'
  avatar?: string
  setor?: string
  createdAt: string
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'u1',
    name: 'Ana Ferreira',
    email: 'ana.ferreira@funcionouai.com',
    role: 'Administrador',
    status: 'online',
    setor: 'Atendimento',
    createdAt: '2024-01-15'
  },
  {
    id: 'u2',
    name: 'Bruno Xavier',
    email: 'bruno.xavier@funcionouai.com',
    role: 'Atendente',
    status: 'offline',
    setor: 'Vendas',
    createdAt: '2024-02-20'
  },
  {
    id: 'u3',
    name: 'Carla Mendez',
    email: 'carla.mendez@funcionouai.com',
    role: 'Gerente',
    status: 'online',
    setor: 'Suporte',
    createdAt: '2024-01-10'
  },
  {
    id: 'u4',
    name: 'Daniel Lima',
    email: 'daniel.lima@funcionouai.com',
    role: 'Atendente',
    status: 'away',
    setor: 'Atendimento',
    createdAt: '2024-03-05'
  },
  {
    id: 'u5',
    name: 'Elisa Santos',
    email: 'elisa.santos@funcionouai.com',
    role: 'Atendente',
    status: 'online',
    setor: 'Vendas',
    createdAt: '2024-02-28'
  },
  {
    id: 'u6',
    name: 'Fernando Costa',
    email: 'fernando.costa@funcionouai.com',
    role: 'Gerente',
    status: 'offline',
    setor: 'Suporte',
    createdAt: '2024-01-22'
  }
]
