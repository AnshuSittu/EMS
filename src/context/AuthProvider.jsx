import React, { createContext, useEffect, useMemo, useState } from 'react'
import { getLocalStorage, setLocalStroage } from '../utils/localStorage'

export const AuthContext = createContext(null)

const normalizeEmployees = (records) => (Array.isArray(records) ? records : [])
const normalizeAdmins = (records) => (Array.isArray(records) ? records : [])

const AuthProvider = ({ children }) => {
  const [employeeRecords, setEmployeeRecords] = useState([])
  const [adminUsers, setAdminUsers] = useState([])

  useEffect(() => {
    setLocalStroage()
    const { employees: storedEmployees, admin } = getLocalStorage()
    setEmployeeRecords(normalizeEmployees(storedEmployees))
    setAdminUsers(normalizeAdmins(admin))
  }, [])

  const contextValue = useMemo(
    () => ({
      employees: employeeRecords,
      admin: adminUsers,
      setEmployees: (nextEmployees) => {
        setEmployeeRecords((prev) => {
          if (typeof nextEmployees === 'function') {
            return normalizeEmployees(nextEmployees(prev))
          }
          return normalizeEmployees(nextEmployees)
        })
      },
      refresh: () => {
        const { employees: storedEmployees, admin } = getLocalStorage()
        setEmployeeRecords(normalizeEmployees(storedEmployees))
        setAdminUsers(normalizeAdmins(admin))
      },
    }),
    [employeeRecords, adminUsers]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
