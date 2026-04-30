import { Outlet } from 'react-router-dom'
import { StudentHeader } from './StudentHeader'
import { StudentBottomNav } from './StudentBottomNav'
import { MusicPlayer } from './MusicPlayer'

export function StudentLayout() {
  return (
    <div className="min-h-screen bg-surface-muted">
      <StudentHeader />
      <main className="pt-14 md:pt-16 pb-20 md:pb-0">
        <Outlet />
      </main>
      <StudentBottomNav />
      <MusicPlayer />
    </div>
  )
}
