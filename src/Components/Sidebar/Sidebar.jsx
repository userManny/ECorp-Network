import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
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


      {/* Bottom status */}
      <div className="sidebar-bottom">

        <div className="system-status-sidebar">

          <span className="status-dot-sidebar"></span>

          <div>
            <span className="status-label">
              SYSTEM
            </span>

            <strong>
              ONLINE
            </strong>
          </div>

        </div>

        <span className="version-label">
          ECRP v2.0
        </span>

      </div>

    </aside>
  );
}

export default Sidebar;