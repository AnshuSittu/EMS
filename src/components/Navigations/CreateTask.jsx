import React from 'react'

const CreateTask = () => {
  return (
    <div>
      <main className="max-w-4xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <section className="bg-[#273F4F] shadow-lg rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">Create Task</h2>
          <form className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Task Title */}
            <div className="col-span-1 md:col-span-2">
              <label  className="block text-sm font-medium text-gray-100">Task Title</label>
              <input
                type="text"
                placeholder="Make a UI Design"
                className="mt-2 block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                aria-label="Task title"
              />
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-100">Description</label>
              <textarea
                rows={5}
                placeholder="Add a clear description of the task..."
                className="mt-2 block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition resize-none"
                aria-label="Task description"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-100">Date</label>
              <input
                name="date"
                type="date"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 
                         text-gray-900 placeholder-gray-500 shadow-sm 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none 
                         transition"
                aria-label="Task date"
              />
            </div>

            {/* Assign To */}
            <div>
              <label  className="block text-sm font-medium text-gray-100">Assign To</label>
              <input
                type="text"
                placeholder="Enter employee name"
                className="mt-2 block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                aria-label="Assign to"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-100">Category</label>
              <input
                name="category"
                type="text"
                placeholder="Design, Frontend, Dev"
                className="mt-2 block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                aria-label="Category"
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex items-center justify-end gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              >
                Create Task
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default CreateTask
