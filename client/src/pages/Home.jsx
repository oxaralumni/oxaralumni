import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Award, Briefcase, BookOpen } from 'lucide-react'
import { supabase } from '../supabaseClient'

export default function Home() {
  const [featuredAlumni, setFeaturedAlumni] = useState([])
  const [recentNews, setRecentNews] = useState([])

  useEffect(() => {
    // Fetch some profiles for spotlight
    supabase.from('profiles')
      .select('*')
      .eq('approved', true)
      .limit(4)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setFeaturedAlumni(data)
        } else {
          // Mock profiles if empty
          setFeaturedAlumni([
            { id: 1, full_name: 'Dr. Elena Rodriguez', batch: 'Class of 2008', job_title: 'Lead Quantum Researcher', company: 'Global Science Institute', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
            { id: 2, full_name: 'Amit Patel', batch: 'Class of 2012', job_title: 'VP of Technology', company: 'EcoScale Innovations', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
            { id: 3, full_name: 'Sophia Chen', batch: 'Class of 2015', job_title: 'Creative Director', company: 'Studio Pixel', avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
          ])
        }
      })

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
          style={{ backgroundImage: `url('https://xaviersrohini.edu.in/images/About-School.png')` }}
        />
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none mb-6">
            Welcome to the OXAR Alumni Network
          </h1>
          <p className="font-body text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Reconnect with classmates, share milestones, discover upcoming events, and participate in mentoring the next generation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/join"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-blue-50 shadow-md transition-all duration-250"
            >
              Join the Community
            </Link>
            <Link
              to="/directory"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary transition-all duration-250"
            >
              Explore Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Alumni Spotlight Carousel */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-primary">Alumni Spotlight</h2>
          <p className="font-body text-gray-500 mt-2">Celebrating achievements and career journeys of our alumni community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredAlumni.map((alum) => (
            <div key={alum.id} className="bg-white border border-[#E0E0E0] rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-250 flex flex-col items-center text-center">
              <img
                src={alum.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt={alum.full_name}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 mb-4"
              />
              <h3 className="font-heading font-bold text-lg text-primary">{alum.full_name}</h3>
              <p className="font-body text-xs text-secondary font-semibold mb-2">{alum.batch}</p>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                <span>{alum.job_title}</span>
              </div>
              <p className="text-xs text-gray-400">{alum.company}</p>
            </div>
          ))}
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
