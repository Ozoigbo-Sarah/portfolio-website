import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiGrid, FiFolder, FiMail, FiAward, FiBriefcase, FiStar, FiLogOut, FiMenu, FiX, FiExternalLink } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <FiGrid size={18} /> },
  { name: 'Projects', path: '/admin/projects', icon: <FiFolder size={18} /> },
  { name: 'Skills', path: '/admin/skills', icon: <FiAward size={18} /> },
  { name: 'Services', path: '/admin/services', icon: <FiBriefcase size={18} /> },
  { name: 'Testimonials', path: '/admin/testimonials', icon: <FiStar size={18} /> },
  { name: 'Messages', path: '/admin/messages', icon: <FiMail size={18} /> },
]

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-bg-light dark:bg-bg-dark">
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-surface-light dark:bg-surface-dark shadow-lg z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <p className="text-xl font-bold text-text-light dark:text-text-dark">
            Sarah<span className="text-primary dark:text-primary-dark">.</span> Admin
          </p>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-text-light dark:text-text-dark">
            <FiX size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary dark:bg-primary-dark text-white'
                  : 'text-muted-light dark:text-muted-dark hover:bg-primary/10'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-bg-light dark:border-bg-dark">
          <p className="text-xs text-muted-light dark:text-muted-dark px-4 mb-2">
            {admin?.email}
          </p>
          <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-light dark:text-muted-dark hover:bg-primary/10 transition-colors w-full">
            <FiExternalLink size={18} />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors w-full"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark shadow-sm">
          <p className="font-bold text-text-light dark:text-text-dark">Admin Panel</p>
          <button onClick={() => setSidebarOpen(true)} className="text-text-light dark:text-text-dark">
            <FiMenu size={22} />
          </button>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout