import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = savedUser
      ? JSON.parse(savedUser)
      : null;
  } catch (error) {
    user = null;
  }

  const isAdmin = user?.role === "admin";

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">

        <div className="logo-main">
          ECORP
        </div>

        <div className="logo-sub">
          NETWORK-01
        </div>

      </div>


      {/* Customer Navigation */}
      {!isAdmin && (

        <div className="sidebar-section">

          <span className="sidebar-section-title">
            ACCOUNT
          </span>

          <nav className="sidebar-nav">

            <NavLink
              to="/my-account"
              className="sidebar-link"
            >
              <span className="nav-indicator"></span>
              <span>My Account</span>
            </NavLink>

          </nav>

        </div>

      )}


      {/* Admin Navigation */}
      {isAdmin && (

        <>

          {/* Main Navigation */}
          <div className="sidebar-section">

            <span className="sidebar-section-title">
              MAIN
            </span>

            <nav className="sidebar-nav">

              <NavLink
                to="/dashboard"
                className="sidebar-link"
              >
                <span className="nav-indicator"></span>
                <span>Dashboard</span>
              </NavLink>


              <NavLink
                to="/users"
                className="sidebar-link"
              >
                <span className="nav-indicator"></span>
                <span>Users</span>
              </NavLink>

            </nav>

          </div>


          {/* Management */}
          <div className="sidebar-section">

            <span className="sidebar-section-title">
              MANAGEMENT
            </span>

            <nav className="sidebar-nav">

              <NavLink
                to="/plans"
                className="sidebar-link"
              >
                <span className="nav-indicator"></span>
                <span>Plans</span>
              </NavLink>


              <NavLink
                to="/payments"
                className="sidebar-link"
              >
                <span className="nav-indicator"></span>
                <span>Payments</span>
              </NavLink>

            </nav>

          </div>


          {/* System */}
          <div className="sidebar-section">

            <span className="sidebar-section-title">
              SYSTEM
            </span>

            <nav className="sidebar-nav">

              <NavLink
                to="/settings"
                className="sidebar-link"
              >
                <span className="nav-indicator"></span>
                <span>Settings</span>
              </NavLink>

            </nav>

          </div>

        </>

      )}


      {/* Bottom */}
      <div className="sidebar-bottom">

        <div className="system-status-sidebar">

          <span className="status-dot-sidebar"></span>

          <div>

            <span className="status-label">
              {isAdmin ? "ADMIN" : "CUSTOMER"}
            </span>

            <strong>
              ONLINE
            </strong>

          </div>

        </div>


        <span className="version-label">
          ECRP v2.0
        </span>


        {/* Logout */}
        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <span className="nav-indicator"></span>

          <span>
            LOGOUT
          </span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;