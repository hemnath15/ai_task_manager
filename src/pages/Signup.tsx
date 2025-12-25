import { useState } from "react";
import { signupAPI } from "../features/auth/authAPI";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const signup = async (e:any) => {
     e.preventDefault();
      setError("");
  
      if (!email || !password) {
        setError("Email and password required");
        return;
      }
    await signupAPI({ name, email, password });
    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        {/* LEFT SIDE */}
        <div className="login-left">
          <h2>Create Account</h2>
          {error && <p className="error-text">{error}</p>}
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={signup}>SIGN UP</button>

          <p className="switch-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h2>Hello, Friend!</h2>
          <p>Enter your personal details and start journey with us</p>
          <Link to="/login">
            <button className="ghost-btn">SIGN IN</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;
