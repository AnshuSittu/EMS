import React, { useEffect } from 'react'

const ToastPortal = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      onClose?.()
    }, 2600)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  const tone = type === 'error'
    ? 'bg-rose-500/95 border-rose-400/70'
    : 'bg-emerald-500/95 border-emerald-400/70'

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] flex items-start justify-center px-4 pt-16">
      <div
        className={`pointer-events-auto inline-flex max-w-md items-center gap-3 rounded-2xl border px-5 py-3 text-sm text-white shadow-2xl shadow-black/30 backdrop-blur ${tone}`}
      >
        {type === 'error' ? (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-base font-bold">
            !
          </span>
        ) : (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-base font-bold">
            ✓
          </span>
        )}
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ToastPortal
