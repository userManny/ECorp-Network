import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  // Get login token
  function getToken() {
    return localStorage.getItem("token");
  }


  // Load users from backend
  useEffect(() => {
    async function loadUsers() {
      try {
        const token = getToken();

        const response = await fetch(
          "http://localhost:5000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch users"
          );
        }

        console.log(
          "Users received from backend:",
          data
        );

        setUsers(data);

      } catch (error) {
        console.error(
          "Failed to fetch users:",
          error
        );

        setUsers([]);
      }
    }

    loadUsers();
  }, []);


  // Add a new user
  async function addUser(userData) {
    try {
      const token = getToken();

      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create user"
        );
      }

      setUsers((prevUsers) => [
        ...prevUsers,
        data,
      ]);

      return data;

    } catch (error) {
      console.error(
        "Failed to create user:",
        error
      );

      throw error;
    }
  }


  // Update an existing user
  async function updateUser(id, userData) {
    try {
      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update user"
        );
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? data : user
        )
      );

      return data;

    } catch (error) {
      console.error(
        "Failed to update user:",
        error
      );

      throw error;
    }
  }


  // Delete a user
  async function deleteUser(id) {
    try {
      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete user"
        );
      }

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user._id !== id
        )
      );

    } catch (error) {
      console.error(
        "Failed to delete user:",
        error
      );

      throw error;
    }
  }


  // Mark user as paid
  async function markUserAsPaid(id) {
    try {
      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/api/users/${id}/pay`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to mark payment"
        );
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? data : user
        )
      );

      return data;

    } catch (error) {
      console.error(
        "Failed to mark payment:",
        error
      );

      throw error;
    }
  }


  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        addUser,
        updateUser,
        deleteUser,
        markUserAsPaid,
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