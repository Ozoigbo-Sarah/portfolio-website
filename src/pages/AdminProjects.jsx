import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import DashboardLayout from '../layouts/DashboardLayout'
import Button from '../components/Button'
import api from '../services/api'

const emptyForm = {
  title: '',
  description: '',
  image: '',
  category: 'Full Stack',
  tech: '',
  liveDemo: '',
  github: '',
  featured: false,
}

const categories = ['Full Stack', 'Frontend', 'Backend', 'AI/ML']

function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const res = await api.get('/projects')
      setProjects(res.data.data)
    } catch (err) {
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const openAddForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
    setShowForm(true)
    setError('')
  }

  const openEditForm = (project) => {
    setFormData({
      ...project,
      tech: project.tech.join(', '),
    })
    setEditingId(project._id)
    setShowForm(true)
    setError('')
  }

  const closeForm = () => {
    setShowForm(false)
    setFormData(emptyForm)
    setEditingId(null)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const payload = {
      ...formData,
      tech: formData.tech.split(',').map((t) => t.trim()).filter(Boolean),
    }

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload)
      } else {
        await api.post('/projects', payload)
      }
      closeForm()
      fetchProjects()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    try {
      await api.delete(`/projects/${id}`)
      fetchProjects()
    } catch (err) {
      setError('Failed to delete project')
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
          Manage Projects
        </h1>
        <Button onClick={openAddForm}>
          <FiPlus className="mr-2" /> Add Project
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-muted-light dark:text-muted-dark">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-muted-light dark:text-muted-dark">No projects yet. Add your first one.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-center justify-between gap-4 p-5 rounded-xl bg-surface-light dark:bg-surface-dark shadow-md"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-text-light dark:text-text-dark truncate">{project.title}</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">{project.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEditForm(project)} className="p-2 rounded-lg text-primary dark:text-primary-dark hover:bg-primary/10 transition-colors">
                  <FiEdit2 size={18} />
                </button>
                <button onClick={() => handleDelete(project._id)} className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-light dark:bg-surface-dark p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={closeForm} className="text-muted-light dark:text-muted-dark">
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              />

              <textarea
                name="description"
                placeholder="Description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark resize-none"
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <input
                type="text"
                name="tech"
                placeholder="Technologies (comma separated, e.g. React, Node.js)"
                value={formData.tech}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              />

              <input
                type="text"
                name="liveDemo"
                placeholder="Live Demo URL"
                value={formData.liveDemo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              />

              <input
                type="text"
                name="github"
                placeholder="GitHub URL"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              />

              <label className="flex items-center gap-2 text-sm text-text-light dark:text-text-dark">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Mark as Featured
              </label>

              <Button type="submit" className="justify-center mt-2">
                {editingId ? 'Update Project' : 'Create Project'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default AdminProjects