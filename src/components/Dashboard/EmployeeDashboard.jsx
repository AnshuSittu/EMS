import React from 'react'
import Header from '../Navigations/Header'
import TaskListNumber from '../Navigations/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = ({data}) => {
  
  return (
    <>
        <div className='p-10 bg-[#4C585B] h-screen'>
        
            <Header data={data}/>
            <TaskListNumber data={data}/>
            <TaskList data={data}/>
        </div>
    </>
  )
}

export default EmployeeDashboard