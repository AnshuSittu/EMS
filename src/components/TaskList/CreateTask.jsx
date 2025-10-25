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
  status: "newTask",
};

const CreateTask = ({ onCreateTask, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);
  const disableSubmit = useMemo(
    () =>
      !formData.taskTitle.trim() ||
      !formData.taskDescription.trim() ||
      !formData.taskDate ||
      !formData.category.trim(),
    [formData]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (disableSubmit) {
      setError("All fields are required to create a task.");
      return;
    }

    setError(null);

    onCreateTask?.({
      taskTitle: formData.taskTitle.trim(),
      taskDescription: formData.taskDescription.trim(),
      taskDate: formData.taskDate,
      category: formData.category.trim(),
      status: formData.status,
    });

    setFormData(initialFormState);
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setError(null);
    onCancel?.();
  };

  return (
    <div className="relative w-full sm:w-72 md:w-80 lg:w-72 flex-shrink-0 rounded-2xl bg-white/10 text-white shadow-xl overflow-hidden snap-start border border-white/15">
      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
        <header>
          <h2 className="text-lg font-semibold text-white/90">
            Create New Task
          </h2>
          <p className="text-xs text-white/60">
            Fill out the form to add a task to your board.
          </p>
        </header>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-white/70">Title</span>
          <input
            type="text"
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleChange}
            className="rounded-lg bg-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
            placeholder="Design landing page"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-white/70">Description</span>
          <textarea
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleChange}
            rows={3}
            className="rounded-lg bg-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
            placeholder="Outline goals and deliverables"
          />
        </label>

        <div className="flex flex-col gap-2 text-sm">
          <span className="text-white/70">Due Date</span>
          <input
            type="date"
            name="taskDate"
            value={formData.taskDate}
            onChange={handleChange}
            className="rounded-lg bg-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-white/70">Category</span>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="rounded-lg bg-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
            placeholder="Design, DevOps..."
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-white/70">Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-lg bg-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-300 bg-transparent"
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
        </label>

        {error && (
          <p className="text-xs text-red-200 bg-red-500/10 rounded-md px-2 py-1">
            {error}
          </p>
        )}

        <div className="mt-1 flex items-center justify-between gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="ml-auto rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 text-sm font-semibold disabled:bg-white/20 disabled:text-white/50"
            disabled={disableSubmit}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
