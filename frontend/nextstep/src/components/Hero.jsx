import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import heroImage from '../assets/hero.png'

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative w-full -mt-6 md:-mt-10 " >
        <img
          src={heroImage}
          alt="NextStep AI"
          className="w-full h-auto select-none pointer-events-none"
          draggable="false"
        />

        
        <div className="absolute left-1/2 top-[68%] -translate-x-1/2 flex flex-col items-center">
          <Link
            to="/career-planner"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple to-blue px-6 md:px-7 py-2.5 md:py-3 text-xs md:text-sm font-medium text-white shadow-[0_0_25px_-5px_rgba(139,92,246,0.7)] hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.9)] hover:scale-[1.03] transition-all"
          >
            Start Chat
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="mt-2.5 text-[10px] md:text-xs text-text-muted/80">
            Your AI Career Coach. Always with you.
          </p>
        </div>
      </div>
    </section>
  )
}