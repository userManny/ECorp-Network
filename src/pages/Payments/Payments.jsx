import { useMemo, useState } from "react";
import "./Payments.css";
import { useUsers } from "../../context/UserContext";

function Payments() {
  const { users, setUsers } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /*
    For now, payment records are derived from users.

    Later:
    GET /api/payments
    will provide these records from MongoDB.
  */
  const payments = useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      userId: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      amount: user.bill,
      status: user.paid ? "paid" : "pending",
    }));
  }, [users]);


  /*
    Search + status filtering

    useMemo is useful here because this is derived data.
    When users/search/filter have not changed, React can
    reuse the previous filtered result.
  */
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, searchTerm, statusFilter]);


  function markAsPaid(userId) {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, paid: true }
        : user
    );

    setUsers(updatedUsers);
  }


  const totalPayments = payments.length;

  const paidPayments = payments.filter(
    (payment) => payment.status === "paid"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "pending"
  ).length;


  return (
    <div className="payments-page">

      {/* =================================================
          PAGE HEADER
          ================================================= */}

      <header className="payments-header">

        <div>

          <div className="ecorp-mark">
            <span>ECORP</span>

            <span className="ecorp-line"></span>

            <span>NETWORK-01</span>
          </div>

          <h1 className="payments-title">
            Payments
          </h1>

          <p className="payments-description">
            Billing records and payment activity
          </p>

        </div>


        <div className="payment-summary">

          <span>PAYMENT RECORDS</span>

          <strong>
            {String(totalPayments).padStart(4, "0")}
          </strong>

        </div>

      </header>


      {/* =================================================
          PAYMENT SUMMARY
          ================================================= */}

      <section className="payment-stats">

        <div className="payment-stat">
          <span>ALL RECORDS</span>
          <strong>{totalPayments}</strong>
        </div>

        <div className="payment-stat paid-stat">
          <span>PAID</span>
          <strong>{paidPayments}</strong>
        </div>

        <div className="payment-stat pending-stat">
          <span>PENDING</span>
          <strong>{pendingPayments}</strong>
        </div>

      </section>


      {/* =================================================
          TOOLBAR
          ================================================= */}

      <section className="payments-toolbar">

        <div className="payment-search">

          <label htmlFor="payment-search">
            SEARCH
          </label>

          <input
            id="payment-search"
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>


        <div className="payment-filters">

          <button
            className={
              statusFilter === "all"
                ? "payment-filter active"
                : "payment-filter"
            }
            onClick={() => setStatusFilter("all")}
          >
            ALL
          </button>

          <button
            className={
              statusFilter === "paid"
                ? "payment-filter active"
                : "payment-filter"
            }
            onClick={() => setStatusFilter("paid")}
          >
            PAID
          </button>

          <button
            className={
              statusFilter === "pending"
                ? "payment-filter active"
                : "payment-filter"
            }
            onClick={() => setStatusFilter("pending")}
          >
            PENDING
          </button>

        </div>

      </section>


      {/* =================================================
          PAYMENT RECORDS
          ================================================= */}

      <section className="payments-section">

        <div className="payments-section-header">

          <div>
            <span className="section-index">
              01
            </span>

            <span className="section-title">
              PAYMENT RECORDS
            </span>
          </div>

          <span className="record-count">
            {filteredPayments.length} RECORDS
          </span>

        </div>


        {/* Desktop table */}
        <div className="payments-table-wrapper">

          <table className="payments-table">

            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>PLAN</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredPayments.map((payment) => (

                <tr key={payment.id}>

                  <td>
                    <div className="customer-cell">

                      <strong>
                        {payment.name}
                      </strong>

                      <span>
                        {payment.email}
                      </span>

                    </div>
                  </td>


                  <td>
                    <span className="plan-cell">
                      {payment.plan}
                    </span>
                  </td>


                  <td>
                    <strong className="amount-cell">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </strong>
                  </td>


                  <td>

                    <span
                      className={
                        payment.status === "paid"
                          ? "payment-status-badge paid"
                          : "payment-status-badge pending"
                      }
                    >

                      <span className="status-dot"></span>

                      {payment.status === "paid"
                        ? "PAID"
                        : "PENDING"}

                    </span>

                  </td>


                  <td>

                    {payment.status === "pending" ? (

                      <button
                        className="mark-payment-btn"
                        onClick={() => markAsPaid(payment.userId)}
                      >
                        MARK AS PAID
                      </button>

                    ) : (

                      <span className="completed-label">
                        COMPLETED
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {/* Empty state */}

          {filteredPayments.length === 0 && (

            <div className="empty-payments">

              <span>
                NO PAYMENT RECORDS FOUND
              </span>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Payments;