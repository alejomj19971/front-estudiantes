import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudentProgressStore } from '@presentation/stores/studentProgressStore'
import { StudentStatsBar } from './components/StudentStatsBar'
import { CourseSearchBar } from './components/CourseSearchBar'
import { RecentCoursesBanner } from './components/RecentCoursesBanner'
import { CourseCard } from './components/CourseCard'
import { EmptyCoursesState, DEMO_COURSES } from './components/EmptyCoursesState'
import type { StudentStats } from '@domain/student/types'

const STUDENT_NAME = 'Ana'

function computeStats(courses: typeof DEMO_COURSES): StudentStats {
  const active     = courses.filter(c => c.progress > 0 && c.progress < 100).length
  const completed  = courses.filter(c => c.progress === 100).length
  const avg        = courses.length
    ? Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length)
    : 0
  return {
    activeCourses:    active,
    completedCourses: completed,
    totalCourses:     courses.length,
    avgProgress:      avg,
    streak:           7,
  }
}

export function StudentDashboardPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery]   = useState('')

  const enrolledCourses    = useStudentProgressStore(s => s.enrolledCourses)
  const progressMap        = useStudentProgressStore(s => s.progress)
  const enrollCourses      = useStudentProgressStore(s => s.enrollCourses)
  const getRecentCourseIds = useStudentProgressStore(s => s.getRecentCourseIds)

  // Hay cursos si: el usuario se matriculó explícitamente
  // O ya tiene progreso registrado de una sesión anterior
  const hasEnrolled = enrolledCourses.length > 0 || Object.keys(progressMap).length > 0

  // Si tiene progreso pero perdió la lista de cursos (ej: localStorage parcial),
  // reponemos los cursos demo para que pueda seguir donde los dejó
  const courses = enrolledCourses.length > 0
    ? enrolledCourses
    : hasEnrolled
      ? DEMO_COURSES
      : []

  const recentIds = getRecentCourseIds(2)
  const recentCourses = useMemo(() => {
    if (recentIds.length > 0) {
      return recentIds
        .map(id => courses.find(c => c.id === id))
        .filter((c): c is typeof DEMO_COURSES[0] => c !== undefined)
    }
    // Si no hay historial, mostrar los 2 con mayor progreso
    return [...courses]
      .filter(c => c.progress > 0)
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 2)
  }, [recentIds, courses])

  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses
    const q = searchQuery.toLowerCase()
    return courses.filter(c => c.title.toLowerCase().includes(q))
  }, [searchQuery, courses])

  const stats = useMemo(() => computeStats(courses), [courses])

  const handleSearch  = useCallback((q: string) => setSearchQuery(q), [])
  const handleEnroll  = () => enrollCourses(DEMO_COURSES)

  const hour    = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  /* ── Estado vacío ─────────────────────────────────────────────────────── */
  if (!hasEnrolled) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-8">
        {/* Saludo aunque no haya cursos */}
        <div className="mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            {greeting}, {STUDENT_NAME} 👋
          </h1>
        </div>
        <EmptyCoursesState onEnroll={handleEnroll} />
      </div>
    )
  }

  /* ── Con cursos matriculados ──────────────────────────────────────────── */
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-8 space-y-6 md:space-y-8">

      {/* Bienvenida */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            {greeting}, {STUDENT_NAME} 👋
          </h1>
          <p className="text-sm md:text-base text-secondary mt-0.5">
            {stats.activeCourses > 0
              ? `Tienes ${stats.activeCourses} curso${stats.activeCourses > 1 ? 's' : ''} en progreso. ¡Sigue así!`
              : 'Explora tus cursos y empieza a aprender.'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <StudentStatsBar stats={stats} />

      {/* Buscador */}
      <CourseSearchBar onSearch={handleSearch} />

      {/* Cursos recientes — solo si no hay búsqueda activa */}
      {!searchQuery && recentCourses.length > 0 && (
        <RecentCoursesBanner courses={recentCourses} />
      )}

      {/* Grid de cursos */}
      <section aria-labelledby="courses-heading">
        <h2
          id="courses-heading"
          className="text-base md:text-lg font-bold text-primary mb-4"
        >
          {searchQuery
            ? `Resultados para "${searchQuery}" (${filteredCourses.length})`
            : 'Mis cursos'}
        </h2>

        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-2 text-center">
            <p className="text-base font-semibold text-primary">Sin resultados</p>
            <p className="text-sm text-secondary">
              No encontramos cursos con "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => navigate(`/student/courses/${course.id}`)}
                onCertificate={() => navigate('/student/grades')}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
