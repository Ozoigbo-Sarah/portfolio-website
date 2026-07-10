import { useEffect, useState } from 'react'
import { FiFolder, FiMail } from 'react-icons/fi'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../services/api'

function DashboardHome() {
  const [projectCount, setProjectCount] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projectsRes = await api.get('/projects')
        setProjectCount(projectsRes.data.data.length)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-8">
        Dashboard Overview
      </h1>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-md flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark">
            <FiFolder size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-light dark:text-text-dark">
              {loading ? '...' : projectCount}
            </p>
            <p className="text-sm text-muted-light dark:text-muted-dark">Total Projects</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-md flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark">
            <FiMail size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-light dark:text-text-dark">
              {loading ? '...' : messageCount}
            </p>
            <p className="text-sm text-muted-light dark:text-muted-dark">Messages</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardHome