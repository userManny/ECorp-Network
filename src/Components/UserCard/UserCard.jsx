import "./UserCard.css";

function UserCard({name,email,phone,plan,bill,paid,onMarkPaid}){

    return(
        <>
        <div className="card">
        <h3>{name}</h3>
        <p>{email}</p>
        <p>{plan}</p>
        <p>₹{bill}</p>
        <p>{paid? "Paid":"Due"}</p>
        <button onClick={onMarkPaid}
        className={paid? "paid-btn":"unpaid-btn"}
        >
        {paid?"Payment Received":"Mark as Paid"}
             </button>

        </div>
       
        </>
    )

}
export default UserCard;