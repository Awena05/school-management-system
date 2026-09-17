import { useState } from "react";
import "./App.css";

import Login from "./components/Login";

import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Classes from "./components/Classes";
import Subjects from "./components/Subjects";
import Attendance from "./components/Attendance";
import Exams from "./components/Exams";
import Reports from "./components/Reports";
import Settings from "./components/Settings";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app">

      <aside className="sidebar">
        <h2>School MS</h2>

        <nav>

          <a
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </a>

          <a
            className={page === "students" ? "active" : ""}
            onClick={() => setPage("students")}
          >
            Students
          </a>

          <a
            className={page === "teachers" ? "active" : ""}
            onClick={() => setPage("teachers")}
          >
            Teachers
          </a>

          <a
            className={page === "classes" ? "active" : ""}
            onClick={() => setPage("classes")}
          >
            Classes
          </a>

          <a
            className={page === "subjects" ? "active" : ""}
            onClick={() => setPage("subjects")}
          >
            Subjects
          </a>

          <a
            className={page === "attendance" ? "active" : ""}
            onClick={() => setPage("attendance")}
          >
            Attendance
          </a>

          <a
            className={page === "exams" ? "active" : ""}
            onClick={() => setPage("exams")}
          >
            Exams
          </a>

          <a
            className={page === "reports" ? "active" : ""}
            onClick={() => setPage("reports")}
          >
            Reports
          </a>

          <a
            className={page === "settings" ? "active" : ""}
            onClick={() => setPage("settings")}
          >
            Settings
          </a>

          <a
            onClick={() => setLoggedIn(false)}
          >
            Logout
          </a>

        </nav>
      </aside>

      <main className="main-content">

        {page === "dashboard" && <Dashboard />}
        {page === "students" && <Students />}
        {page === "teachers" && <Teachers />}
        {page === "classes" && <Classes />}
        {page === "subjects" && <Subjects />}
        {page === "attendance" && <Attendance />}
        {page === "exams" && <Exams />}
        {page === "reports" && <Reports />}
        {page === "settings" && <Settings />}

      </main>

    </div>
  );
}

export default App;