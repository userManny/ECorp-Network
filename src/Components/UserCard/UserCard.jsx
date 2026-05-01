import "./UserCard.css";

function UserCard({name,plan,bill,paid,onMarkPaid}){

    return(
        <>
        <div className="card">
        <h3>{name}</h3>
        <p>{plan}</p>
        <p>₹{bill}</p>
        <p>{paid? "Paid":"Due"}</p>
        <button onClick={onMarkPaid}>
           Mark as Paid
             </button>

        </div>
       
        </>
    )

}
export default UserCard;