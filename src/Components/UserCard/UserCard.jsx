import "./UserCard.css";
import PLAN_DETAILS from "../../constants/plans";

function UserCard({name,email,phone,plan,paid,onMarkPaid,onDelete}){

    const selectedPlan=PLAN_DETAILS[plan];

    return(
        <>
        <div className="card">
        <h3>{name}</h3>
        <p>{email}</p>
        <p>{`${plan} + (${selectedPlan.speed})`}</p>
        <p>₹{selectedPlan.bill}</p>
        <p>{paid? "Paid":"Due"}</p>
        <button onClick={onMarkPaid}
        className={paid? "paid-btn":"unpaid-btn"}
        >
        {paid?"Payment Received":"Mark as Paid"}
             </button>
          <button className="delete-user-btn" onClick={onDelete}>Delete User</button>
        </div>
       
        </>
    )

}
export default UserCard;