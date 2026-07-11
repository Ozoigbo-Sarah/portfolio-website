import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import DashboardLayout from '../layouts/DashboardLayout'
import Button from '../components/Button'
import api from '../services/api'

const iconOptions = ['FiCode', 'FiLayers', 'FiSmartphone', 'FiLink', 'FiRefreshCw', 'FiCpu']

const emptyForm = { title: '', description: '', icon: iconOptions[0] }

function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await api.get('/services')
      setServices(res.data.data)
    } catch (err) {
      setError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const openAddForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const openEditForm = (service) => {
    setFormData(service)
    setEditingId(service._id)
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
        await api.put(`/services/${editingId}`, formData)
      } else {
        await api.post('/services', formData)
      }
      closeForm()
      fetchServices()
    } catch (err) {
      setError('Failed to save service')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return
    try {
      await api.delete(`/services/${id}`)
      fetchServices()
    } catch (err) {
      setError('Failed to delete service')
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
          Manage Services
        </h1>
        <Button onClick={openAddForm}>
          <FiPlus className="mr-2" /> Add Service
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-muted-light dark:text-muted-dark">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-muted-light dark:text-muted-dark">No services yet.</p>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <div key={service._id} className="flex items-center justify-between gap-4 p-5 rounded-xl bg-surface-light dark:bg-surface-dark shadow-md">
              <div className="min-w-0">
                <p className="font-bold text-text-light dark:text-text-dark">{service.title}</p>
                <p className="text-sm text-muted-light dark:text-muted-dark truncate">{service.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEditForm(service)} className="p-2 rounded-lg text-primary dark:text-primary-dark hover:bg-primary/10 transition-colors">
                  <FiEdit2 size={18} />
                </button>
                <button onClick={() => handleDelete(service._id)} className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors">
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
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={closeForm} className="text-muted-light dark:text-muted-dark">
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Service Title"
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

              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>

              <Button type="submit" className="justify-center mt-2">
                {editingId ? 'Update Service' : 'Create Service'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default AdminServices