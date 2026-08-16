import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Award, BookOpen } from 'lucide-react'
import { supabase } from '../supabaseClient'

export default function Home() {
  const [recentNews, setRecentNews] = useState([])

  useEffect(() => {
    // Fetch dynamic news
    supabase.from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setRecentNews(data)
        } else {
          // Mock news
          setRecentNews([
            { id: 1, title: 'Golden Jubilee Reunion: A Night to Remember', category: 'REUNION', excerpt: 'Alumni across five decades gathered last Saturday to celebrate our golden jubilee anniversary.', created_at: '2026-05-15', thumbnail_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400' },
            { id: 2, title: 'New Mentorship Program Launched for Seniors', category: 'CAMPUS', excerpt: 'OXAR is proud to introduce a new platform linking current secondary seniors with industry professionals.', created_at: '2026-05-12', thumbnail_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400' },
            { id: 3, title: 'Alumni Spotlight: Dr. Elena Rodriguez Wins Research Award', category: 'ACHIEVEMENT', excerpt: 'Celebrating excellence: Dr. Rodriguez receives international honors for research in quantum physics.', created_at: '2026-05-09', thumbnail_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' }
          ])
        }
      })
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
    <section className="relative text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-primary">
  {/* Background Image overlay */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/074/380/722/small/graduation-cap-academic-achievement-and-success-photo.jpg')`
    }}
  />

  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="max-w-3xl text-left">

      {/* Welcome Home */}
      <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none mb-6">
        Welcome Home
      </h1>

      {/* Main message */}
     <p className="font-body text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
  <span className="block">
    Years pass. Faces change. Memories remain.
  </span>
  <span className="block">
    Some places never stop feeling like home.
  </span>
</p>

<p className="font-body text-lg sm:text-xl text-white/90 italic">
  Keep the Memories Alive
</p>
    </div>
  </div>
</section>

      {/* OXAR Introduction / Mission */}
      <section className="bg-white py-16 border-y border-[#E0E0E0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-3xl text-primary mb-6">Our Mission & Community</h2>
            <p className="font-body text-gray-600 mb-4 leading-relaxed">
              OXAR serves as the official Alumni Association of Xavier's Senior Secondary School, Rohini. We connect alumni across the globe, facilitating valuable networking opportunities, hosting reunions, and sponsoring school infrastructure developments.
            </p>
            <p className="font-body text-gray-600 leading-relaxed">
              Our community is active in mentorship, offering counseling to senior students, providing internships, and creating a supportive ecosystem for growth.
            </p>
            <div className="mt-8">
              <Link to="/about" className="inline-flex items-center text-secondary hover:text-secondary-dark font-semibold">
                <span>Learn more about OXAR history</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f9f9fd] p-6 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center">
              <Award className="h-10 w-10 text-secondary mb-3" />
              <span className="font-heading font-extrabold text-2xl text-primary">5,000+</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Alumni Connected</span>
            </div>
            <div className="bg-[#f9f9fd] p-6 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center">
              <BookOpen className="h-10 w-10 text-secondary mb-3" />
              <span className="font-heading font-extrabold text-2xl text-primary">15+</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Batches Represented</span>
            </div>
          </div>
        </div>
      </section>

 {/* =========================================================
    OXAR HERITAGE — IMAGE THROUGH TYPOGRAPHY
    ========================================================= */}
<section className="relative bg-[#FCFBF7]">

  {/* ---------------------------------------------------------
      STICKY VISUAL AREA
      --------------------------------------------------------- */}
  <div className="relative h-[220vh]">

    <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

      {/* =====================================================
          FIXED IMAGE
          ===================================================== */}
      <div className="absolute inset-0">

        <img
          src="/IMG_8654.HEIC"
          alt=""
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* Darken image slightly */}
        <div className="absolute inset-0 bg-[#173F5F]/15" />

      </div>


      {/* =====================================================
          IVORY MASK
          Everything outside the typography is covered.
          ===================================================== */}
      <div className="absolute inset-0 bg-[#FCFBF7]" />


      {/* =====================================================
          TYPOGRAPHY WINDOW
          
          The image is revealed THROUGH the letters.
          ===================================================== */}
      <div
        className="
          relative
          z-10
          flex
          w-full
          flex-col
          items-center
          justify-center
          px-4
        "
      >

        {/* Small heading */}
        <div className="mb-8 text-center">

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


        {/* =================================================
            IMAGE FILLED TEXT
            ================================================= */}
        <div className="w-full max-w-[1500px] overflow-hidden">

          <div
            className="
              image-text
              font-heading
              text-center
              text-[18vw]
              font-black
              uppercase
              leading-[0.78]
              tracking-[-0.06em]
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

          </div>

        </div>


        {/* =================================================
            BOTTOM DESCRIPTION
            ================================================= */}
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

          <Link
            to="/about"
            className="
              group
              mt-6
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
      
      {/* Latest News / Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading font-bold text-3xl text-primary">Latest News & Events</h2>
            <p className="font-body text-gray-500 mt-1">Stay updated with the latest happenings in our community</p>
          </div>
          <Link to="/news" className="text-secondary hover:text-secondary-dark font-semibold text-sm flex items-center">
            <span>View All News</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentNews.map((post) => (
            <div key={post.id} className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-250 flex flex-col">
              <img src={post.thumbnail_url} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-semibold text-secondary mb-2 tracking-wider uppercase">{post.category}</span>
                <h3 className="font-heading font-bold text-lg text-primary mb-2 line-clamp-2">{post.title}</h3>
                <p className="font-body text-sm text-gray-500 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">{post.created_at}</span>
                  <Link to="/news" className="text-sm font-semibold text-primary hover:text-primary-dark">Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
