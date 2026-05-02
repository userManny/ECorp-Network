import {Routes, Route} from "react-router-dom"
import Users from  "./pages/Users/Users"
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./Components/Navbar/Navbar";


function App() {

return(
  <>
   <Navbar />
  <Routes>
    <Route path="/" element={<Dashboard/>} />
    <Route path="/users" element={<Users />} />
  </Routes>
  </>
)
  
}

export default App;
