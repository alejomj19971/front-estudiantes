import { Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { studentRoutes } from './studentRoutes'

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted">
      <div className="w-8 h-8 border-4 border-primary border-t-tertiary rounded-full animate-spin" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/student/dashboard" replace />,
  },
  {
    ...studentRoutes,
    element: (
      <Suspense fallback={<PageLoader />}>
        {studentRoutes.element}
      </Suspense>
    ),
  },
])
