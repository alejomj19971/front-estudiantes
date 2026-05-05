import { useEffect, lazy, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowRight, ArrowLeft } from 'lucide-react'
import { useStudentProgressStore } from '@presentation/stores/studentProgressStore'
import { ContentLoader } from './components/ContentLoader'
import type { AnyContentData } from '@domain/shared/interfaces/ICourseContent'

const VideoContent = lazy(() =>
  import('./components/VideoContent').then(m => ({ default: m.VideoContent }))
)
const ImageContent = lazy(() =>
  import('./components/ImageContent').then(m => ({ default: m.ImageContent }))
)
const TextContent = lazy(() =>
  import('./components/TextContent').then(m => ({ default: m.TextContent }))
)
const QuizContent = lazy(() =>
  import('./components/QuizContent').then(m => ({ default: m.QuizContent }))
)

interface ContentModalProps {
  content: AnyContentData
  courseId: string
  currentStep: number
  totalSteps: number
  moduleName: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

export function ContentModal({
  content,
  courseId,
  currentStep,
  totalSteps,
  moduleName,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}: ContentModalProps) {
  const markContentComplete = useStudentProgressStore(s => s.markContentComplete)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleComplete = () => markContentComplete(courseId, content.id)

  const renderContent = () => {
    switch (content.type) {
      case 'video': return <VideoContent data={content} onComplete={handleComplete} />
      case 'image': return <ImageContent data={content} onComplete={handleComplete} />
      case 'text':  return <TextContent  data={content} onComplete={handleComplete} />
      case 'quiz':  return <QuizContent  data={content} onComplete={handleComplete} />
    }
  }

  const progressPct = (currentStep / totalSteps) * 100

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-neutral/70 backdrop-blur-sm
                 flex items-end md:items-center md:justify-center p-0 md:p-8"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-surface w-full h-[92dvh] rounded-t-3xl overflow-hidden flex flex-col
                   md:rounded-3xl md:h-auto md:max-h-[88vh] md:w-full md:max-w-3xl
                   shadow-2xl"
      >
        {/* ── §8.1 Barra de progreso ───────────────────────────── */}
        <div className="flex items-center gap-4 px-6 pt-6 pb-4 shrink-0">
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full
                       bg-surface-muted text-secondary hover:bg-mid/20
                       transition-colors shrink-0"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>

          <div className="flex-1 h-2.5 rounded-full bg-mid/25 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <span className="text-sm font-semibold text-secondary shrink-0">
            {currentStep}/{totalSteps}
          </span>
        </div>

        {/* ── §8.2 Etiqueta de módulo ──────────────────────────── */}
        {moduleName && (
          <p className="px-6 text-xs font-bold text-secondary uppercase tracking-widest">
            {moduleName}
          </p>
        )}

        {/* ── §8.3 Título del contenido ───────────────────────── */}
        <h2
          id="modal-title"
          className="px-6 mt-2 text-2xl md:text-3xl font-extrabold text-primary leading-snug"
        >
          {content.title}
        </h2>

        {/* ── Área de contenido scrollable ────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 pb-2 mt-4">
          <Suspense fallback={<ContentLoader />}>
            {renderContent()}
          </Suspense>
        </div>

        {/* ── §8.5 Footer de acción ───────────────────────────── */}
        <div
          className="flex items-center justify-between px-6 pt-5 pb-6
                     border-t border-mid/15 shrink-0"
        >
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex items-center gap-1.5 text-sm font-medium text-secondary
                       hover:text-primary transition-colors
                       disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={14} />
            Anterior
          </button>

          <button
            onClick={() => { handleComplete(); onClose() }}
            className="flex items-center gap-2 min-h-[48px] px-7 rounded-2xl
                       bg-primary text-white font-semibold text-sm
                       hover:bg-secondary active:scale-95 transition-all duration-200"
          >
            {content.type === 'quiz' ? 'Verificar y continuar' : 'Completar'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
