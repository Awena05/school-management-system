import { useState } from "react";

function Login({ onLogin }) {
  const [zanzibarId, setZanzibarId] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            zanzibarId,
            employeeNumber,
            password,
          }),
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(
          message || "Zanzibar ID, Employee Number au Password sio sahihi"
        );
      }

      const user = await response.json();

      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);

    } catch (error) {
      setError(
        error.message || "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        {/* HEADER */}
        <div className="login-header">
          <h1>School MS</h1>
          <p>School Management System</p>
        </div>

        <form onSubmit={handleLogin}>

          {/* ZANZIBAR ID */}
          <label>Zanzibar ID</label>

          <input
            type="text"
            placeholder="Enter your Zanzibar ID"
            value={zanzibarId}
            onChange={(e) =>
              setZanzibarId(e.target.value)
            }
            required
          />

          {/* EMPLOYEE NUMBER */}
          <label>Employee Number</label>

          <input
            type="text"
            placeholder="Enter your employee number"
            value={employeeNumber}
            onChange={(e) =>
              setEmployeeNumber(e.target.value)
            }
            required
          />

          {/* PASSWORD */}
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* ERROR */}
          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;