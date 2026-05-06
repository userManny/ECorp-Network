import { useState,useEffect } from "react";
import "./AddUserForm.css";
import PLAN_DETAILS from "../../constants/plans";

 

   function AddUserForm({users,setUsers,selectedUser,setSelectedUser,
   setShowForm}){
       const [name,setName]=useState("");
       const [email,setEmail]=useState("");
       const [phone,setPhone]=useState("");
       const [plan,setPlan]=useState("Basic");  // as by default select option has Basic paln
       
       useEffect(() => {
   if(selectedUser){
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
      setPlan(selectedUser.plan);
   }
}, [selectedUser]);
       


         function handleSubmit(e){
         e.preventDefault();
       
         const selectedPlan=PLAN_DETAILS[plan];
       
         if(selectedUser){
            const updatedUsers = users.map(user=>
               user.id ===selectedUser.id ? {
                  ...user,
                  name:name,
                  email:email,
                  phone:phone,
                  plan:plan,
                  bill:selectedPlan.bill
               } :user
            );
            setUsers(updatedUsers);
         }
         else{
            const newUser={
            id:Date.now(),
            name:name,
            email:email,
            phone:phone,
            plan:plan,
            bill:selectedPlan.bill,
            paid:false
         };
         setUsers(prev=>[...prev,newUser])
         }
        
         // to clear the form after submit
          setName("");
          setEmail("");
          setPhone("");
          setPlan("Basic");
          setSelectedUser(null);
          setShowForm(false);

    }
         
         
         return(
            <>
         <form onSubmit={handleSubmit} className="add-user-form">
         <label htmlFor="name" className="input-title">Name</label>
         <input id="name" 
                type="text" 
                placeholder="Enter Name of User" 
                value={name}
                onChange={e=>setName(e.target.value)}
                required  />

         <label htmlFor="email" className="input-title">Email</label>
         <input id="email" 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={e=>setEmail(e.target.value)}
                required/>

         <label htmlFor="phone" className="input-title">Phone</label>
         <input id="phone" 
                type="tel" 
                placeholder="Enter phone number" 
                value={phone}
                onChange={e=>setPhone(e.target.value)}
                required/>
        <label className="input-title">Select Plan</label>
        <select name="plan" 
                id="plan" 
                value={plan} 
                onChange={e=>setPlan(e.target.value)}>
        <option value="Basic">Basic (100mbps)</option>
        <option value="Premium">Premium (200mbps) </option>
        <option value="Pro">Pro (300mbps)</option>

        </select>
         
         <button type="submit" className="submit-btn">
   {selectedUser ? "Update User" : "Add User"}
         </button>
       </form>


            </>
         )
        
   }

   export default AddUserForm;
   