import DashboardStats from "../../Components/DashboardStats/DashboardStats";
import usersData from "../../data/dummyUsers";

function Dashboard(){

    return(
        <>
        <div>
            <h1>Dashboard</h1>

            <DashboardStats users={usersData} />
        </div>
        </>
    );
}
export default Dashboard;