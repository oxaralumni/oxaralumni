import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, BookOpen } from 'lucide-react'
import { supabase } from '../supabaseClient'

/* -------------------------------------------
   Scroll Reveal Component
-------------------------------------------- */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------
   Count Up Component
-------------------------------------------- */
function CountUp({ end, suffix = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.5,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const duration = 1600
    const startTime = performance.now()

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      )

      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(eased * end)

      setValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setValue(end)
      }
    }

    requestAnimationFrame(animate)
  }, [started, end])

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

/* -------------------------------------------
   Parallax Image
-------------------------------------------- */
function ParallaxImage({ src, alt, className = '' }) {
  const wrapperRef = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!wrapperRef.current || ticking) return

      ticking = true

      requestAnimationFrame(() => {
        const rect = wrapperRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        const center =
          rect.top + rect.height / 2

        const distance =
          center - viewportHeight / 2

        const movement = distance * -0.05

        setOffset(Math.max(-35, Math.min(35, movement)))
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    handleScroll()

    return () =>
      window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={`parallax-wrapper ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="parallax-image"
        style={{
          transform: `scale(1.08) translateY(${offset}px)`,
        }}
      />
    </div>
  )
}

export default function Home() {
  const [recentNews, setRecentNews] = useState([])

  /* -------------------------------------------
     Fetch News
  -------------------------------------------- */
  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setRecentNews(data)
        } else {
          setRecentNews([
            {
              id: 1,
              title: 'Golden Jubilee Reunion: A Night to Remember',
              category: 'REUNION',
              excerpt:
                'Alumni across five decades gathered last Saturday to celebrate our golden jubilee anniversary.',
              created_at: '2026-05-15',
              thumbnail_url:
                'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200',
            },
            {
              id: 2,
              title: 'New Mentorship Program Launched for Seniors',
              category: 'CAMPUS',
              excerpt:
                'OXAR is proud to introduce a new platform linking current secondary seniors with industry professionals.',
              created_at: '2026-05-12',
              thumbnail_url:
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
            },
            {
              id: 3,
              title:
                'Alumni Spotlight: Dr. Elena Rodriguez Wins Research Award',
              category: 'ACHIEVEMENT',
              excerpt:
                'Celebrating excellence: Dr. Rodriguez receives international honors for research in quantum physics.',
              created_at: '2026-05-09',
              thumbnail_url:
                'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
            },
          ])
        }
      })
  }, [])

  return (
    <main className="bg-[#F5F3ED] text-[#252525] overflow-hidden">

      {/* ==========================================
          HERO
      ========================================== */}
      <section className="relative min-h-[92vh] flex items-end bg-[#164A4A] text-white overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://xaviersrohini.edu.in/images/About-School.png"
            alt="Xavier's Senior Secondary School"
            className="hero-image"
          />

          <div className="absolute inset-0 bg-[#164A4A]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F3535] via-[#164A4A]/30 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24">

          <Reveal delay={100}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70 mb-6">
              Xavier's Senior Secondary School · Rohini
            </p>
          </Reveal>

          <Reveal delay={250}>
            <h1 className="font-heading font-bold text-[4rem] sm:text-[6rem] lg:text-[9rem] leading-[0.82] tracking-[-0.04em] max-w-5xl">
              Welcome
              <br />
              Home
            </h1>
          </Reveal>

          <Reveal delay={450} className="mt-10 max-w-2xl">
            <p className="font-body text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/90">
              Years pass. Faces change. Memories remain.
              <br />
              Some places never stop feeling like home.
            </p>
          </Reveal>

          <Reveal delay={600} className="mt-6">
            <p className="font-body text-lg italic text-white/80">
              Keep the Memories Alive
            </p>
          </Reveal>

        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 right-8 lg:right-16 z-10 hidden sm:flex flex-col items-center gap-3 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.3em] rotate-90 origin-center translate-y-6">
            Scroll
          </span>

          <span className="block w-px h-16 bg-white/40" />
        </div>
      </section>


      {/* ==========================================
          INTRODUCTION
      ========================================== */}
      <section className="py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16 bg-[#F5F3ED]">

        <div className="max-w-[1400px] mx-auto">

          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

              <div className="lg:col-span-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#B0935A]">
                  We Are OXAR
                </p>
              </div>

              <div className="lg:col-span-8">
                <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl leading-[0.95] text-[#164A4A]">
                  One school.
                  <br />
                  Thousands of journeys.
                  <br />
                  One community.
                </h2>

                <p className="font-body text-lg text-[#555] leading-relaxed max-w-2xl mt-10">
                  OXAR serves as the official Alumni Association of
                  Xavier's Senior Secondary School, Rohini. We bring
                  generations of alumni together through meaningful
                  relationships, mentorship, reunions, opportunities,
                  and shared memories.
                </p>
              </div>

            </div>
          </Reveal>

        </div>
      </section>


      {/* ==========================================
          LARGE IMAGE
      ========================================== */}
      <section className="px-4 sm:px-8 lg:px-12 pb-28 bg-[#F5F3ED]">

        <Reveal className="w-full">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800"
            alt="Alumni community"
            className="h-[55vh] sm:h-[65vh] lg:h-[75vh]"
          />
        </Reveal>

      </section>


      {/* ==========================================
          STATISTICS
      ========================================== */}
      <section className="bg-[#164A4A] text-white py-28 sm:py-36">

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          <Reveal>

            <div className="mb-20 lg:mb-28">
              <p className="text-xs uppercase tracking-[0.3em] text-[#B0935A] mb-6">
                Our Community
              </p>

              <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl leading-[0.9]">
                Built across
                <br />
                generations.
              </h2>
            </div>

          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

            <Reveal delay={100}>
              <div className="border-t border-white/20 pt-8">
                <div className="font-heading text-7xl sm:text-8xl lg:text-[10rem] leading-none text-[#B0935A]">
                  <CountUp end={5000} suffix="+" />
                </div>

                <p className="mt-6 text-sm uppercase tracking-[0.25em] text-white/60">
                  Alumni Connected
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="border-t border-white/20 pt-8">
                <div className="font-heading text-7xl sm:text-8xl lg:text-[10rem] leading-none text-[#B0935A]">
                  <CountUp end={15} suffix="+" />
                </div>

                <p className="mt-6 text-sm uppercase tracking-[0.25em] text-white/60">
                  Batches Represented
                </p>
              </div>
            </Reveal>

          </div>

        </div>
      </section>


      {/* ==========================================
          COMMUNITY AREAS
      ========================================== */}
      <section className="bg-[#F5F3ED] py-28 sm:py-36">

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          <Reveal>

            <p className="text-xs uppercase tracking-[0.3em] text-[#B0935A] mb-6">
              What We Do
            </p>

            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#164A4A] leading-[0.9] max-w-5xl">
              A community
              <br />
              that keeps
              <br />
              moving forward.
            </h2>

          </Reveal>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#164A4A]/15">

            {[
              {
                number: '01',
                title: 'Mentorship',
                text: 'Creating meaningful connections between alumni and current students.',
              },
              {
                number: '02',
                title: 'Careers',
                text: 'Opening doors through professional opportunities and alumni networks.',
              },
              {
                number: '03',
                title: 'Scholarships',
                text: 'Supporting students and investing in the next generation.',
              },
              {
                number: '04',
                title: 'Reunions',
                text: 'Bringing old friends together and creating new memories.',
              },
            ].map((item, index) => (
              <Reveal key={item.number} delay={index * 100}>
                <div className="border-b lg:border-b-0 lg:border-r last:border-r-0 border-[#164A4A]/15 p-8 lg:p-10 min-h-[280px] flex flex-col justify-between">

                  <span className="text-xs tracking-[0.25em] text-[#B0935A]">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="font-heading text-3xl text-[#164A4A]">
                      {item.title}
                    </h3>

                    <p className="mt-5 text-sm leading-relaxed text-gray-600">
                      {item.text}
                    </p>
                  </div>

                </div>
              </Reveal>
            ))}

          </div>

        </div>
      </section>


      {/* ==========================================
          HORIZONTAL ALUMNI STORIES
      ========================================== */}
      <section className="bg-[#EAE7DE] py-28 overflow-hidden">

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          <Reveal>

            <p className="text-xs uppercase tracking-[0.3em] text-[#B0935A] mb-6">
              Alumni Stories
            </p>

            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#164A4A] leading-[0.9]">
              Memories
              <br />
              that stay.
            </h2>

          </Reveal>

        </div>

        <div className="mt-20 overflow-hidden">
          <div className="horizontal-story-track">

            {[
              'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900',
              'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900',
              'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900',
              'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900',
              'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900',
            ].map((image, index) => (
              <div
                key={image}
                className="story-card"
              >
                <img
                  src={image}
                  alt={`OXAR alumni story ${index + 1}`}
                />

                <div className="story-card-overlay">
                  <span>
                    Alumni Story {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </section>


      {/* ==========================================
          NEWS
      ========================================== */}
      <section className="bg-[#F5F3ED] py-28 sm:py-36">

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          <Reveal>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#B0935A] mb-6">
                  Latest
                </p>

                <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#164A4A] leading-[0.9]">
                  News &
                  <br />
                  Events
                </h2>
              </div>

              <Link
                to="/news"
                className="inline-flex items-center gap-3 text-sm font-semibold text-[#164A4A] hover:text-[#B0935A] transition-colors"
              >
                View all news
                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>

          </Reveal>

          <div className="divide-y divide-[#164A4A]/15">

            {recentNews.map((post, index) => (
              <Reveal key={post.id} delay={index * 100}>

                <Link
                  to="/news"
                  className="group grid grid-cols-1 lg:grid-cols-[80px_1fr_280px] gap-8 py-10 items-center"
                >

                  <span className="text-sm text-[#B0935A]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      {post.category}
                    </span>

                    <h3 className="font-heading text-3xl sm:text-4xl text-[#164A4A] mt-3 group-hover:translate-x-2 transition-transform duration-500">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-4 max-w-2xl">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="overflow-hidden h-40">
                    <img
                      src={post.thumbnail_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                </Link>

              </Reveal>
            ))}

          </div>

        </div>
      </section>


      {/* ==========================================
          FINAL CTA
      ========================================== */}
      <section className="bg-[#164A4A] text-white min-h-[70vh] flex items-center">

        <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-16">

          <Reveal>

            <p className="text-xs uppercase tracking-[0.3em] text-[#B0935A] mb-8">
              Stay Connected
            </p>

            <h2 className="font-heading text-[4rem] sm:text-[6rem] lg:text-[9rem] leading-[0.82] tracking-[-0.04em]">
              Keep the
              <br />
              Memories
              <br />
              Alive.
            </h2>

            <div className="mt-12">
              <Link
                to="/join"
                className="inline-flex items-center gap-4 border border-white/30 hover:border-[#B0935A] px-7 py-4 text-sm font-semibold transition-all duration-500 hover:bg-[#B0935A] hover:border-[#B0935A]"
              >
                Join the OXAR Community
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </Reveal>

        </div>
      </section>

    </main>
  )
}
