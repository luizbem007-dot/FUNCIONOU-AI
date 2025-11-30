export interface MockSector {
  id: string
  name: string
  color: string
  greetingMessage: string
  userCount: number
  createdAt: string
}

export const MOCK_SECTORS: MockSector[] = [
  {
    id: 's1',
    name: 'Atendimento',
    color: '#00FF9A',
    greetingMessage: 'Olá! Bem-vindo ao nosso atendimento. Como posso ajudá-lo?',
    userCount: 8,
    createdAt: '2024-01-01'
  },
  {
    id: 's2',
    name: 'Vendas',
    color: '#00D4FF',
    greetingMessage: 'Oi! Temos ótimas promoções para você. Quer saber mais?',
    userCount: 5,
    createdAt: '2024-01-05'
  },
  {
    id: 's3',
    name: 'Suporte',
    color: '#FF006E',
    greetingMessage: 'Olá! Estamos aqui para resolver seus problemas. O que precisa?',
    userCount: 12,
    createdAt: '2024-01-10'
  },
  {
    id: 's4',
    name: 'Recursos Humanos',
    color: '#FFD700',
    greetingMessage: 'Bem-vindo! RH aqui para ajudar com sua carreira.',
    userCount: 3,
    createdAt: '2024-02-01'
  }
]
