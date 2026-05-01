import UserCard from "../../Components/UserCard/UserCard.jsx";
import users from "../../data/dummyUsers.js";
import "./Users.css";


function Users(){
    return(
        <>
        <h1>Users Page</h1>
        <div className="users-container">
            {users.map(user=>
          <UserCard 
          key={user.id} 
          name={user.name}
          plan={user.plan}
          bill={user.bill}
          paid={user.paid}
          />
    )}
            
        </div>
       
        </>
    )
     
}

export default Users;