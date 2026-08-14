import { Link } from 'react-router-dom'
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'

const socials = [
  { icon: FaLinkedin, url: 'www.linkedin.com/in/shrutisharma812', label: 'LinkedIn' },
  { icon: FaInstagram, url: 'https://www.instagram.com/s.shruttiii/', label: 'Instagram' },
  { icon: FaGithub, url: 'https://github.com/shrutisharma-sh', label: 'GitHub' },
]

const links = [
  { label: 'About', path: '/about' },
  { label: 'Privacy', path: '/privacy' },
  { label: 'Terms', path: '/terms' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative">
      
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple/40 to-transparent" />

      
      <span className="absolute -top-1 right-6 md:right-10 font-script text-lg text-purple/80 -rotate-3 select-none hidden sm:block">
        Take the next step.
      </span>

      <div className="px-6 md:px-10 py-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left">
        
        <div>
          <span className="font-display text-lg font-bold">
            <span className="text-white">NEXT</span>
            <span className="text-purple">STEP</span>
          </span>
          <p className="mt-1 text-xs text-text-muted">
            Better Skills. A Brighter Tomorrow.
          </p>
        </div>

        
        <nav className="flex items-center gap-3 text-sm text-text-muted">
          {links.map(({ label, path }, i) => (
            <span key={label} className="flex items-center gap-3">
              <Link to={path} className="hover:text-white transition-colors">
                {label}
              </Link>
              {i < links.length - 1 && <span className="text-white/15">|</span>}
            </span>
          ))}
        </nav>

        
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, url, label }) => (
               <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-muted hover:text-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <p className="text-xs text-text-muted/70">
            © 2026 NextStep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}