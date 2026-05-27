// client/src/pages/Login.jsx

import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        const { data } =
          await axios.post(

            "http://localhost:5000/api/auth/login",

            {
              email,
              password,
            }
          );

        localStorage.setItem(

          "userInfo",

          JSON.stringify(data)
        );

        if (
          data.user.role ===
          "farmer"
        ) {

          navigate("/dashboard");

        } else {

          navigate("/products");
        }

      } catch (error) {

        setError(
          "Invalid Email or Password"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="auth-page">

      <div className="auth-card">

        {/* TITLE */}

        <h1 className="auth-title">
          Welcome Back
        </h1>

        <p className="auth-subtitle">

          Login to continue
          exploring fresh farm
          products from trusted
          farmers.

        </p>

        {/* ERROR */}

        {
          error && (

            <div
              className="
                order-message
                order-error
              "
              style={{
                marginBottom:"20px",
              }}
            >

              {error}

            </div>
          )
        }

        {/* FORM */}

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >

          {/* EMAIL */}

          <div>

            <label
              className="
                auth-label
              "
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="
                Enter your email
              "
              className="
                auth-input
              "
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label
              className="
                auth-label
              "
            >
              Password
            </label>

            <input
              type="password"
              placeholder="
                Enter your password
              "
              className="
                auth-input
              "
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="
              auth-btn
            "
          >

            {
              loading
                ? "Logging In..."
                : "Login"
            }

          </button>

        </form>

        {/* FOOTER */}

        <div
          className="
            auth-footer
          "
        >

          Don’t have an account?
          {" "}

          <Link to="/register">

            Register Here

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;