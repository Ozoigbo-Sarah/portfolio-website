import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'))
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('adminInfo')
    return saved ? JSON.parse(saved) : null
  })

  const login = (newToken, adminData) => {
    localStorage.setItem('adminToken', newToken)
    localStorage.setItem('adminInfo', JSON.stringify(adminData))
    setToken(newToken)
    setAdmin(adminData)
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminInfo')
    setToken(null)
    setAdmin(null)
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, admin, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}