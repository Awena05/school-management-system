import { useEffect, useState } from "react";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
const emptyForm = {
  teacherId: "",
  fullName: "",
  subject: "",
  phone: "",
  email: "",
  status: "ACTIVE",
};

const [form, setForm] = useState(emptyForm);
const [loading, setLoading] = useState(false);
  const getTeachers = async () => {
    try {
      const response = await fetch("http://localhost:8080/teachers");

      if (!response.ok) {
        throw new Error("Failed to load teachers");
      }

      const data = await response.json();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading teachers:", error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);
  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const addTeacher = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await fetch("http://localhost:8080/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Failed to add teacher");
    }

    setForm(emptyForm);
    await getTeachers();

    alert("Teacher added successfully!");
  } catch (error) {
    console.error("Add Teacher Error:", error);
    alert("Failed to add teacher: " + error.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Teachers</h1>
          <p>Manage all teachers</p>
         <form className="student-form" onSubmit={addTeacher}>
  
  <input
  type="text"
  name="teacherId"
  placeholder="Teacher ID"
  value={form.teacherId}
  onChange={handleChange}
  required
/>

<input
  type="text"
  name="fullName"
  placeholder="Full Name"
  value={form.fullName}
  onChange={handleChange}
  required
/>

<input
  type="text"
  name="subject"
  placeholder="Subject"
  value={form.subject}
  onChange={handleChange}
  required
/>

<input
  type="text"
  name="phone"
  placeholder="Phone"
  value={form.phone}
  onChange={handleChange}
  required
/>

<input
  type="email"
  name="email"
  placeholder="Email"
  value={form.email}
  onChange={handleChange}
/>

<select
  name="status"
  value={form.status}
  onChange={handleChange}
>
  <option value="ACTIVE">Active</option>
  <option value="INACTIVE">Inactive</option>
</select>

<button type="submit" disabled={loading}>
  {loading ? "Adding..." : "Add Teacher"}
</button>2
</form>
        </div>
      </div>

      <div className="student-table">
        <table>
          <thead>
            <tr>
               <th>Teacher ID</th>
              <th>Full Name</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No teachers found
                </td>
              </tr>
            ) : (
              teachers.map((teacher, index) => (
                <tr key={teacher.id || index}>
                  <td>{teacher.teacherId}</td>
                  <td>{teacher.fullName}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teachers;