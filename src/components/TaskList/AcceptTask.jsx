import React from 'react'

const AcceptTask = ({ data, showCompleted = true, showFailed = true }) => {
  
  
  return (
    <div className="w-full rounded-xl bg-white/10 backdrop-blur-sm p-4 border border-white/20 shadow-inner mt-4 transition-all duration-300">
      <div className="flex justify-center gap-4">
        {/* Render Completed button if allowed */}
        {showCompleted && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.03] active:scale-95"
          >
            Mark as Completed
          </button>
        )}

        {/* Render Failed button if allowed */}
        {showFailed && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.03] active:scale-95"
          >
            Mark as Failed
          </button>
        )}
      </div>
    </div>
  )
}

export default AcceptTask
