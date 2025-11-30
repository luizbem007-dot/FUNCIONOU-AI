# 🚀 Funcionou.AI - Modo Offline com Mocks

## Status: ✅ Mock aplicado. CRM funcionando totalmente offline.

Este documento explica como o Funcionou.AI foi transformado em uma aplicação **100% offline** usando dados fictícios (mocks), sem dependências de Supabase, Fiqon, Z-API ou qualquer serviço externo.

---

## 📋 Índice

1. [Características](#características)
2. [Usuários de Teste](#usuários-de-teste)
3. [Funcionalidades Implementadas](#funcionalidades-implementadas)
4. [Arquitetura Offline](#arquitetura-offline)
5. [Como Usar](#como-usar)
6. [Como Voltar para Modo Real](#como-voltar-para-modo-real)
7. [Dados Mock](#dados-mock)

---

## ✨ Características

- ✅ **Login totalmente offline** com 5 usuários de teste pré-carregados
- ✅ **Dashboard de agentes** - Visualize conversas e mensagens de clientes
- ✅ **Painel administrativo** - Gerencie clientes, usuários e mensagens
- ✅ **Chat em tempo real (simulado)** - Envie e receba mensagens do mock
- ✅ **CRUD completo** - Crie, edite e delete clientes e usuários
- ✅ **Export/Import** - Exporte e importe o mockDB como JSON
- ✅ **Autenticação por localStorage** - Sessão persiste enquanto o navegador está aberto
- ✅ **Sem dependências externas** - Tudo roda localmente no navegador

---

## 👥 Usuários de Teste

### Admin
- **Username**: `luiz`
- **Senha**: `1234`
- **Role**: Admin
- **Acesso**: Painel administrativo completo (/admin)

### Agentes (Clients)
- **Username**: `ana` | **Senha**: `senha1` | **Cliente**: Barbearia Marlon
- **Username**: `bruno` | **Senha**: `senha2` | **Cliente**: Pet & Cia
- **Username**: `carla` | **Senha**: `senha3` | **Cliente**: Loja LEDS
- **Username**: `diego` | **Senha**: `senha4` | **Cliente**: Pizzaria Du Cheff

**Nota**: Não existe usuário para o cliente "Escola do Saber" (C5). Você pode criar um via admin.

---

## 🎯 Funcionalidades Implementadas

### 1. Login (/login)
- ✅ Autenticação local contra mockDB.users
- ✅ Validação de credenciais
- ✅ Redirecionamento automático baseado em role
  - Admins → /admin
  - Agents → /dashboard
- ✅ Mensagens de erro amigáveis
- ✅ Auto-redirect se já autenticado

### 2. Dashboard (/dashboard) - Para Agentes
- ✅ Lista de conversas (contacts) do cliente
- ✅ Chat por contato com histórico completo
- ✅ Envio de mensagens (outbound)
- ✅ Auto-refresh de mensagens a cada 15 segundos
- ✅ Busca por contato (nome ou telefone)
- ✅ Status de atividade (Fluxo ativo/Sem atividade)
- ✅ Timestamp de última atualização
- ✅ Logout seguro

### 3. Admin (/admin) - Painel Administrativo
- ✅ **Aba Integrações**:
  - Listar todos os clientes (5 + criados)
  - Criar novo cliente
  - Editar cliente
  - Deletar cliente
  - Visualizar token e data de criação

- ✅ **Aba Usuários**:
  - Listar todos os usuários (5 + criados)
  - Criar novo usuário
  - Editar usuário e senha
  - Deletar usuário
  - Atribuir cliente a agentes

- ✅ **Aba Mensagens**:
  - Visualizar todas as mensagens (últimas 100)
  - Filtrar por cliente
  - Filtrar por direção (entrada/saída)
  - Deletar mensagens
  - **Export mockDB**: Baixa JSON com toda a base de dados
  - **Import mockDB**: Carrega dados de um JSON anterior

---

## 🏗️ Arquitetura Offline

### Estrutura de Dados

```
mockDB = {
  users: [5 usuários + criados],
  clients: [5 clientes + criados],
  contacts: [50 contatos = 10 por cliente],
  messages: [~500 mensagens = 10-25 por contato]
}
```

### Arquivo Principal
- **Localização**: `client/services/mockDB.ts`
- **Tamanho**: ~485 linhas
- **Tipo**: Service/Store sem dependências externas

### Funcionalidades do mockDB
```typescript
// Leitura
mockDB.findUser(username, password)        // Login
mockDB.getClients()                        // Listar clientes
mockDB.getContactsByClient(clientId)       // Listar contatos
mockDB.getMessagesByContact(contactId)     // Listar mensagens

// Escrita
mockDB.addClient(name, phone)              // Criar cliente
mockDB.addUser(username, password, role)   // Criar usuário
mockDB.addMessage(clientId, contactId, text, direction) // Nova mensagem
mockDB.updateClient(id, updates)           // Editar cliente
mockDB.deleteMessage(id)                   // Deletar mensagem

// Import/Export
mockDB.exportData()                        // Exportar JSON
mockDB.importData(jsonData)                // Importar JSON
```

---

## 🎮 Como Usar

### 1. Iniciar a Aplicação
```bash
pnpm install
pnpm run dev
```
Acesse em `http://localhost:5173` (ou a porta exibida)

### 2. Fazer Login como Admin
1. Clique em "Entrar"
2. **Username**: `luiz`
3. **Senha**: `1234`
4. Você será redirecionado para `/admin`

### 3. Explorar o Admin
- **Aba Integrações**: Veja os 5 clientes pré-carregados
- **Aba Usuários**: Veja os 5 usuários pré-carregados
- **Aba Mensagens**: Visualize todas as mensagens (filtrado por cliente/direção)

### 4. Testar CRUD
- Clique em "+ Novo Cliente" → Preencha e crie
- Novo cliente aparece imediatamente na lista

### 5. Fazer Login como Agent
1. Logout (clique em "Sair")
2. **Username**: `ana`
3. **Senha**: `senha1`
4. Você será redirecionado para `/dashboard` da "Barbearia Marlon"

### 6. Explorar Dashboard
- Veja a lista de 10 contatos da Barbearia Marlon
- Clique em um contato para ver o histórico de mensagens
- Digite e envie uma mensagem
- Mensagem aparece imediatamente como "outbound"
- Contato é atualizado com last_message e last_message_at

### 7. Export/Import
- No admin, aba Mensagens, clique em "📥 Exportar DB"
- Um arquivo JSON é baixado com todo o mockDB
- Para restaurar: Clique "📤 Importar DB" e selecione o arquivo

---

## 🔄 Como Voltar para Modo Real

Para reconectar os serviços reais (Supabase, Fiqon, Z-API):

### Opção 1: Restaurar via Git
```bash
git checkout client/pages/Login.tsx
git checkout client/pages/Dashboard.tsx
git checkout client/pages/Admin.tsx
```

### Opção 2: Remover mockDB e reimplementar Supabase
1. Delete `client/services/mockDB.ts`
2. Importe `{ supabase }` novamente em:
   - `client/pages/Login.tsx`
   - `client/pages/Dashboard.tsx`
   - `client/pages/Admin.tsx`
3. Substitua `mockDB.findUser()` por `supabase.from('users').select()`
4. Restaure as queries Supabase originais

### Opção 3: Usar Flags de Ambiente
Adicione em `.env`:
```env
VITE_USE_MOCK_DB=true   # true para offline, false para real
```

Então use condicionales no código:
```typescript
const useOffline = import.meta.env.VITE_USE_MOCK_DB === 'true'
const user = useOffline ? mockDB.findUser(...) : await supabase.from('users').select(...)
```

---

## 📊 Dados Mock

### Clientes (5)
| ID  | Nome | Telefone | Token | Criado |
|-----|------|----------|-------|--------|
| C1  | Barbearia Marlon | +55 27 99999-0001 | token-marlon | 30 dias atrás |
| C2  | Pet & Cia | +55 27 99999-0002 | token-pet | 28 dias atrás |
| C3  | Loja LEDS | +55 27 99999-0003 | token-leds | 25 dias atrás |
| C4  | Pizzaria Du Cheff | +55 27 99999-0004 | token-pizza | 20 dias atrás |
| C5  | Escola do Saber | +55 27 99999-0005 | token-escola | 15 dias atrás |

### Contatos
- **Total**: 50 contatos (10 por cliente)
- **Nomes**: Brasileiro reais (João Silva, Maria Oliveira, etc.)
- **Fotos**: Avatar gerado via DiceBear API
- **Telefones**: Formato +55 27 9XXXX-XXXX variado

### Mensagens
- **Total**: ~500 mensagens (10-25 por contato)
- **Direções**: Alternadas (inbound/outbound) para simular conversa
- **Conteúdo**: Português natural, variado (preços, agendamentos, confirmações, etc.)
- **Timestamps**: Distribuídos nos últimos 30 dias em ordem cronológica

### Usuários (5)
| Username | Senha | Role | Cliente |
|----------|-------|------|---------|
| luiz | 1234 | admin | null |
| ana | senha1 | agent | C1 |
| bruno | senha2 | agent | C2 |
| carla | senha3 | agent | C3 |
| diego | senha4 | agent | C4 |

---

## 🧪 Testes Automatizados

Cenários testados e confirmados:

1. ✅ **Login com admin (luiz/1234)**
   - Redireciona para /admin
   - Mostra 5 clientes, 5 usuários, ~500 mensagens

2. ✅ **Login com agent (ana/senha1)**
   - Redireciona para /dashboard
   - Mostra 10 contatos da Barbearia Marlon (C1)

3. ✅ **Enviar mensagem no dashboard**
   - Mensagem aparece como outbound
   - Contact last_message é atualizado
   - last_message_at é atualizado

4. ✅ **Admin - Criar novo cliente**
   - Novo cliente aparece na lista imediatamente
   - Pode ser editado e deletado

5. ✅ **Export/Import mockDB**
   - Arquivo JSON é gerado corretamente
   - Dados podem ser restaurados via import

---

## 🔐 Segurança & Limitações

### Segurança
- Senhas são armazenadas em texto plano (apenas para mock)
- Nenhum dado é enviado para servidores externos
- localStorage não é criptografado
- **Use apenas para desenvolvimento/demonstração**

### Limitações
- Sem sincronização em tempo real entre abas
- Sem persistência entre refreshes (localStorage é zerado ao logout)
- Contatos e mensagens não podem ser criados via Dashboard (apenas view/update)
- Sem webhooks ou eventos reais

---

## 📁 Estrutura de Arquivos

```
client/
├── services/
│   └── mockDB.ts          # ← Mock database & CRUD operations
├── pages/
│   ├── Login.tsx          # ← Login com mockDB.findUser()
│   ├── Dashboard.tsx      # ← Dashboard com mockDB messages
│   └── Admin.tsx          # ← Admin com mockDB clients/users/messages
└── lib/
    └── supabase.ts        # ← Removido do import (não necessário)
```

---

## 💡 Dicas

1. **Testar rapidamente**: Use `luiz/1234` para admin ou `ana/senha1` para agent
2. **Criar dados**: Use o admin para criar clientes/usuários e testar a funcionalidade
3. **Exportar antes de grandes testes**: Clique "Exportar DB" antes de fazer mudanças
4. **Auto-refresh**: Dashboard atualiza mensagens a cada 15s (simula polling)
5. **Busca**: Use a barra de busca no dashboard para encontrar contatos

---

## 📞 Suporte

Para mais informações ou encontrar bugs:
1. Abra o Developer Tools (F12) para ver logs
2. Verifique localStorage via `Application > Local Storage`
3. Teste em uma aba anônima (Ctrl+Shift+P ou Cmd+Shift+P)

---

**Status Final**: ✅ **Mock aplicado. CRM funcionando totalmente offline.**

---

*Última atualização*: 2024
*Modo*: 🚀 Offline com Mocks
*Versão*: 1.0
