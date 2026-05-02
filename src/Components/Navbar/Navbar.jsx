import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
    <nav className="navbar">
     <div className="logo">ECorp Networks</div>

     <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>

     </div>

    </nav>
    </>
  );
}

export default Navbar;