import React, { useMemo, useState } from "react";

const FORM_BASE_CLASSES =
  "w-full rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300";

const Login = ({ handleLogin, handleSignup }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [formError, setFormError] = useState(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setDob("");
    setOccupation("");
    setLocation("");
    setBio("");
    setFormError(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (mode === "signup") {
      if (trimmedPassword.length < 6) {
        setFormError("Password must be at least 6 characters long.");
        return;
      }

      if (trimmedPassword !== confirmPassword.trim()) {
        setFormError("Passwords do not match.");
        return;
      }

      handleSignup?.({
        name: name.trim(),
        email: trimmedEmail,
        password: trimmedPassword,
        dob,
        occupation: occupation.trim(),
        location: location.trim(),
        bio: bio.trim(),
      });
      resetForm();
      return;
    }

    handleLogin(trimmedEmail, trimmedPassword);
    resetForm();
  };

  const formTitle = useMemo(
    () => (mode === "login" ? "Welcome back" : "Create your account"),
    [mode]
  );

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.8)] backdrop-blur-lg sm:flex-row">
        <aside className="flex-1 bg-gradient-to-br from-sky-500/15 via-blue-500/10 to-transparent p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
            Task Management System
          </p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Manage your work in one place.
          </h1>
          <p className="mt-4 max-w-sm text-sm text-slate-100/80">
            Log in to update progress, or create a profile to capture your first task.
            Your dashboard syncs instantly across the organisation.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-100/75">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-sky-300" />
              Track tasks, subtasks, and status changes in real time.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              Collaborate with your team using one workspace.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-amber-300" />
              Keep personal metrics and profile details up to date.
            </li>
          </ul>
        </aside>

        <div className="flex-1 bg-white px-8 py-10 text-slate-800 sm:px-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">{formTitle}</h2>
            <button
              type="button"
              onClick={() => {
                setMode((prev) => (prev === "login" ? "signup" : "login"));
                resetForm();
              }}
              className="text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              {mode === "login" ? "Need an account? Sign up" : "Have an account? Log in"}
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {mode === "login"
              ? "Use your work credentials to access the Task Management System workspace."
              : "Tell us a little about yourself so we can tailor your dashboard."}
          </p>

          <form onSubmit={submitHandler} className="mt-8 flex flex-col space-y-5">
            {mode === "signup" && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col text-sm font-medium text-slate-600">
                    Full Name
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="E.g. Anisha Verma"
                      className={`${FORM_BASE_CLASSES} mt-2`}
                      autoComplete="name"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-slate-600">
                    Occupation / Role
                    <input
                      type="text"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      required
                      placeholder="Product Designer"
                      className={`${FORM_BASE_CLASSES} mt-2`}
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col text-sm font-medium text-slate-600">
                    Date of Birth
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      className={`${FORM_BASE_CLASSES} mt-2`}
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-slate-600">
                    Location (optional)
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Mumbai, IN"
                      className={`${FORM_BASE_CLASSES} mt-2`}
                    />
                  </label>
                </div>

                <label className="flex flex-col text-sm font-medium text-slate-600">
                  Short Bio (optional)
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    placeholder="How do you like to work?"
                    className={`${FORM_BASE_CLASSES} mt-2 resize-none`}
                  />
                </label>
              </>
            )}

            <label className="flex flex-col text-sm font-medium text-slate-600">
              Work Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@company.com"
                className={`${FORM_BASE_CLASSES} mt-2`}
                autoComplete="email"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-slate-600">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className={`${FORM_BASE_CLASSES} mt-2`}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </label>

            {mode === "signup" && (
              <label className="flex flex-col text-sm font-medium text-slate-600">
                Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter your password"
                  className={`${FORM_BASE_CLASSES} mt-2`}
                  autoComplete="new-password"
                />
              </label>
            )}

            {formError && (
              <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-600">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-sky-600 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              {mode === "login" ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
