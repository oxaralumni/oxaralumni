import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import AlumniDirectory from './pages/AlumniDirectory'
import Events from './pages/Events'
import News from './pages/News'
import SocialFeed from './pages/SocialFeed'
import Join from './pages/Join'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import FAQ from './pages/FAQ'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/directory" element={<AlumniDirectory />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/feed" element={<SocialFeed />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  )
}
