import React from 'react'
import AcceptTask from './AcceptTask'

const InProgressTask = ({data}) => {
  return (
    <div>

       <div className="relative w-full sm:w-72 md:w-80 lg:w-72 flex-shrink-0 h-80 rounded-2xl bg-gradient-to-br from-blue-500/95 to-emerald-400/95 text-white shadow-xl overflow-hidden snap-start">
       <div className="flex justify-between items-start px-5 pt-4">
          <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
           In Progress
          </span>
          <time className="text-xs font-medium text-white/90">{data.taskDate}</time>
        </div>
        <div className="px-5 pb-5 pt-4 sm:pt-6">
          <h2 className="mt-2 text-base sm:text-lg font-semibold leading-tight drop-shadow-sm">
           {data.taskTitle}
          </h2>

          <p className="mt-2 text-sm sm:text-sm text-white/85 line-clamp-3">
            {data.taskDescription}
          </p>

          <div className="mt-4 flex items-center justify-between">
          <AcceptTask data={data}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InProgressTask