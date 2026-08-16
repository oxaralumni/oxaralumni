import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { supabase } from '../supabaseClient'

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        setProfile(data)
      })
    } else {
      setProfile(null)
    }
  }, [user])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const isJoinPage = location.pathname.startsWith('/join')
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Council', path: '/council' },
    { name: 'Batch Coordinators', path: '/coordinators' },
    { name: 'Distinguished Alumni', path: '/distinguished' },
    { name: 'Scholarships', path: '/scholarships' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Careers & Jobs', path: '/careers' },
    { name: 'Business Directory', path: '/business-directory' },
    { name: 'Events', path: '/events' },
    { name: 'News', path: '/news' },
  ]

  // If user is authenticated, we show "Social Feed"
  if (user) {
    navLinks.push({ name: 'Social Feed', path: '/feed' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9fd] text-[#1a1c1f]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E0E0E0] shadow-sm">
      <div className="flex items-center h-16 w-full">
    
      {/* OXAR Logo - Far Left */}
      <div className="flex items-center">
        <Link to="/" className="flex-shrink-0 flex items-center">
          <span className="font-title font-extrabold text-lg text-primary tracking-tight">
            OXAR
          </span>
        </Link>
      </div>
    
      {/* Navigation - Right Side */}
      <nav className="hidden lg:flex ml-auto items-center space-x-2 mr-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`inline-flex items-center px-2 py-2 text-sm font-semibold font-body border-b-2 transition-all duration-200 ${
              location.pathname === link.path
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-primary hover:border-gray-300'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    
      {/* Login / Join - Far Right */}
      <div className="hidden lg:flex items-center">
        {user ? (
          <div className="flex items-center space-x-4">
            {profile?.is_admin && (
              <Link
                to="/admin"
                className="text-sm font-medium text-secondary hover:text-secondary-dark"
              >
                Admin Panel
              </Link>
            )}
    
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary"
            >
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">
                {profile?.full_name || 'My Profile'}
              </span>
            </Link>
    
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-800"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <>
            {isJoinPage ? (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-all duration-250"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-500 hover:text-primary"
                >
                  Login
                </Link>
    
                <Link
                  to="/join"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-all duration-250"
                >
                  Join
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    
      {/* Mobile Hamburger */}
      <div className="flex items-center lg:hidden ml-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    
    </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#E0E0E0] bg-white px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-200">
              {user ? (
                <div className="space-y-1">
                  {profile?.is_admin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-secondary"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700"
                  >
                    My Profile ({profile?.full_name})
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-3 flex space-x-4">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-1/2 text-center py-2 text-base font-medium text-gray-500 hover:text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/join"
                    onClick={() => setIsOpen(false)}
                    className="w-1/2 text-center py-2 border border-transparent rounded-md text-white bg-primary hover:bg-primary-dark"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-primary text-white py-12 mt-auto border-t border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <span className="font-heading font-extrabold text-xl">OXAR Alumni</span>
            <p className="text-red-100/80 text-xs leading-relaxed max-w-sm">
              Connecting Xavier's graduates to build a stronger community and support the next generation of leaders.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-red-100 hover:text-white transition-colors">
                <span className="text-xs font-semibold">LinkedIn</span>
              </a>
              <a href="#" className="text-red-100 hover:text-white transition-colors">
                <span className="text-xs font-semibold">Facebook</span>
              </a>
              <a href="#" className="text-red-100 hover:text-white transition-colors">
                <span className="text-xs font-semibold">Contact</span>
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-heading font-bold text-sm">Quick Links</h4>
            <a href="#" className="text-red-100/80 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-red-100/80 hover:text-white text-xs transition-colors">Terms of Service</a>
            <Link to="/faq" className="text-red-100/80 hover:text-white text-xs transition-colors">Contact Us</Link>
            <a href="https://xaviersrohini.edu.in" target="_blank" rel="noopener noreferrer" className="text-red-100/80 hover:text-white text-xs transition-colors">School Website</a>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm">Newsletter</h4>
            <p className="text-red-100/80 text-xs">Stay updated with the latest alumni news and events.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }} className="flex">
              <input
                type="email"
                placeholder="Email address"
                required
                className="bg-white/10 border border-white/20 text-white rounded-l-md px-3 py-2 text-xs focus:ring-1 focus:ring-white focus:outline-none w-full placeholder:text-white/40"
              />
              <button
                type="submit"
                className="bg-secondary text-white hover:bg-secondary-dark px-4 py-2 rounded-r-md text-xs font-bold transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-red-100/60 text-xs">&copy; {new Date().getFullYear()} Xavier's Senior Secondary School, Rohini. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
