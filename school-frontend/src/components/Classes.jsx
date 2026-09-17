import { useEffect, useState } from "react";

function Classes() {
  const emptyForm = {
    className: "",
    description: "",
  };

  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  // Get all classes
  const getClasses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/classes");

      if (!response.ok) {
        throw new Error("Failed to load classes");
      }

      const data = await response.json();
      setClasses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading classes:", error);
    }
  };

  // Load classes when page opens
  useEffect(() => {
    getClasses();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add class
  const addClass = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to add class");
      }

      setForm(emptyForm);

      await getClasses();

      alert("Class added successfully!");
    } catch (error) {
      console.error("Add Class Error:", error);
      alert("Failed to add class: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete class
  const deleteClass = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) {
      return;
    }

    try {
      const url = "http://localhost:8080/api/classes/" + id;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete class");
      }

      await getClasses();

      alert("Class deleted successfully!");
    } catch (error) {
      console.error("Delete Class Error:", error);
      alert("Failed to delete class: " + error.message);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="topbar">
        <div>
          <h1>Classes</h1>
          <p>Manage all school classes</p>
        </div>
      </div>

      {/* Add Class Form */}
      <form className="student-form" onSubmit={addClass}>
        <input
          type="text"
          name="className"
          placeholder="Class Name"
          value={form.className}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Class"}
        </button>
      </form>

      {/* Classes Table */}
      <div className="student-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Class Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No classes found
                </td>
              </tr>
            ) : (
              classes.map((schoolClass) => (
                <tr key={schoolClass.id}>
                  <td>{schoolClass.id}</td>
                  <td>{schoolClass.className}</td>
                  <td>{schoolClass.description}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteClass(schoolClass.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Classes;