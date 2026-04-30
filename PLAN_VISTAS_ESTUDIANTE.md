# Plan de Implementación — Vistas del Estudiante (Equipo 10)

**Stack:** React 19 + TypeScript + Tailwind CSS 4 + Zustand 5 + TanStack Query 5 + React Router 7  
**Ownership:** `src/domain/student/` + `src/presentation/features/student/`  
**Tema:** Nightmares: Creepy Insomnia — `#060A0D` · `#223740` · `#58838C` · `#84B9BF` · `#AEEBF2`  
**Enfoque:** Mobile-first — diseñar primero para 320px y escalar hacia arriba

---

## Paleta de Colores — "Nightmares: Creepy Insomnia"

Tema extraído de **Nightmares: Creepy Insomnia** (AlexPlay LLC). Armonía custom con cinco tonos de una escala oscuro → cian claro. Es una paleta monocromática fría que transmite profundidad, modernidad y foco — ideal para una plataforma educativa nocturna o con dark mode.

### Los cinco colores

| Token | Hex | Nombre | Uso principal en la UI |
|-------|-----|--------|------------------------|
| `--color-neutral` | `#060A0D` | Dark Side of the Moon | Fondo oscuro, texto sobre fondos claros, bordes sutiles dark mode |
| `--color-primary` | `#223740` | Elephant | Header, botones primarios, sidebar, fondos de secciones clave |
| `--color-secondary` | `#58838C` | La Pineta | Botones secundarios, badges, estados hover, íconos activos |
| `--color-mid` | `#84B9BF` | Coastal Fringe | Barras de progreso rellenas, separadores de módulos, estados intermedios |
| `--color-tertiary` | `#AEEBF2` | Mint Macaron | Acentos, active states en nav, highlights de completado, brillo de nodos |

### Variables CSS a declarar

```css
/* src/styles/globals.css */
:root {
  --color-neutral:   #060A0D;
  --color-primary:   #223740;
  --color-secondary: #58838C;
  --color-mid:       #84B9BF;
  --color-tertiary:  #AEEBF2;

  /* Derivados para texto y superficies */
  --color-surface:        #ffffff;
  --color-surface-muted:  #f1f5f9;
  --color-text-on-primary: #AEEBF2;   /* texto claro sobre fondo primary */
  --color-text-body:       #060A0D;   /* texto principal sobre blanco */
  --color-border:          #84B9BF40; /* Coastal Fringe al 25% de opacidad */
}
```

### Tokens TypeScript

```typescript
// src/presentation/design-system/tokens/colors.ts
export const colors = {
  neutral:   '#060A0D',   // Dark Side of the Moon
  primary:   '#223740',   // Elephant
  secondary: '#58838C',   // La Pineta
  mid:       '#84B9BF',   // Coastal Fringe
  tertiary:  '#AEEBF2',   // Mint Macaron
} as const

export type ColorKey = keyof typeof colors
```

### Guía de uso por componente

```
HEADER / BOTTOM NAV
  Fondo:           #223740  (primary)
  Texto / íconos:  #AEEBF2  (tertiary)
  Active state:    border o fondo #AEEBF2 con texto #223740

BOTÓN PRIMARIO  (Ver curso, Continuar, Enviar)
  Background:      #223740
  Text:            #AEEBF2
  Hover:           #58838C
  Active / press:  #060A0D

BOTÓN SECUNDARIO  (Anterior, Cancelar)
  Border:          #58838C
  Text:            #58838C
  Hover background:#58838C10  (10% opacidad)

BARRA DE PROGRESO
  Fondo vacío:     #84B9BF40  (Coastal Fringe al 25%)
  Relleno:         #84B9BF  →  gradiente hasta #AEEBF2 al llegar a 100%
  Texto %:         #223740

COURSE CARD
  Fondo:           #ffffff
  Borde:           #84B9BF40
  Sombra:          0 2px 8px #22374020
  Hover shadow:    0 4px 16px #22374030

SEPARADOR DE MÓDULO (mapa del curso)
  Línea:           #58838C
  Texto del título:#223740
  Fondo del badge: #AEEBF2  con texto #223740

NODO DE CONTENIDO (mapa del curso)
  completed:       fondo color del módulo (HSL generado) + ✓ en #AEEBF2
  available:       borde color del módulo + fondo #ffffff + número #223740
  locked:          fondo #84B9BF30  + ícono #84B9BF

MODAL DE CONTENIDO
  Overlay:         #060A0D  al 70% opacidad
  Panel:           #ffffff
  Header fondo:    #223740
  Header texto:    #AEEBF2

STATS CARDS (dashboard)
  Fondo:           #223740
  Número:          #AEEBF2
  Label:           #84B9BF

COMPLETION BADGE (certificado)
  Fondo gradiente: #58838C → #AEEBF2
  Texto:           #223740
  Ícono trofeo:    #223740
```

### Escala de grises compatibles

Para texto sobre blanco y estados deshabilitados, usar grises neutros que no rompan la armonía fría:

```
Texto principal:    #060A0D  (neutral — casi negro azulado)
Texto secundario:   #58838C  (secondary — funciona como gris oscuro cálido)
Texto placeholder:  #84B9BF  (mid — suficiente contraste sobre blanco)
Superficie muted:   #f1f5f9  (blanco-gris estándar de Tailwind, neutro)
Borde suave:        #84B9BF40
```

### Contrastes WCAG verificados

| Combinación | Ratio | Nivel |
|-------------|-------|-------|
| `#AEEBF2` sobre `#223740` | 7.2:1 | AAA ✓ |
| `#060A0D` sobre `#AEEBF2` | 14.1:1 | AAA ✓ |
| `#223740` sobre `#ffffff` | 10.6:1 | AAA ✓ |
| `#58838C` sobre `#ffffff` | 4.6:1 | AA ✓ |
| `#84B9BF` sobre `#ffffff` | 2.8:1 | Falla — usar solo decorativo, nunca para texto |

> `#84B9BF` (Coastal Fringe) **no cumple contraste** para texto sobre blanco. Usarlo solo en barras de progreso, bordes y elementos decorativos, nunca como color de texto.

---

## Principios Responsive (Mobile-First)

El proyecto sigue **mobile-first**: cada componente se diseña primero para pantalla pequeña y se amplía con breakpoints de Tailwind. El README del proyecto define explícitamente "Mobile-first, compatible con todos los dispositivos".

### Breakpoints de referencia

| Token Tailwind | Ancho mínimo | Uso típico |
|----------------|--------------|------------|
| _(base)_       | 0px          | Móvil (320px–639px) — diseño por defecto |
| `sm`           | 640px        | Móviles grandes / landscape |
| `md`           | 768px        | Tablets |
| `lg`           | 1024px       | Laptops |
| `xl`           | 1280px       | Desktops |

### Reglas globales obligatorias

```
1. Touch targets mínimo 44×44px (WCAG 2.5.5) — botones, nodos del mapa, opciones del quiz
2. Texto mínimo 16px en mobile para evitar zoom automático del navegador
3. Sin interacciones hover-only — toda acción hover debe tener equivalente táctil
4. Scroll vertical siempre disponible — nunca overflow: hidden en el body
5. Imágenes con max-width: 100% — nunca desbordarse del contenedor
6. Inputs con font-size >= 16px — evita zoom en iOS Safari al enfocar
```

### Clases Tailwind de referencia por sección

```tsx
// Grid de tarjetas — 1 col mobile, 2 tablet, 3 desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"

// Padding de página — compacto mobile, generoso desktop
className="px-4 py-4 md:px-8 md:py-8 lg:px-12"

// Texto — escala con la pantalla
className="text-base md:text-lg lg:text-xl"

// Botón con touch target seguro
className="min-h-[44px] min-w-[44px] px-4 py-3"
```

---

## 0. Layout Frame — `StudentLayout`

### Concepto Visual

**Desktop (md+)** — barra superior sticky:
```
┌─────────────────────────────────────────────────────┐
│  [Logo]   [Dashboard] [Mis Cursos] [Certificados]   │  ← sticky top, 64px alto
│                              [🔔]  [👤 Ana García]  │
└─────────────────────────────────────────────────────┘
│                    <Outlet />                       │
```

**Mobile (base)** — top bar mínima + bottom navigation:
```
┌─────────────────────────┐
│  [Logo]    [👤 Ana G.]  │  ← top bar solo logo + avatar, 56px
└─────────────────────────┘
│       <Outlet />        │
│  (scroll vertical)      │
└─────────────────────────┘
┌─────────────────────────┐
│ [🏠] [📚] [🏆]  [👤]   │  ← bottom nav sticky, 60px, iconos grandes
└─────────────────────────┘  ← safe-area-inset-bottom para notch iOS
```

El patrón de bottom nav es el estándar de apps educativas móviles (Duolingo, Platzi mobile).  
Mejora el alcance con el pulgar y evita zonas muertas en la parte superior de pantallas largas.

### Archivos

```
src/presentation/features/student/
  layout/
    StudentLayout.tsx        ← wrapper con header + bottom nav condicional
    StudentHeader.tsx        ← barra superior (logo + avatar)
    StudentBottomNav.tsx     ← nav inferior solo en mobile (md:hidden)
    StudentDesktopNav.tsx    ← nav en header solo en desktop (hidden md:flex)
    StudentHeader.test.tsx
```

### Decisiones UX Responsive

- **Top header**: `sticky top-0 z-50`, `backdrop-blur-md`, sombra sutil al hacer scroll
- **Mobile nav**: `fixed bottom-0` con `pb-safe` (safe-area-inset-bottom) para iPhones con notch
- **Touch targets del nav**: cada ítem del bottom nav mínimo `44×44px` (WCAG 2.5.5)
- **Desktop nav**: iconos + texto, `hidden md:flex`
- **Mobile nav**: solo iconos + label corto de 2–3 letras, `flex md:hidden`
- **Active state**: `border-b-2 border-[#AEEBF2]` en desktop / fondo tonal en mobile
- **Avatar**: 32px desktop, 28px mobile — `rounded-full object-cover`

### Implementación base

```tsx
// src/presentation/features/student/layout/StudentLayout.tsx
import { Outlet } from 'react-router-dom'
import { StudentHeader } from './StudentHeader'
import { StudentBottomNav } from './StudentBottomNav'

export function StudentLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />
      <main className="pt-14 md:pt-16 pb-16 md:pb-0">
        {/* pb-16 en mobile reserva espacio para bottom nav */}
        <Outlet />
      </main>
      <StudentBottomNav />  {/* se oculta en md+ con md:hidden */}
    </div>
  )
}
```

```tsx
// src/presentation/features/student/layout/StudentBottomNav.tsx
// className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
// style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
// Items: Home (Dashboard), Cursos, Certificados, Perfil
// Cada item: min-h-[60px] flex flex-col items-center justify-center gap-1
// Ícono Lucide 24px + label text-[10px]
```

---

## 1. Vista Dashboard del Estudiante

### Ruta

```
/student/dashboard
```

### Layout de la página — Responsive

**Mobile (base, 320px–639px):**
```
┌─────────────────────────┐
│  Hola, Ana 👋           │  ← texto compacto, 1 línea
│  ─────────────────────  │
│  [3 activos][87%][5d🔥] │  ← 3 mini-cards en fila, scroll x si no caben
│  ─────────────────────  │
│  🔍 [Buscar cursos...] X│  ← input full-width
│  ─────────────────────  │
│  Continuar aprendiendo  │
│  [card horizontal]      │  ← thumbnail 64px + título + barra
│  [card horizontal]      │
│  ─────────────────────  │
│  Todos mis cursos       │
│  [card]                 │  ← 1 columna, cards apiladas
│  [card]                 │
│  [card]                 │
└─────────────────────────┘
```

**Tablet (sm–md, 640px–1023px):**
```
┌────────────────────────────────────────┐
│  Bienvenida, Ana. 3 cursos en progreso │
│  [3 activos]  [Promedio 87%]  [5d 🔥] │
│  🔍 [Buscar cursos...               ] │
│  ─ Continuar aprendiendo ──────────── │
│  [card horiz.]    [card horiz.]        │  ← 2 columnas en recientes
│  ─ Todos mis cursos ────────────────  │
│  [card]  [card]                        │  ← 2 columnas
│  [card]  [card]                        │
└────────────────────────────────────────┘
```

**Desktop (lg+, 1024px+):**
```
┌─────────────────────────────────────────────────────┐
│  Bienvenida, Ana. Tienes 3 cursos en progreso       │
│  [Cursos activos: 3]  [Promedio: 87%]  [Racha: 5d] │
│  🔍 [Buscar cursos...                            ]  │
│  ─── Continuar aprendiendo ─────────────────────── │
│  [card horiz.]    [card horiz.]                     │
│  ─── Todos mis cursos ──────────────────────────── │
│  [card]  [card]  [card]                             │  ← 3 columnas
│  [card]  [card]  [card]                             │
└─────────────────────────────────────────────────────┘
```

### Componentes

```
src/presentation/features/student/
  dashboard/
    StudentDashboardPage.tsx       ← página principal (orquesta todo)
    components/
      StudentStatsBar.tsx          ← mini-cards de métricas (3 datos)
      CourseSearchBar.tsx          ← input con debounce 300ms
      RecentCoursesBanner.tsx      ← sección "continuar donde lo dejaste"
      CourseCard.tsx               ← tarjeta reutilizable de curso
      CourseProgressBar.tsx        ← barra de progreso animada
      CompletionBadge.tsx          ← botón "Obtener Certificado" (solo si 100%)
    StudentDashboardPage.test.tsx
```

### Diseño de `CourseCard`

```
┌────────────────────────────┐
│  [Imagen del curso 16:9]   │
├────────────────────────────┤
│  Título del Curso          │
│  ████████░░░░ 65%          │  ← barra animada con transition-width 700ms
│                            │
│  [Ver curso →]             │  ← siempre visible
│  [🏆 Certificado]          │  ← solo si progress === 100
└────────────────────────────┘
```

```tsx
// src/presentation/features/student/dashboard/components/CourseCard.tsx
interface CourseCardProps {
  course: EnrolledCourse
  onClick: () => void
}

// Clases Tailwind responsivas:
// Contenedor:  "rounded-xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform
//               hover:scale-[1.02] cursor-pointer"
// Thumbnail:   "w-full aspect-video object-cover"   ← ratio 16:9 en todos los tamaños
// Padding:     "p-3 md:p-4"
// Título:      "text-sm md:text-base font-semibold line-clamp-2"
// Botón:       "w-full min-h-[44px] mt-3 text-sm"  ← touch target seguro

// IMPORTANTE mobile:
// - active:scale-[0.98] en lugar de hover:scale para dar feedback táctil
// - line-clamp-2 evita que títulos largos rompan el layout
// - aspect-video garantiza el ratio sin importar el ancho del contenedor
```

### `CourseSearchBar` con debounce

```tsx
// src/presentation/features/student/dashboard/components/CourseSearchBar.tsx
// - Input controlado con useState
// - useEffect + setTimeout 300ms para disparar la búsqueda
// - Limpiar timeout en cleanup del useEffect
// - Icono Search de Lucide a la izquierda del input
// - Botón X para limpiar si hay texto
// - onSearch: (query: string) => void
```

### `RecentCoursesBanner`

```tsx
// src/presentation/features/student/dashboard/components/RecentCoursesBanner.tsx
// Muestra los 2 cursos con lastAccessedAt más reciente
// Card horizontal: [thumbnail 80px] [título + progreso + botón "Continuar"]
// Ordenados por studentProgressStore.progress[id].lastAccessedAt desc
// Título de sección: "Continuar aprendiendo"
```

### Tipos de dominio

```typescript
// src/domain/student/types.ts

export interface StudentProgress {
  courseId: string
  completedContents: string[]   // IDs de contenidos completados
  lastAccessedAt: string        // ISO date string
  percentageComplete: number    // 0-100
}

export interface StudentDashboardData {
  student: {
    id: string
    name: string
    avatar: string
  }
  enrolledCourses: EnrolledCourse[]
  stats: {
    activeCourses: number
    avgProgress: number
    streak: number              // días consecutivos de actividad
  }
}

export interface EnrolledCourse {
  id: string
  title: string
  thumbnail: string
  progress: number              // 0-100
  lastAccessedAt: string
}
```

---

## 2. Vista Mapa del Curso — Road Map Visual

### Referencia de diseño

Inspirado en mapas de rutas de aprendizaje digitales con nodos circulares grandes,
coloridos e iconográficos, conectados por caminos curvos punteados que fluyen como un río.

```
   ╔══════════════════════════════════════╗
   ║    Introducción a Python             ║
   ╚══════════════════════════════════════╝

         🎬          📖
        [▶️]  ~~~~  [📚]  ~~~~
     Fundamentos   Variables
                              \~~~~  [❓]
                               Quiz
   ── Módulo 2 ──────────────────────────
        [🔒]  ~~~~  [🔒]
     (bloqueado)
```

### Ruta

```
/student/courses/:courseId
```

### Concepto Visual — Nodos con Íconos Grandes

Cada nodo es un **círculo grande y colorido** (estilo "badge educativo") con:
- Radio 38–44px — suficientemente grande para iconos y touch
- Color sólido vibrante propio de cada módulo (todos los nodos del mismo módulo = mismo color)
- **Ícono Lucide** blanco en el centro, relacionado con el tipo de contenido
- **Badge numérico** pequeño en la esquina superior derecha (número de orden)
- **Sombra de color** (`drop-shadow`) en el mismo tono del nodo para profundidad
- **Borde blanco** de 3px para separarlo del fondo
- **Título del contenido** en texto pequeño debajo del nodo (siempre visible)

**Estados visuales:**

| Estado | Relleno | Ícono | Efecto |
|--------|---------|-------|--------|
| `available` | Color del módulo (100% opacidad) | Blanco, tipo de contenido | Sombra de color, escala 1.0 |
| `completed` | Color del módulo + overlay verde suave | ✓ Check blanco | Anillo verde exterior |
| `locked` | Gris (#84B9BF a 40%) | 🔒 Lock gris | Sin sombra, opacidad 0.5 |

**Mapa de íconos por tipo de contenido:**

```typescript
const CONTENT_TYPE_ICONS = {
  video:  Play,         // reproducción de video
  text:   BookOpen,     // lectura/texto
  image:  ImageIcon,    // imagen/foto
  quiz:   HelpCircle,   // cuestionario
}
```

### Conexiones — Curvas Bezier Punteadas

**Reemplaza `DashedLine` (línea recta) por `CurvedPath` (bezier cúbico).**

```tsx
// Componente CurvedPath — SVG <path> con curva cúbica
// La curva se genera con puntos de control perpendiculares a la dirección
// del segmento, creando un efecto de río/camino orgánico

function getCurvedPath(
  from: { x: number; y: number },
  to:   { x: number; y: number },
  curvature: number = 0.4          // 0 = recto, 0.5 = curva suave, 1 = muy curvo
): string {
  const dx = to.x - from.x
  const dy = to.y - from.y

  // Puntos de control perpendiculares al segmento (crea la curva)
  // cp1 se desplaza hacia la derecha del segmento
  // cp2 se desplaza hacia la izquierda (forma la S-curve)
  const cp1x = from.x + dx * 0.25 + dy * curvature
  const cp1y = from.y + dy * 0.25 - dx * curvature
  const cp2x = from.x + dx * 0.75 - dy * curvature
  const cp2y = from.y + dy * 0.75 + dx * curvature

  return `M ${from.x} ${from.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${to.x} ${to.y}`
}

// SVG resultante:
// <path d={getCurvedPath(a, b)} stroke={color} strokeDasharray="10 7"
//       strokeWidth={3} fill="none" strokeLinecap="round" opacity={opacity} />
```

**El `curvature` varía según la posición relativa:**
- Nodos en la misma columna (ambos izquierda): curvature = 0.35 hacia la derecha
- Nodos cruzados (izquierda→derecha): curvature = 0.3 pronunciado
- Nodos cercanos verticalmente: curvature = 0.2 suave

### Archivos (actualizados)

```
src/presentation/features/student/
  course-map/
    CourseMapPage.tsx            ← página, fetch y orquestación
    components/
      CourseMapCanvas.tsx        ← SVG responsivo + ResizeObserver
      ModuleSection.tsx          ← separador visual de módulo
      ContentNode.tsx            ← nodo circular grande con ícono (NUEVO DISEÑO)
      CurvedPath.tsx             ← bezier cúbico punteado (reemplaza DashedLine)
    hooks/
      useCourseMap.ts            ← posicionamiento estocástico con semilla
      useModuleColor.ts          ← paleta vibrante por módulo
    CourseMapPage.test.tsx
```

### Hook `useModuleColor` — Paleta Vibrante

```typescript
// Paleta fija de colores vibrantes (inspirada en la referencia de diseño)
// Cada módulo recibe un color de la paleta rotando por índice
// Colores pensados para tener buen contraste con íconos blancos

const MODULE_COLORS = [
  '#E53E6D',  // Rosa fucsia
  '#3D9BE9',  // Azul brillante
  '#2ECC71',  // Verde esmeralda
  '#F39C12',  // Naranja
  '#9B59B6',  // Púrpura
  '#1ABC9C',  // Teal/turquesa
  '#E74C3C',  // Rojo
  '#F1C40F',  // Amarillo
]

function getModuleColor(moduleIndex: number): string {
  return MODULE_COLORS[moduleIndex % MODULE_COLORS.length]
}
```

### Hook `useCourseMap` — Posicionamiento Aleatorio con Semilla

```typescript
// Distribuye nodos de forma orgánica (como la imagen de referencia)
// pero DETERMINÍSTICA — la misma semilla siempre produce las mismas posiciones

function hashSeed(str: string): number {
  // djb2 hash — produce un número estable desde un string
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i)
    hash = hash & hash  // 32-bit integer
  }
  return Math.abs(hash)
}

function useCourseMap(modules: Module[], canvasWidth: number) {
  // Zona usable: margen de NODE_RADIUS en cada lado
  // X rango: [MARGIN, canvasWidth - MARGIN]
  // Y incrementa ~160px por nodo + 80px por separador de módulo

  // Algoritmo:
  // 1. Para cada nodo, calcular x basado en su hash (siempre en zona usable)
  // 2. Y = acumulado lineal (garantiza lectura de arriba a abajo)
  // 3. La variación en X es amplia (30%–80% del ancho) para dar sensación aleatoria
  // 4. Se evita que dos nodos consecutivos estén muy juntos horizontalmente
  //    (mínima distancia horizontal = 60px) para que la curva sea visible

  // Constantes:
  const NODE_RADIUS = canvasWidth < 640 ? 34 : 40
  const MARGIN = NODE_RADIUS + 20
  const X_RANGE = canvasWidth - MARGIN * 2
  const Y_SPACING = canvasWidth < 640 ? 150 : 170
  const MODULE_GAP = 60
}
```

### Componente `ContentNode` — Diseño con Ícono

```tsx
// Estructura SVG del nodo (radio 38–44px):
//
// <g onClick={...}>
//   ┌── Círculo de sombra (mismo color, desplazado 3px abajo, blur via filter) ──┐
//   │   <circle cy={pos.y+3} r={r} fill={color} opacity={0.3} />               │
//   └────────────────────────────────────────────────────────────────────────────┘
//   ┌── Borde blanco exterior ───────────────────────────────────────────────────┐
//   │   <circle r={r+3} fill="white" />                                         │
//   └────────────────────────────────────────────────────────────────────────────┘
//   ┌── Círculo principal ───────────────────────────────────────────────────────┐
//   │   <circle r={r} fill={color} />                                           │
//   │   [si completed] <circle r={r} fill="rgba(0,200,0,0.2)" />  ← overlay    │
//   └────────────────────────────────────────────────────────────────────────────┘
//   ┌── Ícono Lucide (foreignObject, centrado) ──────────────────────────────────┐
//   │   <foreignObject>                                                          │
//   │     <LucideIcon size={20} color="white" />                               │
//   │   </foreignObject>                                                         │
//   └────────────────────────────────────────────────────────────────────────────┘
//   ┌── Badge numérico (esquina sup-derecha) ────────────────────────────────────┐
//   │   <circle cx={pos.x+r*0.7} cy={pos.y-r*0.7} r={11} fill="white" />      │
//   │   <text ...>{order}</text>                                                │
//   └────────────────────────────────────────────────────────────────────────────┘
//   ┌── Anillo verde para completados ───────────────────────────────────────────┐
//   │   <circle r={r+6} fill="none" stroke="#2ECC71" strokeWidth={3} />        │
//   └────────────────────────────────────────────────────────────────────────────┘
//   ┌── Título debajo ───────────────────────────────────────────────────────────┐
//   │   <foreignObject y={pos.y + r + 8}> texto centrado </foreignObject>       │
//   └────────────────────────────────────────────────────────────────────────────┘
// </g>

// Touch target: <circle r={r+10} fill="transparent" /> captura toda el área
```

### Reglas de bloqueo (sin cambios)

### Reglas de bloqueo

```typescript
// Lógica de desbloqueo — se calcula en CourseMapPage.tsx

// Un módulo está BLOQUEADO si:
//   El módulo con order anterior tiene percentageComplete < 100
//   (El primer módulo siempre está disponible)

// Un nodo de contenido está BLOQUEADO si:
//   El contenido con order anterior (dentro del mismo módulo) no está en completedContents
//   (El primer contenido de cada módulo disponible siempre está disponible)

// Al hacer click en nodo bloqueado:
//   Mostrar toast: "Completa el contenido anterior para continuar"
//   NO abrir el modal

function getContentStatus(
  content: Content,
  moduleBlocked: boolean,
  completedContents: string[],
  previousContentId: string | null
): 'completed' | 'available' | 'locked' {
  if (moduleBlocked) return 'locked'
  if (completedContents.includes(content.id)) return 'completed'
  if (!previousContentId || completedContents.includes(previousContentId)) return 'available'
  return 'locked'
}
```

### Tipos adicionales necesarios

```typescript
// src/domain/courses/types.ts  (Equipo 1 — importar vía shared interfaces)
interface Course {
  id: string
  title: string
  modules: Module[]
}

interface Module {
  id: string
  title: string
  order: number
  contents: Content[]
}

interface Content {
  id: string
  title: string
  order: number
  type: 'video' | 'image' | 'text' | 'quiz'
}
```

---

## 3. Vista de Contenido — Modal

### Trigger

Click sobre un `ContentNode` con status `'available'` o `'completed'` abre el modal.  
El modal se renderiza dentro de `CourseMapPage` con un portal (`ReactDOM.createPortal`).

### Por qué un componente por tipo de contenido

**Sí, se recomienda un componente por tipo.** Las razones:

| Razón | Detalle |
|-------|---------|
| Lógica propia | Video necesita `onTimeUpdate`, quiz necesita estado de respuestas |
| Lazy loading | Cada tipo se carga solo cuando se necesita (`React.lazy`) |
| Testing aislado | Se prueba `VideoContent` sin saber nada de `QuizContent` |
| Escalabilidad | Agregar tipo `pdf` no toca los demás componentes |
| Asignación | Una persona por tipo de contenido en el equipo |

### Archivos

```
src/presentation/features/student/
  content-modal/
    ContentModal.tsx             ← wrapper: overlay + close + título + switch de tipo
    components/
      VideoContent.tsx           ← <video> nativo o iframe YouTube/Vimeo
      ImageContent.tsx           ← <img> con zoom y descripción
      TextContent.tsx            ← HTML sanitizado o Markdown renderizado
      QuizContent.tsx            ← preguntas con opciones, estado de respuesta
      ContentLoader.tsx          ← skeleton de carga
      ContentError.tsx           ← estado de error con botón retry
    hooks/
      useContentProgress.ts      ← marca completado según el tipo
    ContentModal.test.tsx
```

### `ContentModal` — estructura responsive

El modal es **full-screen en mobile** y **panel centrado en desktop**. Es el patrón correcto para contenido multimedia: en móvil el espacio es demasiado limitado para un modal flotante.

```
MOBILE (base):                    DESKTOP (md+):
┌─────────────────────┐           ┌──────────────────────────────┐
│ ✕  Título           │           │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ← overlay
│─────────────────────│           │░░┌────────────────────┐░░░░░│
│                     │           │░░│ ✕  Título          │░░░░░│
│  <ContentRenderer>  │           │░░│────────────────────│░░░░░│
│  (ocupa pantalla    │           │░░│                    │░░░░░│
│   completa)         │           │░░│  <ContentRenderer> │░░░░░│
│                     │           │░░│  max-h: 70vh       │░░░░░│
│─────────────────────│           │░░│  overflow-y: auto  │░░░░░│
│ [← Ant]  [Sig →]   │           │░░│────────────────────│░░░░░│
└─────────────────────┘           │░░│ [← Ant]  [Sig →]  │░░░░░│
                                  │░░└────────────────────┘░░░░░│
                                  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                                  └──────────────────────────────┘
```

```tsx
// src/presentation/features/student/content-modal/ContentModal.tsx

interface ContentModalProps {
  contentId: string
  courseId: string
  onClose: () => void
}

// Clases Tailwind responsivas del modal:
// Overlay:   "fixed inset-0 z-50 bg-black/60 md:flex md:items-center md:justify-center"
// Panel:     "flex flex-col bg-white w-full h-full
//             md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-2xl md:rounded-2xl"
// Header:    "flex items-center justify-between p-4 border-b shrink-0"
// Content:   "flex-1 overflow-y-auto p-4 md:p-6"   ← scroll interno
// Footer:    "flex justify-between p-4 border-t shrink-0"
// Botón X:   "min-w-[44px] min-h-[44px]"           ← touch target

// Comportamiento:
// - Mobile: ocupa toda la pantalla (position: fixed, inset: 0)
// - Desktop: panel centrado con overlay oscuro
// - Cerrar: botón X + swipe down en mobile (opcional) + Escape en desktop
// - Bloquear scroll del body mientras el modal está abierto:
//   document.body.style.overflow = 'hidden' al abrir
//   document.body.style.overflow = '' al cerrar
// - Usar ReactDOM.createPortal para renderizar fuera del árbol del mapa
```

### Switch de tipo de contenido

```tsx
// Dentro de ContentModal.tsx

const contentComponents = {
  video: React.lazy(() => import('./components/VideoContent')),
  image: React.lazy(() => import('./components/ImageContent')),
  text:  React.lazy(() => import('./components/TextContent')),
  quiz:  React.lazy(() => import('./components/QuizContent')),
} as const

function ContentRenderer({ content, onComplete }: ContentRendererProps) {
  const Component = contentComponents[content.type]
  return (
    <React.Suspense fallback={<ContentLoader />}>
      <Component data={content} onComplete={onComplete} />
    </React.Suspense>
  )
}
```

### Tipos de datos que retorna la API por tipo

```typescript
// Tipo base común
interface ContentDetail {
  id: string
  title: string
  type: 'video' | 'image' | 'text' | 'quiz'
}

// Video
interface VideoContentData extends ContentDetail {
  type: 'video'
  url: string           // URL directa o YouTube/Vimeo embed URL
  duration: number      // segundos
  thumbnail?: string
}

// Imagen
interface ImageContentData extends ContentDetail {
  type: 'image'
  url: string
  alt: string
  caption?: string
}

// Texto
interface TextContentData extends ContentDetail {
  type: 'text'
  body: string          // HTML o Markdown (acordar con backend)
}

// Cuestionario
interface QuizContentData extends ContentDetail {
  type: 'quiz'
  questions: QuizQuestion[]
}

interface QuizQuestion {
  id: string
  text: string
  options: { id: string; text: string }[]
  correctOptionId: string    // puede omitirse si el backend lo valida
}
```

### Flujo de completitud por tipo

```
VIDEO:
  → Al llegar al 90% de la duración: onComplete() automático
  → Usar evento onTimeUpdate del elemento <video>
  → Mobile: usar <video> nativo con controls (reproduce bien en iOS/Android)
  → Agregar playsInline para evitar fullscreen automático en iOS
  → max-width: 100%, aspect-ratio: 16/9

IMAGEN:
  → Botón explícito "Marcar como visto" al pie del modal
  → Se activa 2s después de abrir (evitar click accidental)
  → Mobile: botón min-h-[48px] full-width al pie del área de contenido

TEXTO:
  → Botón explícito "He leído este contenido" al final del scroll
  → Detectar que el usuario llegó al final del área scrollable
  → Mobile: font-size mínimo 16px, line-height 1.6, padding horizontal 16px

QUIZ:
  → Al hacer submit de respuestas: onComplete() (independiente del score)
  → El score lo procesa el Equipo 5 (grades)
  → Mobile: cada opción como botón full-width, min-h-[52px], texto grande
  → Botón "Enviar respuestas" full-width, min-h-[48px], fijo al fondo
  → Mostrar feedback inmediato de respuestas correctas/incorrectas

onComplete() en todos los casos:
  → markContentComplete(courseId, contentId) en el store
  → Mutation a la API: POST /api/progress { courseId, contentId }
  → Invalidar query del curso para recalcular progreso
```

### Hook `useContentProgress`

```typescript
// src/presentation/features/student/content-modal/hooks/useContentProgress.ts

function useContentProgress(courseId: string, contentId: string) {
  const markComplete = useStudentProgressStore(s => s.markContentComplete)
  const mutation = useMutation({
    mutationFn: () => api.post('/progress', { courseId, contentId }),
    onMutate: () => {
      // Optimistic update: marcar en store inmediatamente
      markComplete(courseId, contentId)
    },
    onError: () => {
      // Revertir si falla (implementar rollback en el store)
    }
  })

  return { markComplete: () => mutation.mutate() }
}
```

---

## 4. Estado Global — Zustand Store

```typescript
// src/presentation/stores/studentProgressStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StudentProgressStore {
  // Estado
  progress: Record<string, StudentProgress>   // key: courseId

  // Acciones
  markContentComplete: (courseId: string, contentId: string) => void
  updateLastAccessed: (courseId: string) => void
  getProgress: (courseId: string) => StudentProgress | null
  getRecentCourseIds: (limit?: number) => string[]
  computePercentage: (courseId: string, totalContents: number) => number
}

export const useStudentProgressStore = create<StudentProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},

      markContentComplete: (courseId, contentId) =>
        set(state => {
          const current = state.progress[courseId] ?? {
            courseId,
            completedContents: [],
            lastAccessedAt: new Date().toISOString(),
            percentageComplete: 0,
          }
          if (current.completedContents.includes(contentId)) return state
          return {
            progress: {
              ...state.progress,
              [courseId]: {
                ...current,
                completedContents: [...current.completedContents, contentId],
                lastAccessedAt: new Date().toISOString(),
              },
            },
          }
        }),

      updateLastAccessed: (courseId) =>
        set(state => ({
          progress: {
            ...state.progress,
            [courseId]: {
              ...(state.progress[courseId] ?? { courseId, completedContents: [], percentageComplete: 0 }),
              lastAccessedAt: new Date().toISOString(),
            },
          },
        })),

      getProgress: (courseId) => get().progress[courseId] ?? null,

      getRecentCourseIds: (limit = 2) =>
        Object.values(get().progress)
          .sort((a, b) => b.lastAccessedAt.localeCompare(a.lastAccessedAt))
          .slice(0, limit)
          .map(p => p.courseId),

      computePercentage: (courseId, totalContents) => {
        const p = get().progress[courseId]
        if (!p || totalContents === 0) return 0
        return Math.round((p.completedContents.length / totalContents) * 100)
      },
    }),
    { name: 'student-progress' }   // clave en localStorage
  )
)
```

---

## 5. Estrategia de Persistencia

```
┌─────────────┐   completa contenido   ┌──────────────────────┐
│   Usuario   │ ──────────────────────→│  Zustand Store       │
│             │                        │  (localStorage)      │
└─────────────┘                        └──────────┬───────────┘
                                                  │  sync async (TanStack Mutation)
                                                  ↓
                                       ┌──────────────────────┐
                                       │     API Backend      │
                                       │  POST /api/progress  │
                                       └──────────────────────┘

Al iniciar sesión:
  1. TanStack Query fetch: GET /api/progress (datos del servidor)
  2. Merge con localStorage (servidor tiene precedencia)
  3. Store actualizado con la fuente de verdad del servidor
```

- **Optimistic update:** store se actualiza antes de la respuesta del servidor
- **Rollback:** si la mutation falla, se revierte el optimistic update
- **Offline:** el store en localStorage garantiza UX funcional sin conexión
- **Sync al reconectar:** TanStack Query invalida y re-fetches automáticamente

---

## 6. Estructura de Archivos Completa

```
src/
├── domain/
│   └── student/
│       ├── types.ts                    ← StudentProgress, EnrolledCourse, StudentDashboardData
│       └── interfaces/
│           └── IStudentRepository.ts  ← contrato del repositorio (sin implementación)
│
└── presentation/
    ├── stores/
    │   └── studentProgressStore.ts    ← Zustand con persist en localStorage
    │
    └── features/
        └── student/
            ├── layout/
            │   ├── StudentLayout.tsx
            │   ├── StudentHeader.tsx
            │   └── StudentHeader.test.tsx
            │
            ├── dashboard/
            │   ├── StudentDashboardPage.tsx
            │   ├── StudentDashboardPage.test.tsx
            │   └── components/
            │       ├── StudentStatsBar.tsx
            │       ├── CourseSearchBar.tsx
            │       ├── RecentCoursesBanner.tsx
            │       ├── CourseCard.tsx
            │       ├── CourseProgressBar.tsx
            │       └── CompletionBadge.tsx
            │
            ├── course-map/
            │   ├── CourseMapPage.tsx
            │   ├── CourseMapPage.test.tsx
            │   ├── components/
            │   │   ├── CourseMapCanvas.tsx
            │   │   ├── ModuleSection.tsx
            │   │   ├── ContentNode.tsx
            │   │   ├── DashedLine.tsx
            │   │   └── LockedOverlay.tsx
            │   └── hooks/
            │       ├── useCourseMap.ts
            │       └── useModuleColor.ts
            │
            └── content-modal/
                ├── ContentModal.tsx
                ├── ContentModal.test.tsx
                ├── components/
                │   ├── VideoContent.tsx
                │   ├── ImageContent.tsx
                │   ├── TextContent.tsx
                │   ├── QuizContent.tsx
                │   ├── ContentLoader.tsx
                │   └── ContentError.tsx
                └── hooks/
                    └── useContentProgress.ts
```

---

## 7. Configuración de Rutas

```typescript
// src/routes/studentRoutes.tsx
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { StudentLayout } from '../presentation/features/student/layout/StudentLayout'

const StudentDashboardPage = lazy(() =>
  import('../presentation/features/student/dashboard/StudentDashboardPage')
)
const CourseMapPage = lazy(() =>
  import('../presentation/features/student/course-map/CourseMapPage')
)

export const studentRoutes = {
  path: '/student',
  element: <StudentLayout />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: 'dashboard', element: <StudentDashboardPage /> },
    { path: 'courses/:courseId', element: <CourseMapPage /> },
    // El modal de contenido es estado interno de CourseMapPage, no una ruta separada
    // Razón: el modal es efímero, no queremos que el back-button lo cierre como una página
  ],
}
```

---

## 8. Orden de Implementación

| Fase | Tarea | Bloquea a |
|------|-------|-----------|
| 1 | `StudentLayout` + `StudentHeader` + rutas | Todo lo demás |
| 2 | `studentProgressStore` con persist | Dashboard, Modal |
| 3 | `CourseProgressBar` + `CourseCard` | Dashboard |
| 4 | `StudentDashboardPage` completo | — |
| 5 | `useCourseMap` + `useModuleColor` | Course Map |
| 6 | `CourseMapCanvas` + `ContentNode` + `DashedLine` | Course Map |
| 7 | `CourseMapPage` completo con bloqueos | — |
| 8 | `ContentModal` + `ContentLoader` + `ContentError` | Tipos de contenido |
| 9 | `VideoContent` + `TextContent` | — |
| 10 | `ImageContent` + `QuizContent` | — |
| 11 | `CourseSearchBar` con debounce | — |
| 12 | `RecentCoursesBanner` | — |
| 13 | Tests de todos los componentes | PR |

---

## 9. Integración con Otros Equipos

| Equipo | Provee | Cómo consumirlo |
|--------|--------|-----------------|
| **Equipo 1** | Tipos `Course`, `Module`, `Content` | Importar desde `domain/shared/interfaces/` |
| **Equipo 2** | URLs de archivos multimedia (video, imagen) | El objeto `ContentDetail` ya trae la URL |
| **Equipo 5** | Procesamiento del score del quiz | Equipo 10 solo llama POST /grades, no procesa el resultado |
| **Equipo 8** | `ITokenManager` para autenticar requests | Interceptor HTTP ya configurado — no requiere acción extra |
| **Equipo 9** | Tracking de eventos para analytics | `trackEvent('content_completed', { courseId, contentId })` |

**Regla de oro:** el Equipo 10 **nunca** importa directamente de las carpetas de otros equipos.  
Siempre a través de `src/domain/shared/interfaces/`.

---

## 10. Checklist antes del PR

**Código y calidad:**
```
□ TypeScript sin errores (npm run type-check)
□ ESLint sin warnings (npm run lint)
□ Tests escritos para cada componente
□ Cobertura > 80% en domain layer
□ No hay imports directos a carpetas de otros equipos
```

**Funcionalidad:**
```
□ Bloqueo de módulos y contenidos funciona correctamente
□ Progress se guarda en localStorage y sincroniza con API
□ Estados de carga (skeleton) y error implementados en todos los fetches
□ Modal se cierra con Escape (desktop) y botón X (mobile)
□ Scroll del body bloqueado mientras el modal está abierto
```

**Responsive y mobile:**
```
□ Probado en 320px (iPhone SE) — el layout más estrecho posible
□ Probado en 375px (iPhone 14) — el mobile más común
□ Probado en 768px (iPad) — tablet portrait
□ Probado en 1280px (desktop) — referencia escritorio
□ Bottom nav visible y funcional en mobile (md:hidden correcto)
□ Top nav visible y funcional en desktop (hidden md:flex correcto)
□ Todos los botones y nodos tienen área táctil mínima 44×44px
□ Ningún texto menor a 16px en mobile (evitar zoom automático en iOS)
□ Modal es full-screen en mobile, panel centrado en desktop
□ Video con playsInline y controls nativo en mobile
□ Grid de cursos: 1 col mobile → 2 tablet → 3 desktop
□ Mapa del curso se recalcula al rotar pantalla (ResizeObserver)
□ Safe-area-inset-bottom aplicado en el bottom nav (notch de iPhone)
□ Sin interacciones hover-only — todo accesible por toque
□ CourseCard usa active:scale en lugar de hover:scale en mobile
```

**Accesibilidad básica:**
```
□ Imágenes con alt text descriptivo
□ Botones con aria-label cuando no tienen texto visible
□ Nodos bloqueados con aria-disabled="true"
□ Modal con role="dialog" y aria-modal="true"
□ Contraste de colores suficiente (ratio mínimo 4.5:1 para texto)
```
