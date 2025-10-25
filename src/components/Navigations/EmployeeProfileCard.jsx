import React, { useMemo, useState } from 'react'
import ToastPortal from '../common/ToastPortal'

const formatDate = (value) => {
  if (!value) return '—';
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    return value;
  }
}

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs font-medium uppercase tracking-wide text-slate-400/80">
      {label}
    </span>
    <span className="mt-1 text-sm font-semibold text-white/90">{value || '—'}</span>
  </div>
)

const EmployeeProfileCard = ({ data, onProfileUpdate, onNotify }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formState, setFormState] = useState(() => ({
    name: data?.firstName ?? '',
    email: data?.email ?? '',
    occupation: data?.occupation ?? '',
    location: data?.location ?? '',
    dob: data?.dob ?? '',
    bio: data?.bio ?? '',
  }))

  const [toast, setToast] = useState(null)
  const [error, setError] = useState(null)

  const profileFields = useMemo(
    () => [
      { label: 'Email', value: data?.email },
      { label: 'Occupation', value: data?.occupation },
      { label: 'Location', value: data?.location },
      { label: 'Date of Birth', value: formatDate(data?.dob) },
    { label: 'Joined Task Management System', value: formatDate(data?.createdAt) },
    ],
    [data]
  )

  const canEdit = typeof onProfileUpdate === 'function'

  if (!data) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setFormState({
      name: data.firstName ?? '',
      email: data.email ?? '',
      occupation: data.occupation ?? '',
      location: data.location ?? '',
      dob: data.dob ?? '',
      bio: data.bio ?? '',
    })
    setError(null)
    setIsEditing(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError(null)

    if (!formState.name.trim()) {
      setError('Name cannot be empty.')
      return
    }

    if (!formState.email.trim()) {
      setError('Email cannot be empty.')
      return
    }

    const payload = {
      firstName: formState.name.trim(),
      email: formState.email.trim(),
      occupation: formState.occupation.trim(),
      location: formState.location.trim(),
      dob: formState.dob,
      bio: formState.bio.trim(),
    }

    onProfileUpdate?.(payload)
    setIsEditing(false)
    setToast('Profile updated successfully.')
    onNotify?.('Profile updated successfully.')
  }

  return (
    <section className="mt-8 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/10 backdrop-blur">
      <ToastPortal message={toast} onClose={() => setToast(null)} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/70">
            Profile Snapshot
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {data.firstName || 'Employee'}
          </h3>
          {data.bio && !isEditing && (
            <p className="mt-2 text-sm text-slate-200/70">{data.bio}</p>
          )}
        </div>
        {canEdit && (
          <button
            type="button"
            onClick={() => {
              setIsEditing((prev) => !prev)
              setError(null)
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-sky-500/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-500/30"
          >
            {isEditing ? 'Close Editor' : 'Edit profile'}
          </button>
        )}
      </div>

      {!isEditing || !canEdit ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profileFields.map((field) => (
            <InfoRow key={field.label} label={field.label} value={field.value} />
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5 text-white sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-slate-200/70">
            Full Name
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-slate-200/70">
            Email
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="name@company.com"
            />
          </label>

          <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-slate-200/70">
            Occupation
            <input
              type="text"
              name="occupation"
              value={formState.occupation}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Your role"
            />
          </label>

          <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-slate-200/70">
            Location
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="City, Country"
            />
          </label>

          <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-slate-200/70">
            Date of Birth
            <input
              type="date"
              name="dob"
              value={formState.dob}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </label>

          <label className="sm:col-span-2 flex flex-col text-xs font-medium uppercase tracking-wide text-slate-200/70">
            Bio
            <textarea
              name="bio"
              value={formState.bio}
              onChange={handleChange}
              rows={3}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="How do you like to work?"
            />
          </label>

          {error && (
            <p className="sm:col-span-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200">
              {error}
            </p>
          )}

          <div className="sm:col-span-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

export default EmployeeProfileCard
