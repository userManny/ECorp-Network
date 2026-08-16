import { useUsers } from "../../context/UserContext";
import DashboardStats from "../../Components/DashboardStats/DashboardStats";
import "./Dashboard.css";

function Dashboard() {
  const { users } = useUsers();

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <header className="page-header">

        <div className="header-main">

          {/* ECorp Branding */}
          <div className="ecorp-mark">
            <span>ECORP</span>

            <span className="ecorp-line"></span>

            <span>NETWORK-01</span>
          </div>

          {/* Page Title */}
          <h1 className="dashboard-title">
            Dashboard
          </h1>

          <p className="page-description">
            Network overview and customer activity
          </p>

        </div>


        {/* System Status */}
        <div className="system-status">
          <span className="status-dot"></span>

          <span>SYSTEM ONLINE</span>
        </div>

      </header>


      {/* Network Metrics */}
      <section className="dashboard-section">

        <div className="section-heading">

          <span className="section-index">
            01
          </span>

          <div>
            <span className="section-label">
              NETWORK METRICS
            </span>

            <span className="section-line"></span>
          </div>

        </div>

        <DashboardStats users={users} />

      </section>


      {/* System Information */}
      <section className="system-panel">

        <div className="system-panel-header">
          <span>ECORP NETWORK STATUS</span>

          <span className="system-code">
            SYS-01
          </span>
        </div>


        <div className="system-panel-content">

          <div className="system-item">

            <span className="system-item-label">
              NETWORK
            </span>

            <span className="system-item-value">
              <span className="mini-dot"></span>
              OPERATIONAL
            </span>

          </div>


          <div className="system-item">

            <span className="system-item-label">
              CUSTOMERS
            </span>

            <span className="system-item-value">
              {users.length.toString().padStart(4, "0")}
            </span>

          </div>


          <div className="system-item">

            <span className="system-item-label">
              DATABASE
            </span>

            <span className="system-item-value">
              CONNECTED
            </span>

          </div>


          <div className="system-item">

            <span className="system-item-label">
              SYSTEM
            </span>

            <span className="system-item-value">
              ECRP-N01
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;