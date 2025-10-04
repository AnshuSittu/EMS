const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "123",
    tasks: [
      {
        taskTitle: "Design Landing Page",
        taskDescription:
          "Create responsive design for homepage using Tailwind.",
        taskDate: "2025-10-05",
        category: "UI/UX",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskTitle: "Fix Login Bug",
        taskDescription: "Resolve authentication redirect issue.",
        taskDate: "2025-10-06",
        category: "Bug Fix",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        taskTitle: "Write Unit Tests",
        taskDescription: "Add Jest tests for user services.",
        taskDate: "2025-10-08",
        category: "Testing",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
    ],
  },
  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    tasks: [
      {
        taskTitle: "Prepare Report",
        taskDescription: "Weekly performance metrics report.",
        taskDate: "2025-10-07",
        category: "Documentation",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskTitle: "Optimize Database",
        taskDescription: "Add indexes for faster queries.",
        taskDate: "2025-10-09",
        category: "Database",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        taskTitle: "Client Feedback Review",
        taskDescription: "Analyze feedback from client meeting.",
        taskDate: "2025-10-10",
        category: "Management",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    id: 3,
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        taskTitle: "Set Up CI/CD",
        taskDescription: "Configure GitHub Actions for deployment.",
        taskDate: "2025-10-11",
        category: "DevOps",
        active: false,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskTitle: "API Integration",
        taskDescription: "Connect payment API to backend service.",
        taskDate: "2025-10-12",
        category: "Backend",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskTitle: "Update Docs",
        taskDescription: "Document API endpoints in Swagger.",
        taskDate: "2025-10-13",
        category: "Documentation",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
    ],
  },
  {
    id: 4,
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        taskTitle: "Redesign Dashboard",
        taskDescription: "Improve analytics dashboard layout.",
        taskDate: "2025-10-14",
        category: "UI/UX",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskTitle: "Security Audit",
        taskDescription: "Run penetration testing for login module.",
        taskDate: "2025-10-15",
        category: "Security",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
    ],
  },
  {
    id: 5,
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        taskTitle: "Team Training",
        taskDescription: "Conduct workshop on React best practices.",
        taskDate: "2025-10-16",
        category: "Training",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskTitle: "Code Review",
        taskDescription: "Review PRs for feature branch.",
        taskDate: "2025-10-17",
        category: "Code Review",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        taskTitle: "Server Maintenance",
        taskDescription: "Upgrade Node.js version on staging server.",
        taskDate: "2025-10-18",
        category: "DevOps",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
    ],
  },
];

const admin = [
  {
    id: 100,
    email: "admin@example.com",
    password: "123",
  },
];

export const setLocalStroage = () => {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem("employees"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  //console.log(employees);
  // console.log(admin, employees);
  return{employees, admin}
};
