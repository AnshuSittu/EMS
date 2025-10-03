import React, { useEffect } from 'react'
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { getLocalStorage, setLocalStroage } from './utils/localStorage';

function App() {
  useEffect(() => {
    //setLocalStroage()
    getLocalStorage()
  },)
  return (
    <>
      <Login/>
      <EmployeeDashboard/>
      {/* <AdminDashboard/> */}

    </>
  )
}

export default App;