import React from 'react'

const AllTask = () => {
  return (
   <div className="bg-[#1c1c1c] p-5 rounded-2xl mt-5 h-64 overflow-auto">
      <div className="space-y-3">
        {/* Task Card */}
        <div className="bg-red-400 py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg shadow">
          <h1 className="font-semibold text-white">Anshu</h1>
          <h3 className="text-sm sm:text-base">Make UI</h3>
          <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded mt-2 sm:mt-0">
            Pending
          </span>
        </div>

        <div className="bg-green-400 py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg shadow">
          <h1 className="font-semibold text-white">Anshu</h1>
          <h3 className="text-sm sm:text-base">Fix Bugs</h3>
          <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded mt-2 sm:mt-0">
            Completed
          </span>
        </div>

        <div className="bg-blue-400 py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg shadow">
          <h1 className="font-semibold text-white">Anshu</h1>
          <h3 className="text-sm sm:text-base">Deploy App</h3>
          <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded mt-2 sm:mt-0">
            In Progress
          </span>
        </div>

        <div className="bg-yellow-400 py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg shadow">
          <h1 className="font-semibold text-white">Anshu</h1>
          <h3 className="text-sm sm:text-base">Write Docs</h3>
          <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded mt-2 sm:mt-0">
            Pending
          </span>
        </div>
      </div>
    </div>
  )
}

export default AllTask