import { Link } from 'react-router-dom'
import { FileText, BarChart3, Route, BookOpen, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: FileText,
    title: 'Resume Analysis',
    description: 'Get AI-powered feedback and insights to improve your resume.',
    path: '/resume',
  },
  {
    icon: BarChart3,
    title: 'Skill Gap Analysis',
    description: "Understand what skills you're missing and what to learn next.",
    path: '/roadmap',
  },
  {
    icon: Route,
    title: 'Career Roadmap',
    description: 'Get a personalized roadmap based on your career goals.',
    path: '/roadmap',
  },
  {
    icon: BookOpen,
    title: 'Learning Resources',
    description: 'Discover useful courses, documentation, projects and resources.',
    path: '/learning-resource',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Understand current career trends, skills and opportunities.',
    path: '/roadmap',
  },
  {
    icon: MessageCircle,
    title: 'AI Career Coach',
    description: 'Chat with your AI career companion for personalized guidance.',
    path: '/career-planner',
  },
]

export default function Services() {
  return (
    <section className="relative px-6 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {services.map(({ icon: Icon, title, description, path }) => (
          <Link
            key={title}
            to={path}
            className="group relative rounded-2xl border border-white/8 bg-navy/40 p-6 hover:border-purple/40 hover:bg-navy/70 transition-all duration-300"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple/20 to-blue/20 border border-purple/20">
              <Icon size={20} className="text-purple" />
            </div>

            <h3 className="mt-5 text-base font-medium text-text-primary">
              {title}
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              {description}
            </p>

            <div className="mt-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-text-muted group-hover:border-purple/50 group-hover:text-purple group-hover:translate-x-1 transition-all">
              <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}