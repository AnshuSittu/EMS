import React from "react";

const StatCard = ({ title, value, accent, subtext, onClick, active }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${accent} px-5 py-6 text-left shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/40 ${
      active ? "ring-2 ring-white/70" : ""
    }`}
  >
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/75">
          {title}
        </p>
        <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        {subtext && (
          <p className="mt-1 text-xs font-medium text-white/70">{subtext}</p>
        )}
      </div>
    </div>
  </button>
);

const AdminTaskSummary = ({
  counts = {},
  employeesCount = 0,
  totalTasks = 0,
  onSelectStatus,
  activeStatus = "all",
}) => {
  const pending = counts.newTask ?? 0;
  const inProgress = counts.inProgress ?? 0;
  const completed = counts.completed ?? 0;
  const failed = counts.failed ?? 0;
  const accepted = counts.accepted ?? 0;
  const active = counts.active ?? 0;

  return (
    <section className="mt-8 rounded-3xl border border-white/15 bg-white/[0.08] px-6 py-8 shadow-xl backdrop-blur-sm">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Team Overview</h2>
          <p className="text-sm text-white/60">
            {employeesCount} teammates • {totalTasks} tasks • {active} active
          </p>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending Tasks"
          value={pending}
          subtext={`${accepted} accepted`}
          accent="from-orange-500/80 to-orange-400/90"
          onClick={() => onSelectStatus?.("newTask")}
          active={activeStatus === "newTask"}
        />
        <StatCard
          title="In Progress"
          value={inProgress}
          subtext="Actively being worked on"
          accent="from-sky-500/80 to-emerald-400/90"
          onClick={() => onSelectStatus?.("inProgress")}
          active={activeStatus === "inProgress"}
        />
        <StatCard
          title="Completed"
          value={completed}
          subtext="Ready for review"
          accent="from-emerald-500/80 to-emerald-400/90"
          onClick={() => onSelectStatus?.("completed")}
          active={activeStatus === "completed"}
        />
        <StatCard
          title="Failed"
          value={failed}
          subtext="Needs attention"
          accent="from-rose-500/85 to-rose-400/90"
          onClick={() => onSelectStatus?.("failed")}
          active={activeStatus === "failed"}
        />
      </div>
    </section>
  );
};

export default AdminTaskSummary;
