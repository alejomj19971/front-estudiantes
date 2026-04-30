import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { StudentLayout } from '@presentation/features/student/layout/StudentLayout'

const StudentDashboardPage = lazy(() =>
  import('@presentation/features/student/dashboard/StudentDashboardPage').then(m => ({
    default: m.StudentDashboardPage,
  }))
)

const CourseMapPage = lazy(() =>
  import('@presentation/features/student/course-map/CourseMapPage').then(m => ({
    default: m.CourseMapPage,
  }))
)

const StudentGradesPage = lazy(() =>
  import('@presentation/features/student/grades/StudentGradesPage').then(m => ({
    default: m.StudentGradesPage,
  }))
)

export const studentRoutes: RouteObject = {
  path: '/student',
  element: <StudentLayout />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: 'dashboard', element: <StudentDashboardPage /> },
    { path: 'courses/:courseId', element: <CourseMapPage /> },
    { path: 'grades', element: <StudentGradesPage /> },
  ],
}
