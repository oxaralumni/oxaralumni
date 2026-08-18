import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, BookOpen } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export default function Home() {
  const [recentNews, setRecentNews] = useState([])

  // =========================================================
  // OXAR HERITAGE SCROLL ANIMATION
  // =========================================================

  const heritageRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heritageRef,
    offset: ['start start', 'end end'],
  })

  // Text moves upward as the user scrolls
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    ['80px', '-260px']
  )

  // The text block travels 340px total (80px -> -260px). We shift the
  // background image the opposite way by the same amount so that, once
  // the text's own upward transform is applied, the image ends up
  // visually anchored in place — i.e. it *looks* fixed to the viewport,
  // without actually using `background-attachment: fixed`.
  //
  // `background-attachment: fixed` breaks the moment it sits on an
  // element that also has a CSS transform (which is exactly what
  // Framer Motion's `y` is) — most browsers silently stop painting the
  // fixed background at all once a transform is present, which is why
  // the text was showing up with no image behind it. This approach
  // never touches `fixed`, so it works consistently on desktop, mobile
  // Safari, and Android Chrome.
  const bgShiftY = useTransform(scrollYProgress, [0, 1], [0, 340])
  const heritageBackgroundPosition = useMotionTemplate`center calc(50% + ${bgShiftY}px)`

  // =========================================================
  // FETCH NEWS
  // =========================================================

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
                'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
            },
            {
              id: 2,
              title: 'New Mentorship Program Launched for Seniors',
              category: 'CAMPUS',
              excerpt:
                'OXAR is proud to introduce a new platform linking current secondary seniors with industry professionals.',
              created_at: '2026-05-12',
              thumbnail_url:
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
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
                'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
            },
          ])
        }
      })
  }, [])

  return (
    <div className="flex flex-col">

      {/* =====================================================
          HERO SECTION
          ===================================================== */}

      <section className="relative overflow-hidden bg-primary px-4 py-24 text-white sm:px-6 lg:px-8">

        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/thumbnails/074/380/722/small/graduation-cap-academic-achievement-and-success-photo.jpg')",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">

          <div className="max-w-3xl text-left">

            <h1 className="mb-6 font-heading text-4xl font-extrabold leading-none tracking-tight sm:text-5xl lg:text-6xl">
              Welcome Home
            </h1>

            <p className="mb-8 font-body text-lg leading-relaxed text-white/90 sm:text-xl">
              <span className="block">
                Years pass. Faces change. Memories remain.
              </span>

              <span className="block">
                Some places never stop feeling like home.
              </span>
            </p>

            <p className="font-body text-lg italic text-white/90 sm:text-xl">
              Keep the Memories Alive
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          OXAR INTRODUCTION / MISSION
          ===================================================== */}

      <section className="border-y border-[#E0E0E0] bg-white px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">

          <div>

            <h2 className="mb-6 font-heading text-3xl font-bold text-primary">
              Our Mission & Community
            </h2>

            <p className="mb-4 font-body leading-relaxed text-gray-600">
              OXAR serves as the official Alumni Association of Xavier's
              Senior Secondary School, Rohini. We connect alumni across
              the globe, facilitating valuable networking opportunities,
              hosting reunions, and sponsoring school infrastructure
              developments.
            </p>

            <p className="font-body leading-relaxed text-gray-600">
              Our community is active in mentorship, offering counseling
              to senior students, providing internships, and creating a
              supportive ecosystem for growth.
            </p>

            <div className="mt-8">

              <Link
                to="/about"
                className="inline-flex items-center font-body font-semibold text-secondary transition-colors hover:text-secondary-dark"
              >
                <span>
                  Learn more about OXAR history
                </span>

                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>

            </div>

          </div>


          {/* Statistics */}

          <div className="grid grid-cols-2 gap-4">

            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-[#f9f9fd] p-6 text-center">

              <Award className="mb-3 h-10 w-10 text-secondary" />

              <span className="font-heading text-2xl font-extrabold text-primary">
                5,000+
              </span>

              <span className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                Alumni Connected
              </span>

            </div>


            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-[#f9f9fd] p-6 text-center">

              <BookOpen className="mb-3 h-10 w-10 text-secondary" />

              <span className="font-heading text-2xl font-extrabold text-primary">
                15+
              </span>

              <span className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                Batches Represented
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          OXAR HERITAGE
          
          IMAGE FIXED BEHIND TEXT
          TEXT MOVES WITH SCROLL
          IMAGE IS VISIBLE ONLY INSIDE LETTERS
          ===================================================== */}

      <section
        ref={heritageRef}
        className="relative bg-[#FCFBF7]"
      >

        {/* Large scroll area */}
        <div className="relative h-[220vh]">

          {/* Sticky viewport */}
          <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#FCFBF7]">

            {/* =================================================
                MAIN CONTENT
                ================================================= */}

            <div className="relative z-10 flex w-full flex-col items-center justify-center">

              {/* -------------------------------------------------
                  SECTION LABEL
                  ------------------------------------------------- */}

              <div className="mb-10 text-center">

                <p
                  className="
                    font-body
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.4em]
                    text-[#B89A5A]
                  "
                >
                  Learn more about
                </p>

                <p
                  className="
                    mt-2
                    font-heading
                    text-2xl
                    font-bold
                    text-[#173F5F]
                  "
                >
                  OXAR History
                </p>

              </div>


              {/* -------------------------------------------------
                  IMAGE THROUGH TEXT
                  ------------------------------------------------- */}

              <div className="w-full overflow-hidden">

                <motion.div
                  style={{
                    y: textY,

                    /*
                     * THE ACTUAL OXAR PHOTO
                     *
                     * Because it is a background of the text,
                     * it is visible only inside the letters.
                     */
                    backgroundImage: 'url("/IMG_8654.webp")',

                    backgroundSize: 'cover',

                    /*
                     * Counter-shifted so the image reads as
                     * "pinned to the viewport" as the text
                     * scrolls over it — see bgShiftY above.
                     * (Deliberately NOT background-attachment:
                     * fixed — that combo silently stops
                     * painting on an element that also has a
                     * transform, which is what made the image
                     * disappear before.)
                     */
                    backgroundPosition: heritageBackgroundPosition,

                    backgroundRepeat: 'no-repeat',

                    /*
                     * Clip image to the text.
                     */
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',

                    /*
                     * Make original text transparent.
                     */
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                  }}

                  className="
                    mx-auto
                    w-full
                    text-center
                    font-heading
                    text-[15vw]
                    font-black
                    uppercase
                    leading-[0.78]
                    tracking-[-0.065em]
                  "
                >

                  <span className="block">
                    XAVIERIAN
                  </span>

                  <span className="block">
                    HERITAGE
                  </span>

                  <span className="block">
                    OXAR
                  </span>

                </motion.div>

              </div>


              {/* -------------------------------------------------
                  DESCRIPTION
                  ------------------------------------------------- */}

              <div className="mt-12 max-w-xl px-6 text-center">

                <p
                  className="
                    font-body
                    text-sm
                    leading-6
                    text-[#46545D]
                    md:text-base
                  "
                >
                  A community shaped by shared classrooms,
                  lasting friendships and a legacy that continues
                  across generations.
                </p>


                {/* -------------------------------------------------
                    CTA
                    ------------------------------------------------- */}

                <Link
                  to="/about"
                  className="
                    group
                    mt-7
                    inline-flex
                    items-center
                    gap-3
                    border-b
                    border-[#173F5F]
                    pb-1.5
                    font-body
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#173F5F]
                    transition-all
                    duration-300
                    hover:border-[#B89A5A]
                    hover:text-[#B89A5A]
                  "
                >

                  Discover our history

                  <ArrowRight
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-300
                      group-hover:translate-x-1.5
                    "
                  />

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          LATEST NEWS & EVENTS
          ===================================================== */}

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="mb-12 flex items-end justify-between">

          <div>

            <h2 className="font-heading text-3xl font-bold text-primary">
              Latest News & Events
            </h2>

            <p className="mt-1 font-body text-gray-500">
              Stay updated with the latest happenings in our community
            </p>

          </div>


          <Link
            to="/news"
            className="flex items-center font-body text-sm font-semibold text-secondary transition-colors hover:text-secondary-dark"
          >

            <span>
              View All News
            </span>

            <ArrowRight className="ml-1 h-4 w-4" />

          </Link>

        </div>


        {/* News Cards */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {recentNews.map((post) => (

            <div
              key={post.id}
              className="
                flex
                flex-col
                overflow-hidden
                rounded-lg
                border
                border-[#E0E0E0]
                bg-white
                shadow-sm
                transition-all
                duration-250
                hover:shadow-md
              "
            >

              <img
                src={post.thumbnail_url}
                alt={post.title}
                className="h-48 w-full object-cover"
              />


              <div className="flex flex-grow flex-col p-6">

                <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                  {post.category}
                </span>


                <h3 className="mb-2 line-clamp-2 font-heading text-lg font-bold text-primary">
                  {post.title}
                </h3>


                <p className="mb-4 line-clamp-3 font-body text-sm text-gray-500">
                  {post.excerpt}
                </p>


                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">

                  <span className="text-xs text-gray-400">
                    {post.created_at}
                  </span>

                  <Link
                    to="/news"
                    className="font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    Read More
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  )
}
