import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useStudentProgressStore } from '@presentation/stores/studentProgressStore'
import { CourseMapCanvas } from './components/CourseMapCanvas'
import { ContentModal } from '../content-modal/ContentModal'
import type { Course, AnyContentData } from '@domain/shared/interfaces/ICourseContent'

/* ── Mock data del curso (reemplazar con TanStack Query) ──────────────── */
const MOCK_COURSE: Course = {
  id: '1',
  title: 'Introducción a la Programación con Python',
  thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80',
  modules: [
    {
      id: 'm1',
      title: 'Módulo 1: Fundamentos',
      order: 1,
      contents: [
        { id: 'c1', title: '¿Qué es Python?', order: 1, type: 'video' },
        { id: 'c2', title: 'Instalación y entorno', order: 2, type: 'text' },
        { id: 'c3', title: 'Tu primer programa', order: 3, type: 'video' },
        { id: 'c4', title: 'Variables y tipos', order: 4, type: 'text' },
        { id: 'c5', title: 'Quiz: Fundamentos', order: 5, type: 'quiz' },
      ],
    },
    {
      id: 'm2',
      title: 'Módulo 2: Control de Flujo',
      order: 2,
      contents: [
        { id: 'c6', title: 'Condicionales if/else', order: 1, type: 'video' },
        { id: 'c7', title: 'Bucles for y while', order: 2, type: 'video' },
        { id: 'c8', title: 'Funciones básicas', order: 3, type: 'text' },
        { id: 'c9', title: 'Quiz: Control de flujo', order: 4, type: 'quiz' },
      ],
    },
    {
      id: 'm3',
      title: 'Módulo 3: Estructuras de Datos',
      order: 3,
      contents: [
        { id: 'c10', title: 'Listas y tuplas', order: 1, type: 'video' },
        { id: 'c11', title: 'Diccionarios', order: 2, type: 'text' },
        { id: 'c12', title: 'Conjuntos', order: 3, type: 'image' },
        { id: 'c13', title: 'Quiz: Estructuras', order: 4, type: 'quiz' },
      ],
    },
  ],
}

/* Mock de detalle de contenidos por ID */
const MOCK_CONTENT_DETAIL: Record<string, AnyContentData> = {
  c1: {
    id: 'c1', title: '¿Qué es Python?', type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: 120,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
  },
  c2: {
    id: 'c2', title: 'Instalación y entorno', type: 'text',
    body: `<h3>Instalación de Python</h3>
      <p>Para instalar Python, visita <strong>python.org</strong> y descarga la versión más reciente.</p>
      <p>Python es un lenguaje de programación de alto nivel, interpretado y de propósito general. Su filosofía de diseño hace hincapié en la legibilidad del código y su sintaxis permite a los programadores expresar conceptos en menos líneas de código que en lenguajes como C++ o Java.</p>
      <h4>Pasos de instalación</h4>
      <ol>
        <li>Descarga el instalador desde python.org</li>
        <li>Ejecuta el instalador y marca "Add Python to PATH"</li>
        <li>Verifica la instalación con <code>python --version</code></li>
        <li>Instala un editor como VS Code para una mejor experiencia</li>
      </ol>
      <p>Una vez instalado Python y tu editor preferido, estás listo para comenzar a programar. En la próxima lección veremos cómo escribir tu primer programa.</p>`,
  },
  c3: {
    id: 'c3', title: 'Tu primer programa', type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: 90,
  },
  c4: {
    id: 'c4', title: 'Variables y tipos', type: 'text',
    body: `<h3>Variables en Python</h3>
      <p>En Python, las variables se crean al asignarles un valor. No necesitas declarar el tipo explícitamente.</p>
      <pre><code>nombre = "Ana"\nedad = 25\naltura = 1.65\nes_estudiante = True</code></pre>
      <p>Python es un lenguaje de tipado dinámico, lo que significa que el tipo de una variable puede cambiar durante la ejecución del programa. Esto hace que Python sea muy flexible y fácil de usar para principiantes.</p>
      <p>Los tipos de datos básicos en Python incluyen: enteros (int), números de punto flotante (float), cadenas de texto (str) y booleanos (bool).</p>`,
  },
  c5: {
    id: 'c5', title: 'Quiz: Fundamentos', type: 'quiz',
    questions: [
      {
        id: 'q1',
        text: '¿Qué símbolo se usa para asignar un valor a una variable en Python?',
        options: [
          { id: 'o1', text: '==' },
          { id: 'o2', text: '=' },
          { id: 'o3', text: ':=' },
          { id: 'o4', text: '->' },
        ],
        correctOptionId: 'o2',
      },
      {
        id: 'q2',
        text: '¿Cuál de los siguientes es un tipo de dato en Python?',
        options: [
          { id: 'o5', text: 'integer' },
          { id: 'o6', text: 'int' },
          { id: 'o7', text: 'number' },
          { id: 'o8', text: 'num' },
        ],
        correctOptionId: 'o6',
      },
      {
        id: 'q3',
        text: '¿Cómo se imprime "Hola mundo" en Python?',
        options: [
          { id: 'o9', text: 'echo("Hola mundo")' },
          { id: 'o10', text: 'console.log("Hola mundo")' },
          { id: 'o11', text: 'print("Hola mundo")' },
          { id: 'o12', text: 'printf("Hola mundo")' },
        ],
        correctOptionId: 'o11',
      },
    ],
  },
  c12: {
    id: 'c12', title: 'Conjuntos', type: 'image',
    url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
    alt: 'Diagrama de conjuntos en Python',
    caption: 'Representación visual de conjuntos y sus operaciones en Python',
  },
}

function getDefaultContent(contentId: string): AnyContentData {
  return MOCK_CONTENT_DETAIL[contentId] ?? {
    id: contentId,
    title: 'Contenido no disponible',
    type: 'text',
    body: '<p>Este contenido aún no tiene datos de ejemplo. Aquí aparecería el contenido real de la API.</p>',
  }
}
/* ──────────────────────────────────────────────────────────────────────── */

export function CourseMapPage() {
  const { courseId = '1' } = useParams()
  const navigate = useNavigate()
  const progress = useStudentProgressStore(s => s.getProgress(courseId))

  const [activeContent, setActiveContent] = useState<AnyContentData | null>(null)
  const [activeModuleId, setActiveModuleId] = useState<string>('')

  const completedIds = progress?.completedContents ?? []

  /* Lista plana de todos los contenidos para navegación anterior/siguiente */
  const allContents = MOCK_COURSE.modules.flatMap(m => m.contents)
  const activeIdx = activeContent ? allContents.findIndex(c => c.id === activeContent.id) : -1

  const openContent = (contentId: string, moduleId: string) => {
    const detail = getDefaultContent(contentId)
    setActiveContent(detail)
    setActiveModuleId(moduleId)
    useStudentProgressStore.getState().updateLastAccessed(courseId)
  }

  const goNext = () => {
    if (activeIdx < allContents.length - 1) {
      const next = allContents[activeIdx + 1]
      openContent(next.id, activeModuleId)
    }
  }

  const goPrev = () => {
    if (activeIdx > 0) {
      const prev = allContents[activeIdx - 1]
      openContent(prev.id, activeModuleId)
    }
  }

  const totalContents = allContents.length
  const completedCount = completedIds.filter(id => allContents.some(c => c.id === id)).length
  const globalProgress = totalContents > 0
    ? Math.round((completedCount / totalContents) * 100)
    : 0

  // Primer contenido disponible (no completado) en el primer módulo accesible
  const currentContentId = useMemo(() => {
    for (let mi = 0; mi < MOCK_COURSE.modules.length; mi++) {
      const mod = MOCK_COURSE.modules[mi]
      if (mi > 0) {
        const prevMod = MOCK_COURSE.modules[mi - 1]
        if (prevMod.contents.some(c => !completedIds.includes(c.id))) break
      }
      for (const content of mod.contents) {
        if (!completedIds.includes(content.id)) return content.id
      }
    }
    return allContents.at(-1)?.id ?? null
  }, [completedIds, allContents])

  const CIRCUMFERENCE = 2 * Math.PI * 18

  return (
    <div className="max-w-2xl mx-auto px-0 md:px-4">

      {/* Controles flotantes sticky — superpuestos al mapa */}
      <div
        className="sticky top-14 md:top-16 z-40 flex items-center gap-2
                   px-3 md:px-1 pt-3 pb-1 pointer-events-none"
      >
        {/* Botón volver */}
        <button
          onClick={() => navigate('/student/dashboard')}
          className="pointer-events-auto flex items-center gap-1.5 shrink-0
                     min-h-[44px] pl-2.5 pr-4
                     bg-surface/90 backdrop-blur-md rounded-full
                     shadow-md shadow-primary/10 border border-mid/20
                     text-primary hover:bg-primary hover:text-tertiary
                     transition-all duration-200 font-semibold text-sm"
          aria-label="Volver al dashboard"
        >
          <ArrowLeft size={18} />
          Volver
        </button>

        {/* Título del curso */}
        <div className="flex-1 min-w-0 flex justify-center">
          <span
            className="pointer-events-auto px-3 py-1.5
                       bg-surface/90 backdrop-blur-md rounded-full
                       shadow-sm border border-mid/20
                       text-xs font-semibold text-primary truncate max-w-[200px] md:max-w-xs"
          >
            {MOCK_COURSE.title}
          </span>
        </div>

        {/* Progreso circular */}
        <div
          className="pointer-events-auto relative flex items-center justify-center
                     w-[52px] h-[52px]"
          title={`${globalProgress}% completado`}
        >
          <svg width="52" height="52" className="absolute inset-0 -rotate-90">
            <circle
              cx="26" cy="26" r="18"
              fill="none"
              stroke="var(--color-mid, #84B9BF)"
              strokeOpacity="0.25"
              strokeWidth="4"
            />
            <circle
              cx="26" cy="26" r="18"
              fill="none"
              stroke="var(--color-primary, #223740)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(globalProgress / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              className="transition-all duration-700"
            />
          </svg>
          <div
            className="relative z-10 w-9 h-9 rounded-full
                       bg-surface/90 backdrop-blur-md
                       shadow-sm border border-mid/20
                       flex items-center justify-center"
          >
            <span className="text-[10px] font-bold text-primary leading-none">
              {globalProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* Mapa SVG — empieza desde el tope, los controles flotan encima */}
      <div className="px-3 md:px-0 -mt-[60px] pt-3">
        <CourseMapCanvas
          modules={MOCK_COURSE.modules}
          completedContentIds={completedIds}
          currentContentId={currentContentId}
          onNodeClick={openContent}
        />
      </div>

      {/* Modal de contenido */}
      {activeContent && (
        <ContentModal
          content={activeContent}
          courseId={courseId}
          onClose={() => setActiveContent(null)}
          onPrev={goNext}
          onNext={goPrev}
          hasPrev={activeIdx > 0}
          hasNext={activeIdx < allContents.length - 1}
        />
      )}
    </div>
  )
}
