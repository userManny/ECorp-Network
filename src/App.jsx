import {Routes, Route} from "react-router-dom"  // use React router links 
import Users from  "./pages/Users/Users"
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import usersData from "./data/dummyUsers";


function App() {
const [users,setUsers] = useState([]);  // state user is lifted to App.jsx so that Users and Dashboard component can use it. they will create sepeate copies of state if we define it seperately 

const API_USE=true; // toggle it to use dummyData

useEffect(()=>{
if(API_USE===false){
  setUsers(usersData);
  return;
}

fetch("https://jsonplaceholder.typicode.com/users")
.then(res=>res.json())
.then(data=>{
 const userFromAPI= data.map((user)=>({
  id:user.id,
  name:user.name,
  email:user.email,
  phone:user.phone,
  plan:["Basic (100mbps) ", "Pro (200mbps) ", "Premium (300mbps)"][user.id%3],
  bill:user.id*1000 +500,
  paid:user.id%2===0
 }))
 setUsers(userFromAPI);
})
.catch(()=>{
  // use dummyData if API calls fails
  setUsers(usersData)
})
},[])


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
