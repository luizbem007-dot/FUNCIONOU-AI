# Menu System Integration Guide

## Overview

This document describes how to integrate the new top navigation menu system with your backend services.

## Architecture

The menu system consists of:

- **TopNav Component** (`client/components/navigation/TopNav.tsx`): Main desktop navigation bar
- **DropdownMenu Component** (`client/components/navigation/DropdownMenu.tsx`): Submenu dropdown UI
- **MobileSidebar Component** (`client/components/navigation/MobileSidebar.tsx`): Mobile navigation sidebar
- **Menu Configuration** (`client/config/menu.ts`): Dynamic menu structure definition

## Menu Configuration

The menu is configured in `client/config/menu.ts`:

```typescript
export const MAIN_MENU: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Painel',
    icon: 'BarChart3',
    route: '/dashboard'
  },
  {
    id: 'atendimentos',
    label: 'Atendimentos',
    icon: 'Headphones',
    submenu: [
      { label: 'Modo Kanban', route: '/atendimentos/kanban' },
      // ... more subitems
    ],
    badge: 5
  }
  // ... more menu items
]
```

## Pages and Routes

All pages are placeholder components that accept future backend integration. Current route structure:

### Dashboard
- Route: `/dashboard`
- Component: `Dashboard.tsx` (existing, showing all tabs)

### CRM
- Route: `/crm` (legacy)
- Routes added:
  - `/crm/visao` - Overview with metrics
  - `/crm/relatorios` - Reports and analytics
  - `/crm/leads` - Leads pipeline

### Atendimentos (Service)
- `/atendimentos/kanban` - Kanban board view with drag-and-drop ready

### Conversas (Conversations)
- Route: `/conversas`
- List + Chat UI with mock data

### Contatos (Contacts)
- Route: `/contatos`
- Table with bulk actions, tags, and filtering

### Mensagens (Messages)
- Route: `/mensagens`
- Message list with detail view

### Disparo (Mass Blast)
- Route: `/disparo`
- Contact selector + message composer with {{nome}} personalization

### Admin
- `/admin/usuarios` - User management table with add/edit modals
- `/admin/setores` - Sector management with color picker

### Configurações (Settings)
- `/config/conexoes` - Integrations management
- `/config/preferencias` - User preferences

### Agendamento (Scheduling)
- Route: `/agendamento`
- Calendar + event list view

### Tags
- Route: `/tags`
- Tag creation and management

### Plugins
- `/plugins/bot-manager` - Bot management UI
- `/plugins/auto-qualifier` - Auto-qualification settings

## Mock Data Files

All pages use mock data from:

- `client/mocks/users.mock.ts` - User data for admin pages
- `client/mocks/sectors.mock.ts` - Sector/team data
- `client/mocks/contacts.mock.ts` - Contact information

## Backend Integration Points

### Expected API Endpoints

To fully integrate this system with your backend, implement these endpoints:

#### Users Management
```
GET /api/users - List all users
POST /api/users - Create new user
PUT /api/users/{id} - Update user
DELETE /api/users/{id} - Delete user
```

#### Sectors
```
GET /api/sectors - List all sectors
POST /api/sectors - Create sector
PUT /api/sectors/{id} - Update sector
DELETE /api/sectors/{id} - Delete sector
```

#### Contacts
```
GET /api/contacts - List contacts with pagination
POST /api/contacts - Create contact
PUT /api/contacts/{id} - Update contact
DELETE /api/contacts/{id} - Delete contact
GET /api/contacts/{id}/messages - Get messages for contact
```

#### Messages/Conversations
```
GET /api/conversations - List conversations
GET /api/conversations/{id} - Get conversation detail
POST /api/conversations/{id}/messages - Send message
```

#### Mass Blast (Disparo)
```
POST /api/disparo - Send mass message
GET /api/disparo/history - Get disparo history
```

#### CRM
```
GET /api/crm/metrics - Dashboard metrics
GET /api/crm/leads - List leads
POST /api/crm/leads - Create lead
```

#### Scheduling
```
GET /api/scheduling/events - List events
POST /api/scheduling/events - Create event
PUT /api/scheduling/events/{id} - Update event
DELETE /api/scheduling/events/{id} - Cancel event
```

#### Plugins
```
GET /api/plugins - List available plugins
POST /api/plugins/{id}/activate - Activate plugin
POST /api/plugins/{id}/configure - Configure plugin
```

## Implementing Page Logic

### Replace Mock Data

Each page currently uses mock data. To integrate real data:

1. Replace mock data imports with API calls using React Query or fetch
2. Update state management in each page component
3. Add loading and error states
4. Implement form submissions

Example migration:

```typescript
// Before (mock data)
import { MOCK_USERS } from '@/mocks/users.mock'

// After (real API)
import { useQuery } from '@tanstack/react-query'

export default function UsuariosPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json())
  })

  if (isLoading) return <div>Carregando...</div>
  
  return (
    // ... render users from API
  )
}
```

### Forms and Modal Actions

All modals currently use console.log() stubs. Replace with actual API calls:

```typescript
const handleAddUser = async () => {
  try {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setShowModal(false)
    // Refresh user list
  } catch (error) {
    // Show error message
  }
}
```

## Styling and Theming

### Colors Used

- Primary accent: `#00FF9A` (neon green)
- Dark background: `#070707` / `#0b0b0b`
- Text colors: white and gray shades
- All components use Tailwind CSS

### Component Classes

Key reusable classes:

```css
.neon { color: #00FF9A; }
.neon-border { border-color: rgba(0, 255, 154, 0.2); }
.dark-bg { background-color: #070707; }
```

## Accessibility Features

- All dropdowns have `aria-haspopup` and `aria-expanded` attributes
- Keyboard navigation with arrow keys and Enter/Escape
- Focus outlines visible on all interactive elements
- Semantic HTML used throughout
- Screen reader friendly labels

## Mobile Responsiveness

- Desktop (≥1024px): Horizontal TopNav with dropdowns
- Tablet/Mobile (<1024px): Hamburger menu with collapsible sidebar
- Responsive tables with horizontal scroll on mobile
- Touch-friendly button sizes (minimum 44x44px)

## Performance Considerations

- Dropdowns render on-demand with state management
- Modals use lazy rendering
- Tables support pagination/virtualization ready
- All imports are code-split by page

## Testing Checklist

- [ ] TopNav renders on all protected pages
- [ ] Dropdown menus open/close correctly
- [ ] Navigation to all routes works
- [ ] Mobile hamburger menu functions
- [ ] Modals open, submit, and close properly
- [ ] Forms validate input
- [ ] Badges display count correctly
- [ ] Keyboard navigation works
- [ ] Responsive design on different screen sizes

## Known Limitations (Pre-Integration)

1. No real data fetching - all using mocks
2. No error handling for failed API calls
3. No loading states for async operations
4. No persistent form validation
5. No user authentication integration
6. No real drag-and-drop on Kanban board
7. Search functionality not connected
8. No filtering or sorting on tables

## Future Enhancements

1. Real-time updates using WebSocket
2. Advanced search with filters
3. Bulk actions for tables
4. Drag-and-drop Kanban board
5. Calendar integrations
6. Analytics dashboard
7. User preferences storage
8. Notification system
9. Activity logging
10. Audit trails

---

**Last Updated**: November 2024
**Version**: 1.0
