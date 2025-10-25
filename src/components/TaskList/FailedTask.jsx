import React from 'react'
import AcceptTask from './AcceptTask'
import SubTaskSection from './SubTaskSection'

const FailedTask = ({ data, onAddSubTask, onUpdateStatus }) => {
  const subTasks = Array.isArray(data?.subTasks) ? data.subTasks : []

  return (
    <div className="relative w-full sm:w-72 md:w-80 lg:w-72 flex-shrink-0 min-h-[22rem] rounded-2xl bg-gradient-to-br from-rose-500 to-rose-400 text-white shadow-xl overflow-hidden snap-start">
      <div className="flex justify-between items-start px-5 pt-4">
        <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
          Failed Task
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

        <div className="mt-4">
          <AcceptTask
            actions={['inProgress', 'completed']}
            onUpdateStatus={onUpdateStatus}
          />
        </div>

        <SubTaskSection
          subTasks={subTasks}
          onAddSubTask={onAddSubTask}
        />
      </div>
    </div>
  )
}

export default FailedTask
