import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Calendar, FileText, HelpCircle, Check, X, Shield, Plus, BarChart2, Image } from 'lucide-react'
import { supabase } from '../supabaseClient'

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState('overview')
  const [pendingAlumni, setPendingAlumni] = useState([])
  const [queries, setQueries] = useState([])
  const [stats, setStats] = useState({ alumniCount: 0, eventCount: 0, queryCount: 0 })
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Form States
  const [eventForm, setEventForm] = useState({ title: '', description: '', event_date: '', location: '', image_url: '' })
  const [newsForm, setNewsForm] = useState({ title: '', category: 'Reunion', content: '', excerpt: '', thumbnail_url: '', pdf_url: '' })
  const [galleryForm, setGalleryForm] = useState({ title: '', image_url: '', category: 'Reunion', year: '' })
  const [queryReply, setQueryReply] = useState({ id: '', reply: '' })

  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is admin
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login')
        return
      }
      
      supabase.from('profiles').select('*').eq('id', session.user.id).single()
        .then(({ data }) => {
          if (data?.is_admin) {
            setIsAdmin(true)
            fetchAdminData()
          } else {
            alert('Access Denied: Admin privileges required.')
            navigate('/')
          }
        })
    })
  }, [navigate])

  const fetchAdminData = async () => {
    setLoading(true)
    
    // 1. Pending Alumni
    const { data: alumni } = await supabase.from('profiles').select('*').eq('approved', false)
    setPendingAlumni(alumni || [])

    // 2. User Queries
    const { data: qlist } = await supabase.from('queries').select('*, profiles(full_name)').order('created_at', { ascending: false })
    setQueries(qlist || [])

    // 3. Stats
    const { count: totalAlumni } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
    const { count: totalEvents } = await supabase.from('events').select('*', { count: 'exact', head: true })
    const { count: totalQueries } = await supabase.from('queries').select('*', { count: 'exact', head: true }).eq('status', 'pending')

    setStats({
      alumniCount: totalAlumni || 0,
      eventCount: totalEvents || 0,
      queryCount: totalQueries || 0
    })

    setLoading(false)
  }

  const handleApproveAlumni = async (id) => {
    const { error } = await supabase.from('profiles').update({ approved: true }).eq('id', id)
    if (!error) {
      alert('Alumni approved successfully!')
      fetchAdminData()
    }
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('events').insert(eventForm)
    if (!error) {
      alert('Event created successfully!')
      setEventForm({ title: '', description: '', event_date: '', location: '', image_url: '' })
      fetchAdminData()
    }
  }

  const handleCreateNews = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('news').insert(newsForm)
    if (!error) {
      alert('News published successfully!')
      setNewsForm({ title: '', category: 'Reunion', content: '', excerpt: '', thumbnail_url: '', pdf_url: '' })
      fetchAdminData()
    }
  }

  const handleCreateGallery = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('gallery').insert(galleryForm)
    if (!error) {
      alert('Gallery item uploaded successfully!')
      setGalleryForm({ title: '', image_url: '', category: 'Reunion', year: '' })
      fetchAdminData()
    }
  }

  const handleReplyQuery = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('queries').update({
      reply: queryReply.reply,
      status: 'resolved'
    }).eq('id', queryReply.id)

    if (!error) {
      alert('Reply sent successfully!')
      setQueryReply({ id: '', reply: '' })
      fetchAdminData()
    }
  }

  if (loading || !isAdmin) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border border-[#E0E0E0] rounded-lg p-6 shadow-sm h-fit space-y-2">
        <div className="flex items-center space-x-2 text-primary font-heading font-extrabold mb-6 border-b border-gray-100 pb-3">
          <Shield className="h-6 w-6 text-secondary" />
          <span>Admin Portal</span>
        </div>
        <button
          onClick={() => setActiveModule('overview')}
          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeModule === 'overview' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <BarChart2 className="h-5 w-5" />
          <span>Overview Stats</span>
        </button>
        <button
          onClick={() => setActiveModule('alumni')}
          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeModule === 'alumni' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Users className="h-5 w-5" />
          <span>Approve Alumni ({pendingAlumni.length})</span>
        </button>
        <button
          onClick={() => setActiveModule('events')}
          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeModule === 'events' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span>Create Event</span>
        </button>
        <button
          onClick={() => setActiveModule('news')}
          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeModule === 'news' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <FileText className="h-5 w-5" />
          <span>Publish News</span>
        </button>
        <button
          onClick={() => setActiveModule('gallery')}
          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeModule === 'gallery' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Image className="h-5 w-5" />
          <span>Add Gallery Media</span>
        </button>
        <button
          onClick={() => setActiveModule('queries')}
          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeModule === 'queries' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <HelpCircle className="h-5 w-5" />
          <span>User Queries ({queries.filter(q => q.status === 'pending').length})</span>
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 bg-white border border-[#E0E0E0] rounded-lg p-8 shadow-sm">
        {/* Module: Overview */}
        {activeModule === 'overview' && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-primary border-b pb-3">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#f9f9fd] p-6 rounded-lg border flex flex-col items-center">
                <Users className="h-8 w-8 text-secondary mb-2" />
                <span className="text-2xl font-bold text-primary">{stats.alumniCount}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Total Profiles</span>
              </div>
              <div className="bg-[#f9f9fd] p-6 rounded-lg border flex flex-col items-center">
                <Calendar className="h-8 w-8 text-secondary mb-2" />
                <span className="text-2xl font-bold text-primary">{stats.eventCount}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Total Events</span>
              </div>
              <div className="bg-[#f9f9fd] p-6 rounded-lg border flex flex-col items-center">
                <HelpCircle className="h-8 w-8 text-secondary mb-2" />
                <span className="text-2xl font-bold text-primary">{stats.queryCount}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Pending Queries</span>
              </div>
            </div>
          </div>
        )}

        {/* Module: Alumni Approvals */}
        {activeModule === 'alumni' && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-primary border-b pb-3">Pending Registrations</h2>
            {pendingAlumni.length === 0 ? (
              <p className="text-sm text-gray-500">No pending registrations at this time.</p>
            ) : (
              <div className="space-y-4">
                {pendingAlumni.map((alum) => (
                  <div key={alum.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-primary">{alum.full_name}</h4>
                      <p className="text-xs text-gray-500">Batch {alum.batch} | ID: {alum.student_id || 'N/A'}</p>
                      <p className="text-xs text-gray-400 mt-1">{alum.degree} in {alum.major}</p>
                    </div>
                    <button
                      onClick={() => handleApproveAlumni(alum.id)}
                      className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-semibold"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      <span>Approve</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Module: Create Event */}
        {activeModule === 'events' && (
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-primary border-b pb-3">Create Upcoming Event</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Event Title</label>
              <input
                type="text"
                required
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea
                required
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                rows="4"
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Event Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={eventForm.event_date}
                  onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL</label>
              <input
                type="text"
                value={eventForm.image_url}
                onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
              />
            </div>
            <button type="submit" className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md text-sm font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              <span>Create Event</span>
            </button>
          </form>
        )}

        {/* Module: Publish News */}
        {activeModule === 'news' && (
          <form onSubmit={handleCreateNews} className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-primary border-b pb-3">Publish News Article / Newsletter</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                <select
                  value={newsForm.category}
                  onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm bg-white"
                >
                  <option value="Reunion">Reunion</option>
                  <option value="Campus">Campus</option>
                  <option value="Achievement">Achievement</option>
                  <option value="Newsletter">Newsletter</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Short Excerpt (Grid Summary)</label>
              <input
                type="text"
                required
                value={newsForm.excerpt}
                onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Full Article Content</label>
              <textarea
                required
                value={newsForm.content}
                onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                rows="4"
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={newsForm.thumbnail_url}
                  onChange={(e) => setNewsForm({ ...newsForm, thumbnail_url: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">PDF Newsletter Link (Optional)</label>
                <input
                  type="text"
                  value={newsForm.pdf_url}
                  onChange={(e) => setNewsForm({ ...newsForm, pdf_url: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
                />
              </div>
            </div>
            <button type="submit" className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md text-sm font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              <span>Publish News</span>
            </button>
          </form>
        )}

        {/* Module: Add Gallery */}
        {activeModule === 'gallery' && (
          <form onSubmit={handleCreateGallery} className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-primary border-b pb-3">Add Gallery Photo / Video</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Media Title</label>
              <input
                type="text"
                required
                value={galleryForm.title}
                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Image / Media URL</label>
                <input
                  type="text"
                  required
                  value={galleryForm.image_url}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Year</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2024"
                  value={galleryForm.year}
                  onChange={(e) => setGalleryForm({ ...galleryForm, year: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
              <select
                value={galleryForm.category}
                onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-sm bg-white"
              >
                <option value="Reunion">Reunion</option>
                <option value="Sports">Sports</option>
                <option value="Campus">Campus</option>
                <option value="Ceremony">Ceremony</option>
              </select>
            </div>
            <button type="submit" className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md text-sm font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              <span>Add Media</span>
            </button>
          </form>
        )}

        {/* Module: User Queries */}
        {activeModule === 'queries' && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-primary border-b pb-3">User Support Queries</h2>
            {queries.length === 0 ? (
              <p className="text-sm text-gray-500">No support queries found.</p>
            ) : (
              <div className="space-y-6">
                {queries.map((q) => (
                  <div key={q.id} className="border border-gray-200 rounded-lg p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded text-xxs font-semibold uppercase ${
                          q.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {q.status}
                        </span>
                        <h4 className="font-heading font-bold text-sm text-primary mt-1">{q.subject}</h4>
                        <p className="text-xxs text-gray-400">From: {q.profiles?.full_name || 'Alumni Member'} | {new Date(q.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="font-body text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-md">{q.message}</p>
                    
                    {q.reply ? (
                      <div className="bg-red-50 border border-red-100 p-3 rounded-md">
                        <span className="text-xxs font-bold text-primary block mb-1">Official Reply:</span>
                        <p className="font-body text-xs text-red-800">{q.reply}</p>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleReplyQuery()
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          required
                          placeholder="Type your official reply..."
                          value={queryReply.id === q.id ? queryReply.reply : ''}
                          onChange={(e) => setQueryReply({ id: q.id, reply: e.target.value })}
                          className="flex-grow border border-gray-300 rounded-md px-3 py-1 outline-none text-xs"
                        />
                        <button type="submit" onClick={() => setQueryReply({ ...queryReply, id: q.id })} className="bg-primary hover:bg-primary-dark text-white rounded-md px-4 py-1 text-xs font-semibold flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          <span>Send Reply</span>
                        </button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
