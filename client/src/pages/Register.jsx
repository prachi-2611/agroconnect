import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); // ✅ FIXED HERE

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert("Registration Successful");

      // ✅ redirect to login page
      navigate("/login");

    } catch (error) {
  console.log("REGISTER ERROR:", error.response?.data || error.message);

  alert(
    error.response?.data?.message ||
    "Registration Failed"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* TOP */}
        <div className="auth-top">
          <h1 className="auth-title">
            Create Account
          </h1>

          <p className="auth-subtitle">
            Join AgroConnect and connect directly with farmers & buyers
          </p>
        </div>

        {/* FORM */}
        <form
          className="auth-form"
          onSubmit={handleRegister}
        >

          {/* NAME */}
          <div>
            <label className="auth-label">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="auth-label">
              Select Role
            </label>

            <select
              className="auth-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          {/* EMAIL */}
          <div>
            <label className="auth-label">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="auth-label">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* BUTTON */}
          <button type="submit" className="auth-btn">
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;