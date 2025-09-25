import React from 'react'
import { FiLogOut, FiUser } from 'react-icons/fi' 

const Header = () => {
  return (
    <>
      <div className="w-full text-white flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0 px-4 py-4 md:px-6 lg:px-8">
        <h2 className="flex items-center text-2xl sm:text-2xl md:text-3xl font-medium leading-tight">
          <FiUser className="inline-block mr-2 text-red-500 w-7 h-7 sm:w-8 sm:h-8" />
          Hello
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl font-semibold block">
            Avir
          </span>
        </h2>

        
        <button
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 text-base sm:text-lg font-medium text-white px-4 py-2 sm:px-5 sm:py-3 rounded-md transition"
          aria-label="Log out"
        >
          <FiLogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </>
  )
}

export default Header
