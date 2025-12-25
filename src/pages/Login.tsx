import { useState } from "react";
import { loginAPI } from "../features/auth/authAPI";
import { loginSuccess } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e:any) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    try {
      setLoading(true);
      const res = await loginAPI({ email, password });

      dispatch(loginSuccess(res.data.token));
      navigate("/");
    } catch (err:any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="auth-wrapper">
    <div className="auth-card">

      {/* LEFT SIDE – LOGIN FORM (SAME AS SIGNUP) */}
      <div className="auth-left">
        <h2>Sign In</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* FULL WIDTH BUTTON */}
          <button type="submit" className="full-btn" disabled={loading}>
            {loading ? "Logging in..." : "SIGN IN"}
          </button>
        </form>

        <p className="switch-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      {/* RIGHT SIDE – SAME PANEL */}
      <div className="auth-right">
        <h2>Hello, Friend!</h2>
        <p>Enter your personal details and start journey with us</p>
        <Link to="/signup">
          <button className="ghost-btn">SIGN UP</button>
        </Link>
      </div>

    </div>
  </div>
);


};

export default Login;
