import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidenav.css";

const SideNav = () => {
  const navigate = useNavigate();

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

        <NavLink to="/profile" className="nav-item">
          Profile
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </aside>
  );
};

export default SideNav;
