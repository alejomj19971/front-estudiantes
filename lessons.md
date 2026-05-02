# PlayandLearn — Lessons

Archivo central donde se definen las lecciones, módulos y contenidos del curso demo.
Sirve como referencia para poblar el mock data del frontend hasta conectar la API real.

---

## Estructura de un curso

```
Curso
 └── Módulo (orden)
      └── Contenido (orden, tipo: video | text | image | quiz)
```

---

## Curso 1 — Introducción a la Programación con Python

**ID:** `1`
**Duración estimada:** 40 horas

### Módulo 1: Fundamentos
| # | ID  | Título                        | Tipo  |
|---|-----|-------------------------------|-------|
| 1 | c1  | ¿Qué es Python?               | video |
| 2 | c2  | Instalación y entorno         | text  |
| 3 | c3  | Tu primer programa            | video |
| 4 | c4  | Variables y tipos             | text  |
| 5 | c5  | Quiz: Fundamentos             | quiz  |

### Módulo 2: Control de Flujo
| # | ID  | Título                        | Tipo  |
|---|-----|-------------------------------|-------|
| 1 | c6  | Condicionales if/else         | video |
| 2 | c7  | Bucles for y while            | video |
| 3 | c8  | Funciones básicas             | text  |
| 4 | c9  | Quiz: Control de flujo        | quiz  |

### Módulo 3: Estructuras de Datos
| # | ID  | Título                        | Tipo  |
|---|-----|-------------------------------|-------|
| 1 | c10 | Listas y tuplas               | video |
| 2 | c11 | Diccionarios                  | text  |
| 3 | c12 | Conjuntos                     | image |
| 4 | c13 | Quiz: Estructuras             | quiz  |

---

## Curso 2 — Diseño UX/UI: Principios Fundamentales

**ID:** `2`
**Duración estimada:** 32 horas

### Módulo 1: Fundamentos del Diseño
| # | ID  | Título                        | Tipo  |
|---|-----|-------------------------------|-------|
| 1 | d1  | ¿Qué es UX y qué es UI?       | video |
| 2 | d2  | Principios de Gestalt         | text  |
| 3 | d3  | Tipografía y legibilidad      | image |
| 4 | d4  | Quiz: Fundamentos de diseño   | quiz  |

### Módulo 2: Diseño de Interfaces
| # | ID  | Título                        | Tipo  |
|---|-----|-------------------------------|-------|
| 1 | d5  | Sistemas de diseño            | video |
| 2 | d6  | Componentes y patrones        | text  |
| 3 | d7  | Color y contraste             | image |
| 4 | d8  | Quiz: Interfaces              | quiz  |

### Módulo 3: Prototipado
| # | ID  | Título                        | Tipo  |
|---|-----|-------------------------------|-------|
| 1 | d9  | Wireframes y flujos           | video |
| 2 | d10 | Figma básico                  | video |
| 3 | d11 | Test de usabilidad            | text  |
| 4 | d12 | Quiz: Prototipado             | quiz  |

---

## Curso 3 — Bases de Datos Relacionales con SQL

**ID:** `3`
**Duración estimada:** 48 horas

### Módulo 1: Introducción a SQL
| # | ID  | Título                        | Tipo  |
|---|-----|-------------------------------|-------|
| 1 | s1  | ¿Qué es una base de datos?    | video |
| 2 | s2  | Tablas, filas y columnas      | text  |
| 3 | s3  | SELECT básico                 | video |
| 4 | s4  | WHERE y filtros               | text  |
| 5 | s5  | Quiz: SQL básico              | quiz  |

### Módulo 2: Relaciones y Joins
| # | ID  | Título                        | Tipo  |
|---|-----|-------------------------------|-------|
| 1 | s6  | Claves primarias y foráneas   | video |
| 2 | s7  | INNER JOIN                    | text  |
| 3 | s8  | LEFT y RIGHT JOIN             | video |
| 4 | s9  | Quiz: Joins                   | quiz  |

### Módulo 3: Consultas Avanzadas
| # | ID  | Título                        | Tipo  |
|---|-----|-------------------------------|-------|
| 1 | s10 | GROUP BY y agregaciones       | video |
| 2 | s11 | Subconsultas                  | text  |
| 3 | s12 | Índices y rendimiento         | text  |
| 4 | s13 | Quiz: Consultas avanzadas     | quiz  |

---

## Tipos de contenido

| Tipo    | Componente          | Descripción                              |
|---------|---------------------|------------------------------------------|
| `video` | `VideoContent`      | Reproductor HTML5, URL directa o YouTube |
| `text`  | `TextContent`       | HTML enriquecido con `dangerouslySetInnerHTML` |
| `image` | `ImageContent`      | Imagen con alt text y caption opcional   |
| `quiz`  | `QuizContent`       | Preguntas de selección múltiple, una respuesta correcta |

---

## Reglas de desbloqueo

- El **primer contenido** de cualquier módulo desbloqueado siempre está disponible.
- Un contenido se desbloquea cuando el **anterior está completado**.
- Un **módulo se desbloquea** cuando todos los contenidos del módulo anterior están completados.
- El **primer módulo** siempre está desbloqueado.

---

## Notas para integración con API

Cuando se conecte el backend, reemplazar:
- `MOCK_COURSE` en `CourseMapPage.tsx` → `useQuery(getCourseById(courseId))`
- `DEMO_COURSES` en `EmptyCoursesState.tsx` → `useQuery(getEnrolledCourses())`
- `MOCK_CONTENT_DETAIL` en `CourseMapPage.tsx` → `useQuery(getContentById(contentId))`
