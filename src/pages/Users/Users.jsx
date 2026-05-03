import { useEffect, useState } from "react";
import UserCard from "../../Components/UserCard/UserCard.jsx";
import DashboardStats from "../../Components/DashboardStats/DashboardStats.jsx";
import usersData from "../../data/dummyUsers.js";
import "./Users.css";


function Users({users,setUsers}){
   // const [users,setUsers]=useState([]); // using [] instead of usersData as now we are taking data from API call and not dummyData 
    const [showUnpaid,setShowUnpaid]=useState(false);
    const [searchTerm,setSearchTerm]=useState("");  // state for search bar 

    


    //  code to filter for mark as Paid button 
    // const filterdUser= showUnpaid ? users.filter(user=>!user.paid) :users;
        const filterdUsers= users.filter(user=>
        showUnpaid? !user.paid :true
    ).filter(user=>user.name.toLowerCase().includes(searchTerm.toLowerCase()) );

   
    function markAsPaid(id){
        const updateUsers =users.map(user=>
            user.id===id ? {...user,paid:true}:user
        );
        setUsers(updateUsers);
    }   // is is normal js and not jsx so no need for key here

     function toggleFilter(){
        setShowUnpaid(prev=>!prev);
    }

    return(
        <>
        <h1>Users Page</h1>
        <DashboardStats users={users} />
        
        <button onClick={toggleFilter}>{showUnpaid? "Show All Users":"Show Unpaid Only"}</button>
        <input type="text" 
               placeholder="Search Users ..." 
               value={searchTerm}
               onChange={(e)=>setSearchTerm(e.target.value)} />

        <div className="users-container">
            {filterdUsers.map(user=>{
                return(
                <UserCard 
                key={user.id}
                name={user.name}
                plan={user.plan}
                bill={user.bill}
                paid={user.paid}
                onMarkPaid={()=>markAsPaid(user.id)}
                />
                )
                

            })}
            {/* below is for all user Cards without any filter} *}
            {/* {users.map(user=>
          <UserCard 
          key={user.id} 
          name={user.name}
          plan={user.plan}
          bill={user.bill}
          paid={user.paid}
          onMarkPaid={()=> markAsPaid(user.id)}
          />
    )} */}

    
            
        </div>
       
        </>
    )
     
}

export default Users;