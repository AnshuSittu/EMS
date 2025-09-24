import React from 'react'
import Header from '../Navigations/Header'
import TaskListNumber from '../Navigations/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = () => {
  return (
    <>
        <div className='p-10 bg-[#1C1C1C] h-screen'>
            <Header/>
            <TaskListNumber/>
            <TaskList/>
        </div>
    </>
  )
}

export default EmployeeDashboard