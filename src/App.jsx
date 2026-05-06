import {Routes, Route} from "react-router-dom"  // use React router links 
import Users from  "./pages/Users/Users"
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import usersData from "./data/dummyUsers";
import PLAN_DETAILS from "./constants/plans";


function App() {
const [users,setUsers] = useState([]);  // state user is lifted to App.jsx so that Users and Dashboard component can use it. they will create sepeate copies of state if we define it seperately 

const API_USE=true; // toggle it to use dummyData

useEffect(()=>{

  const savedUsers=localStorage.getItem("users");  //
  if(savedUsers){
    const parsedUsers=JSON.parse(savedUsers); 
    if(parsedUsers.length >0){
       setUsers(parsedUsers);     // Batching in react
       return;
    }
  
  }

if(API_USE===false){
  setUsers(usersData);
  return;
}

fetch("https://jsonplaceholder.typicode.com/users")
.then(res=>res.json())
.then(data=>{
 const userFromAPI= data.map((user)=>{
  const plan=["Basic", "Premium", "Pro"][user.id %3]
  const selectedPlan=PLAN_DETAILS[plan];

  return{
     id:user.id,
     name:user.name,
     email:user.email,
     phone:user.phone,
     plan:plan,
     bill:selectedPlan.bill,
     paid:user.id%2===0
  }
  
 })
 setUsers(userFromAPI);
})
.catch(()=>{
  // use dummyData if API calls fails
  setUsers(usersData)
})
},[])

// to store data into localStorage if users is not empty
useEffect(()=>{
  if(users.length>0){ // this line is very important as fetch is asynchronous so js will not wait IT IS PREVENTING THE NEW USER TO NOT LOST AFTER REFRESH FROM LOCAL STORAGE 
   localStorage.setItem("users",JSON.stringify(users));
  }
  
},[users])

return(
  <>
   <Navbar />

  <Routes>
    {/* default route */}
    <Route path="/" element={<Dashboard users={users} />} />

    <Route path="/dashboard" element={<Dashboard users={users} />} />
     <Route path="/users" element={<Users users={users} setUsers={setUsers} />} />


  </Routes>
  </>
)
  
}

export default App;
