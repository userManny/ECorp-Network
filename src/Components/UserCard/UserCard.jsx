

function UserCard({name,plan,bill,paid}){

    return(
        <>
        <div className="card">
               <h3>{name}</h3>
        <p>{plan}</p>
        <p>{bill}</p>
        <p>{paid? "paid":"Due"}</p>

        </div>
       
        </>
    )

}
export default UserCard;