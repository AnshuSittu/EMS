import React from "react";
import Header from "../Navigations/Header";
import CreateTask from "../Navigations/CreateTask";
import AllTask from "../Navigations/AllTask";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <Header />
      <CreateTask/>
     <AllTask/>
    </div>
  );
}
