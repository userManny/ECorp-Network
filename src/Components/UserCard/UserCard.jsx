import "./UserCard.css";
import PLAN_DETAILS from "../../constants/plans";

function UserCard({
  name,
  email,
  phone,
  plan,
  paid,
  onMarkPaid,
  onDelete,
  onEdit,
}) {
  const selectedPlan = PLAN_DETAILS[plan];

  return (
    <article className="user-card">

      {/* Card Header */}
      <div className="card-top">

        <span className="card-type">
          CUSTOMER
        </span>

        <span
          className={
            paid
              ? "card-status paid-status"
              : "card-status due-status"
          }
        >
          <span className="card-status-dot"></span>

          {paid ? "PAID" : "DUE"}
        </span>

      </div>


      {/* Customer Information */}
      <div className="card-header">

        <h3>
          {name}
        </h3>

        <p className="customer-email">
          {email}
        </p>

        {phone && (
          <p className="customer-phone">
            {phone}
          </p>
        )}

      </div>


      {/* Divider */}
      <div className="card-divider"></div>


      {/* User Details */}
      <div className="user-details">

        <div className="detail-row">

          <span className="detail-label">
            PLAN
          </span>

          <span className="detail-value plan-value">
            {plan}
          </span>

        </div>


        <div className="detail-row">

          <span className="detail-label">
            SPEED
          </span>

          <span className="detail-value">
            {selectedPlan.speed}
          </span>

        </div>


        <div className="detail-row">

          <span className="detail-label">
            MONTHLY
          </span>

          <span className="detail-value bill-value">
            ₹{selectedPlan.bill.toLocaleString("en-IN")}
          </span>

        </div>

      </div>


      {/* Payment Status */}
      <div className="payment-status">

        <span className="detail-label">
          PAYMENT STATUS
        </span>

        <span
          className={
            paid
              ? "payment-value payment-paid"
              : "payment-value payment-due"
          }
        >
          {paid ? "PAYMENT RECEIVED" : "PAYMENT DUE"}
        </span>

      </div>


      {/* Actions */}
      <div className="card-actions">

        <button
          onClick={onMarkPaid}
          className={
            paid
              ? "action-btn payment-received-btn"
              : "action-btn mark-paid-btn"
          }
          disabled={paid}
        >
          {paid ? "PAYMENT RECEIVED" : "MARK AS PAID"}
        </button>


        <div className="secondary-actions">

          <button
            className="action-btn edit-user-btn"
            onClick={onEdit}
          >
            EDIT
          </button>


          <button
            className="action-btn delete-user-btn"
            onClick={onDelete}
          >
            DELETE
          </button>

        </div>

      </div>

    </article>
  );
}

export default UserCard;