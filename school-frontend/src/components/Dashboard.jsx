import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    subjects: 0,
    exams: 0,
    attendance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/reports/summary")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dashboard data");
        }

        return response.json();
      })
      .then((data) => {
        setStats({
          students: data.students || 0,
          teachers: data.teachers || 0,
          classes: data.classes || 0,
          subjects: data.subjects || 0,
          exams: data.exams || 0,
          attendance: data.attendance || 0,
        });
      })
      .catch((error) => {
        console.error("DASHBOARD ERROR:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <>
      <div className="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back 👋</p>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Students</h3>
          <p>{stats.students}</p>
        </div>

        <div className="card">
          <h3>Teachers</h3>
          <p>{stats.teachers}</p>
        </div>

        <div className="card">
          <h3>Classes</h3>
          <p>{stats.classes}</p>
        </div>

        <div className="card">
          <h3>Subjects</h3>
          <p>{stats.subjects}</p>
        </div>

        <div className="card">
          <h3>Exams</h3>
          <p>{stats.exams}</p>
        </div>

        <div className="card">
          <h3>Attendance</h3>
          <p>{stats.attendance}</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;