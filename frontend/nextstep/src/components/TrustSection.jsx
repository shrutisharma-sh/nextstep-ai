import { Zap, Lock, Star } from 'lucide-react'

const values = [
  {
    icon: Zap,
    title: 'AI-Powered',
    description: 'Smart. Fast. Always learning.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data. Your control.',
  },
  {
    icon: Star,
    title: 'Built for You',
    description: 'Real people. Real career growth.',
  },
]

export default function TrustSection() {
  return (
    <section className="relative px-6 pb-24 md:pb-32 -mt-8 md:-mt-15">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/8 bg-navy/40 px-6 md:px-10 py-8 md:py-10 grid grid-cols-1 md:grid-cols-3 divide-y divide-white/8 md:divide-y-0 md:divide-x">
        {values.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-center justify-center gap-4 py-6 md:py-0 md:px-8"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple/20 to-blue/20 border border-purple/20">
              <Icon size={18} className="text-purple" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-text-primary">{title}</h3>
              <p className="text-sm text-text-muted mt-0.5">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}