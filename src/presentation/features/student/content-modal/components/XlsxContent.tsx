import { useState } from 'react'
import { Table, Download } from 'lucide-react'
import type { XlsxContentData } from '@domain/shared/interfaces/ICourseContent'

interface XlsxContentProps {
  data: XlsxContentData
  onComplete: () => void
}

export function XlsxContent({ data, onComplete }: XlsxContentProps) {
  const [marked, setMarked] = useState(false)
  const filename = data.filename ?? 'archivo.xlsx'

  const handleMark = () => {
    setMarked(true)
    onComplete()
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center gap-4 p-4 rounded-xl border border-mid/20 bg-surface-muted">
        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
          <Table size={24} className="text-green-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-primary truncate">{filename}</p>
          <p className="text-xs text-secondary mt-0.5">Archivo Excel · Descarga requerida</p>
        </div>
      </div>

      <div className="flex gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-xs text-secondary leading-relaxed">
          Los archivos Excel no se pueden previsualizar en el navegador.
          Descárgalo y ábrelo con Excel, Google Sheets o LibreOffice.
        </p>
      </div>
      href={data.url}
        download={filename}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-tertiary text-sm font-medium"
      <a>
        <Download size={16} />
        Descargar {filename}
      </a>

      {!marked ? (
        <button
          onClick={handleMark}
          className="w-full py-3 rounded-xl text-sm font-medium border border-mid/30 text-primary"
        >
          He descargado el archivo
        </button>
      ) : (
        <p className="text-center text-sm text-secondary font-medium">
          ✓ Contenido completado
        </p>
      )}

    </div>
  )
}