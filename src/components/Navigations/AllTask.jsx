import React, { useEffect, useRef, useState } from "react";

const STATUS_LABELS = {
  newTask: "New",
  inProgress: "In Progress",
  completed: "Completed",
  accepted: "Accepted",
  failed: "Failed",
};

const STATUS_ORDER = [
  "newTask",
  "inProgress",
  "completed",
  "accepted",
  "failed",
];

const STATUS_BADGES = {
  newTask: "bg-orange-500/20 text-orange-100",
  inProgress: "bg-blue-500/20 text-blue-100",
  completed: "bg-emerald-500/20 text-emerald-100",
  accepted: "bg-amber-500/20 text-amber-100",
  failed: "bg-rose-500/25 text-rose-100",
};

const ITEMS_PER_BATCH = 10;

const AllTask = ({ tasks = [], onStatusChange, statusFilter = "all" }) => {
  const readOnly = typeof onStatusChange !== "function";
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const scrollRef = useRef(null);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [tasks]);

  const handleScroll = (event) => {
    const target = event.currentTarget;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 24) {
      setVisibleCount((prev) =>
        Math.min(prev + ITEMS_PER_BATCH, tasks.length)
      );
    }
  };

  if (!tasks.length) {
    return (
      <section className="mt-8 rounded-2xl border border-white/15 bg-white/5 px-5 py-12 text-center text-sm text-white/70">
        No tasks available yet. Create a task to get started.
      </section>
    );
  }

  const filterLabel =
    statusFilter === "all" ? "All statuses" : STATUS_LABELS[statusFilter] ?? "Filtered";

  return (
    <section className="mt-8 space-y-3 overflow-hidden rounded-2xl border border-white/15 bg-[#1c1c1c]/80 p-5 shadow-inner">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">All Tasks</h2>
          <p className="text-xs text-white/60">
            Manage every task in one place. Update status to keep everyone in
            sync.
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
          {tasks.length} total • {filterLabel}
        </span>
      </header>

      <div
        className="space-y-3 max-h-[32rem] overflow-y-auto pr-1"
        onScroll={handleScroll}
        ref={scrollRef}
      >
        {tasks.slice(0, visibleCount).map((task) => {
          const status = STATUS_LABELS[task.status] ?? "New";
          const badgeClass = STATUS_BADGES[task.status] ?? STATUS_BADGES.newTask;
          const key =
            task.id ??
            `${task.employeeId ?? "emp"}-${task.taskIndex ?? "idx"}-${
              task.taskTitle ?? "task"
            }`;

          return (
            <article
              key={key}
              className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-white shadow-sm transition hover:border-white/25 hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold">{task.taskTitle}</h3>
                <p className="text-xs text-white/60">
                  Assigned to{" "}
                  <span className="font-medium text-white">
                    {task.employeeName ?? "Unknown"}
                  </span>
                </p>
                {task.taskDate && (
                  <p className="text-xs text-white/40">
                    Due on <span className="text-white/60">{task.taskDate}</span>
                  </p>
                )}
                {task.category && (
                  <p className="text-xs text-white/40">
                    Category:{" "}
                    <span className="text-white/60">{task.category}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
                >
                  {status}
                </span>

                <select
                  value={task.status}
                  onChange={(event) =>
                    onStatusChange?.(
                      task.employeeId,
                      { id: task.id, index: task.taskIndex },
                      event.target.value
                    )
                  }
                  disabled={readOnly}
                  className="rounded-lg border border-white/15 bg-[#262626] px-3 py-2 text-xs font-medium text-white shadow-inner focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {STATUS_ORDER.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-slate-800 text-white"
                    >
                      {STATUS_LABELS[option]}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          );
        })}
      </div>
      {visibleCount < tasks.length && (
        <p className="pt-2 text-center text-xs text-white/60">
          Scroll to load more tasks ({visibleCount}/{tasks.length})
        </p>
      )}
    </section>
  );
};

export default AllTask;
