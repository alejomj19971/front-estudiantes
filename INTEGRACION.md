# Plan de Integración — Vista Estudiante → PlataformaIUSH-Frontend

**Equipo 10 · Vista Estudiante**  
Repositorio destino: `plataformaiush/PlataformaIUSH-Frontend`

---

## Estado actual

El módulo de vista estudiante está desarrollado en `ProyectoII` y contiene:

| Carpeta / Archivo | Descripción |
|---|---|
| `src/presentation/features/student/layout/` | StudentLayout, Sidebar, Header, BottomNav |
| `src/presentation/features/student/dashboard/` | StudentDashboardPage |
| `src/presentation/features/student/course-map/` | CourseMapPage, useCourseMap, CourseMapCanvas |
| `src/presentation/features/student/content-modal/` | ContentModal y subcomponentes |
| `src/presentation/components/PlayandLearnLogo.tsx` | Logo SVG |
| `src/presentation/stores/studentProgress.store.ts` | Store Zustand de progreso |
| `src/domain/student/` | Tipos y mock data |
| `public/music/` | Archivos MP3 del MusicPlayer |

---

## Paso 1 — Adaptar clases de color

El equipo usa un sistema de colores distinto. Antes de copiar cualquier archivo,
reemplazar las clases personalizadas por sus equivalentes en el proyecto del equipo.

### Tabla de reemplazos

| Clase actual (ProyectoII) | Clase en PlataformaIUSH | Notas |
|---|---|---|
| `bg-surface` | `bg-background` | Mismo valor #ffffff |
| `bg-surface-muted` | `bg-muted` | Mismo valor #f1f5f9 |
| `border-surface` | `border-background` | — |
| `text-mid` | `text-secondary` | Secondary #5a878c es el más cercano |
| `bg-mid` | `bg-secondary` | — |
| `border-mid` | `border-secondary` | Ej: `border-mid/20` → `border-secondary/20` |
| `bg-neutral` | `bg-foreground` | Mismo valor #060a0d |
| `text-neutral` | `text-foreground` | — |

> `text-primary`, `text-secondary`, `bg-tertiary`, `bg-primary` → **sin cambios**, son iguales en ambos proyectos.

### Archivos que requieren cambios de color

- `StudentLayout.tsx`
- `StudentSidebar.tsx`
- `StudentHeader.tsx`
- `StudentBottomNav.tsx`
- `StudentDashboardPage.tsx`
- `CourseMapPage.tsx`
- `ContentModal.tsx` y sus subcomponentes

---

## Paso 2 — Estructura de destino

```
PlataformaIUSH-Frontend/src/
├── presentation/
│   ├── features/
│   │   └── student/
│   │       ├── layout/                    ← COPIAR (nuevo)
│   │       │   ├── StudentLayout.tsx
│   │       │   ├── StudentSidebar.tsx
│   │       │   ├── StudentHeader.tsx
│   │       │   └── StudentBottomNav.tsx
│   │       ├── dashboard/                 ← COPIAR (nuevo)
│   │       │   └── StudentDashboardPage.tsx
│   │       ├── course-map/                ← COPIAR (nuevo)
│   │       │   ├── CourseMapPage.tsx
│   │       │   ├── useCourseMap.ts
│   │       │   └── CourseMapCanvas.tsx
│   │       ├── content-modal/             ← COPIAR (nuevo)
│   │       │   ├── ContentModal.tsx
│   │       │   └── components/
│   │       ├── components/
│   │       │   └── CourseCard.tsx         ← REEMPLAZAR con la versión de ProyectoII
│   │       ├── Dashboard.tsx              ← MANTENER (del equipo, no tocar)
│   │       ├── auth/                      ← MANTENER (del equipo, no tocar)
│   │       └── hooks/                     ← MANTENER (del equipo, no tocar)
│   ├── components/
│   │   └── PlayandLearnLogo.tsx           ← COPIAR (nuevo)
│   └── stores/
│       └── studentProgress.store.ts       ← COPIAR (nuevo)
├── domain/
│   └── student/
│       └── index.ts                       ← EXTENDER con tipos de ProyectoII
├── routes/
│   └── definitions/
│       └── student.routes.tsx             ← CREAR (nuevo)
└── public/
    └── music/                             ← COPIAR archivos MP3 (si se usa MusicPlayer)
```

---

## Paso 3 — Crear rutas del estudiante

Crear `src/routes/definitions/student.routes.tsx`:

```tsx
import { RouteObject } from 'react-router-dom'
import { StudentLayout } from '@presentation/features/student/layout/StudentLayout'
import { StudentDashboardPage } from '@presentation/features/student/dashboard/StudentDashboardPage'
import { CourseMapPage } from '@presentation/features/student/course-map/CourseMapPage'

export const studentRoutes: RouteObject[] = [
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      { path: 'dashboard', element: <StudentDashboardPage /> },
      { path: 'courses/:courseId/map', element: <CourseMapPage /> },
    ],
  },
]
```

---

## Paso 4 — Actualizar AppRouter

Integrar las rutas del estudiante en `src/routes/AppRouter.tsx`:

```tsx
import { Routes, Route } from 'react-router-dom'
import { authRoutes } from './definitions/auth.routes'
import { studentRoutes } from './definitions/student.routes'

export const AppRouter = () => (
  <Routes>
    {authRoutes.map(r => <Route key={r.path} {...r} />)}
    {studentRoutes.map(r => <Route key={r.path} {...r} />)}
  </Routes>
)
```

> Cada equipo agrega sus rutas de la misma manera.

---

## Paso 5 — Verificar TypeScript

Después de copiar todos los archivos:

```bash
cd PlataformaIUSH-Frontend
npm install
npx tsc --noEmit
```

El equipo tiene `noUnusedLocals: true` y `noUnusedParameters: true`.
Cualquier variable o parámetro sin usar generará error — revisar y limpiar.

---

## Orden de ejecución

| # | Tarea | Estado |
|---|---|---|
| 1 | Reemplazar clases de color en los archivos de ProyectoII | 🔴 Pendiente |
| 2 | Copiar carpetas `layout/`, `dashboard/`, `course-map/`, `content-modal/` | 🔴 Pendiente |
| 3 | Copiar `PlayandLearnLogo.tsx` y `studentProgress.store.ts` | 🔴 Pendiente |
| 4 | Extender `domain/student/index.ts` con tipos del proyecto | 🔴 Pendiente |
| 5 | Crear `student.routes.tsx` | 🔴 Pendiente |
| 6 | Actualizar `AppRouter.tsx` | 🔴 Pendiente |
| 7 | Copiar archivos `public/music/` | 🔴 Pendiente |
| 8 | Correr `npx tsc --noEmit` y corregir errores | 🔴 Pendiente |
| 9 | Probar en navegador | 🔴 Pendiente |
