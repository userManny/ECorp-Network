import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/my-account");
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="ecorp-mark">
          <span>ECORP</span>
          <span className="ecorp-line"></span>
          <span>NETWORK-01</span>
        </div>

        <h1 className="login-title">
          Login
        </h1>

        <p className="login-description">
          Access your network account
        </p>


        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <div className="form-field">

            <label htmlFor="email">
              EMAIL ADDRESS
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          <div className="form-field">

            <label htmlFor="password">
              PASSWORD
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "SIGNING IN..."
              : "SIGN IN →"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;