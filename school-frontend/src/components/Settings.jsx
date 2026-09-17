function Settings() {
  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Settings</h1>
          <p>Manage school management system settings</p>
        </div>
      </div>

      <div className="dashboard-cards">

        <div className="card">
          <h3>School Name</h3>
          <p>School Management System</p>
        </div>

        <div className="card">
          <h3>System</h3>
          <p>School Management</p>
        </div>

        <div className="card">
          <h3>Database</h3>
          <p>MySQL</p>
        </div>

        <div className="card">
          <h3>Backend</h3>
          <p>Spring Boot</p>
        </div>

      </div>
    </div>
  );
}

export default Settings;