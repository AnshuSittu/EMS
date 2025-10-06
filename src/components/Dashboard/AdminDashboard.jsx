import React from "react";
import Header from "../Navigations/Header";
import CreateTask from "../Navigations/CreateTask";
import AllTask from "../Navigations/AllTask";

export default function AdminDashboard({data}) {
  return (
    <div className="min-h-screen">
      <Header data={data}/>
      <CreateTask/>
     <AllTask/>
    </div>
  );
}
