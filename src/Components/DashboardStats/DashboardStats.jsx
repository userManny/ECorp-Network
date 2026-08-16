import "./DashboardStats.css";

function DashboardStats({ users }) {
  const totalUsers = users.length;

  const totalRevenue = users.reduce((acc, curr) => {
    return acc + curr.bill;
  }, 0);

  const pending = users
    .filter((user) => user.paid === false)
    .reduce((acc, curr) => {
      return acc + curr.bill;
    }, 0);

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-card-top">
          <span className="stat-label">TOTAL USERS</span>
          <span className="stat-index">01</span>
        </div>

        <div className="stat-value">{totalUsers}</div>

        <div className="stat-footer">
          <span className="stat-indicator"></span>
          Registered customers
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-top">
          <span className="stat-label">TOTAL REVENUE</span>
          <span className="stat-index">02</span>
        </div>

        <div className="stat-value">
          ₹{totalRevenue.toLocaleString("en-IN")}
        </div>

        <div className="stat-footer">
          <span className="stat-indicator"></span>
          Current billing value
        </div>
      </div>

      <div className="stat-card pending-card">
        <div className="stat-card-top">
          <span className="stat-label">PENDING AMOUNT</span>
          <span className="stat-index">03</span>
        </div>

        <div className="stat-value">
          ₹{pending.toLocaleString("en-IN")}
        </div>

        <div className="stat-footer">
          <span className="stat-indicator"></span>
          Outstanding payments
        </div>
      </div>
    </section>
  );
}

export default DashboardStats;