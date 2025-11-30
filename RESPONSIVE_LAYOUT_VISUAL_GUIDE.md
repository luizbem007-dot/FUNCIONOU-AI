# 📱 Dashboard Responsive Layout - Visual Reference Guide

## Quick Reference: Layout Behavior by Screen Size

### Desktop (≥1280px) - 32% | 68%
```
┌─────────────────────────────────────────────────────────────┐
│ ← Sidebar (360px)  │ Main Content                            │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Conversas          │ João Silva (Contact Header - Sticky)  │
│  [Search...]        │ +55 27 99999-0001 | 🟢 Ativo          │
│ ┌──────────────────┐├───────────────────────────────────────┤
│ │ João Silva       │ │ [Mensagem in 13:45]                 │
│ │ +55 27...        │ │ "Pode agendar para amanhã?"         │
│ │ "Pode agen..."   │ │                                       │
│ │ há 5min          │ │ [Mensagem out 13:50]                │
│ │                  │ │ "Claro! Qual seria melhor?"         │
│ ├──────────────────┤│                                       │
│ │ Maria Oliveira   │ │ [Mensagem in 14:10]                 │
│ │ +55 27...        │ │ "Pode ser a noite?"                 │
│ │ "Tudo bem?"      │ │                                       │
│ │ há 2h            │ ├───────────────────────────────────────┤
│ ├──────────────────┤│ [Digite uma mensagem...        ] [→] │
│ │ Pedro Santos     │ └───────────────────────────────────────┘
│ │ +55 27...        │
│ │ "Qual é o preço" │
│ │ há 4h            │
│ └──────────────────┘
  ↑ Independent Scroll
```

**Key Properties:**
- Left Column: `flex: 0 0 32% (min 320px, max 420px)`
- Right Column: `flex: 1; min-width: 320px`
- Search: `position: sticky; top: 0; z-index: 20`
- Header: `position: sticky; top: 0; z-index: 20`
- Composer: `position: relative; (at end of flex column)`
- Both scroll independently with `overflow-y: auto; -webkit-overflow-scrolling: touch`

---

### Laptop (1024–1279px) - 36% | 64%
```
┌──────────────────────────────────────────────────────────┐
│ ← Sidebar (360px) │ Main Content                          │
└──────────────────────────────────────────────────────────┘

[Same structure as desktop, but left column ~36% width]
```

**Key Properties:**
- Left Column: `flex: 0 0 36% (min 300px, max 420px)`
- Right Column: `flex: 1`
- All other properties: Same as desktop

---

### Tablet (768–1023px) - 40% | 60%
```
┌─────────────────────────────────────────────────────┐
│ Conversas     │ Chat Area                           │
│ [Search...]   │ ┌─────────────────────────────────┐ │
│ ┌──────────┐ ├─│ João Silva (Compact)            │ │
│ │ João     │ │ │ +55 27 99...                    │ │
│ │ +55      │ │ ├─────────────────────────────────┤ │
│ │ "Pode.." │ │ │ [Msg in] [Msg out]              │ │
│ │ há 5min  │ │ │ [Msg in]                        │ │
│ ├──────────┤ │ │ ...                             │ │
│ │ Maria    │ │ ├─────────────────────────────────┤ │
│ │ +55      │ │ │ [Digite...           ] [→]      │ │
│ │ "Tudo.." │ │ │                                 │ │
│ │ há 2h    │ │ └─────────────────────────────────┘ │
│ └──────────┘ │                                     │
```

**Key Properties:**
- Left Column: `flex: 0 0 40% (min 280px, max 400px)`
- Right Column: `flex: 1`
- Compact spacing to save room
- Still maintains touch targets ≥44px

---

### Mobile (< 768px) - Full Width (Single Column)

#### List View (Default)
```
┌────────────────────────────┐
│ 🔍 [Buscar...]             │ ← Sticky search
├────────────────────────────┤
│ João Silva                 │ ← 56px height
│ +55 27 99999-0001          │   (min touch target)
│ "Pode agendar para amanhã?"│
│ há 5min                    │
├────────────────────────────┤
│ Maria Oliveira             │
│ +55 27 99999-0002          │
│ "Tudo bem?"                │
│ há 2h                      │
├────────────────────────────┤
│ Pedro Santos               │
│ +55 27 99999-0003          │
│ "Qual é o preço?"          │
│ há 4h                      │
└────────────────────────────┘
```

**Key Properties:**
- Width: 100% (full-screen)
- Contacts height: 56px (avatar 12px + padding)
- Search bar: `position: sticky; top: 0; z-index: 20`
- Spacing: 8-12px gaps
- Scroll: `overflow-y: auto; -webkit-overflow-scrolling: touch`

#### Chat View (On Contact Select)
```
┌────────────────────────────┐
│ ← João Silva               │ ← Sticky header
│    +55 27 99999-0001       │   Back button ≥44px
├────────────────────────────┤
│ ┌──────────────┐           │
│ │ Mensagem in  │           │ ← Message bubbles
│ │ 13:45        │           │   max-width responsive
│ └──────────────┘           │
│                            │
│          ┌────────────────┐│
│          │ Msg out 13:50  ││
│          │                ││
│          └────────────────┘│
│                            │
│ ┌──────────────┐           │
│ │ In 14:10     │           │
│ └──────────────┘           │
│ ...                        │
├────────────────────────────┤
│ [Digite msg...        ] [→]│ ← Fixed composer
│ (Safe area padding)        │   ≥44px height
└────────────────────────────┘
```

**Key Properties:**
- Width: 100% (full-screen)
- Header: `position: sticky; top: 0; z-index: 20`
- Messages: `overflow-y: auto; -webkit-overflow-scrolling: touch`
- Composer: Fixed at bottom with safe area padding
- Messages: max-width responsive (80-90% width)

#### Transition: List → Chat
```
List View              →  Swipe Left    →  Chat View
┌─────────────┐       ┌─────────────┐     ┌─────────────┐
│ [Conversas] │   →   │ [Transição] │  →  │ [Chat]      │
│ João (tap)  │       │   (smooth)  │     │ João        │
│ Maria       │       │             │     │ ← Back      │
│ Pedro       │       │             │     │ [Messages]  │
└─────────────┘       └─────────────┘     │ [Composer]  │
                                          └─────────────┘
```

**Animation Properties:**
- Transition: CSS transform translateX
- Duration: 300ms
- Easing: ease-out (smooth deceleration)
- No jank: GPU-accelerated

---

## CSS Breakpoint Helpers

### Tailwind CSS Classes Used
```css
/* Mobile-first defaults (< 768px) */
display: none; /* hidden by default */
display: flex; /* single column layout */

/* Tablet and up (≥ 768px) */
md:flex       /* Show at 768px+ */
md:w-[40%]    /* 40% width at 768px+ */
md:max-w-[420px]

/* Laptop and up (≥ 1024px) */
lg:w-[36%]    /* 36% width at 1024px+ */
lg:max-w-[420px]

/* Desktop and up (≥ 1280px) */
xl:w-[32%]    /* 32% width at 1280px+ */
xl:max-w-[420px]
```

### Media Query Equivalents (Plain CSS)
```css
/* Desktop (≥1280px) */
@media (min-width: 1280px) {
  .contacts-list { width: 32%; max-width: 420px; }
  .chat-view { flex: 1; }
}

/* Laptop (1024–1279px) */
@media (min-width: 1024px) and (max-width: 1279px) {
  .contacts-list { width: 36%; max-width: 420px; }
  .chat-view { flex: 1; }
}

/* Tablet (768–1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .contacts-list { width: 40%; max-width: 420px; }
  .chat-view { flex: 1; }
}

/* Mobile (< 768px) */
@media (max-width: 767px) {
  .contacts-list { display: none; }
  .chat-view { display: flex; flex-direction: column; }
  .mobile-back-button { display: block; }
}
```

---

## Touch Target & Spacing Reference

### Minimum Touch Target Sizes
```
┌─────────────────┐
│                 │ 44px (Apple standard)
│    [Button]     │ 48px (Android recommended)
│                 │
└─────────────────┘
Min width: 44px
Min height: 44px
```

### Spacing Between Elements
```
Item 1
↓ 8px (min)
↓ 12px (comfortable)
↓ 16px (generous)
Item 2
```

### Contact List Item Layout
```
┌────────────────────────┐ ← 56px (min height)
│ ╭─────╮ João Silva    │
│ │ IMG │ +55 27 99...  │ ← Name (14px, semibold)
│ │ 12  │ "Pode agend..."│ ← Phone (12px)
│ ╰─────╯ há 5min       │ ← Snippet (12px)
├────────────────────────┤ ← Time (12px)
│ ╭─────╮ Maria        │
│ │ IMG │ +55 27 99... │
│ │ 12  │ "Tudo bem?"   │
│ ╰─────╯ há 2h         │
└────────────────────────┘
  ↑ 8-12px gaps
```

---

## Color & Contrast Reference

### Text Hierarchy
```
Primary (heading): #FFFFFF, 16px, 600 weight
Secondary (body): #999999, 14px, 400 weight
Tertiary (meta): #666666, 12px, 400 weight
Error (alert): #FF0000, 12px, 400 weight

Contrast Ratios:
- Primary on black: 21:1 ✅ (WCAG AAA)
- Secondary on black: 7.5:1 ✅ (WCAG AA)
- Tertiary on black: 4.5:1 ✅ (WCAG AA)
- Error on red-bg: 4.5:1 ✅ (WCAG AA)
```

### Accent Colors
```
Green (selected, active): #00FF84
  Contrast: 1.5:1 when on black ���
  Contrast: 4.8:1 when black text on it ✅

Red (error, inactive): #FF0000
  Contrast: 5:1 on black ✅

Gray (secondary): #666666
  Contrast: 4.5:1 on black ✅
```

---

## Performance Metrics Reference

### Target Metrics
```
First Contentful Paint (FCP): < 1.5s
Largest Contentful Paint (LCP): < 2.5s
Cumulative Layout Shift (CLS): < 0.1
Time to Interactive (TTI): < 3.5s

Scrolling Performance:
- FPS: ≥ 60fps (120fps on high-refresh displays)
- Frame time: ≤ 16.67ms per frame

Load Times:
- Contact list: < 300ms
- Message list: < 150ms
- Search filter: < 50ms
- View transition: < 100ms
```

### Measurement Tools
```
Chrome DevTools:
- Performance tab: Record and analyze
- Lighthouse: Run audit
- Network tab: Check load times
- Coverage tab: Unused CSS/JS

Mobile:
- Lighthouse mobile audit
- WebPageTest
- Google PageSpeed Insights
```

---

## Debugging Checklist

### Layout Issues
- [ ] Check window width: `window.innerWidth`
- [ ] Verify breakpoint: `matchMedia('(min-width: 768px)').matches`
- [ ] Inspect computed styles: Right-click → Inspect → Computed
- [ ] Check flex properties: `flex-basis`, `flex-grow`, `flex-shrink`
- [ ] Verify z-index stack: Check `z-index` values

### Scrolling Issues
- [ ] Verify `overflow-y: auto` applied
- [ ] Check `height` or `max-height` set
- [ ] Test `-webkit-overflow-scrolling: touch`
- [ ] Monitor scroll position: `element.scrollTop`
- [ ] Check `overscroll-behavior-y: contain`

### Touch Target Issues
- [ ] Measure button size: Right-click → Inspect → Measure (48px visible area)
- [ ] Check active/hover states: DevTools → :active / :hover
- [ ] Test on real touch device (not just emulation)
- [ ] Check for overlapping elements

### Performance Issues
- [ ] Profile with DevTools Performance tab
- [ ] Check for excessive re-renders: React DevTools Profiler
- [ ] Analyze bundle: `source-map-explorer`
- [ ] Monitor memory: DevTools Memory tab
- [ ] Check for layout thrashing: Avoid read-write-read patterns

---

## Quick Test Checklist

### Before Submitting a Build

- [ ] Desktop (1440px): Works perfectly
- [ ] Laptop (1200px): Works perfectly
- [ ] Tablet Portrait (800px): Works perfectly
- [ ] Tablet Landscape (1024px): Works perfectly
- [ ] Mobile Portrait (375px): Works perfectly
- [ ] Mobile Landscape (667px): Works perfectly
- [ ] All scrolling smooth (60fps)
- [ ] All touch targets ≥44px
- [ ] All colors have sufficient contrast
- [ ] No console errors or warnings
- [ ] Lighthouse score ≥90
- [ ] No layout shift when loading states appear/disappear

---

## Responsive Images & Icons

### Avatar Images
```
Desktop: 12px (contact list), 48px (chat header)
Mobile: 12px (contact list), 48px (chat header)
Format: PNG, WEBP with fallback
Loading: Lazy load below fold
```

### Icons
```
Size: 16px (small), 20px (medium), 24px (large)
Format: SVG with Lucide React
Color: Inherit from text color
Animation: CSS spin (loader), CSS fade
```

---

## Keyboard Navigation Flow

```
1. Focus search input (on load or Tab)
   ├─ Type to filter contacts
   └─ Enter to nothing (search only)

2. Tab to first contact
   ├─ Space/Enter to select
   └─ Selected contact shows (highlighted)

3. Tab to message input (if desktop/tablet)
   ├─ Type message
   └─ Enter to send (or click button)

4. On mobile (in list view):
   └─ Tab selects contacts and moves to chat

5. On mobile (in chat view):
   ├─ Tab to back button
   ├─ Escape also goes back
   └─ Tab to message input
```

---

## Production Deployment Checklist

Before going live:

- [ ] All responsive tests passing
- [ ] Performance metrics met
- [ ] Accessibility audit passing
- [ ] Cross-browser testing complete
- [ ] Mobile device testing complete
- [ ] Load testing passed
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Monitoring configured
- [ ] Rollback plan tested

---

**Visual Guide Version**: 1.0
**Last Updated**: 2024
**Status**: ✅ Complete & Verified
