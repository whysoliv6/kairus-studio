import { useState, useEffect } from 'react'
import { ArrowRight, Clock, Menu, X } from 'lucide-react'
import CtaFaqSection from './CtaFaq'

// Live Clock Component
function LiveClock() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const londonTime = new Date().toLocaleString('en-GB', {
        timeZone: 'Europe/London',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      })
      setTime(londonTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <Clock size={14} className="text-gray-600" />
      <span className="text-xs text-gray-600">{time} in London</span>
    </div>
  )
}

// Text Roll Animation Component
function TextRoll({
  text,
  icon: Icon,
  iconBg = 'white',
  iconColor = 'text-gray-900',
  variant = 'light',
}: {
  text: string
  icon: React.ComponentType<{ size: number; className?: string }>
  iconBg?: string
  iconColor?: string
  variant?: 'light' | 'dark'
}) {
  return (
    <div className="flex items-center gap-2 group">
      <div
        className={`overflow-hidden h-5 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2`}
      >
        <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{text}</span>
        <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{text}</span>
      </div>
      <div
        className={`${iconBg} rounded-full p-1 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]`}
      >
        <Icon size={variant === 'dark' ? 16 : 14} className={iconColor} />
      </div>
    </div>
  )
}

// Hero Section Component
function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="relative h-screen bg-[#EFEFEF] overflow-hidden flex flex-col">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(255, 127, 0, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 127, 0, 0.2), transparent 50%)',
          animation: 'gradient-shift 15s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
      `}</style>

      {/* Navbar */}
      <nav className="relative z-20 flex justify-center pt-2 sm:pt-3 px-3">
        <div className="w-full max-w-[1440px] bg-white rounded-full p-1.5 sm:p-2 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-8 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold tracking-tight">
              AX
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex gap-6">
              {['Projects', 'Studio', 'Journal', 'Connect'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs sm:text-sm text-gray-900 hover:text-gray-500 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <span className="text-xs text-gray-600 hidden lg:inline">Taking on projects for Q1 2026</span>
            <div className="w-px h-4 bg-gray-200" />
            <LiveClock />
            <button className="bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-full pl-4 sm:pl-5 pr-1.5 py-2 hover:bg-gray-800 transition-colors group">
              <TextRoll text="Book a strategy call" icon={ArrowRight} iconBg="bg-white" iconColor="text-gray-900" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden bg-gray-900 text-white rounded-full p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm">
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl mx-3 mb-3 p-6 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              menuOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <LiveClock />
            <div className="flex flex-col gap-4 mt-6">
              {['Projects', 'Studio', 'Journal', 'Connect'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-lg sm:text-2xl font-medium text-gray-900"
                >
                  {link}
                </a>
              ))}
            </div>
            <button className="w-full mt-6 bg-gray-900 text-white text-xs font-medium rounded-full py-3 hover:bg-gray-800 transition-colors">
              Start a project
            </button>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-end px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20 max-w-[1440px] w-full mx-auto">
        <div className="text-[11px] sm:text-xs text-gray-900 tracking-wide mb-5 sm:mb-8 font-medium">
          Kairus Studio
        </div>

        <h1 className="clamp text-gray-900 font-medium leading-[1.08] tracking-[-0.03em] mb-8 sm:mb-12 max-w-3xl">
          <span>We craft digital experiences</span>
          <br className="hidden sm:block" /> <span className="sm:hidden"> </span>
          <span>for brands ready to dominate</span>
          <br className="hidden sm:block" /> <span className="sm:hidden"> </span>
          <span>their category online.</span>
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
          <button className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs sm:text-sm font-medium rounded-full pl-5 sm:pl-6 pr-1.5 py-2 transition-colors group">
            <TextRoll text="Start a project" icon={ArrowRight} iconBg="bg-white" iconColor="text-[#F26522]" />
          </button>

          <button className="bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] text-gray-900 text-xs sm:text-sm font-medium rounded px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-3 transition-shadow shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8704E]"
              fill="currentColor"
            >
              <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
            </svg>
            <span>Certified Partner</span>
            <span className="bg-gray-900 text-white text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded">
              Featured
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

// About Section Component
function AboutSection() {
  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Badge Row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs sm:text-sm font-semibold">
            1
          </div>
          <div className="text-xs sm:text-sm font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Introducing Kairus
          </div>
        </div>

        {/* Heading */}
        <h2 className="clamp px-5 sm:px-8 lg:px-12 text-gray-900 font-medium leading-[1.12] tracking-[-0.02em] mb-12 sm:mb-16 lg:mb-28 max-w-3xl">
          <span>Strategy-led creatives, delivering</span>
          <br /> <span>results in digital and beyond.</span>
        </h2>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden px-5 sm:px-8 flex flex-col gap-8">
          <p className="text-sm sm:text-base leading-[1.6] font-medium text-gray-900 max-w-2xl">
            Through research, creative thinking and iteration we help growing brands realize their digital full potential.
          </p>

          <button className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs sm:text-sm font-medium rounded-full pl-5 sm:pl-6 pr-1.5 py-2 w-fit transition-colors group">
            <TextRoll text="About our studio" icon={ArrowRight} iconBg="bg-white" iconColor="text-[#F26522]" />
          </button>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <div className="sm:w-[45%]">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85"
                alt="Studio"
                className="w-full aspect-[438/346] rounded-xl sm:rounded-2xl object-cover"
              />
            </div>
            <div className="sm:w-[55%]">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
                alt="Team"
                className="w-full aspect-video rounded-xl sm:rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-12">
          <div>
            <img
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85"
              alt="Studio"
              className="w-full aspect-[438/346] rounded-2xl object-cover"
            />
          </div>

          <div className="flex justify-end">
            <div className="flex flex-col gap-6 max-w-sm">
              <p className="text-base leading-[1.65] font-medium text-gray-900">
                Through research,
                <br />
                creative thinking and
                <br />
                iteration we help growing
                <br />
                brands realize their digital
                <br />
                full potential.
              </p>
              <button className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-sm font-medium rounded-full pl-6 pr-1.5 py-2 w-fit transition-colors group">
                <TextRoll text="About our studio" icon={ArrowRight} iconBg="bg-white" iconColor="text-[#F26522]" />
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
              alt="Team"
              className="w-full aspect-[3/2] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Case Studies Section Component
function CaseStudiesSection() {
  return (
    <section className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto">
        {/* Badge Row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs sm:text-sm font-semibold">
            2
          </div>
          <div className="text-xs sm:text-sm font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Featured client work
          </div>
        </div>

        {/* Heading */}
        <h2 className="clamp px-5 sm:px-8 lg:px-12 text-gray-900 font-medium leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14 lg:mb-16 max-w-3xl">
          Our projects
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
          {/* Card 1: Narrativ */}
          <div className="flex flex-col">
            <div className="relative aspect-[329/246] rounded-2xl overflow-hidden bg-[#1a1d2e] group cursor-pointer mb-4">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-4 left-4 bg-white rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:w-[148px]">
                <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap px-2">
                  Learn more
                </span>
                <ArrowRight size={14} className="ml-auto mr-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement
            </p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1">Narrativ</p>
          </div>

          {/* Card 2: Luminar */}
          <div className="flex flex-col">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#6b6b6b] group cursor-pointer mb-4">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-4 left-4 bg-gray-900 rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:w-[168px]">
                <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap px-2">
                  View case study
                </span>
                <ArrowRight size={14} className="text-white ml-auto mr-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Transforming a dated platform into a conversion-focused brand experience
            </p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1">Luminar</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main App Component
export default function App() {
  return (
    <div className="bg-white">
      {/* Section 2: About */}
      <AboutSection />

      {/* Section 3: Case Studies */}
      <CaseStudiesSection />

      {/* Section 4: CTA + FAQ */}
      <CtaFaqSection />

      {/* Section 1: Hero (Moved to bottom with rounded corners and floating) */}
      <div className="mx-12 mb-24 mt-12 rounded-3xl overflow-hidden">
        <HeroSection />
      </div>
    </div>
  )
}
