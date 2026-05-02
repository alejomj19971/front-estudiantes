# PlayandLearn — Sistema de Estilos

Referencia completa del design system. Todo está implementado con **Tailwind CSS v4** (CSS-first via `@theme {}`) y la fuente **Plus Jakarta Sans**.

---

## Paleta de colores

Basada en la paleta *"Nightmares: Creepy Insomnia"*, adaptada para un contexto educativo moderno.

| Token             | Clase Tailwind       | Hex       | Uso principal                              |
|-------------------|----------------------|-----------|--------------------------------------------|
| `neutral`         | `bg-neutral`         | `#060A0D` | Fondos muy oscuros, overlays               |
| `primary`         | `bg-primary`         | `#223740` | Header, botones principales, texto oscuro  |
| `secondary`       | `bg-secondary`       | `#58838C` | Botones hover, acentos, íconos activos     |
| `mid`             | `bg-mid`             | `#84B9BF` | Bordes, textos secundarios, placeholders   |
| `tertiary`        | `bg-tertiary`        | `#AEEBF2` | Texto sobre fondos oscuros, acentos claros |
| `surface`         | `bg-surface`         | `#FFFFFF` | Cards, modales, fondos de componentes      |
| `surface-muted`   | `bg-surface-muted`   | `#F1F5F9` | Fondo general de la app                    |

### Gradientes frecuentes

```css
/* Header / botones primarios */
background: #223740;

/* Barra de progreso */
background: linear-gradient(to right, #223740, #58838C);

/* Badge completado / certificado */
background: linear-gradient(to right, #58838C, #AEEBF2);

/* Logo / ícono */
background: linear-gradient(135deg, #223740, #58838C);
```

### Colores de módulos (mapa del curso)

Paleta vibrant para los 8 módulos posibles — se asignan en orden cíclico:

| Módulo | Color     | Hex       |
|--------|-----------|-----------|
| 1      | Rosa      | `#E53E6D` |
| 2      | Azul      | `#3D9BE9` |
| 3      | Verde     | `#2ECC71` |
| 4      | Naranja   | `#F39C12` |
| 5      | Púrpura   | `#9B59B6` |
| 6      | Teal      | `#1ABC9C` |
| 7      | Rojo      | `#E74C3C` |
| 8      | Amarillo  | `#F1C40F` |

---

## Tipografía

**Fuente:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — cargada desde Google Fonts.

| Rol                    | Clase Tailwind                        |
|------------------------|---------------------------------------|
| Título de página       | `text-xl md:text-2xl font-bold`       |
| Título de sección      | `text-base md:text-lg font-bold`      |
| Título de card         | `text-sm md:text-base font-semibold`  |
| Cuerpo / párrafo       | `text-sm text-secondary`              |
| Texto secundario       | `text-xs text-secondary`              |
| Etiqueta pequeña       | `text-[11px] text-mid`                |
| Dato numérico destacado| `text-xl font-black`                  |

---

## Espaciado y layout

| Concepto               | Valor                              |
|------------------------|------------------------------------|
| Max width contenido    | `max-w-5xl` (dashboard) / `max-w-3xl` (logros) / `max-w-2xl` (mapa) |
| Padding horizontal     | `px-4 md:px-8`                     |
| Padding vertical       | `py-6 md:py-8`                     |
| Gap entre secciones    | `space-y-6 md:space-y-8`           |
| Gap entre cards        | `gap-4`                            |
| Alto mínimo botón      | `min-h-[44px]` (accesibilidad táctil) |

---

## Componentes base

### Botón primario
```tsx
className="min-h-[44px] px-6 rounded-xl bg-primary text-tertiary
           font-semibold text-sm hover:bg-secondary
           active:scale-95 transition-all duration-200"
```

### Botón secundario / outline
```tsx
className="min-h-[44px] px-6 rounded-xl border border-mid/20
           text-primary font-semibold text-sm
           hover:border-secondary/40 active:scale-95 transition-all"
```

### Botón pill (flotante)
```tsx
className="flex items-center gap-1.5 min-h-[44px] pl-2.5 pr-4
           bg-surface/90 backdrop-blur-md rounded-full
           shadow-md border border-mid/20 text-primary
           hover:bg-primary hover:text-tertiary transition-all font-semibold text-sm"
```

### Card de curso
```tsx
className="bg-surface rounded-2xl overflow-hidden shadow-sm flex flex-col
           border border-mid/20 hover:shadow-md hover:shadow-primary/10
           active:scale-[0.98] transition-all duration-200"
```

### Card de stats / métrica
```tsx
className="flex items-center gap-3 p-4 rounded-2xl
           bg-surface border border-mid/20 shadow-sm"
```

### Barra de progreso
```tsx
// Contenedor
className="h-2 rounded-full bg-mid/30 overflow-hidden"
// Relleno
className="h-full rounded-full bg-gradient-to-r from-primary to-secondary
           transition-all duration-700 ease-out"
```

### Input / buscador
```tsx
className="w-full pl-10 pr-4 h-11 rounded-xl border border-mid/20
           bg-surface text-sm text-primary placeholder:text-mid
           focus:outline-none focus:ring-2 focus:ring-primary/20
           focus:border-primary/40 transition-all"
```

### Badge de módulo (mapa SVG)
```tsx
// Fondo pill con color de módulo
rx="12" fill="white" stroke={color} strokeWidth="1.5"
// Texto uppercase tracking-widest
```

### Modal (bottom sheet mobile / centrado desktop)
```tsx
// Overlay
className="fixed inset-0 z-[100] bg-neutral/70 backdrop-blur-sm
           flex items-end md:items-center md:justify-center"
// Panel
className="flex flex-col bg-surface-muted w-full max-h-[95dvh]
           rounded-t-2xl md:rounded-2xl md:w-[90vw] md:max-w-2xl
           shadow-2xl overflow-hidden"
```

---

## Íconos

Biblioteca: **[Lucide React](https://lucide.dev/)** — tamaños estándar:

| Contexto              | Tamaño |
|-----------------------|--------|
| Nav / header          | `16`   |
| Botones inline        | `16–18`|
| Cards / listas        | `18–20`|
| Estados vacíos / hero | `36–48`|
| Nodos del mapa SVG    | `18–22`|

---

## Bordes y sombras

| Concepto              | Clase                                  |
|-----------------------|----------------------------------------|
| Borde estándar        | `border border-mid/20`                 |
| Borde hover           | `hover:border-secondary/40`            |
| Sombra card           | `shadow-sm`                            |
| Sombra card hover     | `hover:shadow-md hover:shadow-primary/10` |
| Sombra botón flotante | `shadow-lg shadow-primary/25`          |
| Backdrop blur         | `bg-surface/90 backdrop-blur-md`       |

---

## Animaciones

| Nombre                | Clase / CSS                                  | Uso                          |
|-----------------------|----------------------------------------------|------------------------------|
| Escala al tap         | `active:scale-95` / `active:scale-[0.98]`    | Botones, cards               |
| Transición general    | `transition-all duration-200`                | Hover states                 |
| Progreso suave        | `transition-all duration-700 ease-out`       | Barras de progreso           |
| Anillo circular       | `transition-all duration-700`                | Progress rings (SVG)         |
| Barras de música      | `@keyframes musicBar` (scaleY 0.3 → 1)      | MusicPlayer                  |
| Pulso punto activo    | `animate-pulse`                              | Indicador música activa      |

---

## Responsive breakpoints

Tailwind v4 usa los breakpoints estándar:

| Breakpoint | Prefijo | Ancho mínimo |
|------------|---------|--------------|
| Mobile     | (base)  | 0px          |
| Tablet     | `md:`   | 768px        |
| Desktop    | `lg:`   | 1024px       |

### Patrones responsive frecuentes

```tsx
// Texto
"text-sm md:text-base"
"text-xl md:text-2xl"

// Grid de cursos
"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"

// Layout
"px-4 md:px-8" / "py-6 md:py-8"

// Nav: bottom mobile / top desktop
"hidden md:flex"   // desktop only
"fixed md:hidden"  // mobile only
```

---

## Archivos clave

| Archivo                                      | Rol                                          |
|----------------------------------------------|----------------------------------------------|
| `src/styles/globals.css`                     | Tokens `@theme {}`, reset CSS, utilidades    |
| `src/presentation/design-system/tokens/colors.ts` | Colores como constantes TypeScript      |
| `src/presentation/components/PlayandLearnLogo.tsx` | Logo SVG reutilizable (variantes)       |
| `tailwind.config` (inline en globals.css)    | Configuración Tailwind v4 CSS-first          |
