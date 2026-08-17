import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, BookOpen } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Home() {
  const [recentNews, setRecentNews] = useState([])

  // =========================================================
  // OXAR HERITAGE SCROLL
  // =========================================================

  const heritageRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heritageRef,
    offset: ['start start', 'end end'],
  })

  /*
   * The typography moves vertically.
   *
   * IMPORTANT:
   * The photograph itself is NOT transformed.
   * Only the SVG mask/text moves.
   */
  const heritageTextY = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -220]
  )

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

          {/* Mission */}

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

          PREMIUM PHOTO-IN-TYPOGRAPHY EXPERIENCE

          Architecture:

          ┌───────────────────────────────┐
          │                               │
          │     STATIONARY PHOTOGRAPH     │
          │                               │
          │       XAVIERIAN              │
          │       HERITAGE               │
          │          OXAR                │
          │                               │
          └───────────────────────────────┘

          The photograph never moves.

          The SVG text mask moves over the photograph.

          This avoids:
          - background-attachment: fixed
          - transform + fixed background
          - background-clip:text browser issues
          ===================================================== */}

      <section
        ref={heritageRef}
        className="relative overflow-hidden bg-[#FCFBF7]"
      >

        {/* -----------------------------------------------------
            LONG SCROLL DISTANCE
            ----------------------------------------------------- */}

        <div className="relative h-[220vh]">

          {/* ---------------------------------------------------
              STICKY VIEWPORT
              --------------------------------------------------- */}

          <div className="sticky top-0 h-screen w-full overflow-hidden">

            {/* =================================================
                PHOTOGRAPH

                THIS IMAGE NEVER MOVES.
                ================================================= */}

            <div className="absolute inset-0">

              <img
                src="https://raw.githubusercontent.com/oxaralumni/oxaralumni/main/client/public/IMG_8654.webp"
                alt=""
                aria-hidden="true"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />

            </div>


            {/* =================================================
                IVORY OVERLAY

                The image underneath is completely hidden.
                Only the SVG mask reveals it.
                ================================================= */}

            <div className="absolute inset-0 bg-[#FCFBF7]" />


            {/* =================================================
                SECTION TITLE
                ================================================= */}

            <div
              className="
                absolute
                left-0
                right-0
                top-[9%]
                z-20
                px-6
                text-center
              "
            >

              <p
                className="
                  font-body
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.45em]
                  text-[#B89A5A]
                "
              >
                Learn more about
              </p>

              <h2
                className="
                  mt-3
                  font-heading
                  text-3xl
                  font-bold
                  tracking-tight
                  text-[#173F5F]
                  md:text-4xl
                "
              >
                OXAR History
              </h2>

              <div className="mx-auto mt-5 flex items-center justify-center gap-3">

                <span className="h-px w-16 bg-[#B89A5A]/70" />

                <span className="h-1.5 w-1.5 rotate-45 bg-[#B89A5A]" />

                <span className="h-px w-16 bg-[#B89A5A]/70" />

              </div>

            </div>


            {/* =================================================
                SVG IMAGE MASK

                This is the important part.

                The image is stationary.

                The text inside the mask moves.

                Therefore the photograph appears to remain
                fixed while the letters travel over it.
                ================================================= */}

            <svg
              viewBox="0 0 1000 700"
              preserveAspectRatio="xMidYMid slice"
              className="
                absolute
                inset-0
                z-10
                h-full
                w-full
              "
              xmlns="http://www.w3.org/2000/svg"
            >

              {/* ---------------------------------------------
                  MASK DEFINITION
                  --------------------------------------------- */}

              <defs>

                <mask
                  id="oxarHeritageTextMask"
                  x="0"
                  y="0"
                  width="1000"
                  height="700"
                  maskUnits="userSpaceOnUse"
                >

                  {/* Black = hidden */}

                  <rect
                    x="0"
                    y="0"
                    width="1000"
                    height="700"
                    fill="black"
                  />

                  {/* -----------------------------------------
                      MOVING WHITE TEXT

                      White reveals the image underneath.
                      ----------------------------------------- */}

                  <motion.g
                    style={{
                      y: heritageTextY,
                    }}
                  >

                    <text
                      x="500"
                      y="340"
                      textAnchor="middle"
                      fill="white"
                      fontFamily="'Times New Roman', Times, serif"
                      fontSize="145"
                      fontWeight="900"
                      letterSpacing="-5"
                    >
                      XAVIERIAN
                    </text>

                    <text
                      x="500"
                      y="475"
                      textAnchor="middle"
                      fill="white"
                      fontFamily="'Times New Roman', Times, serif"
                      fontSize="145"
                      fontWeight="900"
                      letterSpacing="-5"
                    >
                      HERITAGE
                    </text>

                    <text
                      x="500"
                      y="610"
                      textAnchor="middle"
                      fill="white"
                      fontFamily="'Times New Roman', Times, serif"
                      fontSize="145"
                      fontWeight="900"
                      letterSpacing="-5"
                    >
                      OXAR
                    </text>

                  </motion.g>

                </mask>

              </defs>


              {/* =================================================
                  IMAGE INSIDE MASK

                  This image is stationary because it is NOT
                  inside the moving motion.g.
                  ================================================= */}

              <image
                href="https://raw.githubusercontent.com/oxaralumni/oxaralumni/main/client/public/IMG_8654.webp"
                x="0"
                y="0"
                width="1000"
                height="700"
                preserveAspectRatio="xMidYMid slice"
                mask="url(#oxarHeritageTextMask)"
              />

            </svg>


            {/* =================================================
                DESCRIPTION + CTA
                ================================================= */}

            <div
              className="
                absolute
                bottom-[8%]
                left-1/2
                z-20
                w-full
                max-w-xl
                -translate-x-1/2
                px-6
                text-center
              "
            >

              <p
                className="
                  font-body
                  text-sm
                  leading-7
                  text-[#46545D]
                  md:text-base
                "
              >
                A community shaped by shared classrooms,
                lasting friendships and a legacy that continues
                across generations.
              </p>


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
                  pb-2
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

                <span>
                  Discover our history
                </span>

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

      </section>


      {/* =====================================================
          LATEST NEWS & EVENTS
          ===================================================== */}

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Header */}

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
            className="
              flex
              items-center
              font-body
              text-sm
              font-semibold
              text-secondary
              transition-colors
              hover:text-secondary-dark
            "
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
                duration-300
                hover:shadow-md
              "
            >

              <img
                src={post.thumbnail_url}
                alt={post.title}
                className="h-48 w-full object-cover"
              />


              <div className="flex flex-grow flex-col p-6">

                <span
                  className="
                    mb-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-secondary
                  "
                >
                  {post.category}
                </span>


                <h3
                  className="
                    mb-2
                    line-clamp-2
                    font-heading
                    text-lg
                    font-bold
                    text-primary
                  "
                >
                  {post.title}
                </h3>


                <p
                  className="
                    mb-4
                    line-clamp-3
                    font-body
                    text-sm
                    text-gray-500
                  "
                >
                  {post.excerpt}
                </p>


                <div
                  className="
                    mt-auto
                    flex
                    items-center
                    justify-between
                    border-t
                    border-gray-100
                    pt-4
                  "
                >

                  <span className="text-xs text-gray-400">
                    {post.created_at}
                  </span>


                  <Link
                    to="/news"
                    className="
                      font-body
                      text-sm
                      font-semibold
                      text-primary
                      transition-colors
                      hover:text-primary-dark
                    "
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
