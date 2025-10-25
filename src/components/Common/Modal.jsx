import React from "react";

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />
    <div className="relative z-10 w-full max-w-3xl rounded-3xl bg-[#1f2933] p-6 shadow-2xl">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/20 p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          X
        </button>
      </header>
      <div className="max-h-[70vh] overflow-y-auto pr-1 text-white">
        {children}
      </div>
    </div>
  </div>
);

export default Modal;
