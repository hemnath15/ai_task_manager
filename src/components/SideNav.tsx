import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/sidenav.css";

const SideNav = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="sidenav">
      <h2 className="logo">AI Task Management</h2>

      <nav>
        <NavLink to="/" end className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/tasks" className="nav-item">
          Tasks
        </NavLink>
      </nav>

      {/* Profile section at bottom */}
      <div className="profile-section">
        <div className="profile-info">
          <div className="avatar">H</div>
          <div>
            <p className="name">Hemnath</p>
            <span className="role">User</span>
          </div>
          <button
          className="logout-btn"
          onClick={() => setShowLogout(true)}
        >
          Logout
        </button>
        </div>

        
      </div>

      {/* Logout Confirmation */}
      {showLogout && (
        <div className="logout-backdrop">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className="logout-actions">
              <button className="logout-btn" onClick={logout}>Yes</button>
              <button
                className="cancel-btn"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideNav;
