import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import TrustSection from '../components/TrustSection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <TrustSection />
      <Footer />
    </main>
  )
}