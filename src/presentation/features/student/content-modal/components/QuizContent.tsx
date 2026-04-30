import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import type { QuizContentData } from '@domain/shared/interfaces/ICourseContent'

interface QuizContentProps {
  data: QuizContentData
  onComplete: () => void
}

export function QuizContent({ data, onComplete }: QuizContentProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = data.questions.every(q => answers[q.id])

  const handleSelect = (questionId: string, optionId: string) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    onComplete()
  }

  const correct = submitted
    ? data.questions.filter(
        q => q.correctOptionId && answers[q.id] === q.correctOptionId
      ).length
    : 0

  return (
    <div className="space-y-6">
      {submitted && (
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 text-center">
          <p className="text-sm font-semibold text-primary">
            {correct}/{data.questions.length} correctas
          </p>
          <p className="text-xs text-secondary mt-0.5">
            {correct === data.questions.length
              ? '¡Perfecto! Todas correctas'
              : 'Revisa las respuestas marcadas en rojo'}
          </p>
        </div>
      )}

      {data.questions.map((q, qi) => {
        const chosen = answers[q.id]
        const isCorrect = submitted && chosen === q.correctOptionId
        const isWrong = submitted && chosen && chosen !== q.correctOptionId

        return (
          <div key={q.id} className="space-y-2">
            <p className="text-sm font-semibold text-primary">
              {qi + 1}. {q.text}
            </p>

            <div className="space-y-2">
              {q.options.map(opt => {
                const isChosen = chosen === opt.id
                const showCorrect = submitted && opt.id === q.correctOptionId
                const showWrong = submitted && isChosen && !showCorrect

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(q.id, opt.id)}
                    disabled={submitted}
                    className={[
                      'w-full min-h-[52px] px-4 py-3 rounded-xl text-left text-sm',
                      'border-2 transition-all duration-150',
                      'flex items-center justify-between gap-2',
                      !submitted && isChosen
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : !submitted
                        ? 'border-mid/30 bg-surface text-neutral hover:border-primary/50 active:scale-[0.99]'
                        : showCorrect
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : showWrong
                        ? 'border-red-400 bg-red-50 text-red-800'
                        : 'border-mid/20 bg-surface text-secondary opacity-60',
                    ].join(' ')}
                    aria-pressed={isChosen}
                  >
                    <span>{opt.text}</span>
                    {showCorrect && <CheckCircle size={18} className="text-green-500 shrink-0" />}
                    {showWrong && <XCircle size={18} className="text-red-400 shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full min-h-[48px] rounded-xl font-semibold text-sm
                     bg-primary text-tertiary
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-secondary active:scale-95 transition-all"
        >
          Enviar respuestas
        </button>
      )}
    </div>
  )
}
