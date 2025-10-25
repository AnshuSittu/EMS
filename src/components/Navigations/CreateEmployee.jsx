import React, { useMemo, useState } from "react";

const initialFormState = {
  firstName: "",
  email: "",
  password: "",
};

const CreateEmployee = ({ onCreateEmployee, onCancel, isModal = false }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const disableSubmit = useMemo(() => {
    if (!formData.firstName.trim()) return true;
    if (!formData.email.trim()) return true;
    if (!formData.password.trim()) return true;
    return false;
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const payload = {
      firstName: formData.firstName.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    const result = onCreateEmployee?.(payload);

    if (result?.success) {
      setFormData(initialFormState);
      if (onCancel) {
        onCancel();
        return;
      }
      setSuccessMessage("Employee created successfully.");
      setTimeout(() => setSuccessMessage(null), 2000);
      return;
    }

    if (result?.error) {
      setError(result.error);
    } else {
      setError("Unable to create employee. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setError(null);
    setSuccessMessage(null);
    onCancel?.();
  };

  return (
    <section
      className={`rounded-2xl border border-white/15 bg-white/10 px-6 py-6 shadow-lg backdrop-blur-sm ${
        isModal ? "w-full" : ""
      }`}
    >
      <h2 className="text-xl font-semibold text-white">Add New Team Member</h2>
      <p className="text-sm text-white/60">
        Invite someone new to track their work alongside the team.
      </p>

      <form className="mt-6 grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-white/75">Name</span>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Avery"
            className="rounded-lg border border-white/15 bg-white/15 px-4 py-2 text-sm text-white shadow-sm focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-white/75">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="avery@example.com"
            className="rounded-lg border border-white/15 bg-white/15 px-4 py-2 text-sm text-white shadow-sm focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-white/75">Temporary Password</span>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Set a temporary password"
            className="rounded-lg border border-white/15 bg-white/15 px-4 py-2 text-sm text-white shadow-sm focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </label>

        {error && (
          <div className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
            {successMessage}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={disableSubmit}
            className="rounded-lg bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:bg-white/20 disabled:text-white/50"
          >
            Create Employee
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateEmployee;
