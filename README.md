# Funcionou AI — Fusion Starter

Este repositório contém o template "Fusion Starter" com um frontend React + Vite e um backend Express integrado.

Resumo rápido:

- Diretório principal do frontend: `client/`
- Build do frontend (static SPA) gera saída em `dist/spa`
- Comandos importantes:

```bash
# Desenvolvimento (frontend + server)
pnpm install
pnpm dev

# Build (client + server)
pnpm run build:client
pnpm run build:server

# Testes
pnpm test

# Verificar TypeScript
pnpm run typecheck
```

Deploy no Vercel
- O repositório já inclui `vercel.json` que direciona o output estático para `dist/spa` (SPAs precisam rotear para `index.html`).
- No painel do Vercel, defina `Output Directory` como `dist/spa` caso o auto-detect falhe.

Notas
- Se usar HTTPS para push sem credencial cacheada, é conveniente configurar o helper de credenciais do macOS:

```bash
git config --global credential.helper osxkeychain
```

- Para pushes automatizados em CI, configure um `GITHUB_TOKEN` com permissões apropriadas.

---
Criado automaticamente por assistente para auxiliar deploy e CI.
# FUNCIONOU-AI
