import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LocaleProvider } from './i18n'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Login from './pages/admin/Login'
import ManageCourses from './pages/admin/ManageCourses'
import ManageBlogs from './pages/admin/ManageBlogs'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

function Layout({ children }) {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LocaleProvider>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/courses" element={<ProtectedRoute><AdminLayout><ManageCourses /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute><AdminLayout><ManageBlogs /></AdminLayout></ProtectedRoute>} />
        </Routes>
      </Layout>
      </LocaleProvider>
    </BrowserRouter>
  )
}
