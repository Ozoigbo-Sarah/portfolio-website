import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import DashboardLayout from '../layouts/DashboardLayout'
import Button from '../components/Button'
import api from '../services/api'

const emptyForm = { name: '', role: '', avatar: '', quote: '' }

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const res = await api.get('/testimonials')
      setTestimonials(res.data.data)
    } catch (err) {
      setError('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const openAddForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const openEditForm = (testimonial) => {
    setFormData(testimonial)
    setEditingId(testimonial._id)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setFormData(emptyForm)
    setEditingId(null)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, formData)
      } else {
        await api.post('/testimonials', formData)
      }
      closeForm()
      fetchTestimonials()
    } catch (err) {
      setError('Failed to save testimonial')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return
    try {
      await api.delete(`/testimonials/${id}`)
      fetchTestimonials()
    } catch (err) {
      setError('Failed to delete testimonial')
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
          Manage Testimonials
        </h1>
        <Button onClick={openAddForm}>
          <FiPlus className="mr-2" /> Add Testimonial
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-muted-light dark:text-muted-dark">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-muted-light dark:text-muted-dark">No testimonials yet.</p>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((t) => (
            <div key={t._id} className="flex items-center justify-between gap-4 p-5 rounded-xl bg-surface-light dark:bg-surface-dark shadow-md">
              <div className="flex items-center gap-4 min-w-0">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-text-light dark:text-text-dark">{t.name}</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark truncate">{t.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEditForm(t)} className="p-2 rounded-lg text-primary dark:text-primary-dark hover:bg-primary/10 transition-colors">
                  <FiEdit2 size={18} />
                </button>
                <button onClick={() => handleDelete(t._id)} className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg rounded-2xl bg-surface-light dark:bg-surface-dark p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button onClick={closeForm} className="text-muted-light dark:text-muted-dark">
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Client Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              />

              <input
                type="text"
                name="role"
                placeholder="Role (e.g. Startup Founder)"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              />

              <input
                type="text"
                name="avatar"
                placeholder="Avatar Image URL"
                value={formData.avatar}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              />

              <textarea
                name="quote"
                placeholder="Testimonial quote"
                rows="4"
                value={formData.quote}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark resize-none"
              />

              <Button type="submit" className="justify-center mt-2">
                {editingId ? 'Update Testimonial' : 'Create Testimonial'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default AdminTestimonials