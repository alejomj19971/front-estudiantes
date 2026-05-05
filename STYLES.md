# PlayandLearn — Design System

Referencia oficial de estilos proporcionada por el equipo de diseño.
Todo implementado con **Tailwind CSS v4** y la fuente **Plus Jakarta Sans**.

---

## 1. Colores

### Paleta principal

| Token       | Hex       | Uso                                               |
|-------------|-----------|---------------------------------------------------|
| `Primary`   | `#223740` | Header, botones principales, texto primario        |
| `Secondary` | `#5A878C` | Botones hover, acentos, íconos activos            |
| `Tertiary`  | `#AEEBF2` | Texto sobre fondos oscuros, acentos claros        |
| `Neutral`   | `#060A0D` | Fondos muy oscuros, overlays, negro base          |

### Escala de tintes

Cada color genera una escala de claro a oscuro. En Tailwind se usa con opacidad:

```
bg-primary/5   bg-primary/10   bg-primary/20
bg-primary/40  bg-primary/60   bg-primary/80   bg-primary
```
*Aplica igual para `secondary`, `tertiary` y `neutral`.*

### Superficies

| Token           | Hex       | Uso                                   |
|-----------------|-----------|---------------------------------------|
| `surface`       | `#FFFFFF` | Cards, modales, fondos de componentes |
| `surface-muted` | `#F1F5F9` | Fondo general de la app               |

---

## 2. Tipografía

**Fuente única:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
Importada desde Google Fonts. Aplicada en todas las escalas.

```css
--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
```

### Escala tipográfica

| Escala      | Peso recomendado     | Uso principal                              |
|-------------|---------------------|--------------------------------------------|
| `Headline`  | 700 Bold / 800 ExtraBold | Títulos de página, sección, hero      |
| `Body`      | 400 Regular / 500 Medium | Párrafos, descripciones, contenido    |
| `Label`     | 500 Medium / 600 SemiBold | Botones, badges, nav, etiquetas      |

### Tamaños en Tailwind

| Rol                | Clase Tailwind                         |
|--------------------|----------------------------------------|
| Título de página   | `text-xl md:text-2xl font-bold`        |
| Título de sección  | `text-base md:text-lg font-bold`       |
| Título de card     | `text-sm md:text-base font-semibold`   |
| Body / párrafo     | `text-sm font-normal`                  |
| Label / etiqueta   | `text-xs font-medium`                  |
| Micro / badge      | `text-[11px] font-semibold`            |
| Dato numérico      | `text-xl font-black`                   |

---

## 3. Botones

Cuatro variantes definidas por el equipo:

### Primary
Fondo sólido color primary, texto blanco/tertiary.
```tsx
className="min-h-[44px] px-6 rounded-xl
           bg-primary text-tertiary font-semibold text-sm
           hover:bg-secondary active:scale-95 transition-all duration-200"
```

### Secondary
Fondo claro / superficie, texto primary.
```tsx
className="min-h-[44px] px-6 rounded-xl
           bg-surface text-primary font-semibold text-sm border border-mid/20
           hover:bg-primary/5 active:scale-95 transition-all duration-200"
```

### Inverted
Fondo primary con apariencia invertida (mismo que primary pero para contextos oscuros).
```tsx
className="min-h-[44px] px-6 rounded-xl
           bg-primary text-tertiary font-semibold text-sm
           hover:opacity-90 active:scale-95 transition-all duration-200"
```

### Outlined
Solo borde, sin fondo, texto primary.
```tsx
className="min-h-[44px] px-6 rounded-xl
           border border-primary text-primary font-semibold text-sm bg-transparent
           hover:bg-primary/5 active:scale-95 transition-all duration-200"
```

> **Regla de accesibilidad:** todos los botones tienen mínimo `min-h-[44px]` para cumplir el área táctil mínima.

---

## 4. Inputs y buscador

### Search bar
Campo de búsqueda con ícono de lupa a la izquierda, fondo surface, borde sutil.
```tsx
className="w-full pl-10 pr-4 h-11 rounded-xl
           border border-mid/20 bg-surface
           text-sm text-primary placeholder:text-mid
           focus:outline-none focus:ring-2 focus:ring-primary/20
           focus:border-primary/40 transition-all"
```
- Ícono: `Search` (Lucide) · tamaño `16` · color `text-mid`
- Placeholder: `"Search"` / `"Buscar..."`

---

## 5. Divisores

Tres estilos de separación visual:

### Línea gruesa (énfasis alto)
```tsx
<div className="h-0.5 w-full bg-primary rounded-full" />
```

### Línea media (énfasis medio)
```tsx
<div className="h-px w-3/4 bg-secondary rounded-full" />
```

### Línea fina (énfasis bajo)
```tsx
<div className="h-px w-1/2 bg-mid/40 rounded-full" />
```

---

## 6. Íconos

Biblioteca: **[Lucide React](https://lucide.dev/)**

### Tamaños estándar

| Contexto                  | Tamaño |
|---------------------------|--------|
| Navegación / header       | `16`   |
| Botones inline            | `16–18`|
| Cards / listas            | `18–20`|
| Estados vacíos / hero     | `36–48`|
| Nodos del mapa SVG        | `18–22`|

### Íconos de navegación

Tres íconos principales de la bottom nav y header:

| Ícono    | Lucide          | Ruta                  |
|----------|-----------------|-----------------------|
| Inicio   | `LayoutDashboard` | `/student/dashboard` |
| Buscar   | `Search`        | —                     |
| Perfil   | `User`          | `/student/profile`    |

**Estilo activo:** fondo `bg-tertiary/20`, ícono y label en `text-tertiary`
**Estilo inactivo:** `text-mid`

```tsx
// Contenedor ícono nav
className="flex items-center justify-center w-8 h-8 rounded-xl transition-colors"
// Activo
className="bg-tertiary/20"
```

### Íconos de acción

| Acción  | Lucide      | Estilo                                   |
|---------|-------------|------------------------------------------|
| Editar  | `Pencil`    | Fondo `bg-primary`, texto `text-tertiary`, `rounded-lg` |
| Etiquetar | `Tag`     | Borde `border-primary`, texto `text-primary`, `rounded-lg` |
| Marcar  | `Bookmark`  | Borde `border-primary`, texto `text-primary`, `rounded-lg` |
| Eliminar | `Trash2`   | Fondo `bg-red-500`, texto `text-white`, `rounded-lg` |

```tsx
// Botón de acción base
className="w-9 h-9 flex items-center justify-center rounded-lg transition-all
           active:scale-90"

// Editar
className="bg-primary text-tertiary hover:bg-secondary"

// Eliminar
className="bg-red-500 text-white hover:bg-red-600"

// Outlined (etiquetar / marcar)
className="border border-primary text-primary hover:bg-primary/5"
```

---

## 7. Vista Dashboard — Patrones de layout

Referencia de diseño extraída de la imagen oficial del equipo de diseño.

---

### 7.0 Grid principal del dashboard

El área de contenido principal (a la derecha del sidebar) se divide en zonas:

```
┌──────────────────────────────────────────┬──────────────────────┐
│  HERO BANNER (bienvenida + streak)       │  WEEKLY GOAL (anillo)│
│                                          │                      │
├──────────────────┬───────────────────────┴──────────────────────┤
│  IN PROGRESS     │  UP NEXT                                      │
│                  │                                               │
├──────────────────┴───────────────────────────────────────────────┤
│  YOUR LEARNING PATH  (3-column course grid)                      │
└──────────────────────────────────────────────────────────────────┘
```

```tsx
// Wrapper página dashboard
className="px-6 md:px-8 py-6 md:py-8 space-y-6 max-w-6xl"

// Fila 1: hero + weekly goal
className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5"

// Fila 2: in-progress + up-next
className="grid grid-cols-1 md:grid-cols-2 gap-5"

// Fila 3: learning path (sección completa)
// sin grid extra, el grid está dentro de la sección
```

---

### 7.1 Sidebar de navegación

Panel lateral izquierdo fijo, fondo blanco. **Oculto por defecto** — se abre con el ícono hamburguesa (`Menu`). Funciona como overlay en mobile (con backdrop semitransparente) y como panel fijo en desktop (empuja el contenido con `md:ml-56`).

```
Estado cerrado:          Estado abierto:
                         ┌─────────────────────┐
[☰]                      │  🔵 PlayandLearn  [✕]│  ← Botón X cierra
                         │     Educational     │
                         ├─────────────────────┤
                         │ ▣  Dashboard     │  │  ← Activo: bg-tertiary/30 + borde derecho
                         │ 🎓 Certificados      │  ← Inactivo: text-secondary
                         ├─────────────────────┤
                         │ 🔔 Notificaciones   │
                         │ ❓ Ayuda            │
                         │ ↪  Cerrar sesión   │  ← hover rojo
                         │ [avatar · Ana]      │  ← Perfil mini
                         └─────────────────────┘
```

**Estado inicial:** `isOpen = false` (cerrado al entrar a la app).

**Apertura:**
- Mobile: botón `☰` en el `StudentHeader` (barra top fija)
- Desktop: botón `☰` flotante en `fixed left-3 top-4 z-50 hidden md:flex`

**Cierre:**
- Botón `✕` dentro del sidebar
- Clic en el backdrop (solo mobile)

```tsx
// Aside — siempre en el DOM, transform controla visibilidad
className="fixed left-0 top-0 h-full w-56 bg-surface border-r border-mid/20
           flex flex-col z-40 transition-transform duration-300"
// Abierto: "translate-x-0"
// Cerrado: "-translate-x-full"

// Backdrop mobile (solo cuando isOpen)
className="fixed inset-0 bg-neutral/40 z-30 md:hidden"

// Botón cerrar dentro del sidebar
className="w-8 h-8 flex items-center justify-center rounded-lg
           text-mid hover:bg-primary/5 hover:text-primary transition-colors"
// Ícono: <X size={18}/>

// Nav principal — scrollable, ocupa el espacio central
// `overflow-y-auto` permite scroll cuando los ítems superan la altura disponible
// `flex-1 min-h-0` es obligatorio: sin min-h-0 el flex-child ignora overflow
className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-0.5"

// Zona inferior — fija al fondo, nunca hace scroll
// `shrink-0` evita que se comprima cuando el nav crece
className="shrink-0 px-3 pb-5 pt-4 space-y-0.5 border-t border-mid/20"

// Ítem nav inactivo
className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
           text-secondary hover:bg-primary/5 transition-colors w-full"

// Ítem nav activo — fondo teal claro, borde derecho oscuro
className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold
           text-primary bg-tertiary/30 border-r-2 border-primary w-full"

// Zona inferior (notificaciones, ayuda, logout)
className="px-3 pb-5 pt-4 space-y-0.5 border-t border-mid/20"

// Botón logout — hover rojo
className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
           text-secondary hover:bg-red-50 hover:text-red-500
           transition-colors w-full text-left"
```

---

### 7.2 Header flotante top-right

En desktop, los controles globales flotan en la esquina superior derecha del área de contenido.
**No es un header fijo** — se ubica en el flujo del contenido, alineado a la derecha.

```
                               [ 🔔 ]  [ ⚙️ ]  [ avatar ]
```

```tsx
// Contenedor — posición dentro del layout, no fijo
className="flex items-center justify-end gap-2 mb-2 hidden md:flex"

// Botón ícono (bell, settings)
className="w-10 h-10 flex items-center justify-center rounded-full
           text-secondary hover:bg-primary/5 hover:text-primary
           transition-colors"
// Iconos: <Bell size={18}/> <Settings size={18}/>

// Avatar
className="w-9 h-9 rounded-full object-cover border-2 border-mid/20
           cursor-pointer hover:border-secondary/40 transition-colors"
```

---

### 7.3 Hero / Banner de bienvenida

Card grande con fondo `primary` oscuro. Ocupa ~65% del ancho en desktop.

```
┌────────────────────────────────────────────────────┐
│  🔥 14 Day Streak!                                 │  ← Badge pill
│                                                    │
│  Welcome back,                                     │  ← Headline ~48px
│  Alex.                                             │
│                                                    │
│  You're making great progress in '...'             │  ← Subtítulo blanco/70
│  Ready to dive back in?                            │
│                                                    │
│  [ Continue Learning → ]                           │  ← Botón outlined blanco
└────────────────────────────────────────────────────┘
```

```tsx
// Card hero — fondo primary, esquinas 2xl, padding generoso
className="rounded-2xl bg-primary p-8 lg:p-10 flex flex-col gap-5 h-full"

// Badge "🔥 14 Day Streak!"
className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
           bg-white/15 text-white text-xs font-semibold w-fit"

// Headline — muy grande, extrabold, blanco puro
className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mt-1"
// Ejemplo: "Welcome back,\nAlex."  (salto de línea intencional)

// Subtítulo
className="text-sm lg:text-base text-white/70 leading-relaxed max-w-md"

// Botón CTA — outlined blanco, hover invierte colores
className="flex items-center gap-2 min-h-[44px] px-6 rounded-xl mt-2
           border-2 border-white text-white font-semibold text-sm w-fit
           hover:bg-white hover:text-primary transition-all duration-200"
// Ícono: <ArrowRight size={16}/>
```

---

### 7.4 Tarjeta Weekly Goal

Card blanca compacta con anillo SVG de progreso. Ocupa ~35% del ancho en desktop.

```
┌──────────────────────────┐
│  Weekly Goal        ◎   │  ← Título bold + ícono Target derecha
│                          │
│        ┌─────┐           │
│        │ 4/5 │           │  ← Anillo SVG centrado
│        │Mod. │           │
│        └─────┘           │
│                          │
│  🏆  Almost there!       │  ← Sub-card gris
│      1 module away...    │
└──────────────────────────┘
```

```tsx
// Card
className="bg-surface rounded-2xl border border-mid/20 p-5 flex flex-col gap-4"

// Header card
className="flex items-center justify-between"
// Título: className="text-base font-bold text-primary"
// Ícono: <Target size={18} className="text-secondary"/>

// Anillo SVG — viewBox="0 0 104 104", centrado
// r=40, cx=52, cy=52, circunferencia = 2π×40 ≈ 251.2
<svg viewBox="0 0 104 104" className="w-28 h-28 mx-auto">
  {/* Track gris */}
  <circle cx="52" cy="52" r="40" fill="none"
          stroke="currentColor" strokeWidth="8"
          className="text-mid/25"/>
  {/* Progreso — color primary, girado -90° */}
  <circle cx="52" cy="52" r="40" fill="none"
          stroke="currentColor" strokeWidth="8"
          strokeLinecap="round"
          className="text-primary transition-all duration-700"
          style={{
            strokeDasharray: `${(progress / total) * 251.2} 251.2`,
            transform: 'rotate(-90deg)',
            transformOrigin: '52px 52px',
          }}/>
</svg>

// Texto central (superpuesto con absolute o con foreignObject)
className="text-2xl font-black text-primary leading-none"   // "4/5"
className="text-xs text-secondary mt-0.5"                    // "Modules"

// Sub-card motivacional
className="flex items-center gap-3 p-3 rounded-xl bg-surface-muted"
// Ícono trofeo: <Trophy size={20} className="text-secondary shrink-0"/>
// Texto bold: className="text-sm font-bold text-primary"
// Descripción: className="text-xs text-secondary"
```

---

### 7.5 Tarjeta "In Progress"

Card del curso activo. Mitad izquierda de la fila 2.

```
┌──────────────────────────────┐
│  [ In Progress ]             │  ← Badge pill teal
│                              │
│  Advanced UI Systems         │  ← Título ~20px bold
│  Mastering component arch... │  ← Descripción gris
│                              │
│  Module 3: Topography   60%  │  ← Label + porcentaje
│  ████████████░░░░░░░░░░░░    │  ← Barra delgada teal
└──────────────────────────────┘
```

```tsx
// Card
className="bg-surface rounded-2xl border border-mid/20 p-5 flex flex-col gap-3"

// Badge "In Progress"
className="inline-flex items-center px-3 py-1 rounded-full
           bg-secondary/15 text-secondary text-xs font-semibold w-fit"

// Título curso — grande y bold
className="text-xl font-bold text-primary leading-snug"

// Descripción
className="text-sm text-secondary leading-relaxed"

// Row label + porcentaje
className="flex justify-between items-center text-xs font-medium text-secondary mt-1"

// Barra de progreso
className="h-1.5 rounded-full bg-mid/25 overflow-hidden"
// Relleno: className="h-full rounded-full bg-secondary transition-all duration-700"
// style={{ width: `${pct}%` }}
```

---

### 7.6 Tarjeta "Up Next"

Card horizontal. Mitad derecha de la fila 2. Se estira para igualar altura con "In Progress".

```
┌────────────────────────────────────────────────────────┐
│  [ ▶ ]   Up Next                              [ ▶ ]   │
│           Implementing the "No-Line" Rule              │
│           Video • 12 min left                          │
└────────────────────────────────────────────────────────┘
```

```tsx
// Card — flex horizontal, altura completa
className="bg-surface rounded-2xl border border-mid/20 p-5 flex items-center gap-4"

// Thumbnail izquierdo — cuadrado, fondo primary
className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shrink-0"
// Ícono: <Play size={22} className="text-tertiary ml-0.5"/>

// Contenido central
className="flex-1 min-w-0"
// Label: className="text-xs font-semibold text-secondary uppercase tracking-wider"
// Título: className="text-base font-bold text-primary line-clamp-2 mt-0.5"
// Meta:   className="text-xs text-mid mt-1"  → "Video • 12 min left"

// Botón play derecho — mismo tamaño que thumbnail
className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center
           shrink-0 hover:bg-secondary transition-colors cursor-pointer"
// Ícono: <Play size={20} className="text-tertiary ml-0.5"/>
```

---

### 7.7 Sección "Your Learning Path"

Sección con header (título + "View All") y grid de 3 columnas.

```tsx
// Sección completa
className="space-y-4"

// Header sección
className="flex items-center justify-between"
// Título: className="text-xl font-bold text-primary"
// "View All": className="text-sm font-semibold text-secondary hover:text-primary transition-colors"

// Grid
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
```

---

### 7.8 Course Card (grid)

Card individual. Tiene thumbnail arriba, badge de tipo sobre la imagen, y footer con estado.

```
┌─────────────────────────┐
│  [  thumbnail image  ]  │  ← aspect-video, object-cover
│  [📚 Course]            │  ← badge blanco arriba-izquierda sobre imagen
├─────────────────────────┤
│  React Patterns         │  ← Título bold
│  Instructor: Sarah D.   │  ← Instructor secondary
│                         │
│  [Locked]         🔒    │  ← Badge estado (izq) + ícono (der)
└─────────────────────────┘
```

```tsx
// Card contenedor
className="bg-surface rounded-2xl overflow-hidden border border-mid/20
           flex flex-col hover:shadow-md transition-all duration-200"

// Thumbnail wrapper
className="relative aspect-video w-full overflow-hidden bg-primary/10"
// <img className="w-full h-full object-cover"/>

// Badge tipo — sobre la imagen, top-left
className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1
           rounded-full bg-white/90 backdrop-blur-sm
           text-[11px] font-semibold text-primary"
// Ícono: <GraduationCap size={12}/> para "Course" / <Wrench size={12}/> para "Workshop"

// Cuerpo de la card
className="p-4 flex flex-col gap-1.5 flex-1"

// Título
className="font-bold text-sm text-primary line-clamp-2 leading-snug"

// Instructor
className="text-xs text-secondary"
// Formato: "Instructor: Sarah Drasner"

// Footer — badge de estado + ícono OR barra de progreso
className="flex items-center justify-between mt-auto pt-3"
```

---

### 7.9 Badges de estado (course card footer)

Aparecen en el footer de cada course card. Tres variantes según estado del curso.

| Estado | Badge | Ícono derecho | Colores |
|---|---|---|---|
| `Locked` | "Locked" pill | `Lock size={14}` | `bg-mid/15 text-mid` |
| `Approved` | "Approved" pill | `CheckCircle2 size={14}` relleno | `bg-secondary/15 text-secondary` |
| `In Progress` | barra de % | sin badge, solo barra | barra `bg-secondary` |

```tsx
// Base badge pill
className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
           text-[11px] font-semibold"

// Locked
className="bg-mid/15 text-mid"
// + <Lock size={14} className="text-mid"/>  (en el lado derecho del footer)

// Approved
className="bg-secondary/15 text-secondary"
// + <CheckCircle2 size={16} className="text-secondary"/>  (lado derecho)

// In Progress con %
// Sin badge — solo barra delgada + porcentaje encima
className="w-full"
// Label %: className="text-[11px] font-semibold text-secondary mb-1"
// Track: className="h-1 rounded-full bg-mid/25 overflow-hidden"
// Fill:  className="h-full rounded-full bg-secondary" style={{ width: `${pct}%` }}
```

---

## 8. Vista de Contenido / Quiz

Referencia de diseño para todas las vistas de contenido del curso (quiz, video, texto, imagen).
Se usan los mismos colores y herramientas visuales en todos los tipos de contenido.
El contenido se presenta en un **modal/drawer** que se monta con `createPortal` sobre `document.body`.

---

### 8.0 Modal / Drawer — estructura general

En mobile aparece como **bottom sheet** (desliza desde abajo). En desktop como **modal centrado**.

```
Mobile:                         Desktop:
┌──────────────────────┐        ┌────────────────────────────────────┐
│▓▓▓▓▓ overlay ▓▓▓▓▓▓▓│        │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│        │▓▓▓ ┌──────────────────────────┐ ▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│        │▓▓▓ │ [X]  ████░░░░░░  2/5     │ ▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│        │▓▓▓ │ MÓDULO 1                  │ ▓▓│
├─────────────────────┤        │▓▓▓ │ Título del contenido      │ ▓▓│
│ [X]  ████░░░░  2/5  │        │▓▓▓ │ ─── área scroll ───       │ ▓▓│
│ MÓDULO 1            │        │▓▓▓ │                           │ ▓▓│
│ Título              │        │▓▓▓ │ ← Anterior  [Siguiente →] │ ▓▓│
│ ─── scroll ───      │        │▓▓▓ └──────────────────────────┘ ▓▓│
│                     │        │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ ← Anterior [Sig. →] │        └────────────────────────────────────┘
└─────────────────────┘
```

```tsx
// Overlay — portal sobre document.body
className="fixed inset-0 z-[100] bg-neutral/70 backdrop-blur-sm
           flex items-end md:items-center md:justify-center p-0 md:p-8"

// Panel — bottom sheet en mobile, modal en desktop
className="bg-surface w-full h-[92dvh] rounded-t-3xl overflow-hidden flex flex-col
           md:rounded-3xl md:h-auto md:max-h-[88vh] md:w-full md:max-w-3xl
           shadow-2xl"
```

> Clic en el overlay (fuera del panel) cierra el modal. `Escape` también lo cierra.
> Mientras está abierto: `document.body.style.overflow = 'hidden'`.

---

### 8.1 Barra de progreso por pasos

Ubicada en la parte superior del panel. Muestra avance global dentro del módulo.

```
[ X ]  ████████████████░░░░░░░░░░░░  3/5
```

```tsx
// Contenedor top bar
className="flex items-center gap-4 px-6 pt-6 pb-4 shrink-0"

// Botón cerrar
className="w-9 h-9 flex items-center justify-center rounded-full
           bg-surface-muted text-secondary hover:bg-mid/20
           transition-colors shrink-0"
// Ícono: <X size={16}/>

// Track de progreso
className="flex-1 h-2.5 rounded-full bg-mid/25 overflow-hidden"

// Relleno progreso
className="h-full rounded-full bg-primary transition-all duration-500"
style={{ width: `${(current / total) * 100}%` }}

// Contador "3/5"
className="text-sm font-semibold text-secondary shrink-0"
```

---

### 8.2 Etiqueta de módulo

Pequeño label uppercase debajo de la barra de progreso.

```tsx
className="px-6 text-xs font-bold text-secondary uppercase tracking-widest"
// Ejemplo: "MÓDULO 2: CONTROL DE FLUJO"
```

---

### 8.3 Título del contenido

Headline grande y bold. Aparece debajo de la etiqueta de módulo.

```tsx
// Título principal
className="px-6 mt-2 text-2xl md:text-3xl font-extrabold text-primary leading-snug"
```

> El área de contenido (`VideoContent`, `TextContent`, `QuizContent`, `ImageContent`)
> va en un `div` scrollable debajo del título: `className="flex-1 overflow-y-auto px-6 pb-2 mt-4"`

---

### 8.4 Opciones de respuesta (Quiz)

Grid 2×2 de opciones seleccionables. Cada opción tiene badge de letra + texto.

```
┌─────────────────────┐  ┌─────────────────────┐
│  (A)  display: flex │  │  (B)  flex-direction │
└─────────────────────┘  └─────────────────────┘
┌─────────────────────┐  ┌─────────────────────┐
│  (C)  float: left   │  │  (D)  position: flex │
└─────────────────────┘  └─────────────────────┘
```

```tsx
// Grid de opciones
className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4"

// Opción — estado default
className="flex items-center gap-3 p-4 rounded-2xl
           bg-surface-muted border-2 border-transparent
           cursor-pointer text-left
           hover:border-secondary/40 hover:bg-secondary/5
           active:scale-[0.98] transition-all duration-150"

// Opción — estado seleccionado
className="flex items-center gap-3 p-4 rounded-2xl
           bg-secondary/10 border-2 border-secondary
           cursor-pointer text-left transition-all duration-150"

// Opción — estado correcto (feedback)
className="... bg-green-50 border-2 border-green-500"

// Opción — estado incorrecto (feedback)
className="... bg-red-50 border-2 border-red-400"
// + icono: <XCircle size={18} className="text-red-400 shrink-0"/>

// Badge letra (A / B / C / D)
className="w-8 h-8 rounded-full bg-white border border-mid/30
           flex items-center justify-center shrink-0
           text-xs font-bold text-secondary"
// Correcto: bg-green-500 border-green-500 text-white
// Incorrecto: bg-red-400 border-red-400 text-white
// Seleccionado: bg-secondary border-secondary text-white

// Texto de la opción
className="text-sm font-medium text-primary flex-1 text-left"
```

**Resultado global del quiz** (aparece al enviar, antes de las preguntas):
```tsx
className="rounded-2xl bg-primary/8 border border-primary/15 p-4 text-center"
// Puntaje: className="text-lg font-bold text-primary"  → "2/3 correctas"
// Feedback: className="text-sm text-secondary mt-0.5"
```

---

### 8.5 Footer de acción

Fijo en la parte inferior del panel. Navegación anterior/siguiente entre contenidos.

```
  ← Anterior                    [ Siguiente →          ]
                                 [ Verificar y continuar → ]  ← solo en quiz pre-envío
```

```tsx
// Footer contenedor
className="flex items-center justify-between px-6 pt-5 pb-6
           border-t border-mid/15 shrink-0"

// Botón "← Anterior" (texto plano, deshabilitado si es el primero)
className="flex items-center gap-1.5 text-sm font-medium text-secondary
           hover:text-primary transition-colors
           disabled:opacity-30 disabled:cursor-not-allowed"
// Ícono: <ArrowLeft size={14}/>

// Botón "Siguiente →" / "Verificar y continuar →" (primario)
className="flex items-center gap-2 min-h-[48px] px-7 rounded-2xl
           bg-primary text-white font-semibold text-sm
           hover:bg-secondary active:scale-95 transition-all duration-200
           disabled:opacity-30 disabled:cursor-not-allowed"
// Ícono: <ArrowRight size={16}/>
// Texto: content.type === 'quiz' ? 'Verificar y continuar' : 'Siguiente'
```

---

### 8.6 Carga diferida (Suspense)

Cada tipo de contenido se carga con `React.lazy` + `Suspense`.

```tsx
// Fallback mientras carga el componente
// <ContentLoader/> — spinner o skeleton dentro del área de scroll
```

---

### 8.7 Resumen de estados visuales por tipo de contenido

| Tipo      | Componente principal          | Color acento     |
|-----------|-------------------------------|------------------|
| `quiz`    | Grid opciones A/B/C/D         | `primary` / `secondary` |
| `video`   | Player HTML5 con controles    | `primary`        |
| `text`    | Prosa HTML enriquecida        | `primary`        |
| `image`   | Imagen + caption opcional     | `secondary`      |

Todos comparten: barra de progreso top, etiqueta de módulo, y footer Skip / Confirmar.

---

## 9. Espaciado y layout

| Concepto             | Valor                                                   |
|----------------------|---------------------------------------------------------|
| Max width contenido  | `max-w-5xl` (dashboard) · `max-w-3xl` (logros) · `max-w-2xl` (mapa) |
| Padding horizontal   | `px-4 md:px-8`                                          |
| Padding vertical     | `py-6 md:py-8`                                          |
| Gap entre secciones  | `space-y-6 md:space-y-8`                                |
| Gap entre cards      | `gap-4`                                                 |
| Área táctil mínima   | `min-h-[44px] min-w-[44px]`                             |

---

## 8. Animaciones y transiciones

| Nombre              | Clase / CSS                                | Uso                        |
|---------------------|--------------------------------------------|----------------------------|
| Hover general       | `transition-all duration-200`              | Botones, cards             |
| Tap / press         | `active:scale-95` / `active:scale-[0.98]`  | Botones, cards             |
| Barra de progreso   | `transition-all duration-700 ease-out`     | Progress bars              |
| Anillo SVG          | `transition-all duration-700`              | Circular progress          |
| Pulso               | `animate-pulse`                            | Indicadores activos        |
| Barras de música    | `@keyframes musicBar` scaleY 0.3 → 1       | MusicPlayer                |

---

## 9. Responsive

| Breakpoint | Prefijo | Ancho mín. |
|------------|---------|------------|
| Mobile     | (base)  | 0px        |
| Tablet/MD  | `md:`   | 768px      |
| Desktop    | `lg:`   | 1024px     |

### Patrones frecuentes

```tsx
"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"  // grid de cursos
"hidden md:flex"    // solo desktop
"fixed md:hidden"   // solo mobile (bottom nav)
"text-sm md:text-base"  // texto responsive
"px-4 md:px-8"     // padding responsive
```

---

## 10. Archivos clave del sistema

| Archivo                                            | Contenido                              |
|----------------------------------------------------|----------------------------------------|
| `src/styles/globals.css`                           | Tokens `@theme {}`, reset, utilidades  |
| `src/presentation/design-system/tokens/colors.ts`  | Colores como constantes TypeScript     |
| `src/presentation/components/PlayandLearnLogo.tsx` | Logo SVG con variantes light / dark    |

---

---

## 11. Vista de Módulos del Curso (Course Map Page)

Aparece al hacer clic en un curso desde el dashboard. Layout de dos columnas: **timeline de módulos** (izquierda) + **panel de resumen** (derecha). Todo el texto visible al usuario es en **español**. Diseño **mobile-first**.

---

### 11.0 Layout general

```
Mobile:                           Desktop:
┌──────────────────────┐          ┌───────────────────┬──────────────────┐
│ ← Volver             │          │ ← Volver          │                  │
│                      │          │                   │  [Thumbnail]     │
│ Título del curso     │          │  Título del curso │                  │
│ Descripción          │          │  Descripción      │  Resumen del     │
│                      │          │                   │  curso           │
│ ○ — Módulo 1 card    │          │  [Card 1] ○       │  Instructor      │
│ ○ — Módulo 2 card    │          │           ○ [Card 2] Nivel           │
│ ○ — Módulo 3 card    │          │  [Card 3] ○       │  Progreso        │
└──────────────────────┘          │           ○ [Card 4] Insignias       │
                                  │                   │  Recursos        │
                                  │                   │  [Foro del curso]│
                                  └───────────────────┴──────────────────┘
```

```tsx
// Wrapper de página
className="px-4 md:px-8 py-6 md:py-8 max-w-5xl"

// Dos columnas (timeline + overview)
className="flex flex-col lg:flex-row gap-8 mt-6"

// Columna izquierda (timeline)
className="flex-1 min-w-0"

// Columna derecha (overview panel)
className="w-full lg:w-72 xl:w-80 shrink-0"
```

---

### 11.1 Encabezado del curso

```tsx
// Título
className="text-3xl md:text-4xl font-extrabold text-primary leading-tight"

// Descripción
className="text-sm md:text-base text-secondary leading-relaxed mt-3 max-w-xl"

// Botón volver (texto plano, sin fondo)
className="flex items-center gap-1.5 text-sm font-medium text-secondary
           hover:text-primary transition-colors mb-6"
// Ícono: <ArrowLeft size={16}/>
```

---

### 11.2 Línea curva SVG del timeline (v2 — plan)

En lugar de una línea CSS recta, se usa un **SVG superpuesto** con paths cúbicos de Bezier entre cada par de círculos consecutivos. La línea se **colorea progresivamente** a medida que el estudiante completa módulos.

---

#### Concepto visual

```
  ○ completado         ← círculo en x=cx, y=y0   (color: secondary)
  │╲
  │  ╲__ curva S
  │       ╲___
  ○ completado         ← y1                        (color: secondary)
  │
  │╱ __ curva suave
  ○ actual             ← y2                        (color: secondary → fade)
  ┊
  ┊ (punteado)
  ○ bloqueado          ← y3                        (color: mid/30)
```

---

#### Arquitectura técnica

```tsx
// 1. Cada fila del timeline tiene una ref para medir su posición Y
const rowRefs = useRef<(HTMLDivElement | null)[]>([])

// 2. Un useEffect mide los centros de cada círculo con getBoundingClientRect()
//    relativo al contenedor del timeline (también con ref)
const containerRef = useRef<HTMLDivElement>(null)

// 3. El SVG se renderiza encima (absolute inset-0, pointer-events-none)
//    con width=containerWidth, height=containerHeight
<svg className="absolute inset-0 w-full h-full pointer-events-none z-0" />
```

---

#### Fórmula de cada curva (cubic Bezier)

Dado un segmento entre círculo A (x₀, y₀) y círculo B (x₁, y₁):

```
// Control points verticales — crean la curva S orgánica
const cp1x = x0 + (x1 - x0) * 0.0   // mismo x que origen
const cp1y = y0 + (y1 - y0) * 0.45  // 45% del camino en Y
const cp2x = x1 + (x0 - x1) * 0.0   // mismo x que destino
const cp2y = y1 - (y1 - y0) * 0.45  // 45% antes del destino en Y

// Path SVG resultante
`M ${x0} ${y0} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`
```

Para un efecto más orgánico (como el mapa SVG original), los control points pueden desplazarse levemente en X:

```
const wobble = (y1 - y0) * 0.15  // desplazamiento horizontal sutil
cp1x = x0 + wobble
cp2x = x1 - wobble
```

---

#### Estilo de línea — Mapa del tesoro (pirata moderno)

Inspirado en mapas de tesoro: **línea punteada con flechas de dirección** que guían al estudiante a lo largo del recorrido. Moderno pero con carácter de aventura.

```
  ○ ──────►──────►────── ○      ← segmento completado: sólido + flechas del color del módulo
  ○ - - - ► - - - ► - - ○      ← segmento pendiente: punteado + flechas grises
```

**Flechas de dirección (`<marker>`):**
- Definidas en `<defs>` como `<marker id="arrow-{color}">` con `orient="auto"`
- Triángulo pequeño (`5×4px`) apuntando en la dirección del path
- Se aplican con `markerMid="url(#arrow-...)"` — aparecen a la mitad del segmento
- Una flecha por segmento, centrada en la curva Bezier

```tsx
// En <defs> del SVG — una por cada color de módulo + gris para pendientes
<marker id="arrow-mod0" markerWidth="6" markerHeight="5"
        refX="3" refY="2.5" orient="auto">
  <polygon points="0 0, 6 2.5, 0 5" fill={MODULE_COLORS[0]} opacity={0.8} />
</marker>

<marker id="arrow-gray" markerWidth="6" markerHeight="5"
        refX="3" refY="2.5" orient="auto">
  <polygon points="0 0, 6 2.5, 0 5" fill="#D1D5DB" opacity={0.6} />
</marker>
```

**Estilo de cada segmento:**

| Segmento | Condición | Stroke | Dasharray | Flecha |
|---|---|---|---|---|
| completado | `itemA.status === 'completed'` | color del módulo | ninguno (sólido) | `markerMid` color módulo |
| pendiente | `current` o `'locked'` | `#D1D5DB` | `8 6` | `markerMid` gris |

> **Regla visual clave:** la línea sólida coloreada representa el camino ya recorrido. Los segmentos futuros son grises punteados. Las flechas orientan al estudiante indicando la dirección del avance — sensación de ruta/aventura.

> **`markerMid` vs `markerEnd`:** se usa `markerMid` porque cada segmento es un path independiente. Con `markerMid`, la flecha aparece en el punto medio de la curva Bezier, que visualmente es el mejor lugar para indicar dirección.

```tsx
function getSegmentStyle(statusA: ModuleStatus, statusB: ModuleStatus) {
  const bothDone = statusA === 'completed' && statusB === 'completed'
  const leadsToCurrent = statusA === 'completed' && statusB === 'current'

  if (bothDone || leadsToCurrent) {
    return { stroke: 'var(--color-secondary)', strokeWidth: 3, dasharray: 'none', opacity: 1 }
  }
  if (statusA === 'current') {
    return { stroke: 'var(--color-mid)', strokeWidth: 2, dasharray: '6 5', opacity: 0.5 }
  }
  return { stroke: 'var(--color-mid)', strokeWidth: 1.5, dasharray: '4 6', opacity: 0.25 }
}
```

---

#### Animación de fill al completar un módulo

Cuando el segmento pasa de `dashed` a `solid` (módulo completado), se anima con `strokeDashoffset`:

```tsx
// Longitud total del path calculada con path.getTotalLength()
// Al completar: animar de dashoffset=totalLength → 0 en 700ms ease-out
style={{
  strokeDasharray: totalLength,
  strokeDashoffset: isCompleted ? 0 : totalLength,
  transition: 'stroke-dashoffset 700ms ease-out',
}}
```

---

#### Posiciones X de los círculos

```
Mobile:   todos los círculos en x = 24px (centro del círculo izquierdo)

Desktop (grid 3 cols [1fr auto 1fr]):
  cx = containerWidth / 2  (siempre centrado, la col `auto` está al 50%)
```

---

#### Hook sugerido: useTimelineCurves

```tsx
function useTimelineCurves(rowRefs, containerRef, moduleCount) {
  const [circles, setCircles] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    if (!containerRef.current) return
    const containerTop = containerRef.current.getBoundingClientRect().top

    const positions = rowRefs.current.map(ref => {
      if (!ref) return { x: 0, y: 0 }
      const rect = ref.getBoundingClientRect()
      return {
        x: rect.left + rect.width / 2 - containerRef.current!.getBoundingClientRect().left,
        y: rect.top + rect.height / 2 - containerTop,
      }
    })
    setCircles(positions)
  }, [moduleCount])  // re-calcular si cambia número de módulos

  return circles
}
```

---

> **Nota de implementación:** El SVG debe re-calcularse en resize. Usar `ResizeObserver` sobre `containerRef` igual que en `CourseMapCanvas.tsx`.

```tsx

---

### 11.3 Círculos del timeline (indicadores de estado)

Cada módulo tiene un círculo sobre la línea vertical.

| Estado | Tamaño | Fondo | Ícono |
|---|---|---|---|
| `completed` | `w-12 h-12` | `bg-primary` | `Check size={22}` blanco |
| `current` | `w-14 h-14` | `bg-primary` + `shadow-lg shadow-primary/30` | `Play size={24}` blanco |
| `locked` | `w-10 h-10` | `bg-surface border-2 border-mid/30` | `Lock size={16}` text-mid |
| `upcoming` | `w-8 h-8` | `bg-surface border border-mid/20` | `Lock size={12}` text-mid/50 |

```tsx
// Completed
className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md"

// Current — más grande, con sombra de color
className="w-14 h-14 rounded-full bg-primary flex items-center justify-center
           shadow-lg shadow-primary/30"

// Locked
className="w-10 h-10 rounded-full bg-surface border-2 border-mid/30
           flex items-center justify-center opacity-60"

// Upcoming
className="w-8 h-8 rounded-full bg-surface border border-mid/20
           flex items-center justify-center opacity-30"
```

---

### 11.4 Cards de módulo

Cards blancas con información del módulo. Ancho máximo `md:max-w-xs` en desktop para dejar espacio al timeline. En mobile ocupan todo el ancho disponible.

**Estados visuales:**
| Estado | Opacidad | Borde | Botón de acción |
|---|---|---|---|
| `completed` | 100% | `border border-mid/20` | — |
| `current` | 100% | `border-2 border-secondary/40` | "Reanudar" / "Comenzar" |
| `locked` | 45% | `border border-mid/20` | — |
| `upcoming` | 45% | `border border-mid/20` | — |

```tsx
// Card base (todos los estados)
className="bg-surface rounded-2xl p-5 w-full md:max-w-xs transition-opacity duration-500"
// + borde según estado:
//   current  → "border-2 border-secondary/40"
//   demás    → "border border-mid/20"
// + opacidad:
//   locked/upcoming → "opacity-45"

// Header de card: label módulo + badge estado
className="flex items-center justify-between mb-3 gap-2"

// Label módulo
className="text-xs font-bold text-secondary uppercase tracking-wider shrink-0"
// Texto: "MÓDULO 1" / "MÓDULO 2 · ACTUAL"

// Badge "✓ Aprobado" (completed)
className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
           bg-secondary/15 text-secondary text-[11px] font-semibold"

// Badge "🔒 Bloqueado" (locked/upcoming)
className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
           bg-mid/15 text-mid text-[11px] font-semibold"

// Badge "XX% listo" (current con progreso)
className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
           bg-secondary/15 text-secondary text-[11px] font-semibold"

// Título del módulo
className="text-base font-bold text-primary leading-snug"

// Descripción (solo módulo actual)
className="text-xs text-secondary leading-relaxed mt-1.5 line-clamp-2"

// Metadatos (duración + score)
className="flex items-center gap-4 mt-3 text-xs text-mid"
// Ícono: <Clock size={12}/> y <Star size={12}/>

// Botón de acción (solo módulo actual)
className="mt-4 flex items-center gap-1.5 min-h-[36px] px-4 rounded-xl
           bg-secondary text-white text-xs font-semibold
           hover:bg-primary transition-colors"
// Ícono: <Play size={13} className="ml-0.5"/>
// Texto: pct > 0 ? 'Reanudar' : 'Comenzar'
```

---

### 11.5 Fila del timeline (desktop alternado / mobile lineal)

```tsx
// Desktop — grid 3 columnas: [card-izq | círculo | card-der]
// Las cards se alternan: par → izquierda, impar → derecha
className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-6 items-center mb-12 relative z-10"

// Mobile — flex con círculo izquierda y card derecha
className="flex md:hidden items-start gap-4 pb-10 relative z-10"
```

---

### 11.6 Panel de resumen del curso (derecha)

```tsx
// Wrapper sticky en desktop
className="lg:sticky lg:top-8 space-y-4"

// Thumbnail del curso
className="rounded-2xl overflow-hidden aspect-video bg-primary relative"
// Imagen: opacity-60 con overlay de texto centrado

// Card overview
className="bg-surface rounded-2xl border border-mid/20 p-5 space-y-5"

// Título sección
className="text-base font-bold text-primary"

// Grid instructor + nivel
className="grid grid-cols-2 gap-4 text-sm"
// Label: className="text-xs text-mid uppercase tracking-wider mb-0.5"
// Valor: className="font-semibold text-primary"

// Label de sección (PROGRESO, INSIGNIAS, RECURSOS)
className="text-xs font-bold text-secondary uppercase tracking-widest mb-2"

// Barra de progreso (misma que §7.5)
className="h-1.5 rounded-full bg-mid/25 overflow-hidden"
// Relleno: className="h-full rounded-full bg-secondary"

// Badge de insignia obtenida
className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-lg"

// Badge de insignia bloqueada
className="w-10 h-10 rounded-full bg-mid/15 opacity-40 flex items-center justify-center text-lg"

// Enlace recurso
className="flex items-center gap-2.5 text-sm text-secondary hover:text-primary transition-colors"

// Botón Foro del curso (bottom)
className="w-full flex items-center justify-center gap-2 min-h-[44px]
           bg-surface border border-mid/20 rounded-2xl
           text-sm font-semibold text-secondary
           hover:bg-primary/5 hover:text-primary transition-colors"
```

---

## 12. Reglas globales de idioma y accesibilidad

- **Idioma**: Todo el texto visible al usuario (labels, botones, badges, mensajes) debe estar en **español**.
- **Mobile-first**: Se diseña primero para pantallas pequeñas. Las clases `md:` y `lg:` son mejoras progresivas.
- **Área táctil mínima**: `min-h-[44px] min-w-[44px]` en todos los elementos interactivos.
- **Estados deshabilitados**: `disabled:opacity-40 disabled:cursor-not-allowed`.
- **Transiciones**: `transition-colors` para colores, `transition-all duration-200` para transform + color.

---

*Documento vivo — se actualiza con cada nueva entrega del equipo de diseño.*
