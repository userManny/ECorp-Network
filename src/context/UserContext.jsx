import { createContext, useContext, useEffect, useState } from "react";
import usersData from "../data/dummyUsers";
import PLAN_DETAILS from "../constants/plans";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const API_USE = true;

  // Load users
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);

      if (parsedUsers.length > 0) {
        setUsers(parsedUsers);
        return;
      }
    }

    if (API_USE === false) {
      setUsers(usersData);
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const userFromAPI = data.map((user) => {
          const plan = ["Basic", "Premium", "Pro"][user.id % 3];

          const selectedPlan = PLAN_DETAILS[plan];

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            plan: plan,
            bill: selectedPlan.bill,
            paid: user.id % 2 === 0,
          };
        });

        setUsers(userFromAPI);
      })
      .catch(() => {
        setUsers(usersData);
      });
  }, []);

  // Save users to localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );
    }
  }, [users]);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}


// Custom hook for consuming UserContext
export function useUsers() {
  return useContext(UserContext);
}