import { useState, useEffect } from 'react'

const headlines = [
  'Stop guessing. Start growing.',
  'Know where you are. Know where to go next.',
  "Your skills got you here. Let's get you further.",
  'Less confusion. More direction.',
  "Don't just learn. Level up.",
  "Your career shouldn't feel like a guessing game.",
]

export default function About() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % headlines.length)
        setVisible(true)
      }, 400)
    }, 3200)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative px-6 pt-4 pb-20 md:pt-6 md:pb-28 -mt-10 md:-mt-16 text-center overflow-hidden">
      
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple/10 blur-[120px] rounded-full -z-10" />

      <span className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-text-muted before:content-[''] before:w-4 before:h-px before:bg-text-muted/40 after:content-[''] after:w-4 after:h-px after:bg-text-muted/40">
        WHAT IS NEXTSTEP?
      </span>

      <div className="mt-6 h-24 md:h-20 flex items-center justify-center">
        <h2
          className={`font-display text-2xl sm:text-3xl md:text-4xl font-medium max-w-2xl mx-auto transition-all duration-400 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {headlines[index]}
        </h2>
      </div>

      <p className="mt-6 text-sm md:text-base text-text-muted max-w-xl mx-auto">
        NextStep is an AI-powered platform that helps you understand where you are,
        identify what you need to improve, and discover what to do next.
      </p>
    </section>
  )
}