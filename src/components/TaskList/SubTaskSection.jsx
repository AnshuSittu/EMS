import React, { useState } from "react";

const SubTaskSection = ({ subTasks = [], onAddSubTask }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      setError("Subtask title is required.");
      return;
    }

    onAddSubTask?.({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDescription("");
    setError(null);
    setIsFormOpen(false);
  };

  if (!onAddSubTask && subTasks.length === 0) return null;

  return (
    <div className="mt-4 rounded-xl border border-white/15 bg-white/10 p-4 text-sm text-white/80">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Subtasks</h3>
        {onAddSubTask && (
          <button
            type="button"
            onClick={() => {
              setIsFormOpen((prev) => !prev);
              setError(null);
            }}
            className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            {isFormOpen ? "Cancel" : "Add Subtask"}
          </button>
        )}
      </div>

      {subTasks.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {subTasks.map((subtask) => (
            <li
              key={subtask.id ?? subtask.title}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            >
              <p className="text-sm font-medium text-white">{subtask.title}</p>
              {subtask.description && (
                <p className="mt-1 text-xs text-white/60">
                  {subtask.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-white/60">No subtasks yet.</p>
      )}

      {isFormOpen && onAddSubTask && (
        <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/70">Title</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="Define task milestone"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/70">Description (optional)</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={2}
              className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="Additional details"
            />
          </div>
          {error && (
            <p className="text-xs text-rose-200 bg-rose-500/10 rounded-md px-3 py-1">
              {error}
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              Save Subtask
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SubTaskSection;
