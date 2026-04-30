import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Award, Bell } from 'lucide-react'
import { PlayandLearnLogo } from '@presentation/components/PlayandLearnLogo'

const NAV_ITEMS = [
  { to: '/student/dashboard', label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/student/grades',    label: 'Certificados', icon: Award },
]

const MOCK_STUDENT = {
  name: 'Ana García',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ana',
}

export function StudentHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 h-14 md:h-16',
        'bg-primary text-tertiary',
        'flex items-center justify-between px-4 md:px-8',
        'transition-shadow duration-200',
        scrolled ? 'shadow-lg' : '',
      ].join(' ')}
    >
      {/* Logo */}
      <PlayandLearnLogo size={34} theme="light" />

      {/* Nav desktop — oculto en mobile */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium',
                'transition-colors duration-150',
                isActive
                  ? 'bg-tertiary/20 text-tertiary border-b-2 border-tertiary'
                  : 'text-mid hover:text-tertiary hover:bg-white/10',
              ].join(' ')
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Lado derecho: notificaciones + avatar */}
      <div className="flex items-center gap-3">
        <button
          className="min-w-[44px] min-h-[44px] flex items-center justify-center
                     rounded-full hover:bg-white/10 transition-colors"
          aria-label="Notificaciones"
        >
          <Bell size={20} className="text-mid" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer group">
          <img
            src={MOCK_STUDENT.avatar}
            alt={`Avatar de ${MOCK_STUDENT.name}`}
            className="w-8 h-8 rounded-full object-cover border-2 border-mid
                       group-hover:border-tertiary transition-colors"
          />
          <span className="hidden md:block text-sm font-medium text-tertiary">
            {MOCK_STUDENT.name}
          </span>
        </div>
      </div>
    </header>
  )
}
