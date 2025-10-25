import React, { useMemo, useState } from "react";

const STATUS_OPTIONS = [
  { value: "newTask", label: "New" },
  { value: "inProgress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "accepted", label: "Accepted" },
  { value: "failed", label: "Failed" },
];

const initialFormState = {
  taskTitle: "",
  taskDescription: "",
  taskDate: "",
  category: "",
  employeeId: "",
  status: "newTask",
};

const CreateTask = ({
  employees = [],
  onTaskCreate,
  onCancel,
  isModal = false,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const hasEmployees = employees.length > 0;
  const requireAssignee = hasEmployees;

  const disableSubmit = useMemo(() => {
    if (!formData.taskTitle.trim()) return true;
    if (!formData.taskDescription.trim()) return true;
    if (!formData.taskDate) return true;
    if (!formData.category.trim()) return true;
    if (requireAssignee && !formData.employeeId) return true;
    return false;
  }, [formData, requireAssignee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (disableSubmit) {
      setError("All fields are required to create a task.");
      return;
    }

    const parsedEmployeeId = Number(formData.employeeId);
    const payload = {
      taskTitle: formData.taskTitle.trim(),
      taskDescription: formData.taskDescription.trim(),
      taskDate: formData.taskDate,
      category: formData.category.trim(),
      status: formData.status,
    };

    if (requireAssignee) {
      payload.employeeId = Number.isNaN(parsedEmployeeId)
        ? formData.employeeId
        : parsedEmployeeId;
    }

    onTaskCreate?.(payload);

    setFormData(initialFormState);
    setError(null);
    if (onCancel) {
      onCancel();
      return;
    }
    setSuccessMessage("Task created successfully.");
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setError(null);
    setSuccessMessage(null);
    onCancel?.();
  };

  return (
    <section
      className={`${
        isModal ? "w-full max-w-3xl mx-auto" : "mx-auto mt-4 max-w-4xl"
      } rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f172a]/95 via-[#101c31]/95 to-[#14213d]/95 p-10 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.65)] backdrop-blur`}
    >
      <header className="flex flex-col items-center text-center text-white">
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-300" /> Task Composer
        </span>
        <h2 className="mt-3 text-3xl font-semibold">Create a New Task</h2>
        <p className="mt-2 max-w-xl text-sm text-slate-200/80">
          Outline the scope, set expectations, and keep teams aligned with a single streamlined form.
        </p>
        <div className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-3 text-xs text-slate-200/70 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner">
            <p className="text-sm font-semibold text-white">Provide context</p>
            <p>Summarize goals, deliverables, and supporting details.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner">
            <p className="text-sm font-semibold text-white">Set timing</p>
            <p>Pick a due date and category so priorities stay clear.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner">
            <p className="text-sm font-semibold text-white">Track status</p>
            <p>Move tasks between pending, in progress, or completed anytime.</p>
          </div>
        </div>
      </header>

      <form
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white/80">
            Task Title
          </label>
          <input
            type="text"
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleChange}
            placeholder="Make a UI Design"
            className="mt-2 block w-full rounded-xl border border-slate-600/40 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 shadow-inner focus:border-sky-400 focus:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-sky-300"
            aria-label="Task title"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white/80">
            Description
          </label>
          <textarea
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleChange}
            rows={4}
            placeholder="Add a clear description of the task..."
            className="mt-2 block w-full rounded-xl border border-slate-600/40 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 shadow-inner focus:border-sky-400 focus:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
            aria-label="Task description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80">
            Due Date
          </label>
          <input
            name="taskDate"
            type="date"
            value={formData.taskDate}
            onChange={handleChange}
            className="mt-2 block w-full rounded-xl border border-slate-600/40 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 shadow-inner focus:border-sky-400 focus:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-sky-300"
            aria-label="Task date"
          />
        </div>

        {requireAssignee && (
          <div>
            <label className="block text-sm font-medium text-white/80">
              Assign To
            </label>
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              disabled={!hasEmployees}
              className="mt-2 block w-full rounded-xl border border-slate-600/40 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 shadow-inner focus:border-sky-400 focus:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Assign to employee"
            >
              <option value="" className="bg-slate-800 text-white">
                Select employee
              </option>
              {employees.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                  className="bg-slate-800 text-white"
                >
                  {employee.firstName ?? employee.email}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-white/80">
            Category
          </label>
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            placeholder="Design, Frontend, Dev"
            className="mt-2 block w-full rounded-xl border border-slate-600/40 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 placeholder-slate-400 shadow-inner focus:border-sky-400 focus:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-sky-300"
            aria-label="Category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-2 block w-full rounded-xl border border-slate-600/40 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 shadow-inner focus:border-sky-400 focus:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-sky-300"
            aria-label="Task status"
          >
            {STATUS_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-slate-800 text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="md:col-span-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="md:col-span-2 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
            {successMessage}
          </div>
        )}

        <div className="md:col-span-2 flex items-center justify-end gap-3">
          <button
            type="button"
            className="rounded-xl border border-slate-500/50 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800/60"
            onClick={() => {
              setFormData(initialFormState);
              setError(null);
              setSuccessMessage(null);
            }}
          >
            Reset
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-slate-500/50 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800/60"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:bg-slate-700 disabled:text-slate-400"
            disabled={disableSubmit || !hasEmployees}
          >
            Create Task
          </button>
        </div>
      </form>

      {!requireAssignee && (
        <p className="mx-auto mt-6 max-w-lg text-center text-xs text-slate-200/70">
          Tasks created from your dashboard are automatically assigned to you. You can
          reassign them later from the admin console.
        </p>
      )}
    </section>
  );
};

export default CreateTask;
