import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { supabase } from '../supabaseClient'

/* =========================================================
   Scroll Progress Hook
========================================================= */

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = null

    const update = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const total = Math.max(rect.height - viewportHeight, 1)
      const current = Math.min(Math.max(-rect.top, 0), total)

      setProgress(current / total)
      frame = null
    }

    const handleScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update)
      }
    }

    update()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)

      if (frame) {
        cancelAnimationFrame(frame)
      }
    }
  }, [ref])

  return progress
}

/* =========================================================
   Reveal
========================================================= */

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
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`oxa-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* =========================================================
   Animated Counter
========================================================= */

function Counter({ end, suffix = '' }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    let frame
    const duration = 1800
    const startTime = performance.now()

    const animate = (time) => {
      const elapsed = time - startTime
      const rawProgress = Math.min(elapsed / duration, 1)

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - rawProgress, 4)

      setValue(Math.floor(end * eased))

      if (rawProgress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setValue(end)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [started, end])

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

/* =========================================================
   Hero
========================================================= */

function Hero() {
  const sectionRef = useRef(null)
  const progress = useScrollProgress(sectionRef)

  const imageScale = 1.12 - progress * 0.10
  const imageY = progress * -4

  const titleY = progress * -120
  const titleOpacity = Math.max(0, 1 - progress * 2.1)

  const subtitleY = progress * -70
  const subtitleOpacity = Math.max(0, 1 - progress * 2.8)

  return (
    <section
      ref={sectionRef}
      className="relative h-[180vh] bg-[#164A4A]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Image */}
        <div className="absolute inset-0">
          <img
            src="https://xaviersrohini.edu.in/images/About-School.png"
            alt="Xavier's Senior Secondary School, Rohini"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: `scale(${imageScale}) translateY(${imageY}%)`,
            }}
          />

          <div className="absolute inset-0 bg-[#164A4A]/55" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0F3535] via-transparent to-[#164A4A]/20" />
        </div>

        {/* Tiny brand label */}
        <div
          className="absolute top-24 left-6 sm:left-10 lg:left-16 z-10"
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${progress * -30}px)`,
          }}
        >
          <p className="oxa-micro text-white/70">
            XAVIER'S SENIOR SECONDARY SCHOOL · ROHINI
          </p>
        </div>

        {/* Main Typography */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-[1500px] mx-auto">

            <div
              style={{
                opacity: titleOpacity,
                transform: `translateY(${titleY}px)`,
              }}
            >
              <h1 className="oxa-hero-title">
                Welcome
                <span>Home</span>
              </h1>
            </div>

            <div
              className="mt-10 max-w-2xl"
              style={{
                opacity: subtitleOpacity,
                transform: `translateY(${subtitleY}px)`,
              }}
            >
              <p className="oxa-hero-description">
                Years pass. Faces change. Memories remain.
                <br />
                Some places never stop feeling like home.
              </p>

              <p className="mt-5 font-body text-lg italic text-white/75">
                Keep the Memories Alive
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute right-7 bottom-8 z-10 hidden sm:flex flex-col items-center gap-3 text-white/60"
          style={{
            opacity: Math.max(0, 1 - progress * 3),
          }}
        >
          <span className="oxa-micro rotate-90 translate-y-5">
            Scroll
          </span>

          <div className="w-px h-16 bg-white/35" />

          <ArrowDown className="w-4 h-4" />
        </div>

      </div>
    </section>
  )
}

/* =========================================================
   Statement Scene
========================================================= */

function StatementScene() {
  const sectionRef = useRef(null)
  const progress = useScrollProgress(sectionRef)

  const statements = [
    'We remember.',
    'We reconnect.',
    'We mentor.',
    'We build.',
  ]

  const activeIndex = Math.min(
    Math.floor(progress * statements.length),
    statements.length - 1
  )

  return (
    <section
      ref={sectionRef}
      className="relative h-[420vh] bg-[#F5F3ED]"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        {/* background circle */}
        <div
          className="absolute w-[70vw] h-[70vw] max-w-[950px] max-h-[950px] rounded-full bg-[#164A4A]/[0.035]"
          style={{
            left: `${15 + progress * 25}%`,
            top: `${15 - progress * 10}%`,
          }}
        />

        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-[1500px] mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              <div className="lg:col-span-3">
                <p className="oxa-micro text-[#B0935A]">
                  The OXAR Story
                </p>
              </div>

              <div className="lg:col-span-9 relative min-h-[330px]">

                {statements.map((statement, index) => {
                  const distance = index - activeIndex

                  const opacity =
                    distance === 0
                      ? 1
                      : Math.max(0, 1 - Math.abs(distance))

                  const translate =
                    distance * 80

                  return (
                    <div
                      key={statement}
                      className="absolute inset-0 flex items-center"
                      style={{
                        opacity,
                        transform: `translateY(${translate}px)`,
                        transition:
                          'opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 1000ms cubic-bezier(0.22,1,0.36,1)',
                      }}
                    >
                      <h2 className="oxa-scene-title">
                        {statement}
                      </h2>
                    </div>
                  )
                })}

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Image Story
========================================================= */

function ImageStory() {
  return (
    <section className="bg-[#F5F3ED] px-4 sm:px-8 lg:px-12 pb-32">

      <Reveal>
        <div className="relative h-[65vh] lg:h-[78vh] overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800"
            alt="Alumni community"
            className="w-full h-full object-cover oxa-image-hover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <div className="absolute left-6 sm:left-10 lg:left-16 bottom-8 sm:bottom-12 lg:bottom-16 max-w-xl">
            <p className="oxa-micro text-white/70">
              More than an association
            </p>

            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-white mt-5 leading-[0.95]">
              A place to
              <br />
              come back to.
            </h2>
          </div>

        </div>
      </Reveal>

    </section>
  )
}

/* =========================================================
   Statistics
========================================================= */

function Statistics() {
  return (
    <section className="bg-[#164A4A] text-white py-32 sm:py-40">

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">

        <Reveal>
          <p className="oxa-micro text-[#B0935A]">
            Our Community
          </p>

          <h2 className="oxa-section-heading text-white mt-8 max-w-5xl">
            Thousands of stories.
            <br />
            One shared beginning.
          </h2>
        </Reveal>

        <div className="mt-28 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

          <Reveal delay={100}>
            <div className="border-t border-white/15 pt-8">
              <div className="oxa-stat">
                <Counter end={5000} suffix="+" />
              </div>

              <p className="oxa-micro text-white/55 mt-7">
                Alumni connected
              </p>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="border-t border-white/15 pt-8">
              <div className="oxa-stat">
                <Counter end={15} suffix="+" />
              </div>

              <p className="oxa-micro text-white/55 mt-7">
                Batches represented
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Horizontal Alumni Story
========================================================= */

function AlumniStories() {
  const images = [
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000',
    'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1000',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000',
  ]

  return (
    <section className="bg-[#EAE7DE] py-32 overflow-hidden">

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">

        <Reveal>
          <p className="oxa-micro text-[#B0935A]">
            Alumni Stories
          </p>

          <h2 className="oxa-section-heading text-[#164A4A] mt-8">
            Memories
            <br />
            that stay.
          </h2>
        </Reveal>

      </div>

      <div className="mt-24 overflow-hidden">

        <div className="oxa-marquee">

          {[...images, ...images].map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="oxa-story-card"
            >
              <img
                src={image}
                alt="OXAR alumni"
              />

              <div className="absolute left-0 right-0 bottom-0 p-7 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-xs uppercase tracking-[0.25em] text-white/75">
                  OXAR · 0{(index % 5) + 1}
                </span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

/* =========================================================
   News
========================================================= */

function NewsSection({ recentNews }) {
  return (
    <section className="bg-[#F5F3ED] py-32">

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">

        <Reveal>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div>
              <p className="oxa-micro text-[#B0935A]">
                Latest
              </p>

              <h2 className="oxa-section-heading text-[#164A4A] mt-8">
                News &
                <br />
                Events
              </h2>
            </div>

            <Link
              to="/news"
              className="oxa-text-link"
            >
              View all news
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </Reveal>

        <div className="mt-24 border-t border-[#164A4A]/15">

          {recentNews.map((post, index) => (
            <Reveal
              key={post.id}
              delay={index * 80}
            >
              <Link
                to="/news"
                className="group block border-b border-[#164A4A]/15 py-10 lg:py-12"
              >

                <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_300px] gap-8 lg:gap-12 items-center">

                  <span className="oxa-news-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>

                    <span className="oxa-micro text-gray-500">
                      {post.category}
                    </span>

                    <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#164A4A] mt-4 transition-transform duration-700 group-hover:translate-x-3">
                      {post.title}
                    </h3>

                    <p className="font-body text-sm text-gray-500 max-w-2xl mt-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                  </div>

                  <div className="hidden lg:block h-44 overflow-hidden">

                    <img
                      src={post.thumbnail_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                  </div>

                </div>

              </Link>
            </Reveal>
          ))}

        </div>

      </div>
    </section>
  )
}

/* =========================================================
   Final CTA
========================================================= */

function FinalCTA() {
  return (
    <section className="relative min-h-[90vh] bg-[#0F3535] text-white flex items-center overflow-hidden">

      <div className="absolute w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full border border-white/[0.08] -right-[20%] top-[10%]" />

      <div className="absolute w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full border border-[#B0935A]/20 -right-[8%] top-[22%]" />

      <div className="relative z-10 max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-16">

        <Reveal>

          <p className="oxa-micro text-[#B0935A]">
            Stay Connected
          </p>

          <h2 className="oxa-final-title mt-8">
            Keep the
            <br />
            Memories
            <br />
            Alive.
          </h2>

          <div className="mt-14">

            <Link
              to="/join"
              className="oxa-cta"
            >
              Join the OXAR Community
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </Reveal>

      </div>
    </section>
  )
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [recentNews, setRecentNews] = useState([])

  useEffect(() => {
    const loadNews = async () => {
      const { data } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      if (data && data.length > 0) {
        setRecentNews(data)
        return
      }

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

    loadNews()
  }, [])

  return (
    <main className="bg-[#F5F3ED]">
      <Hero />
      <StatementScene />
      <ImageStory />
      <Statistics />
      <AlumniStories />
      <NewsSection recentNews={recentNews} />
      <FinalCTA />
    </main>
  )
}
