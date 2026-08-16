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

  {/* OXAR HISTORY */}
<section className="relative overflow-hidden bg-[#FCFBF7] py-20 md:py-28">

  {/* Section Heading */}
  <div className="mx-auto max-w-7xl px-6 text-center">
    <h2 className="font-heading text-3xl font-bold tracking-tight text-[#173F5F] md:text-4xl lg:text-5xl">
      Learn more about OXAR History
    </h2>

    {/* Gold Divider */}
    <div className="mx-auto mt-5 flex items-center justify-center gap-3">
      <span className="h-px w-20 bg-[#B89A5A]" />
      <span className="h-2 w-2 rotate-45 bg-[#B89A5A]" />
      <span className="h-px w-20 bg-[#B89A5A]" />
    </div>
  </div>


  {/* Main Editorial Composition */}
  <div className="relative mx-auto mt-12 max-w-[1400px] px-6">

    {/* Navy Background Panel
        Extends behind and beyond the image */}
    <div
      className="
        absolute
        bottom-0
        left-0
        right-0
        top-[22%]
        rounded-[18px]
        bg-[#173F5F]
      "
    />


    {/* Content Layer */}
    <div className="relative z-10">


      {/* =========================================
          IMAGE
          ========================================= */}
      <div
        className="
          relative
          ml-[5%]
          h-[430px]
          w-[90%]
          overflow-hidden
          rounded-t-[16px]
          md:h-[540px]
          lg:h-[600px]
        "
      >

        <img
          src="/IMG_8654.HEIC"
          alt="OXAR history and heritage"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* Image Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#102F48]/65
            via-[#173F5F]/20
            to-transparent
          "
        />

        {/* Bottom Image Fade */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-48
            bg-gradient-to-t
            from-[#173F5F]/70
            via-[#173F5F]/20
            to-transparent
          "
        />

      </div>


      {/* =========================================
          TEXT CONTENT
          ========================================= */}
      <div
        className="
          relative
          ml-[5%]
          w-[90%]
          px-8
          pb-16
          md:px-14
          md:pb-20
          lg:px-20
          lg:pb-24
        "
      >

        {/* Main Heading
            Overlaps the image and navy panel */}
        <h3
          className="
            relative
            -mt-[78px]
            max-w-4xl
            font-heading
            text-5xl
            font-bold
            leading-[0.92]
            tracking-[-0.035em]
            text-white
            md:-mt-[100px]
            md:text-6xl
            lg:-mt-[115px]
            lg:text-8xl
          "
        >
          Our Xavierian
          <br />
          Heritage
        </h3>


        {/* Gold Accent Line */}
        <div className="mt-8 h-[2px] w-24 bg-[#B89A5A]" />


        {/* Description */}
        <p
          className="
            mt-7
            max-w-3xl
            font-body
            text-lg
            leading-relaxed
            text-[#E6EEF2]
            md:text-xl
          "
        >
          From the classrooms where friendships began to the memories
          that continue to connect generations, OXAR carries forward
          the spirit of the Xavierian community.
        </p>


        {/* CTA */}
        <Link
          to="/about"
          className="
            group
            mt-9
            inline-flex
            items-center
            gap-4
            font-body
            text-sm
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white
            transition-colors
            duration-300
            hover:text-[#B89A5A]
          "
        >
          Discover our history

          <ArrowRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-2
            "
          />
        </Link>

      </div>

    </div>
  </div>


  {/* =========================================
      BOTTOM ORNAMENT
      ========================================= */}
  <div className="mx-auto mt-12 flex max-w-5xl items-center justify-center gap-4 px-6">

    <span className="h-px flex-1 bg-[#D8C7A0]" />

    <span className="text-xl text-[#B89A5A]">
      ✦
    </span>

    <span className="h-px flex-1 bg-[#D8C7A0]" />

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
