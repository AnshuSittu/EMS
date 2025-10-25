import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const STATUS_ORDER = [
  "newTask",
  "inProgress",
  "completed",
  "accepted",
  "failed",
];

const composeStatusFlags = (status) => ({
  status,
  accepted: status === "accepted",
  completed: status === "completed",
  failed: status === "failed",
  inProgress: status === "inProgress",
  newTask: status === "newTask",
  active: status === "newTask" || status === "inProgress",
});

const buildTaskObject = (taskInput) => {
  const status = STATUS_ORDER.includes(taskInput.status)
    ? taskInput.status
    : "newTask";

  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    id,
    taskTitle: taskInput.taskTitle,
    taskDescription: taskInput.taskDescription,
    taskDate: taskInput.taskDate,
    category: taskInput.category,
    subTasks: Array.isArray(taskInput.subTasks) ? taskInput.subTasks : [],
    ...composeStatusFlags(status),
  };
};

const recalculateCounts = (tasks = []) =>
  tasks.reduce(
    (acc, task) => ({
      active: acc.active + (task.active ? 1 : 0),
      newTask: acc.newTask + (task.newTask ? 1 : 0),
      inProgress: acc.inProgress + (task.inProgress ? 1 : 0),
      completed: acc.completed + (task.completed ? 1 : 0),
      accepted: acc.accepted + (task.accepted ? 1 : 0),
      failed: acc.failed + (task.failed ? 1 : 0),
    }),
    { active: 0, newTask: 0, inProgress: 0, completed: 0, accepted: 0, failed: 0 }
  );

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const authData = useContext(AuthContext);

  const employees = authData?.employees ?? [];
  const adminProfile = authData?.admin?.[0] ?? null;

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) return;

    try {
      const userData = JSON.parse(loggedInUser);
      if (!userData?.role) return;

      setUserRole(userData.role);
      if (userData.role === "employees") {
        const employeeId = userData.data?.id;
        const employee =
          employees.find(
            (record) => String(record.id) === String(employeeId)
          ) ??
            userData.data ??
            null;
        if (employee) {
          const refreshedCounts = recalculateCounts(employee.tasks ?? []);
          setLoggedInUserData({
            ...employee,
            taskCounts: {
              ...employee.taskCounts,
              ...refreshedCounts,
            },
          });
        } else {
          setLoggedInUserData(null);
        }
      }
    } catch (error) {
      console.error("Unable to parse logged in user:", error);
    }
  }, [employees]);

  const updateLocalLoggedInUser = (employee) => {
    const stored = localStorage.getItem("loggedInUser");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      if (
        parsed?.role === "employees" &&
        String(parsed.data?.id) === String(employee.id)
      ) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employees", data: employee })
        );
      }
    } catch (error) {
      console.error("Unable to update logged in user cache:", error);
    }
  };

  const commitEmployeeUpdate = (employeeId, updater) => {
    if (!authData?.setEmployees) return null;

    const index = employees.findIndex(
      (record) =>
        record.id === employeeId || String(record.id) === String(employeeId)
    );
    if (index === -1) return null;

    const currentEmployee = employees[index];
    const updatedEmployee =
      typeof updater === "function" ? updater(currentEmployee) : updater;

    if (!updatedEmployee) return null;

    const updatedEmployees = [
      ...employees.slice(0, index),
      updatedEmployee,
      ...employees.slice(index + 1),
    ];

    authData.setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    updateLocalLoggedInUser(updatedEmployee);

    if (String(loggedInUserData?.id) === String(employeeId)) {
      setLoggedInUserData(updatedEmployee);
    }

    return updatedEmployee;
  };

  const handleLogin = (email, password) => {
    const normalizedEmail = email?.trim() ?? "";
    const normalizedPassword = password?.trim() ?? "";
    const adminRecord = authData?.admin?.[0];
    const isAdminLogin =
      adminRecord &&
      normalizedEmail.toLowerCase() === adminRecord.email.toLowerCase() &&
      normalizedPassword === adminRecord.password;

    if (isAdminLogin) {
      setUserRole("admin");
      setLoggedInUserData(adminRecord);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "admin", data: adminRecord })
      );
      setTimeout(() => {
        alert(`Logged in as admin: ${adminRecord.name}`);
      }, 0);
      return;
    }

    if (!employees.length) {
      alert("Employee records are not available. Please try again later.");
      return;
    }

    const employee = employees.find(
      (record) =>
        record.email?.toLowerCase() === normalizedEmail.toLowerCase() &&
        record.password === normalizedPassword
    );

    if (employee) {
      const refreshedCounts = recalculateCounts(employee.tasks ?? []);
      const hydratedEmployee = {
        ...employee,
        taskCounts: {
          ...employee.taskCounts,
          ...refreshedCounts,
        },
      };

      setUserRole("employees");
      setLoggedInUserData(hydratedEmployee);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "employees", data: hydratedEmployee })
      );
    } else {
      alert("Invalid Password Or User");
    }
  };

  const handleSignup = (details) => {
    if (!authData?.setEmployees) {
      alert("Employee records are not available. Please try again later.");
      return;
    }

    const normalizedEmail = details.email?.trim().toLowerCase();
    const normalizedPassword = details.password?.trim();

    if (!normalizedEmail || !normalizedPassword || !details.name?.trim()) {
      alert("Please provide name, email, and password to sign up.");
      return;
    }

    const emailExists = employees.some(
      (employee) => employee.email?.toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      alert("An account with this email already exists.");
      return;
    }

    const newEmployeeBase = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `emp-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      firstName: details.name.trim(),
      email: details.email.trim(),
      password: normalizedPassword,
      dob: details.dob || "",
      occupation: details.occupation || "",
      location: details.location || "",
      bio: details.bio || "",
      createdAt: new Date().toISOString(),
      taskCounts: {
        active: 0,
        newTask: 0,
        inProgress: 0,
        completed: 0,
        accepted: 0,
        failed: 0,
      },
      tasks: [],
    };

    const updatedEmployees = [...employees, newEmployeeBase];
    authData.setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    const hydratedEmployee = {
      ...newEmployeeBase,
      taskCounts: recalculateCounts(newEmployeeBase.tasks ?? []),
    };

    setUserRole("employees");
    setLoggedInUserData(hydratedEmployee);
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ role: "employees", data: hydratedEmployee })
    );

    alert(`Welcome aboard, ${hydratedEmployee.firstName}! Your workspace is ready.`);
  };

  const handleEmployeeTaskCreate = (taskInput) => {
    if (!loggedInUserData?.id) return;

    commitEmployeeUpdate(loggedInUserData.id, (employee) => {
      const newTask = buildTaskObject(taskInput);
      const allTasks = [...(employee.tasks ?? []), newTask];
      const updatedCounts = recalculateCounts(allTasks);

      return {
        ...employee,
        tasks: allTasks,
        taskCounts: {
          ...employee.taskCounts,
          ...updatedCounts,
        },
      };
    });
  };

  const handleEmployeeProfileUpdate = (profileInput) => {
    if (!loggedInUserData?.id) return;

    commitEmployeeUpdate(loggedInUserData.id, (employee) => ({
      ...employee,
      firstName: profileInput.firstName ?? employee.firstName,
      email: profileInput.email ?? employee.email,
      occupation: profileInput.occupation ?? employee.occupation,
      location: profileInput.location ?? employee.location,
      dob: profileInput.dob ?? employee.dob,
      bio: profileInput.bio ?? employee.bio,
    }));
  };

  const handleEmployeeSubTaskCreate = (taskRef, subTaskInput) => {
    if (!loggedInUserData?.id || !subTaskInput?.title) return;

    commitEmployeeUpdate(loggedInUserData.id, (employee) => {
      const tasks = Array.isArray(employee.tasks) ? employee.tasks : [];

      const updatedTasks = tasks.map((task, index) => {
        const matches =
          (taskRef?.id !== undefined && taskRef?.id !== null
            ? String(task.id) === String(taskRef.id)
            : false) || taskRef?.index === index;

        if (!matches) return task;

        const subTasks = Array.isArray(task.subTasks) ? task.subTasks : [];
        const newSubTask = {
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : `sub-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          title: subTaskInput.title,
          description: subTaskInput.description ?? "",
          status: "pending",
        };

        return {
          ...task,
          subTasks: [...subTasks, newSubTask],
        };
      });

      const updatedCounts = recalculateCounts(updatedTasks);

      return {
        ...employee,
        tasks: updatedTasks,
        taskCounts: {
          ...employee.taskCounts,
          ...updatedCounts,
        },
      };
    });
  };

  const handleEmployeeTaskStatusChange = (taskRef, nextStatus) => {
    if (!loggedInUserData?.id || !STATUS_ORDER.includes(nextStatus)) return;

    commitEmployeeUpdate(loggedInUserData.id, (employee) => {
      const tasks = Array.isArray(employee.tasks) ? employee.tasks : [];

      const updatedTasks = tasks.map((task, index) => {
        const matches =
          (taskRef?.id !== undefined && taskRef?.id !== null
            ? String(task.id) === String(taskRef.id)
            : false) || taskRef?.index === index;

        if (!matches) return task;

        return {
          ...task,
          ...composeStatusFlags(nextStatus),
        };
      });

      const updatedCounts = recalculateCounts(updatedTasks);

      return {
        ...employee,
        tasks: updatedTasks,
        taskCounts: {
          ...employee.taskCounts,
          ...updatedCounts,
        },
      };
    });
  };

  const handleAvatarUpdate = (avatarDataUrl) => {
    if (!avatarDataUrl) return;

    if (userRole === "employees" && loggedInUserData?.id) {
      commitEmployeeUpdate(loggedInUserData.id, (employee) => ({
        ...employee,
        avatar: avatarDataUrl,
      }));
    } else if (userRole === "admin") {
      const storedAdmin = JSON.parse(localStorage.getItem("admin") || "null");
      if (Array.isArray(storedAdmin) && storedAdmin.length) {
        const updatedAdmin = { ...storedAdmin[0], avatar: avatarDataUrl };
        storedAdmin[0] = updatedAdmin;
        localStorage.setItem("admin", JSON.stringify(storedAdmin));
        setLoggedInUserData(updatedAdmin);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "admin", data: updatedAdmin })
        );
      }
    }
  };

  const handleAdminTaskCreate = (taskInput) => {
    if (!taskInput?.employeeId) return;

    commitEmployeeUpdate(taskInput.employeeId, (employee) => {
      const newTask = buildTaskObject(taskInput);
      const allTasks = [...(employee.tasks ?? []), newTask];
      const updatedCounts = recalculateCounts(allTasks);

      return {
        ...employee,
        tasks: allTasks,
        taskCounts: {
          ...employee.taskCounts,
          ...updatedCounts,
        },
      };
    });
  };

  const handleAdminTaskStatusChange = (employeeId, taskRef, nextStatus) => {
    if (!STATUS_ORDER.includes(nextStatus)) return;

    commitEmployeeUpdate(employeeId, (employee) => {
      const tasks = Array.isArray(employee.tasks) ? employee.tasks : [];
      const updatedTasks = tasks.map((task, index) => {
        const matches =
          (taskRef?.id && task.id === taskRef.id) ||
          (!taskRef?.id && taskRef?.index === index);
        if (!matches) return task;

        return {
          ...task,
          ...composeStatusFlags(nextStatus),
        };
      });

      const updatedCounts = recalculateCounts(updatedTasks);

      return {
        ...employee,
        tasks: updatedTasks,
        taskCounts: {
          ...employee.taskCounts,
          ...updatedCounts,
        },
      };
    });
  };

  const handleAdminCreateEmployee = ({ firstName, email, password }) => {
    if (!authData?.setEmployees) {
      return { success: false, error: "Employee store is not available." };
    }

    const cleanedName = firstName?.trim();
    const rawEmail = email?.trim();
    const loweredEmail = rawEmail?.toLowerCase();
    const cleanedPassword = password?.trim();

    if (!cleanedName || !rawEmail || !cleanedPassword) {
      return { success: false, error: "Name, email, and password are required." };
    }

    const emailExists = employees.some(
      (employee) => employee.email?.toLowerCase() === loweredEmail
    );

    if (emailExists) {
      return {
        success: false,
        error: "An employee with this email already exists.",
      };
    }

    const generatedId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `emp-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const newEmployee = {
      id: generatedId,
      firstName: cleanedName,
      email: rawEmail,
      password: cleanedPassword,
      taskCounts: {
        active: 0,
        newTask: 0,
        inProgress: 0,
        completed: 0,
        accepted: 0,
        failed: 0,
      },
      tasks: [],
    };

    const updatedEmployees = [...employees, newEmployee];
    authData.setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    return { success: true, employee: newEmployee };
  };

  const adminData = loggedInUserData ?? adminProfile;

  return (
    <>
      {!userRole ? (
        <Login handleLogin={handleLogin} handleSignup={handleSignup} />
      ) : userRole === "admin" ? (
        <AdminDashboard
          data={adminData}
          employees={employees}
          onTaskCreate={handleAdminTaskCreate}
          onTaskStatusChange={handleAdminTaskStatusChange}
          onCreateEmployee={handleAdminCreateEmployee}
          onAvatarUpdate={handleAvatarUpdate}
        />
      ) : userRole === "employees" ? (
        <EmployeeDashboard
          data={loggedInUserData}
          onTaskCreate={handleEmployeeTaskCreate}
          onProfileUpdate={handleEmployeeProfileUpdate}
          onAvatarUpdate={handleAvatarUpdate}
          onUpdateTaskStatus={handleEmployeeTaskStatusChange}
          onAddSubTask={handleEmployeeSubTaskCreate}
        />
      ) : null}
    </>
  );
}

export default App;
