import PLAN_DETAILS from "../../constants/plans";
import "./Plans.css";

function Plans() {
  const plans = Object.entries(PLAN_DETAILS);

  return (
    <div className="plans-page">

      {/* Page Header */}
      <header className="plans-header">

        <div>
          <div className="ecorp-mark">
            <span>ECORP</span>

            <span className="ecorp-line"></span>

            <span>NETWORK-01</span>
          </div>

          <h1 className="plans-title">
            Plans
          </h1>

          <p className="plans-description">
            Subscription plans and network services
          </p>
        </div>

        <div className="plans-count">
          <span>AVAILABLE PLANS</span>

          <strong>
            {plans.length.toString().padStart(2, "0")}
          </strong>
        </div>

      </header>


      {/* Plans Section */}
      <section className="plans-section">

        <div className="plans-section-heading">

          <div>
            <span className="plans-section-index">
              01
            </span>

            <span className="plans-section-label">
              SUBSCRIPTION SERVICES
            </span>
          </div>

          <span className="plans-section-count">
            {plans.length} SERVICES
          </span>

        </div>


        {/* Plan Cards */}
        <div className="plans-grid">

          {plans.map(([planName, planDetails], index) => (

            <article
              className={`plan-card ${
                planName === "Premium" ? "featured-plan" : ""
              }`}
              key={planName}
            >

              {/* Card Header */}
              <div className="plan-card-header">

                <span className="plan-number">
                  PLAN-{String(index + 1).padStart(2, "0")}
                </span>

                {planName === "Premium" && (
                  <span className="recommended-label">
                    RECOMMENDED
                  </span>
                )}

              </div>


              {/* Plan Name */}
              <div className="plan-card-title">

                <h2>
                  {planName}
                </h2>

                <span>
                  NETWORK ACCESS
                </span>

              </div>


              {/* Speed */}
              <div className="plan-speed">

                <span>
                  CONNECTION SPEED
                </span>

                <strong>
                  {planDetails.speed}
                </strong>

              </div>


              {/* Price */}
              <div className="plan-price">

                <span>
                  MONTHLY BILL
                </span>

                <strong>
                  ₹{planDetails.bill.toLocaleString("en-IN")}
                </strong>

                <small>
                  / MONTH
                </small>

              </div>


              {/* Features */}
              <div className="plan-features">

                <div>
                  <span className="feature-dot"></span>
                  Unlimited data
                </div>

                <div>
                  <span className="feature-dot"></span>
                  24/7 network access
                </div>

                <div>
                  <span className="feature-dot"></span>
                  Standard support
                </div>

              </div>


              {/* Bottom Code */}
              <div className="plan-card-footer">

                <span>
                  ECRP-N01
                </span>

                <span>
                  ACTIVE
                </span>

              </div>

            </article>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Plans;