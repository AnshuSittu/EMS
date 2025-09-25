// Tailwind-only fix: reduce card width so they don't stretch full-bleed on large screens
// Drop-in replacement for your TaskList component (no JS logic changed)
import React from "react";

const TaskList = () => {
  return (
    <div
      id="tasklist"
      className={`
        mt-8 w-full px-4 py-6

        /* center the scroller area and limit overall page width */
        max-w-7xl mx-auto

        /* mobile-first: stacked list */
        flex flex-col gap-4

        /* tablet+ : horizontal carousel, no wrap */
        sm:flex-row sm:flex-nowrap sm:items-start sm:gap-4

        /* always allow horizontal scrolling if cards overflow */
        overflow-x-auto

        /* smooth snap behavior on larger screens */
        sm:snap-x sm:snap-mandatory

        /* hide scrollbar (WebKit + Firefox) */
        [&::-webkit-scrollbar]:hidden [scrollbar-width:none]

        h-auto
      `}
    >
      {/* Card (repeat as many as needed) */}
      <div className="relative w-full sm:w-72 md:w-80 lg:w-72 flex-shrink-0 h-56 rounded-2xl bg-gradient-to-br from-orange-500/95 to-orange-400/95 text-white shadow-xl overflow-hidden snap-start">
        <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
            High
          </span>
          <time className="text-xs font-medium text-white/90">25 Sep 2025</time>
        </div>

        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-base sm:text-lg font-semibold leading-tight drop-shadow-sm">
            Make a daily React project
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
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

        <div className="absolute left-0 bottom-0 w-full h-1 bg-white/10" aria-hidden />
      </div>

      {/* duplicate cards — same classes so many cards will scroll nicely */}
      <div className="relative w-full sm:w-72 md:w-80 lg:w-72 flex-shrink-0 h-56 rounded-2xl bg-gradient-to-br from-emerald-500/95 to-emerald-400/95 text-white shadow-xl overflow-hidden snap-start">
       <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            Medium
          </span>
          <time className="text-xs font-medium text-white/90">25 Sep 2025</time>
        </div>
         <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-base sm:text-lg font-semibold leading-tight drop-shadow-sm">
            Make a daily React project
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
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
      </div>
       <div className="relative w-full sm:w-72 md:w-80 lg:w-72 flex-shrink-0 h-56 rounded-2xl bg-gradient-to-br from-blue-500/95 to-emerald-400/95 text-white shadow-xl overflow-hidden snap-start">
       <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            Moderate
          </span>
          <time className="text-xs font-medium text-white/90">25 Sep 2025</time>
        </div>
        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-base sm:text-lg font-semibold leading-tight drop-shadow-sm">
            Make a daily React project
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
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
      </div>

      <div className="relative w-full sm:w-72 md:w-80 lg:w-72 flex-shrink-0 h-56 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-200 text-black shadow-xl overflow-hidden snap-start">
        
        <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
            High
          </span>
          <time className="text-xs font-medium text-white/90">25 Sep 2025</time>
        </div>
        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-base sm:text-lg font-semibold leading-tight drop-shadow-sm">
            Make a daily React project
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
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
      </div>

      <div className="relative w-full sm:w-72 md:w-80 lg:w-72 flex-shrink-0 h-56 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-400 text-white shadow-xl overflow-hidden snap-start">
       <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
            High
          </span>
          <time className="text-xs font-medium text-white/90">25 Sep 2025</time>
        </div>
        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-base sm:text-lg font-semibold leading-tight drop-shadow-sm">
            Make a daily React project
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
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

      </div>

    </div>
  );
};

export default TaskList;
