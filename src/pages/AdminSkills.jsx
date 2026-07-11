import { useState, useEffect } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import DashboardLayout from '../layouts/DashboardLayout'
import Button from '../components/Button'
import api from '../services/api'

const categories = ['Frontend', 'Backend', 'AI and Machine Learning', 'Tools']

function AdminSkills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState(categories[0])

  const fetchSkills = async () => {
    try {
      setLoading(true)
      const res = await api.get('/skills')
      setSkills(res.data.data)
    } catch (err) {
      setError('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    try {
      await api.post('/skills', { name, category })
      setName('')
      fetchSkills()
    } catch (err) {
      setError('Failed to add skill')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return
    try {
      await api.delete(`/skills/${id}`)
      fetchSkills()
    } catch (err) {
      setError('Failed to delete skill')
    }
  }

  const skillsByCategory = categories.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  }))

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-8">
        Manage Skills
      </h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 mb-10">
        <input
          type="text"
          placeholder="Skill name (e.g. React)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <Button type="submit">
          <FiPlus className="mr-2" /> Add Skill
        </Button>
      </form>

      {loading ? (
        <p className="text-muted-light dark:text-muted-dark">Loading skills...</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {skillsByCategory.map((group) => (
            <div key={group.category} className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-md">
              <h3 className="font-bold text-text-light dark:text-text-dark mb-3">
                {group.category}
              </h3>
              {group.items.length === 0 ? (
                <p className="text-sm text-muted-light dark:text-muted-dark">No skills added yet.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill._id}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-bg-light dark:bg-bg-dark text-sm text-text-light dark:text-text-dark"
                    >
                      {skill.name}
                      <button onClick={() => handleDelete(skill._id)} className="text-red-500 hover:text-red-600">
                        <FiTrash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

export default AdminSkills