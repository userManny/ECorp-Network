import { useEffect, useState } from "react";
import "./MyAccount.css";
console.log("API URL:", import.meta.env.VITE_API_URL);

function MyAccount() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMyAccount() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load account"
          );
        }

        setUser(data);
      } catch (error) {
        console.error(
          "Failed to load account:",
          error
        );

        setError(error.message);
      }
    }

    loadMyAccount();
  }, []);


  // Error
  if (error) {
    return (
      <div className="my-account-page">

        <header className="my-account-header">

          <div className="my-account-header-main">

            <div className="ecorp-mark">
              <span>ECORP</span>
              <span className="ecorp-line"></span>
              <span>NETWORK-01</span>
            </div>

            <h1 className="my-account-title">
              My Account
            </h1>

            <p className="my-account-description">
              Customer account and billing information
            </p>

          </div>

        </header>

        <div className="account-error">
          <span className="account-error-code">
            404
          </span>

          <h2>
            ACCOUNT UNAVAILABLE
          </h2>

          <p>{error}</p>
        </div>

      </div>
    );
  }


  // Loading
  if (!user) {
    return (
      <div className="my-account-page">

        <div className="account-loading">
          LOADING CUSTOMER RECORD...
        </div>

      </div>
    );
  }


  return (
    <div className="my-account-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <header className="my-account-header">

        <div className="my-account-header-main">

          <div className="ecorp-mark">
            <span>ECORP</span>

            <span className="ecorp-line"></span>

            <span>NETWORK-01</span>
          </div>

          <h1 className="my-account-title">
            My Account
          </h1>

          <p className="my-account-description">
            Customer account and billing information
          </p>

        </div>


        <div className="account-active">

          <span className="account-active-dot"></span>

          <span>
            ACCOUNT ACTIVE
          </span>

        </div>

      </header>


      {/* =========================
          CUSTOMER RECORD
      ========================= */}

      <section className="account-section">

        <div className="account-section-heading">

          <span className="account-section-index">
            01
          </span>

          <div className="account-section-title-wrapper">

            <span className="account-section-title">
              CUSTOMER RECORD
            </span>

            <span className="account-section-line"></span>

          </div>

        </div>


        <div className="customer-record-grid">

          <div className="customer-record-item">

            <span className="record-label">
              CUSTOMER NAME
            </span>

            <span className="record-value">
              {user.name}
            </span>

          </div>


          <div className="customer-record-item">

            <span className="record-label">
              EMAIL ADDRESS
            </span>

            <span className="record-value">
              {user.email}
            </span>

          </div>


          <div className="customer-record-item">

            <span className="record-label">
              PHONE NUMBER
            </span>

            <span className="record-value">
              {user.phone}
            </span>

          </div>


          <div className="customer-record-item">

            <span className="record-label">
              SUBSCRIPTION PLAN
            </span>

            <span className="record-value">
              {user.plan}
            </span>

          </div>

        </div>

      </section>


      {/* =========================
          BILLING INFORMATION
      ========================= */}

      <section className="account-section">

        <div className="account-section-heading">

          <span className="account-section-index">
            02
          </span>

          <div className="account-section-title-wrapper">

            <span className="account-section-title">
              BILLING INFORMATION
            </span>

            <span className="account-section-line"></span>

          </div>

        </div>


        <div className="billing-grid">

          {/* Monthly Bill */}

          <div className="billing-card monthly-bill-card">

            <div className="billing-card-top">

              <span className="billing-label">
                MONTHLY BILL
              </span>

              <span className="billing-index">
                01
              </span>

            </div>


            <div className="billing-main">

              <span className="billing-amount">
                ₹{user.bill.toLocaleString("en-IN")}
              </span>

              <div className="billing-icon">
                ₹
              </div>

            </div>


            <span className="billing-description">
              Current subscription amount
            </span>

          </div>


          {/* Payment Status */}

          <div
            className={
              user.paid
                ? "billing-card payment-card payment-paid"
                : "billing-card payment-card payment-pending"
            }
          >

            <div className="billing-card-top">

              <span className="billing-label">
                PAYMENT STATUS
              </span>

              <span className="billing-index">
                02
              </span>

            </div>


            <div className="billing-main">

              <span className="payment-status-text">
                <span className="payment-status-dot"></span>

                {user.paid
                  ? "PAID"
                  : "PENDING"}
              </span>

              <div className="payment-icon">
                ₹
              </div>

            </div>


            <span className="billing-description">
              {user.paid
                ? "Payment completed"
                : "Payment currently outstanding"}
            </span>

          </div>

        </div>

      </section>


      {/* =========================
          ACCOUNT STATUS
      ========================= */}

      <section className="account-status-section">

        <div className="account-status-heading">

          <div>

            <span className="account-status-index">
              03
            </span>

            <span className="account-status-title">
              ECORP ACCOUNT STATUS
            </span>

          </div>

          <span className="account-status-code">
            ACC-01
          </span>

        </div>


        <div className="account-status-grid">

          {/* Account */}

          <div className="account-status-item">

            <span className="status-item-label">
              ACCOUNT
            </span>

            <span className="status-item-value status-active">

              <span className="status-item-dot"></span>

              ACTIVE

            </span>

            <span className="status-item-description">
              Account is active and verified
            </span>

          </div>


          {/* Plan */}

          <div className="account-status-item">

            <span className="status-item-label">
              PLAN
            </span>

            <span className="status-item-value">
              {user.plan}
            </span>

            <span className="status-item-description">
              Current subscription plan
            </span>

          </div>


          {/* Billing */}

          <div className="account-status-item">

            <span className="status-item-label">
              BILLING
            </span>

            <span
              className={
                user.paid
                  ? "status-item-value status-active"
                  : "status-item-value status-pending"
              }
            >
              {user.paid
                ? "CURRENT"
                : "PENDING"}
            </span>

            <span className="status-item-description">
              Payment status
            </span>

          </div>


          {/* System */}

          <div className="account-status-item">

            <span className="status-item-label">
              SYSTEM
            </span>

            <span className="status-item-value">
              ECRP-N01
            </span>

            <span className="status-item-description">
              System identifier
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default MyAccount;