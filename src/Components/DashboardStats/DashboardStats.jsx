import "./DashboardStats.css";

function DashboardStats({ users }) {

  // Only customers are included in dashboard statistics.
  // Admin accounts are not customers and should not
  // affect users, revenue, or pending payments.
  const customers = users.filter(
    (user) => user.role === "user"
  );


  const totalUsers = customers.length;


  const totalRevenue = customers.reduce(
    (acc, curr) => {
      return acc + curr.bill;
    },
    0
  );


  const pending = customers
    .filter((user) => user.paid === false)
    .reduce(
      (acc, curr) => {
        return acc + curr.bill;
      },
      0
    );


  return (
    <section className="stats-grid">

      {/* TOTAL USERS */}

      <div className="stat-card">

        <div className="stat-card-top">

          <span className="stat-label">
            TOTAL USERS
          </span>

          <span className="stat-index">
            01
          </span>

        </div>


        <div className="stat-value">
          {totalUsers}
        </div>


        <div className="stat-footer">

          <span className="stat-indicator"></span>

          Registered customers

        </div>

      </div>


      {/* TOTAL REVENUE */}

      <div className="stat-card">

        <div className="stat-card-top">

          <span className="stat-label">
            TOTAL REVENUE
          </span>

          <span className="stat-index">
            02
          </span>

        </div>


        <div className="stat-value">
          ₹{totalRevenue.toLocaleString("en-IN")}
        </div>


        <div className="stat-footer">

          <span className="stat-indicator"></span>

          Current billing value

        </div>

      </div>


      {/* PENDING AMOUNT */}

      <div className="stat-card pending-card">

        <div className="stat-card-top">

          <span className="stat-label">
            PENDING AMOUNT
          </span>

          <span className="stat-index">
            03
          </span>

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