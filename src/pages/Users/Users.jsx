import { useEffect, useState } from "react";
import UserCard from "../../Components/UserCard/UserCard.jsx";
import DashboardStats from "../../Components/DashboardStats/DashboardStats.jsx";
import usersData from "../../data/dummyUsers.js";
import "./Users.css";
import AddUserForm from "../../Components/AddUserForm/AddUserForm.jsx";


function Users({users,setUsers}){
   // const [users,setUsers]=useState([]); // using [] instead of usersData as now we are taking data from API call and not dummyData 
    const [showUnpaid,setShowUnpaid]=useState(false);
    const [searchTerm,setSearchTerm]=useState("");  // state for search bar 
    const [selectedUser,setSelectedUser]=useState(null);
    const [showForm,setShowForm]=useState(false);  // state to show form to add new user 
   

    //  code to filter for mark as Paid button 
    // const filterdUser= showUnpaid ? users.filter(user=>!user.paid) :users;
        const filteredUsers= users.filter(user=>
        showUnpaid? !user.paid :true
    ).filter(user=>user.name.toLowerCase().includes(searchTerm.toLowerCase()) );

   
    function markAsPaid(id){
        const updateUsers =users.map(user=>
            user.id===id ? {...user,paid:true}:user
        );
        setUsers(updateUsers);
    }   // is is normal js and not jsx so no need for key here
    
// delete user 
    function deleteUser(id){
        const confirmed =confirm("Are You Sure ?");
        if(confirmed){
         const updatedUsers=users.filter(user=>user.id !==id);
         setUsers(updatedUsers);
        }
    }

    // handle reset 
    function handleReset(){
     localStorage.removeItem("users"); // to clear localStorage to undo all changes
     window.location.reload();  // app loads again
    }



    
     function toggleFilter(){
        setShowUnpaid(prev=>!prev);
    }

    return(
        <>
        <h1>Users Page</h1>
        <DashboardStats users={users} />
        
        <div className="toolbar">
             <button onClick={()=>{
                setSelectedUser(null);
                setShowForm(prev=>!prev);}}>Add New User</button>
      

      <button onClick={handleReset}>Reset</button>
        
        <button onClick={toggleFilter}>{showUnpaid? "Show All Users":"Show Unpaid Only"}</button>
        <input type="text" 
               placeholder="Search Users ..." 
               value={searchTerm}
               onChange={(e)=>setSearchTerm(e.target.value)} />

        </div>
        {showForm && (
  <AddUserForm users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}
   setShowForm={setShowForm} />
        )}
      
       
   

        <div className="users-container">
            {filteredUsers.map(user=>{
                return(
                <UserCard 
                key={user.id}
                name={user.name}
                email={user.email}
                plan={user.plan}
                bill={user.bill}
                paid={user.paid}
                onMarkPaid={()=>markAsPaid(user.id)}
                onDelete={()=>deleteUser(user.id)}
                onEdit={() => {

            if(selectedUser?.id === user.id && showForm){
        setSelectedUser(null);
        setShowForm(false);
                  }
            else{
        setSelectedUser(user);
        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}}
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