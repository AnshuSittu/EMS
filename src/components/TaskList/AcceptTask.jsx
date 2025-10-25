import React from 'react'

const ACTION_PRESETS = {
  completed: {
    label: 'Mark as Completed',
    className:
      'bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-emerald-400/40',
  },
  failed: {
    label: 'Mark as Failed',
    className: 'bg-rose-500/90 hover:bg-rose-500 text-white shadow-rose-400/40',
  },
  inProgress: {
    label: 'Move to In Progress',
    className:
      'bg-sky-500/90 hover:bg-sky-500 text-white shadow-sky-400/40',
  },
  newTask: {
    label: 'Send Back to Pending',
    className: 'bg-amber-500/90 hover:bg-amber-500 text-white shadow-amber-400/40',
  },
}

const AcceptTask = ({ actions = ['completed', 'failed'], onUpdateStatus }) => {
  if (!actions.length) return null

  return (
    <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white shadow-inner backdrop-blur-sm">
      <div className="flex flex-wrap justify-center gap-3">
        {actions.map((action) => {
          const preset = ACTION_PRESETS[action]
          if (!preset) return null
          return (
            <button
              key={action}
              type="button"
              onClick={() => onUpdateStatus?.(action)}
              disabled={!onUpdateStatus}
              className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wide shadow transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:cursor-not-allowed disabled:opacity-60 ${preset.className}`}
            >
              {preset.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default AcceptTask
