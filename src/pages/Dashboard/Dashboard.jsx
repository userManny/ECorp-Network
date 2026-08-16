import DashboardStats from "../../Components/DashboardStats/DashboardStats";

function Dashboard({users}){
   //  const [users,setUsers]=useState([]);  this state if lifted to App.jsx

  
    return(
        <>
        <div>
            <h1>Dashboard</h1>
       
            <DashboardStats users={users} />

            
        </div>
        </>
    );
}
export default Dashboard;