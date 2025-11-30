# 🧪 Painel - Guia Rápido de Teste

## ⚡ Como Testar em 30 Segundos

### Teste 1: Acessar o Painel (Login automático)
```
1. Login: ana / senha1
2. Resultado: Abre /panel automaticamente ✅
```

### Teste 2: Ver todos os Cards
```
1. Scroll down na página
2. Verificar 6 cards aparecem:
   ✅ Mensagens recebidas (12)
   ✅ Conversas ativas (4)
   ✅ Respostas pendentes (2)
   ✅ Tempo médio (3min)
   ✅ Novos contatos (5)
   ✅ Satisfação (98%)
```

### Teste 3: Ver Gráfico
```
1. Scroll down após cards
2. Ver: "Volume de Mensagens - Últimos 7 dias"
3. Verificar barras com dados: 20, 32, 18, 40, 55, 29, 61
```

### Teste 4: Ver Contatos Recentes
```
1. Scroll down após gráfico
2. Ver 5 contatos com:
   ✅ Mariana Pereira (Online)
   ✅ João Mendes (Online)
   ✅ Ana Ferreira (Offline)
   ✅ Lucas Costa (Online)
   ✅ Carla Gomes (Offline)
```

### Teste 5: Navegar para Conversas
```
1. No Painel, clique em "💬 Conversas" (tab no topo)
2. Resultado: Navega para /dashboard
3. Volta ao Dashboard com chat ✅
```

### Teste 6: Navegar de Volta para Painel
```
1. No Dashboard, clique em "📊 Painel" (sidebar)
2. Resultado: Volta para /panel ✅
```

### Teste 7: Testar Mobile (375px)
```
1. Abrir DevTools (F12)
2. Toggle device toolbar
3. Escolher iPhone SE (375px)
4. Refreshar página
5. Verificar:
   ✅ Cards em 1 coluna
   ✅ Gráfico responsivo
   ✅ Contatos em 1 coluna
   ✅ Tabs visíveis
   ✅ Tudo legível
```

### Teste 8: Testar Tablet (768px)
```
1. Mudar para 768px no DevTools
2. Verificar:
   ✅ Cards em 2 colunas
   ✅ Gráfico 100% width
   ✅ Contatos em 2 colunas
```

### Teste 9: Testar Desktop (1440px)
```
1. Maximizar browser
2. Verificar:
   ✅ Cards em 3 colunas (grid 3x2)
   ✅ Gráfico 100% width
   ✅ Contatos em 5 colunas
   ✅ Header full features
```

### Teste 10: Verificar Design
```
1. Cores corretas?
   ✅ Preto #000000
   ✅ Neon verde #00FF9A
   ✅ Cinza escuro backgrounds
   
2. Efeitos?
   ✅ Hover nos cards (sombra neon)
   ✅ Transições suaves
   ✅ Gradientes
   ✅ Sombras modernas
```

---

## 🎯 Checklist de Produção

- [ ] Login com ana/senha1 redireciona para /panel
- [ ] Painel carrega com todos os dados
- [ ] 6 cards visíveis
- [ ] Gráfico mostra 7 dias de dados
- [ ] 5 contatos recentes aparecem
- [ ] Navegação Painel → Conversas funciona
- [ ] Navegação Conversas → Painel funciona
- [ ] Mobile: tudo responsivo
- [ ] Tablet: layout 2-col cards
- [ ] Desktop: layout 3-col cards
- [ ] Sem erros no console (F12)
- [ ] Sem layout shift
- [ ] Cores corretas
- [ ] Design premium

---

## 🐛 Troubleshooting

### Painel não abre?
```
1. Limpar cache (Ctrl+Shift+Del)
2. Refreshar (F5 ou Cmd+R)
3. Verificar console (F12 → Console)
4. Checar se rota /panel está em App.tsx
```

### Cards aparecem em column em desktop?
```
1. Checar media queries no Tailwind
2. Verificar width das colunas
3. Se problema persiste: `npm run build` e refreshar
```

### Gráfico não mostra?
```
1. Verificar se Recharts está instalado: `npm ls recharts`
2. Se não: `npm install recharts` ou `pnpm add recharts`
3. Refreshar página
```

### Dados não são fictícios?
```
1. Verificar se dados em Panel.tsx são hardcoded (estão em const metrics)
2. Não deve haver fetchs para banco
3. Tudo deve ser local
```

---

## 📱 Test Sizes (DevTools)

```
Mobile:    375px × 667px (iPhone SE)
Tablet:    768px × 1024px (iPad)
Laptop:   1024px × 768px
Desktop:  1440px × 900px
```

---

**Pronto para testar!** 🚀

Se encontrar algum problema, verifique:
1. Console (F12)
2. Network (verifique se /panel carrega)
3. Responsive mode ativado
4. Cache limpo
