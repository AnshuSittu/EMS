import React, { useState, useEffect, useRef } from 'react'
import { FiLogOut, FiUser } from 'react-icons/fi'

const Header = ({ data, onAvatarUpdate }) => {
  const [userName, setUserName] = useState('')
  const fileInputRef = useRef(null)

  // ✅ useEffect ensures setUserName runs only when `data` changes
  useEffect(() => {
    if (!data) {
      setUserName('Admin')
      return
    }

    const name = data.firstName || data.name || 'Admin'
    setUserName(name)
  }, [data])

  const logOutUser = ()=> {
    localStorage.setItem('loggedInUser', '')
    window.location.reload()
  }

  const handleAvatarClick = () => {
    if (!onAvatarUpdate) return
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        onAvatarUpdate?.(result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <header className="relative z-20 w-full px-4 py-6 text-white sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0b1b2c]/95 via-[#0d2236]/95 to-[#102a42]/95 p-6 shadow-[0_20px_45px_-20px_rgba(5,12,24,0.85)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleAvatarClick}
              className={`group inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-400 via-sky-500 to-blue-600 text-3xl font-semibold text-white shadow-lg shadow-sky-500/30 transition ${
                onAvatarUpdate ? 'hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-300' : ''
              }`}
            >
              {data?.avatar ? (
                <img
                  src={data.avatar}
                  alt={userName}
                  className="h-full w-full rounded-3xl object-cover"
                />
              ) : (
                <FiUser className="h-8 w-8" />
              )}
            </button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/65">
                Welcome back
              </p>
              <h1 className="mt-1 text-3xl font-semibold text-white sm:text-4xl">
                Hello, <span className="text-emerald-200">{userName}</span>
              </h1>
              {data?.email && (
                <p className="mt-1 text-sm text-slate-200/70">{data.email}</p>
              )}
            </div>
          </div>

          <button
            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/40 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-rose-300"
            aria-label="Log out"
            onClick={logOutUser}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg transition group-hover:bg-white/20">
              ➜
            </span>
            Log Out
          </button>
        </div>
        {onAvatarUpdate && (
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
        )}
      </header>
    </>
  )
}

export default Header
