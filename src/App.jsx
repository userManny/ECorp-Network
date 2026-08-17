import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./Components/Layout/Layout";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute/AdminRoute";
import { UserProvider } from "./context/UserContext";


// Lazy-loaded pages
const Login = lazy(() =>
  import("./pages/Login/Login")
);

const Dashboard = lazy(() =>
  import("./pages/Dashboard/Dashboard")
);

const Users = lazy(() =>
  import("./pages/Users/Users")
);

const Plans = lazy(() =>
  import("./pages/Plans/Plans")
);

const Payments = lazy(() =>
  import("./pages/Payments/Payments")
);

const UserDetails = lazy(() =>
  import("./pages/UserDetails/UserDetails")
);

const Settings = lazy(() =>
  import("./pages/Settings/Settings")
);

const MyAccount = lazy(() =>
  import("./pages/MyAccount/MyAccount")
);


function App() {
  return (
    <UserProvider>

      <Suspense fallback={<LoadingScreen />}>

        <Routes>

          {/* Login page */}
          <Route
            path="/login"
            element={<Login />}
          />


          {/* All logged-in users */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >

            {/* Customer account */}
            <Route
              path="/my-account"
              element={<MyAccount />}
            />


            {/* Admin-only routes */}
            <Route element={<AdminRoute />}>

              {/* Dashboard */}
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />


              {/* Users */}
              <Route
                path="/users"
                element={<Users />}
              />


              {/* Dynamic User Details */}
              <Route
                path="/users/:id"
                element={<UserDetails />}
              />


              {/* Plans */}
              <Route
                path="/plans"
                element={<Plans />}
              />


              {/* Payments */}
              <Route
                path="/payments"
                element={<Payments />}
              />


              {/* Settings */}
              <Route
                path="/settings"
                element={<Settings />}
              />

            </Route>

          </Route>

        </Routes>

      </Suspense>

    </UserProvider>
  );
}

export default App;