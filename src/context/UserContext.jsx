import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  // Load users from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Users received from backend:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  // Add a new user
  async function addUser(userData) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const savedUser = await response.json();

      setUsers((prevUsers) => [
        ...prevUsers,
        savedUser,
      ]);

      return savedUser;

    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  }

  // Update an existing user
async function updateUser(id, userData) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const updatedUser = await response.json();

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? updatedUser : user
      )
    );

    return updatedUser;

  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
}

// Delete a user
async function deleteUser(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/users/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== id)
    );

  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
}


// Mark user as paid
async function markUserAsPaid(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/users/${id}/pay`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to mark payment");
    }

    const updatedUser = await response.json();

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? updatedUser : user
      )
    );

    return updatedUser;

  } catch (error) {
    console.error("Failed to mark payment:", error);
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
        markUserAsPaid
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