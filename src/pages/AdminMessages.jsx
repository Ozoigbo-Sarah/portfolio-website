import { useState, useEffect } from 'react'
import { FiTrash2, FiMail, FiCheck } from 'react-icons/fi'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../services/api'

function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const res = await api.get('/contact')
      setMessages(res.data.data)
    } catch (err) {
      setError('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const openMessage = async (msg) => {
    setSelected(msg)
    if (!msg.read) {
      try {
        await api.put(`/contact/${msg._id}/read`)
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m))
        )
      } catch (err) {
        console.error('Failed to mark as read')
      }
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await api.delete(`/contact/${id}`)
      setMessages((prev) => prev.filter((m) => m._id !== id))
      if (selected?._id === id) setSelected(null)
    } catch (err) {
      setError('Failed to delete message')
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-8">
        Messages
      </h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-muted-light dark:text-muted-dark">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-light dark:text-muted-dark">No messages yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => openMessage(msg)}
                className={`text-left p-4 rounded-xl shadow-md transition-colors ${
                  selected?._id === msg._id
                    ? 'bg-primary/10 dark:bg-primary-dark/10'
                    : 'bg-surface-light dark:bg-surface-dark'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {msg.read ? (
                      <FiCheck size={16} className="text-muted-light dark:text-muted-dark" />
                    ) : (
                      <FiMail size={16} className="text-primary dark:text-primary-dark" />
                    )}
                    <p className={`text-sm ${msg.read ? 'font-medium' : 'font-bold'} text-text-light dark:text-text-dark`}>
                      {msg.name}
                    </p>
                  </div>
                  <span className="text-xs text-muted-light dark:text-muted-dark">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-light dark:text-muted-dark truncate">
                  {msg.subject}
                </p>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-md h-fit">
            {selected ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-text-light dark:text-text-dark">
                      {selected.subject}
                    </h2>
                    <p className="text-sm text-muted-light dark:text-muted-dark">
                      From {selected.name} ({selected.email})
                    </p>
                    <p className="text-xs text-muted-light dark:text-muted-dark mt-1">
                      {formatDate(selected.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selected._id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
                <p className="text-text-light dark:text-text-dark leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
                <a href={`mailto:${selected.email}`} className="inline-block mt-6 text-sm font-medium text-primary dark:text-primary-dark hover:underline">
                  Reply via Email
                </a>
              </>
            ) : (
              <p className="text-muted-light dark:text-muted-dark text-center py-10">
                Select a message to view details
              </p>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default AdminMessages