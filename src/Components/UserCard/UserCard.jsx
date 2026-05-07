import "./UserCard.css";
import PLAN_DETAILS from "../../constants/plans";
import AddUserForm from "../AddUserForm/AddUserForm"; // for Edit user Details form
import { useState } from "react";

function UserCard({name,email,phone,plan,paid,onMarkPaid,onDelete,onEdit}){
    

    const selectedPlan=PLAN_DETAILS[plan];

    return(
        <>
        <div className="user-card">
            <div className="card-header">
                 <h3>{name}</h3>
                <p>{email}</p>
            </div>
            <div className="user-details">
                <div className="detail-row">
                    <span>Plan</span>
                    <span>{plan}</span>
                </div>

                <div className="detail-row">
                    <span>Speed</span>
                    <span>{selectedPlan.speed}</span>
                </div>

                <div className="detail-row">
                    <span>Monthly</span>
                    <span>₹{selectedPlan.bill}</span>
                </div>
            </div>
            <div className="status">
                <span>Status</span>
                <span className={paid?"paid-status":"due-status"}>{paid? "Paid":"Due"}</span>
            </div>
            <div className="btn-group">
                       <button onClick={onMarkPaid}
                        className={paid? "paid-btn":"unpaid-btn"}
                        >
                  {paid?"Payment Received":"Mark as Paid"}
             </button>

             <button className="edit-user-btn" onClick={onEdit} >Edit User Details</button>
            <button className="delete-user-btn" onClick={onDelete}>Delete User</button>
            </div>
       
        
  
        </div>
       
        </>
    )

}
export default UserCard;