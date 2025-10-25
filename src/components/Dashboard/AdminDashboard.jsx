import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../Navigations/Header";
import CreateTask from "../Navigations/CreateTask";
import AllTask from "../Navigations/AllTask";
import AdminTaskSummary from "../Navigations/AdminTaskSummary";
import CreateEmployee from "../Navigations/CreateEmployee";
import Modal from "../Common/Modal";

const deriveStatus = (task = {}) => {
  if (task.status) return task.status;
  if (task.completed) return "completed";
  if (task.accepted) return "accepted";
  if (task.failed) return "failed";
  if (task.inProgress) return "inProgress";
  if (task.newTask) return "newTask";
  return "newTask";
};

const AdminDashboard = ({
  data,
  employees = [],
  onTaskCreate,
  onTaskStatusChange,
  onCreateEmployee,
  onAvatarUpdate,
}) => {
  const allTasks = useMemo(
    () =>
      employees.flatMap((employee) =>
        (employee.tasks ?? []).map((task, index) => ({
          ...task,
          employeeId: employee.id,
          employeeName: employee.firstName ?? employee.email,
          status: deriveStatus(task),
          taskIndex: index,
        }))
      ),
    [employees]
  );

  const summaryCounts = useMemo(() => {
    const base = {
      newTask: 0,
      inProgress: 0,
      completed: 0,
      accepted: 0,
      failed: 0,
      active: 0,
    };

    employees.forEach((employee) => {
      const tc = employee.taskCounts ?? {};
      base.newTask += tc.newTask ?? 0;
      base.inProgress += tc.inProgress ?? 0;
      base.completed += tc.completed ?? 0;
      base.accepted += tc.accepted ?? 0;
      base.failed += tc.failed ?? 0;
      base.active += tc.active ?? 0;
    });

    return { ...base, total: allTasks.length };
  }, [employees, allTasks]);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [flash, setFlash] = useState(null);
  const flashTimer = useRef(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState("all");

  useEffect(() => {
    return () => {
      if (flashTimer.current) {
        clearTimeout(flashTimer.current);
      }
    };
  }, []);

  const showFlashMessage = (type, message) => {
    if (flashTimer.current) {
      clearTimeout(flashTimer.current);
    }
    setFlash({ type, message });
    flashTimer.current = setTimeout(() => setFlash(null), 2400);
  };

  const handleTaskSubmit = (payload) => {
    onTaskCreate?.(payload);
    setShowTaskForm(false);
    showFlashMessage("success", "Task created and assigned successfully.");
  };

  const handleEmployeeSubmit = (payload) => {
    const result = onCreateEmployee?.(payload);
    if (result?.success) {
      setShowEmployeeForm(false);
      showFlashMessage("success", "New employee added to the team.");
    }
    if (result?.error) {
      showFlashMessage("error", result.error);
    }
    return result;
  };

  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.25),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.2),transparent_40%)]" />
      <Header data={data} onAvatarUpdate={onAvatarUpdate} />
      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-white/5 px-8 py-10 shadow-[0_30px_60px_-25px_rgba(15,23,42,0.9)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                Admin Workspace
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                {`Welcome back${data?.name ? `, ${data.name}` : ''}.`}
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-white/70">
                Review team throughput, adjust task statuses, and onboard teammates without leaving this workspace.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/70">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-orange-300" /> {summaryCounts.newTask} pending
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-sky-300" /> {summaryCounts.inProgress} in progress
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" /> {summaryCounts.completed} completed
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setShowTaskForm((prev) => !prev)}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/25 via-orange-500/15 to-transparent px-5 py-4 text-left text-white shadow-inner transition hover:-translate-y-0.5"
              >
                <p className="text-sm font-semibold">Create Task</p>
                <p className="mt-1 text-xs text-white/70">
                  Launch the composer to assign new work across the organisation.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setShowEmployeeForm((prev) => !prev)}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/25 via-sky-500/15 to-transparent px-5 py-4 text-left text-white shadow-inner transition hover:-translate-y-0.5"
              >
                <p className="text-sm font-semibold">Add Employee</p>
                <p className="mt-1 text-xs text-white/70">
                Invite a teammate to the Task Management System and give them immediate access.
                </p>
              </button>
            </div>
          </div>

          <AdminTaskSummary
            counts={summaryCounts}
            employeesCount={employees.length}
            totalTasks={summaryCounts.total}
            onSelectStatus={(status) =>
              setActiveStatusFilter((prev) => (prev === status ? "all" : status))
            }
            activeStatus={activeStatusFilter}
          />

          {flash && (
            <div
              className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium text-white shadow ${
                flash.type === "error"
                  ? "border-rose-400/40 bg-rose-500/25"
                  : "border-emerald-400/40 bg-emerald-500/25"
              }`}
            >
              {flash.message}
            </div>
          )}

          <AllTask
            tasks={
              activeStatusFilter === "all"
                ? allTasks
                : allTasks.filter((task) => task.status === activeStatusFilter)
            }
            onStatusChange={onTaskStatusChange}
            statusFilter={activeStatusFilter}
          />
        </section>
      </main>

      {showTaskForm && (
        <Modal title="Create Task" onClose={() => setShowTaskForm(false)}>
          <CreateTask
            employees={employees}
            onTaskCreate={handleTaskSubmit}
            onCancel={() => setShowTaskForm(false)}
            isModal
          />
        </Modal>
      )}

      {showEmployeeForm && (
        <Modal
          title="Add Team Member"
          onClose={() => setShowEmployeeForm(false)}
        >
          <CreateEmployee
            onCreateEmployee={handleEmployeeSubmit}
            onCancel={() => setShowEmployeeForm(false)}
            isModal
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
