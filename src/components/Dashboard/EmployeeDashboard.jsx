import React, { useMemo, useState } from 'react'
import Header from '../Navigations/Header'
import TaskList from '../TaskList/TaskList'
import EmployeeTaskSummary from '../Navigations/EmployeeTaskSummary'
import EmployeeProfileCard from '../Navigations/EmployeeProfileCard'

const EmployeeDashboard = ({ data, onTaskCreate, onAddSubTask, onUpdateTaskStatus, onProfileUpdate, onAvatarUpdate }) => {
  if (!data) return null

  const tasks = useMemo(() => data.tasks ?? [], [data.tasks])
  const counts = useMemo(() => data.taskCounts ?? {}, [data.taskCounts])
  const totalTasks = tasks.length
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const handleOpenTaskModal = () => setIsTaskModalOpen(true)
  const handleCloseTaskModal = () => setIsTaskModalOpen(false)
  const activeTasks = counts.active ?? counts.inProgress ?? 0

  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_40%)]" />
      <Header data={data} onAvatarUpdate={onAvatarUpdate} />
      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-white/5 px-8 py-10 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.9)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/80">
                Workspace Overview
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                {data.firstName ? `Focus for today, ${data.firstName}.` : 'Focus for today.'}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-200/80">
                {data.occupation ? `${data.occupation} at our EMS workspace.` : 'Keep momentum on your active work.'} Close out in-flight items and capture new requests as soon as they land in your queue. Your task board updates instantly across the team.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-200/70">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> {activeTasks} active tasks
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-sky-400" /> {counts.inProgress ?? 0} in progress
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400" /> {counts.newTask ?? 0} pending
                </div>
              </div>
            </div>

            {onTaskCreate && (
              <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-transparent p-6 text-white shadow-inner">
                <p className="text-sm font-semibold">Need to log something new?</p>
                <p className="mt-2 text-xs text-slate-200/80">
                  Launch the task composer to capture requirements, set ownership, and track status. The board updates instantly.
                </p>
                <button
                  type="button"
                  onClick={handleOpenTaskModal}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold shadow-lg shadow-sky-500/40 transition hover:-translate-y-0.5 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  Launch Task Composer
                </button>
              </div>
            )}
          </div>

          <EmployeeTaskSummary counts={counts} totalTasks={totalTasks} className="mt-10" />

          <EmployeeProfileCard data={data} onProfileUpdate={onProfileUpdate} />

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/70">
                  Task Board
                </p>
                <h2 className="text-lg font-semibold text-white">Your current assignments</h2>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-slate-200/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live updates
              </div>
            </div>

            <TaskList
              data={data}
              onCreateTask={onTaskCreate}
              onAddSubTask={onAddSubTask}
              onUpdateTaskStatus={onUpdateTaskStatus}
              showCreateButton={false}
              createModalOpen={isTaskModalOpen}
              onRequestCloseCreate={handleCloseTaskModal}
              onRequestOpenCreate={handleOpenTaskModal}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default EmployeeDashboard
