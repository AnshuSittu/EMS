// Tailwind-only styling changes (no JS logic changes)
// Professional, responsive card list with horizontal snap scrolling on sm+
// Scrollbar hidden using Tailwind arbitrary selector for WebKit and Firefox
import React from "react";

const TaskList = () => {
  return (
    <div
      id="tasklist"
      className={
        `
        mt-8 w-full px-4 py-6
        flex flex-col items-stretch gap-4

        sm:flex-row sm:items-start sm:gap-4 sm:overflow-x-auto sm:whitespace-nowrap sm:snap-x sm:snap-mandatory

        /* hide scrollbar: WebKit and Firefox via Tailwind arbitrary selectors */
        sm:[&::-webkit-scrollbar]:hidden sm:[scrollbar-width:none]

        h-auto
        `
      }
    >
      {/* Card */}
      <div className="relative w-full sm:w-[320px] flex-shrink-0 h-56 sm:h-56 rounded-2xl bg-gradient-to-br from-orange-500/95 to-orange-400/95 text-white shadow-xl overflow-hidden snap-start">
        {/* top row: priority pill + date */}
        <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
            High
          </span>
          <time className="text-xs font-medium text-white/90">25 Sep 2025</time>
        </div>

        {/* content */}
        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-lg sm:text-xl font-semibold leading-tight drop-shadow-sm">
            Make a daily React project
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          {/* optional footer row with subtle metadata */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                {/* simple inline SVG icon — no dependencies */}
                <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-xs text-white/90">UI / Frontend</span>
            </div>

            <div className="text-xs text-white/80 bg-white/6 px-2 py-1 rounded-md">
              Due: 2d
            </div>
          </div>
        </div>

        {/* decorative bottom accent */}
        <div className="absolute left-0 bottom-0 w-full h-1 bg-white/10" aria-hidden />
      </div>

      {/* Duplicate cards — keep markup same, only classes changed above. */}
      <div className="relative w-full sm:w-[320px] flex-shrink-0 h-56 sm:h-56 rounded-2xl bg-gradient-to-br from-emerald-500/95 to-emerald-400/95 text-white shadow-xl overflow-hidden snap-start">
        <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            High
          </span>
          <time className="text-xs font-medium text-white/90">20 Feb 2024</time>
        </div>

        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-lg sm:text-xl font-semibold leading-tight drop-shadow-sm">
            Example task
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Example Aisa kahi nahi dekha hoga jaisa — quick description to match the mobile design.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h12M3 17h6" />
                </svg>
              </div>
              <span className="text-xs text-white/90">Backend</span>
            </div>

            <div className="text-xs text-white/80 bg-white/6 px-2 py-1 rounded-md">
              Due: 5d
            </div>
          </div>
        </div>

        <div className="absolute left-0 bottom-0 w-full h-1 bg-white/10" aria-hidden />
      </div>

      <div className="relative w-full sm:w-[320px] flex-shrink-0 h-56 sm:h-56 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-200 text-black shadow-xl overflow-hidden snap-start">
        <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-black/6 text-xs font-semibold text-black px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            High
          </span>
          <time className="text-xs font-medium text-black/70">8 Feb 2024</time>
        </div>

        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-lg sm:text-xl font-semibold leading-tight">
            Task three
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-black/80 line-clamp-3">
            Example description / Accepted Task — concise and clipped for mobile.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
                <svg className="w-4 h-4 text-black/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-black/80">QA</span>
            </div>

            <div className="text-xs text-black/60 bg-black/5 px-2 py-1 rounded-md">
              Done
            </div>
          </div>
        </div>

        <div className="absolute left-0 bottom-0 w-full h-1 bg-black/6" aria-hidden />
      </div>

      <div className="relative w-full sm:w-[320px] flex-shrink-0 h-56 sm:h-56 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-400 text-white shadow-xl overflow-hidden snap-start">
        <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
            High
          </span>
          <time className="text-xs font-medium text-white/90">1 Feb 2024</time>
        </div>

        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-lg sm:text-xl font-semibold leading-tight">
            Task four
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Failed Task — short reason or note can go here for quick glance.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs text-white/90">Ops</span>
            </div>

            <div className="text-xs text-white/80 bg-white/6 px-2 py-1 rounded-md">
              Retry
            </div>
          </div>
        </div>


        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-lg sm:text-xl font-semibold leading-tight">
            Task four
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Failed Task — short reason or note can go here for quick glance.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs text-white/90">Ops</span>
            </div>

            <div className="text-xs text-white/80 bg-white/6 px-2 py-1 rounded-md">
              Retry
            </div>
          </div>
        </div>


        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-lg sm:text-xl font-semibold leading-tight">
            Task four
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Failed Task — short reason or note can go here for quick glance.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs text-white/90">Ops</span>
            </div>

            <div className="text-xs text-white/80 bg-white/6 px-2 py-1 rounded-md">
              Retry
            </div>
          </div>
        </div>

        <div className="absolute left-0 bottom-0 w-full h-1 bg-white/10" aria-hidden />
      </div>
    </div>
  );
};

export default TaskList;
