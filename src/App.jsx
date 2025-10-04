// Updated App.jsx — minimal changes only
import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { getLocalStorage, setLocalStroage } from "./utils/localStorage";
import { AuthContext } from "./context/AuthProvider";

function App() {
  //this useEffect is to get & setData from local storages
  /*  useEffect(() => {
    setLocalStroage()
    getLocalStorage()
  },) */

  const [User, setUser] = useState(null);
   const authData = useContext(AuthContext)
  //console.log(authData);

  useEffect(()=> {
    if(authData) {
        const loggedInUser = localStorage.getItem("loggedInUser")
        if(loggedInUser){
          setUser(loggedInUser.role)
        }

    }
  },[authData]);

  const handleLogin = (email, password) => {
    if (email === "admin@me.com" && password === "123") {
      setUser("admin");
      localStorage.setItem('loggedInUser', JSON.stringify({role:'admin'}))
    } else if (authData && authData.employees.find((e) => email == e.email && e.password)) {
      setUser("employees");
      localStorage.setItem('loggedInUser', JSON.stringify({role:'employees'}))
    } else {
      alert("Invalid Password Or User");
    }
  };

 
  

  return (
    <>
      {!User ? (
         <Login handleLogin={handleLogin} />
      ) : User === "admin" ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard />
      )}
    </>
  );
}

export default App;
