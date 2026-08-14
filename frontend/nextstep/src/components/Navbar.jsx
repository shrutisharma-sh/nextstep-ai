import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, ChevronDown, FileText, Route, BarChart3, BookOpen, TrendingUp, MessageCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const services = [
  { name: 'Resume Analysis', path: '/resume', icon: FileText },
  { name: 'Career Roadmap', path: '/roadmap', icon: Route },
  { name: 'Skill Gap Analysis', path: '/roadmap', icon: BarChart3 },
  { name: 'Learning Resources', path: '/learning-resource', icon: BookOpen },
  { name: 'AI Career Coach', path: '/career-planner', icon: MessageCircle },
]

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
     
     {/* avatar */}
      <Link
        to={isLoggedIn ? '/dashboard' : '/login'}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-text-muted hover:border-purple/60 hover:text-white transition-colors"
      >
        {isLoggedIn ? (
          <span className="text-xs font-semibold font-display">
            {user?.firstName?.[0]?.toUpperCase() || 'U'}
          </span>
        ) : (
          <User size={16} />
        )}
      </Link>

      {/* lists */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        {isLoggedIn && (
          <Link to="/dashboard" className="text-sm text-text-primary/90 hover:text-white transition-colors">
            Dashboard
          </Link>
        )}

        <div
          className="relative"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button className="flex items-center gap-1 text-sm text-text-primary/90 hover:text-white transition-colors">
            Services
            <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
          </button>

          {servicesOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56">
              <div className="rounded-xl border border-purple/20 bg-navy/95 backdrop-blur-xl shadow-[0_0_30px_-10px_rgba(139,92,246,0.4)] p-2">
                {services.map(({ name, path, icon: Icon }) => (
                  <Link
                    key={name}
                    to={path}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-muted hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Icon size={16} className="text-purple" />
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-sm text-text-primary/90 hover:text-white transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link to="/signup" className="text-sm text-text-primary/90 hover:text-white transition-colors">
            Register
          </Link>
        )}
      </div>

      {/* logo Ss */}
      <Link to="/" className="font-display text-lg font-semibold tracking-wide bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent">
        NS
      </Link>
    </nav>
  )
}