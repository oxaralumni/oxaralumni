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
    { name: 'Alumni Directory', path: '/directory' },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="font-heading font-extrabold text-xl text-primary tracking-tight">OXAR Alumni</span>
              </Link>
              <nav className="hidden md:ml-8 md:flex md:space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium font-body border-b-2 transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-primary hover:border-gray-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right side CTA / Auth Info */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {profile?.is_admin && (
                    <Link to="/admin" className="text-sm font-medium text-secondary hover:text-secondary-dark">
                      Admin Panel
                    </Link>
                  )}
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{profile?.full_name || 'My Profile'}</span>
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
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-all duration-250"
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
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-all duration-250"
                      >
                        Join
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-[#E0E0E0] bg-white px-2 pt-2 pb-3 space-y-1">
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
      <footer className="bg-white border-t border-[#E0E0E0] mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} OXAR - Xavier's School Alumni Association. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/about" className="text-sm text-gray-400 hover:text-primary">About</Link>
            <Link to="/faq" className="text-sm text-gray-400 hover:text-primary">FAQs</Link>
            <Link to="/contact" className="text-sm text-gray-400 hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
