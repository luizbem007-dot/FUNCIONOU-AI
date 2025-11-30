// Types
export interface User {
  id: string
  username: string
  password: string
  role: 'admin' | 'agent'
  client_id: string | null
  created_at: string
}

export interface Client {
  id: string
  name: string
  phone: string
  token: string
  created_at: string
}

export interface Contact {
  id: string
  client_id: string
  name: string
  phone: string
  profile_photo: string
  last_message: string
  last_message_at: string
}

export interface Message {
  id: string
  client_id: string
  contact_id: string
  direction: 'inbound' | 'outbound'
  text: string
  timestamp: string
}

// Helper: Generate past date
function daysAgo(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

// Helper: Generate random time on a specific day
function randomTimeOnDay(daysBack: number): string {
  const date = new Date()
  date.setDate(date.getDate() - daysBack)
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60), 0)
  return date.toISOString()
}

// Helper: Generate avatar URL
function getAvatarUrl(name: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
}

// Generate mock data
function generateMockData() {
  // Users
  const users: User[] = [
    {
      id: 'U1',
      username: 'luiz',
      password: '1234',
      role: 'admin',
      client_id: null,
      created_at: daysAgo(90)
    },
    {
      id: 'U2',
      username: 'ana',
      password: 'senha1',
      role: 'agent',
      client_id: 'C1',
      created_at: daysAgo(60)
    },
    {
      id: 'U3',
      username: 'bruno',
      password: 'senha2',
      role: 'agent',
      client_id: 'C2',
      created_at: daysAgo(60)
    },
    {
      id: 'U4',
      username: 'carla',
      password: 'senha3',
      role: 'agent',
      client_id: 'C3',
      created_at: daysAgo(60)
    },
    {
      id: 'U5',
      username: 'diego',
      password: 'senha4',
      role: 'agent',
      client_id: 'C4',
      created_at: daysAgo(60)
    }
  ]

  // Clients
  const clients: Client[] = [
    {
      id: 'C1',
      name: 'Barbearia Marlon',
      phone: '+55 27 99999-0001',
      token: 'token-marlon',
      created_at: daysAgo(30)
    },
    {
      id: 'C2',
      name: 'Pet & Cia',
      phone: '+55 27 99999-0002',
      token: 'token-pet',
      created_at: daysAgo(28)
    },
    {
      id: 'C3',
      name: 'Loja LEDS',
      phone: '+55 27 99999-0003',
      token: 'token-leds',
      created_at: daysAgo(25)
    },
    {
      id: 'C4',
      name: 'Pizzaria Du Cheff',
      phone: '+55 27 99999-0004',
      token: 'token-pizza',
      created_at: daysAgo(20)
    },
    {
      id: 'C5',
      name: 'Escola do Saber',
      phone: '+55 27 99999-0005',
      token: 'token-escola',
      created_at: daysAgo(15)
    }
  ]

  // Contact names for generation
  const firstNames = ['João', 'Maria', 'Pedro', 'Lucas', 'Ana', 'Paula', 'Carlos', 'Fernanda', 'Ricardo', 'Mariana']
  const lastNames = ['Silva', 'Oliveira', 'Santos', 'Costa', 'Ferreira', 'Rodrigues', 'Martins', 'Gomes', 'Alves', 'Pereira']

  // Generate contacts and messages
  const contacts: Contact[] = []
  const messages: Message[] = []
  let messageId = 1

  // Sample message templates
  const inboundMessages = [
    'Pode agendar para amanhã?',
    'Qual é o preço?',
    'Vocês fazem atendimento aos domingos?',
    'Preciso de um orçamento',
    'Qual é o telefone de vocês?',
    'Quais são os horários?',
    'Pode me confirmar a data?',
    'Você recebe cartão de crédito?',
    'Qual é o endereco?',
    'Tem vaga ainda?',
    'Oláa, tudo bem?',
    'Quando vocês abrem?',
    'Quanto custa?',
    'Fazem entrega?',
    'Qual é o endereço de vocês?',
    'Me envia uma foto do produto',
    'Qual é a qualidade?',
    'Vocês vendem no atacado?',
    'Quanto é o frete?',
    'Preciso dessa urgente',
    'Pode ser a noite?',
    'Tem esse modelo em outra cor?',
    'Qual melhor opção pra mim?',
    'Vc recomenda qual?',
    'Tô interessado',
    'Pode arredondar o preço?',
    'Vocês fazem parcelado?',
    'Tem promoção?',
    'Qual é a garantia?',
    'Como funciona a devolução?'
  ]

  const outboundMessages = [
    'Olá! Bem-vindo! 😊',
    'Claro! Qual seria a melhor hora para você?',
    'Nossa promoção está saindo a R$ 89,90',
    'Funcionamos de segunda a sexta das 9h às 18h',
    'Pode deixar! Já agendo para você',
    'Sim, aceitamos todos os cartões',
    'Nossa unidade fica na Rua das Flores, 123',
    'Temos sim! Qual você prefere?',
    'O frete é grátis acima de R$ 150',
    'Claro, podemos arranjar sim',
    'Ótimo! Vou te enviar o link do pagamento',
    'Qual é seu tamanho?',
    'Temos parceria com varias transportadoras',
    'Pode ser! Qual horário você prefere?',
    'Sim, temos em vários modelos',
    'Vou checar nosso estoque para você',
    'Recomendo esse aqui, é o melhor custo-benefício',
    'Temos essa promoção especial para você',
    'Infelizmente não temos em estoque agora',
    'Deixa eu consultar nosso gerente',
    'Podemos entregar até amanhã',
    'Qual é seu CEP? Vou calcular o frete',
    'Temos 12 meses de garantia',
    'Se não gostar, devolve sem problemas',
    'Vou reservar para você',
    'Aqui no nosso site você vê melhor',
    'Manda sua foto que avalio para você',
    'Temos desconto para primeira compra',
    'Ja mandei o whatsapp pra você',
    'Aproveita que temos só 3 unidades'
  ]

  clients.forEach((client, clientIndex) => {
    for (let i = 0; i < 10; i++) {
      const contactId = `CT${clientIndex * 10 + i + 1}`
      const firstName = firstNames[i % firstNames.length]
      const lastName = lastNames[(i + clientIndex) % lastNames.length]
      const name = `${firstName} ${lastName}`

      // Generate random phone
      const phone = `+55 27 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`

      // Generate 10-25 messages for this contact
      const msgCount = 10 + Math.floor(Math.random() * 16)
      const contactMessages: Message[] = []

      let lastMessageTime = randomTimeOnDay(Math.floor(Math.random() * 30) + 1)
      let lastMessageText = ''
      let isInbound = Math.random() > 0.5

      for (let j = 0; j < msgCount; j++) {
        // Add some time between messages
        const timeAddition = Math.random() * 3600000 // up to 1 hour
        const msgTime = new Date(new Date(lastMessageTime).getTime() + timeAddition)
        lastMessageTime = msgTime.toISOString()

        const text = isInbound
          ? inboundMessages[Math.floor(Math.random() * inboundMessages.length)]
          : outboundMessages[Math.floor(Math.random() * outboundMessages.length)]

        const message: Message = {
          id: `MSG${messageId++}`,
          client_id: client.id,
          contact_id: contactId,
          direction: isInbound ? 'inbound' : 'outbound',
          text: text,
          timestamp: lastMessageTime
        }

        contactMessages.push(message)
        lastMessageText = text
        isInbound = !isInbound // Alternate direction
      }

      messages.push(...contactMessages)

      const contact: Contact = {
        id: contactId,
        client_id: client.id,
        name: name,
        phone: phone,
        profile_photo: getAvatarUrl(name),
        last_message: lastMessageText,
        last_message_at: lastMessageTime
      }

      contacts.push(contact)
    }
  })

  return { users, clients, contacts, messages }
}

// Initialize mock data
const initialData = generateMockData()

// Create mockDB object with methods
export const mockDB = {
  users: initialData.users,
  clients: initialData.clients,
  contacts: initialData.contacts,
  messages: initialData.messages,

  // User operations
  findUser(username: string, password: string): User | undefined {
    return this.users.find(u => u.username === username && u.password === password)
  },

  findUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id)
  },

  // Client operations
  getClients(): Client[] {
    return [...this.clients]
  },

  getClientById(id: string): Client | undefined {
    return this.clients.find(c => c.id === id)
  },

  addClient(name: string, phone: string): Client {
    const newId = `C${this.clients.length + 1}`
    const newClient: Client = {
      id: newId,
      name,
      phone,
      token: `token-${name.toLowerCase().replace(/\s+/g, '-')}`,
      created_at: new Date().toISOString()
    }
    this.clients.push(newClient)
    return newClient
  },

  updateClient(id: string, updates: Partial<Client>): Client | undefined {
    const client = this.clients.find(c => c.id === id)
    if (client) {
      Object.assign(client, updates)
    }
    return client
  },

  deleteClient(id: string): boolean {
    const index = this.clients.findIndex(c => c.id === id)
    if (index > -1) {
      this.clients.splice(index, 1)
      return true
    }
    return false
  },

  // Contact operations
  getContactsByClient(clientId: string): Contact[] {
    return this.contacts.filter(c => c.client_id === clientId).sort((a, b) => {
      return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
    })
  },

  getContactById(id: string): Contact | undefined {
    return this.contacts.find(c => c.id === id)
  },

  addContact(clientId: string, name: string, phone: string): Contact {
    const newId = `CT${this.contacts.length + 1}`
    const newContact: Contact = {
      id: newId,
      client_id: clientId,
      name,
      phone,
      profile_photo: getAvatarUrl(name),
      last_message: '',
      last_message_at: new Date().toISOString()
    }
    this.contacts.push(newContact)
    return newContact
  },

  updateContact(id: string, updates: Partial<Contact>): Contact | undefined {
    const contact = this.contacts.find(c => c.id === id)
    if (contact) {
      Object.assign(contact, updates)
    }
    return contact
  },

  deleteContact(id: string): boolean {
    const index = this.contacts.findIndex(c => c.id === id)
    if (index > -1) {
      this.contacts.splice(index, 1)
      return true
    }
    return false
  },

  // Message operations
  getMessagesByContact(contactId: string): Message[] {
    return this.messages
      .filter(m => m.contact_id === contactId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  },

  getMessagesByClient(clientId: string): Message[] {
    return this.messages
      .filter(m => m.client_id === clientId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  },

  addMessage(clientId: string, contactId: string, text: string, direction: 'inbound' | 'outbound'): Message {
    const newId = `MSG${this.messages.length + 1}`
    const newMessage: Message = {
      id: newId,
      client_id: clientId,
      contact_id: contactId,
      direction,
      text,
      timestamp: new Date().toISOString()
    }
    this.messages.push(newMessage)

    // Update contact's last message
    const contact = this.contacts.find(c => c.id === contactId)
    if (contact) {
      contact.last_message = text
      contact.last_message_at = newMessage.timestamp
    }

    return newMessage
  },

  deleteMessage(id: string): boolean {
    const index = this.messages.findIndex(m => m.id === id)
    if (index > -1) {
      this.messages.splice(index, 1)
      return true
    }
    return false
  },

  // User operations for admin
  getUsers(): User[] {
    return [...this.users]
  },

  addUser(username: string, password: string, role: 'admin' | 'agent', clientId?: string): User {
    const newId = `U${this.users.length + 1}`
    const newUser: User = {
      id: newId,
      username,
      password,
      role,
      client_id: clientId || null,
      created_at: new Date().toISOString()
    }
    this.users.push(newUser)
    return newUser
  },

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.find(u => u.id === id)
    if (user) {
      Object.assign(user, updates)
    }
    return user
  },

  deleteUser(id: string): boolean {
    const index = this.users.findIndex(u => u.id === id)
    if (index > -1) {
      this.users.splice(index, 1)
      return true
    }
    return false
  },

  // Export/Import
  exportData() {
    return {
      users: this.users,
      clients: this.clients,
      contacts: this.contacts,
      messages: this.messages,
      exportedAt: new Date().toISOString()
    }
  },

  importData(data: any) {
    try {
      if (data.users && Array.isArray(data.users)) this.users = data.users
      if (data.clients && Array.isArray(data.clients)) this.clients = data.clients
      if (data.contacts && Array.isArray(data.contacts)) this.contacts = data.contacts
      if (data.messages && Array.isArray(data.messages)) this.messages = data.messages
      return true
    } catch (err) {
      console.error('Error importing data:', err)
      return false
    }
  }
}
