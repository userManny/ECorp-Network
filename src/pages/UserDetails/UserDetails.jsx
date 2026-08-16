import { Link, useParams } from "react-router-dom";
import PLAN_DETAILS from "../../constants/plans";
import "./UserDetails.css";

function UserDetails({ users }) {
  const { id } = useParams();

  /*
    URL gives us the id as a string.
    User IDs are numbers, so convert it before comparing.
  */
  const user = users.find(
    (user) => user.id === Number(id)
  );

  // Handle invalid/non-existing user ID
  if (!user) {
    return (
      <div className="user-details-page">

        <div className="details-not-found">

          <span className="not-found-code">
            ERROR 404
          </span>

          <h1>
            USER NOT FOUND
          </h1>

          <p>
            No customer record exists for ID {id}.
          </p>

          <Link to="/users" className="back-users-btn">
            ← BACK TO USERS
          </Link>

        </div>

      </div>
    );
  }

  const selectedPlan = PLAN_DETAILS[user.plan];

  return (
    <div className="user-details-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <header className="user-details-header">

        <div>

          <div className="ecorp-mark">
            <span>ECORP</span>

            <span className="ecorp-line"></span>

            <span>NETWORK-01</span>
          </div>

          <div className="details-breadcrumb">
            <Link to="/users">
              USERS
            </Link>

            <span>/</span>

            <span>
              CUSTOMER-{String(user.id).padStart(4, "0")}
            </span>
          </div>

          <h1 className="user-details-title">
            CUSTOMER PROFILE
          </h1>

          <p className="user-details-description">
            Customer account and subscription information
          </p>

        </div>

        <div
          className={
            user.paid
              ? "account-status account-paid"
              : "account-status account-due"
          }
        >
          <span className="account-status-dot"></span>

          {user.paid
            ? "ACCOUNT PAID"
            : "PAYMENT DUE"}
        </div>

      </header>


      {/* =================================================
          CUSTOMER IDENTITY
          ================================================= */}

      <section className="customer-identity">

        <div className="identity-label">
          CUSTOMER RECORD
        </div>

        <div className="identity-main">

          <div className="customer-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>

            <h2>
              {user.name}
            </h2>

            <p>
              {user.email}
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          INFORMATION GRID
          ================================================= */}

      <section className="details-section">

        <div className="details-section-header">

          <div>
            <span className="section-index">
              01
            </span>

            <span className="section-title">
              CUSTOMER INFORMATION
            </span>
          </div>

          <span className="section-code">
            USER-{String(user.id).padStart(4, "0")}
          </span>

        </div>


        <div className="details-grid">

          <div className="detail-box">

            <span className="detail-box-label">
              FULL NAME
            </span>

            <strong>
              {user.name}
            </strong>

          </div>


          <div className="detail-box">

            <span className="detail-box-label">
              EMAIL ADDRESS
            </span>

            <strong>
              {user.email}
            </strong>

          </div>


          <div className="detail-box">

            <span className="detail-box-label">
              PHONE NUMBER
            </span>

            <strong>
              {user.phone || "NOT PROVIDED"}
            </strong>

          </div>


          <div className="detail-box">

            <span className="detail-box-label">
              CUSTOMER ID
            </span>

            <strong>
              {String(user.id).padStart(4, "0")}
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          SUBSCRIPTION
          ================================================= */}

      <section className="details-section">

        <div className="details-section-header">

          <div>
            <span className="section-index">
              02
            </span>

            <span className="section-title">
              SUBSCRIPTION
            </span>
          </div>

          <span className="section-code">
            ACTIVE
          </span>

        </div>


        <div className="subscription-grid">

          <div className="subscription-main">

            <span className="detail-box-label">
              CURRENT PLAN
            </span>

            <h2>
              {user.plan}
            </h2>

            <p>
              Network subscription
            </p>

          </div>


          <div className="subscription-item">

            <span className="detail-box-label">
              CONNECTION SPEED
            </span>

            <strong className="red-value">
              {selectedPlan.speed}
            </strong>

          </div>


          <div className="subscription-item">

            <span className="detail-box-label">
              MONTHLY BILL
            </span>

            <strong>
              ₹{selectedPlan.bill.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          PAYMENT
          ================================================= */}

      <section className="details-section">

        <div className="details-section-header">

          <div>
            <span className="section-index">
              03
            </span>

            <span className="section-title">
              PAYMENT STATUS
            </span>
          </div>

          <span className="section-code">
            BILLING
          </span>

        </div>


        <div className="payment-details">

          <div>

            <span className="detail-box-label">
              CURRENT STATUS
            </span>

            <div
              className={
                user.paid
                  ? "large-payment-status paid"
                  : "large-payment-status pending"
              }
            >
              <span className="large-status-dot"></span>

              {user.paid
                ? "PAYMENT RECEIVED"
                : "PAYMENT DUE"}
            </div>

          </div>


          <div>

            <span className="detail-box-label">
              AMOUNT
            </span>

            <strong className="payment-amount">
              ₹{selectedPlan.bill.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          FOOTER ACTION
          ================================================= */}

      <div className="details-footer">

        <Link
          to="/users"
          className="back-users-btn"
        >
          ← BACK TO USERS
        </Link>

        <span>
          ECORP-N01 / CUSTOMER-{String(user.id).padStart(4, "0")}
        </span>

      </div>

    </div>
  );
}

export default UserDetails;