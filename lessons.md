# PlayandLearn — Bug Tracker

Registro de bugs encontrados durante el desarrollo. Cada entrada incluye descripción, causa raíz y estado.

---

## Estado de bugs

| Símbolo | Estado      |
|---------|-------------|
| 🔴      | Abierto     |
| 🟡      | En progreso |
| 🟢      | Resuelto    |

---

## Bugs

| # | Estado | Descripción | Causa raíz | Solución | Archivo(s) |
|---|--------|-------------|------------|----------|------------|
| 1 | 🟢 | Estado vacío aparecía aunque el estudiante tuviera cursos en progreso | `hasEnrolled` solo chequeaba `enrolledCourses.length > 0`, ignorando el mapa de progreso en localStorage | Se agregó `\|\| Object.keys(progressMap).length > 0` | `StudentDashboardPage.tsx` |
| 2 | 🟢 | Header del mapa de curso muy pegado al primer módulo | `globalY` inicial demasiado bajo y padding insuficiente en el canvas | Se aumentó `globalY` a `NODE_RADIUS + 60` y se ajustó offset del separador a `-36` | `useCourseMap.ts`, `CourseMapCanvas.tsx` |
| 3 | 🟢 | Botones de cards no alineados verticalmente | El título del curso ocupaba 1 o 2 líneas, desplazando el botón | Se agregó `flex flex-col` + `mt-auto` al botón y `min-h` al título | `CourseCard.tsx` |
| 4 | 🟢 | Música lofi no sonaba con iframes de YouTube | Políticas de autoplay del navegador bloquean iframes ocultos | Se reemplazaron los iframes por HTML5 Audio con archivos MP3 estáticos locales | `MusicPlayer.tsx`, `public/music/` |
| 6 | 🟢 | Botones "Anterior" y "Siguiente" del modal de contenido funcionan al revés | `onPrev={goNext}` y `onNext={goPrev}` estaban intercambiados en CourseMapPage.tsx | Se corrigió a `onPrev={goPrev}` y `onNext={goNext}` | `CourseMapPage.tsx` |
| 5 | 🟢 | Card "Up Next" se ve extraña visualmente | Dos botones play redundantes + título truncando mal en tarjeta estrecha | Se eliminó el segundo play, se reorganizó en columna: label → thumbnail+info → botón "Play now" | `StudentDashboardPage.tsx` → `UpNextCard` |
| 7 | 🟢 | Difícil identificar en qué contenido va el estudiante en el mapa | El nodo `current` no tiene suficiente contraste visual; el borde coloreado no es evidente | `outline` del color del módulo en el círculo (`outlineOffset: 3px`) y `border: 3px solid` + doble `box-shadow` en la tarjeta | `CourseMapPage.tsx` |
| 8 | 🟢 | Maximum update depth exceeded — bucle infinito de renders en CourseMapPage | `completedIds = progress?.completedContents ?? []` crea un nuevo `[]` en cada render cuando `progress` es `null`. Esto hace que `contentStatuses` (useMemo con dep `[completedIds]`) se recalcule en cada render → `measure()` → `setCircles` → re-render → loop | Envolver `completedIds` en `useMemo`: `useMemo(() => progress?.completedContents ?? [], [progress])` para estabilizar la referencia | `CourseMapPage.tsx` |
| 9 | 🟢 | Al completar un contenido no se cerraba el modal, la línea no se animaba y no hacía scroll al siguiente nodo | Al integrar los componentes de Marco, `handleComplete` en `ContentModal` solo llamaba `markContentComplete` sin llamar `onClose()`. Sin el cierre del modal, el mapa no recibía el cambio de estado y no disparaba ni la animación de la línea ni el scroll al nodo `current` | Agregar `onClose()` dentro de `handleComplete` en `ContentModal.tsx` justo después de `markContentComplete` | `ContentModal.tsx` |

---

## Principios del proyecto

| Regla | Detalle |
|-------|---------|
| **Idioma** | Todo el texto visible al usuario debe estar en **español**. Nombres de variables y código en inglés. |
| **Mobile-first** | Se diseña primero para móvil. Las clases `md:` y `lg:` son mejoras progresivas. |
| **Design system** | Seguir siempre `STYLES.md`. No inventar colores ni tamaños fuera del sistema. |
| **Progresión secuencial** | No se puede acceder a un contenido si el anterior del mismo módulo no ha sido completado. El estudiante solo puede abrir el nodo marcado como `current`; los nodos `locked` no deben abrirse aunque se haga clic en ellos. |
| **Retorno al mapa al completar** | Al hacer clic en "Siguiente" dentro de un modal de contenido, se marca el contenido como completado y se cierra el modal, devolviendo al estudiante a la hoja de ruta (CourseMapPage). El estudiante verá la línea del mapa avanzar hasta el nuevo nodo `current`. No se navega automáticamente al siguiente contenido — el estudiante elige cuándo continuar desde el mapa. |
| **Línea coloreada hasta el punto actual** | Los segmentos SVG completados se pintan con el color del módulo correspondiente (sólido). Los segmentos pendientes son grises punteados. Esto permite ver de un vistazo hasta dónde se ha llegado en la hoja de ruta. |

---

## Cómo agregar un bug

Copiar esta plantilla y completar:

```
| N | 🔴 | Descripción corta del problema | Causa identificada o "Por investigar" | Solución aplicada o "Pendiente" | Archivo(s) afectado(s) |
```
