// Console-style output (updated Tailwind-only CSS; no React logic added)
import React from 'react'

const TaskListNumber = () => {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 mt-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">Tasks • Overview</h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - New */}
          <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-sky-600 to-sky-500 text-white shadow-lg transform transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-none w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  {/* clipboard icon */}
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium opacity-95">New Tasks</p>
                  <p className="mt-1 text-2xl sm:text-3xl font-extrabold leading-tight">24</p>
                </div>
              </div>

              {/* small metric: % change */}
              <div className="text-right">
                <p className="text-sm font-medium text-white/90">+12%</p>
                <p className="text-xs text-white/80">since last week</p>
              </div>
            </div>

            {/* decorative sparkline (SVG) */}
            <div className="mt-4">
              <svg className="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <polyline fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" points="0,14 20,10 40,12 60,6 80,8 100,4" />
              </svg>
            </div>
          </div>

          {/* Card 2 - In Progress */}
          <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-emerald-500 to-emerald-400 text-white shadow-lg transform transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-none w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  {/* progress icon */}
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h12M3 17h6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium opacity-95">In Progress</p>
                  <p className="mt-1 text-2xl sm:text-3xl font-extrabold leading-tight">11</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-white/90">+4%</p>
                <p className="text-xs text-white/80">since yesterday</p>
              </div>
            </div>

            <div className="mt-4">
              <svg className="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <polyline fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" points="0,12 20,9 40,10 60,7 80,9 100,8" />
              </svg>
            </div>
          </div>

          {/* Card 3 - Accepted */}
          <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-amber-400 to-amber-300 text-black shadow-lg transform transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-none w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center">
                  {/* check icon */}
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium opacity-95">Accepted</p>
                  <p className="mt-1 text-2xl sm:text-3xl font-extrabold leading-tight">7</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-black/80">+2%</p>
                <p className="text-xs text-black/60">MoM</p>
              </div>
            </div>

            <div className="mt-4">
              <svg className="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <polyline fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2" points="0,14 20,14 40,12 60,11 80,9 100,6" />
              </svg>
            </div>
          </div>

          {/* Card 4 - Failed */}
          <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-rose-500 to-rose-400 text-white shadow-lg transform transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-none w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  {/* alert icon */}
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium opacity-95">Failed</p>
                  <p className="mt-1 text-2xl sm:text-3xl font-extrabold leading-tight">3</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-white/90">-8%</p>
                <p className="text-xs text-white/80">since last week</p>
              </div>
            </div>

            <div className="mt-4">
              <svg className="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <polyline fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" points="0,8 20,10 40,6 60,12 80,9 100,11" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TaskListNumber
