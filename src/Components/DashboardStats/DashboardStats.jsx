
function DashboardStats({users}){

    const totalUsers=users.length;
    const totalRevenue=users.reduce((acc,curr)=>{
        acc=acc+curr.bill;
        return acc;
    },0)
    const pending =users.filter(user=>user.paid===false).reduce((acc,curr)=>{
        acc=acc+curr.bill;
        return acc;
    },0)
    return(
        <>
        <div className="stats">
        <h3>Total Users : {totalUsers}</h3>
        <h3>Total Revenue: {totalRevenue}</h3>
        <h3>Pending Amount: {pending}</h3>
        
        </div>
        

        </>
    )

}

export default DashboardStats;