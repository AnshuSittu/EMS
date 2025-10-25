import React from "react";

const Card = ({ title, value, accent, subtext }) => (
  <div
    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${accent} px-5 py-6 text-white shadow-lg`}
  >
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
          {title}
        </p>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        {subtext && (
          <p className="mt-1 text-xs font-medium text-white/75">{subtext}</p>
        )}
      </div>
    </div>
  </div>
);

const EmployeeTaskSummary = ({ counts = {}, totalTasks = 0, className = "" }) => {
  const pending = counts.newTask ?? 0;
  const inProgress = counts.inProgress ?? 0;
  const completed = counts.completed ?? 0;
  const failed = counts.failed ?? 0;
  const accepted = counts.accepted ?? 0;

  return (
    <section className={`rounded-3xl border border-white/15 bg-white/10 px-6 py-8 shadow-xl backdrop-blur-sm ${className}`}>
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Your Task Summary</h2>
          <p className="text-sm text-white/70">
            Track progress across pending, active, and completed work.
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
          {totalTasks} tasks total
        </span>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Pending"
          value={pending}
          subtext={`${accepted} accepted`}
          accent="from-orange-500/80 to-orange-400/90"
        />
        <Card
          title="In Progress"
          value={inProgress}
          accent="from-sky-500/80 to-emerald-400/90"
          subtext="Keep up the momentum"
        />
        <Card
          title="Completed"
          value={completed}
          accent="from-emerald-500/85 to-emerald-400/90"
          subtext="Nice work!"
        />
        <Card
          title="Failed"
          value={failed}
          accent="from-rose-500/85 to-rose-400/90"
          subtext="Review blockers"
        />
      </div>
    </section>
  );
};

export default EmployeeTaskSummary;
