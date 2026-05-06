import { useState } from "react";
import "./AddUserForm.css";
   function AddUserForm({users,setUsers}){
       const [name,setName]=useState("");
       const [email,setEmail]=useState("");
       const [phone,setPhone]=useState("");
       const [plan,setPlan]=useState("Basic");  // as by default select option has Basic paln
    


         function handleSubmit(e){
         e.preventDefault();
        
         let bill=0; 
         if(plan ==="Basic") bill=1500;
         else if(plan ==="Pro") bill=2500;
         else bill=3500;

         const newUser={
            id:users.length+1,
            name:name,
            email:email,
            phone:phone,
            plan:plan,
            bill:bill,
            paid:false
         };

         setUsers([...users,newUser]);
        
         // to clear the form after submit
          setName("");
          setEmail("");
          setPhone("");
          setPlan("Basic");

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
        <option value="Pro">Pro (200mbps) </option>
        <option value="Premium">Premium (300mbps)</option>

        </select>
         
         <button type="submit" className="submit-btn">Add User</button>
       </form>


            </>
         )
        
   }

   export default AddUserForm;
   