import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hls from 'hls.js'

gsap.registerPlugin(ScrollTrigger)

// ============ LOADING SCREEN ============
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const words = ['Design', 'Create', 'Inspire']
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const duration = 2700

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * 100))

      if (progress < 1) {
        requestAnimationFrame(updateProgress)
      } else {
        setTimeout(onComplete, 400)
      }
    }

    updateProgress()
  }, [onComplete])

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length)
    }, 900)

    return () => clearInterval(wordInterval)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center overflow-hidden">
      {/* Top Left Label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.div>

      {/* Center Rotating Words */}
      <div className="text-center mb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Right Counter */}
      <div className="absolute bottom-12 right-12 text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
        {String(count).padStart(3, '0')}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          className="h-full accent-gradient transition-all"
          style={{
            transform: `scaleX(${count / 100})`,
            transformOrigin: 'left',
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </div>
  )
}

// ============ NAVBAR ============
function Navbar() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Home', 'Work', 'Resume']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow ${
          scrollY > 100 ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative group"
        >
          <div className="absolute inset-0 rounded-full accent-gradient group-hover:opacity-100 opacity-100 transition-opacity" />
          <div className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">KS</span>
          </div>
        </motion.div>

        <div className="w-px h-5 bg-stroke mx-1 hidden md:block" />

        {/* Nav Links */}
        <div className="hidden md:flex gap-1">
          {['Início', 'Projetos', 'Método'].map((link) => (
            <motion.a
              key={link}
              href="#"
              whileHover={{ backgroundColor: 'rgba(12, 12, 13, 0.5)' }}
              className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-1 hidden md:block" />

        {/* Say Hi Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="relative text-xs sm:text-sm rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-text-primary overflow-hidden group"
        >
          <div className="absolute inset-[-2px] accent-gradient opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
          <div className="relative bg-surface rounded-full backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1">
            Vamos conversar
            <span>↗</span>
          </div>
        </motion.button>
      </motion.div>
    </nav>
  )
}

// ============ HERO SECTION ============
function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const roles = ['Raiz', 'Prova', 'Estrutura', 'Validação']
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource('https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8')
      hls.attachMedia(videoRef.current)
    } else if (videoRef.current) {
      videoRef.current.src = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
    }
  }, [])

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2000)
    return () => clearInterval(roleInterval)
  }, [])

  return (
    <section className="relative h-screen bg-bg overflow-hidden flex flex-col pt-24">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1200px] mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xs text-muted uppercase tracking-[0.3em] mb-8"
        >
          Design estratégico para SaaS
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6"
        >
          Kairus Studio
        </motion.h1>

        {/* Role Cycle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-sm md:text-base text-muted mb-12"
        >
          A{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="font-display italic text-text-primary inline-block"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>{' '}
          vem antes do logo.
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-sm md:text-base text-muted max-w-md mb-12"
        >
          Unimos estratégia, pesquisa e interface para transformar produtos SaaS complexos em experiências que founders confiam e usuários entendem de cara.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="inline-flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-text-primary text-bg rounded-full text-sm px-7 py-3.5 font-semibold hover:bg-bg hover:text-text-primary hover:ring-2 hover:ring-accent transition-all"
          >
            Ver projetos
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="border-2 border-stroke bg-bg text-text-primary rounded-full text-sm px-7 py-3.5 font-semibold hover:border-transparent hover:ring-2 hover:ring-accent transition-all"
          >
            Falar com a Kairus
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke animate-scroll-down" />
      </motion.div>
    </section>
  )
}

// ============ SELECTED WORKS SECTION ============
function SelectedWorksSection() {
  const projects = [
    {
      title: 'Azo',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1000&q=80',
      span: 'md:col-span-7',
    },
    {
      title: 'Zello Auto',
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80',
      span: 'md:col-span-5',
    },
    {
      title: 'LTQ Educação',
      image: 'https://images.unsplash.com/photo-1559027615-cd3628902d4a?w=800&q=80',
      span: 'md:col-span-5',
    },
    {
      title: 'Quattrus',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1000&q=80',
      span: 'md:col-span-7',
    },
  ]

  return (
    <section className="bg-bg py-12 md:py-16 px-6 md:px-10 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Projetos Selecionados</span>
          </div>

          <div className="flex items-start justify-between mb-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary leading-tight max-w-2xl">
              Produtos que ganharam <span className="font-display italic">clareza</span>
            </h2>
            <motion.button
              whileHover={{ x: 8 }}
              className="hidden md:inline-flex items-center gap-2 text-text-primary hover:text-accent transition-colors rounded-full px-6 py-3 hover:bg-stroke/30"
            >
              Ver todos os projetos →
            </motion.button>
          </div>

          <p className="text-sm md:text-base text-muted max-w-lg">
            Uma seleção de projetos reais, do diagnóstico ao lançamento, para SaaS que precisavam de mais do que uma interface bonita.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group ${project.span} relative rounded-3xl overflow-hidden bg-surface border border-stroke aspect-video hover:border-accent transition-all cursor-pointer`}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Halftone Overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-300 flex items-end p-8">
                {/* Hover Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent text-bg"
                >
                  <span className="relative">
                    <span className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 rounded-full blur transition-opacity" />
                    <span className="relative bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                      ↗
                    </span>
                  </span>
                  <span className="text-sm font-semibold">
                    View — <span className="font-display italic">{project.title}</span>
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ JOURNAL SECTION ============
function JournalSection() {
  const entries = [
    {
      title: 'Por que toda marca de SaaS precisa de uma Raiz antes de um logo',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
      readTime: '4 min de leitura',
      date: '',
    },
    {
      title: 'O erro mais caro em onboarding de produto B2B',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
      readTime: '6 min de leitura',
      date: '',
    },
    {
      title: 'Credibilidade institucional não é estética, é estrutura',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
      readTime: '5 min de leitura',
      date: '',
    },
    {
      title: 'O que aprendemos validando interface com usuário real',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
      readTime: '7 min de leitura',
      date: '',
    },
  ]

  return (
    <section className="bg-bg py-16 md:py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Bastidores</span>
          </div>

          <div className="flex items-start justify-between mb-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary leading-tight max-w-2xl">
              Como a gente <span className="font-display italic">pensa design</span>
            </h2>
            <motion.button
              whileHover={{ x: 8 }}
              className="hidden md:inline-flex items-center gap-2 text-text-primary hover:text-accent transition-colors rounded-full px-6 py-3 hover:bg-stroke/30"
            >
              Ver tudo →
            </motion.button>
          </div>

          <p className="text-sm md:text-base text-muted">
            Processo, decisões e os porquês por trás de cada entrega da Kairus.
          </p>
        </motion.div>

        {/* Journal Entries */}
        <div className="space-y-4">
          {entries.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-all group cursor-pointer"
            >
              <img
                src={entry.image}
                alt={entry.title}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base text-text-primary font-semibold group-hover:text-accent transition-colors">
                  {entry.title}
                </h3>
                <div className="flex gap-4 text-xs text-muted mt-1">
                  <span>{entry.readTime}</span>
                  {entry.date && <span>{entry.date}</span>}
                </div>
              </div>
              <motion.div
                whileHover={{ x: 4 }}
                className="text-accent flex-shrink-0"
              >
                →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ EXPLORATIONS SECTION ============
function ExplorationsSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const explorations = [
    { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', rotation: -5 },
    { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', rotation: 3 },
    { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', rotation: -3 },
    { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', rotation: 4 },
    { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', rotation: -2 },
    { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', rotation: 2 },
  ]

  useEffect(() => {
    if (!contentRef.current) return

    const ctx = gsap.context(() => {
      // Pin the content
      ScrollTrigger.create({
        trigger: contentRef.current,
        pin: contentRef.current,
        pinSpacing: false,
        start: 'top top',
        end: 'bottom top',
      })

      // Parallax for items
      const items = gsap.utils.toArray<HTMLElement>('.parallax-item')
      items.forEach((item, idx) => {
        const direction = idx % 2 === 0 ? 1 : -1
        gsap.to(item, {
          y: direction * 200,
          rotation: explorations[idx]?.rotation || 0,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            markers: false,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="min-h-[300vh] bg-bg relative">
      <div ref={contentRef} className="h-screen bg-bg flex flex-col justify-center items-center px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Experimentos</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary leading-tight mb-6">
            Playground <span className="font-display italic">visual</span>
          </h2>
          <p className="text-sm md:text-base text-muted mb-8">
            Uma coleção de experimentos e explorações visuais da Kairus.
          </p>
          <motion.button
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 text-accent hover:text-text-primary transition-colors"
          >
            Ver no Instagram →
          </motion.button>
        </motion.div>

        {/* Parallax Gallery */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="grid grid-cols-2 gap-12 md:gap-40 max-w-[1400px]">
            {explorations.map((item, idx) => (
              <div
                key={idx}
                className="parallax-item aspect-square max-w-[320px] rounded-2xl overflow-hidden bg-surface border border-stroke"
                style={{ rotate: `${item.rotation}deg` } as React.CSSProperties}
              >
                <img src={item.image} alt={`Exploration ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ STATS SECTION ============
function StatsSection() {
  const stats = [
    { number: '4+', label: 'Clientes ativos' },
    { number: '6', label: 'Etapas no Método Kairus' },
    { number: '100%', label: 'Times reais por trás de cada entrega' },
  ]

  return (
    <section className="bg-bg py-16 md:py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-4">
                {stat.number}
              </div>
              <p className="text-sm md:text-base text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ CONTACT / FOOTER SECTION ============
function ContactSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource('https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8')
      hls.attachMedia(videoRef.current)
    }
  }, [])

  useEffect(() => {
    gsap.to('.marquee-text', {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <section className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-y-[-1]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          {/* Marquee */}
          <div className="relative overflow-hidden mb-16 h-20 flex items-center">
            <div className="marquee-text text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/10 whitespace-nowrap">
              {Array(10)
                .fill('DESIGN COM RAIZ • ')
                .join('')}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-8">
              Pronto para dar raiz ao seu produto?
            </h2>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:kairusstudiouxd@gmail.com"
              className="inline-flex items-center gap-2 text-text-primary hover:text-accent relative group"
            >
              <span className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 rounded-full blur transition-opacity" />
              <span className="relative bg-bg px-8 py-4 rounded-full font-semibold ring-2 ring-accent group-hover:ring-text-primary transition-all">
                Vamos conversar
              </span>
            </motion.a>
          </motion.div>

          {/* Footer Bar */}
          <div className="border-t border-stroke pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              {['Instagram', 'LinkedIn', 'TikTok', 'Behance'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ color: '#89AACC' }}
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {social}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted">Disponível para novos projetos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ MAIN APP ============
export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="bg-bg text-text-primary">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <HeroSection />
          <SelectedWorksSection />
          <JournalSection />
          <ExplorationsSection />
          <StatsSection />
          <ContactSection />
        </>
      )}
    </div>
  )
}
