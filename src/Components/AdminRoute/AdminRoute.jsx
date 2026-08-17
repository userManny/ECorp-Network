import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  // Not logged in
  if (!token || !savedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(savedUser);

    // Logged in but not an admin
    if (user.role !== "admin") {
      return <Navigate to="/my-account" replace />;
    }

    // Admin
    return <Outlet />;

  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }
}

export default AdminRoute;