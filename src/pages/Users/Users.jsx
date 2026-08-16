import { useState } from "react";
import UserCard from "../../Components/UserCard/UserCard.jsx";
import "./Users.css";
import AddUserForm from "../../Components/AddUserForm/AddUserForm.jsx";
import { useUsers } from "../../context/UserContext";

function Users() {

  const { users, setUsers } = useUsers();

  const [showUnpaid, setShowUnpaid] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);


  // Filter users based on payment status and search term
  const filteredUsers = users
    .filter((user) =>
      showUnpaid ? !user.paid : true
    )
    .filter((user) =>
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );


  // Mark user as paid
  function markAsPaid(id) {

    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, paid: true }
        : user
    );

    setUsers(updatedUsers);
  }


  // Delete user
  function deleteUser(id) {

    const confirmed = confirm("Are You Sure?");

    if (confirmed) {

      const updatedUsers = users.filter(
        (user) => user.id !== id
      );

      setUsers(updatedUsers);
    }
  }


  // Reset application data
  function handleReset() {

    localStorage.removeItem("users");

    window.location.reload();
  }


  // Toggle unpaid filter
  function toggleFilter() {

    setShowUnpaid((prev) => !prev);
  }


  // Open add user form
  function handleAddUser() {

    setSelectedUser(null);

    setShowForm((prev) => !prev);
  }


  // Open edit form
  function handleEdit(user) {

    if (
      selectedUser?.id === user.id &&
      showForm
    ) {

      setSelectedUser(null);
      setShowForm(false);

    } else {

      setSelectedUser(user);
      setShowForm(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }


  return (
    <div className="users-page">

      {/* Page Header */}

      <header className="users-header">

        <div>

          <div className="ecorp-mark users-ecorp-mark">

            <span>ECORP</span>

            <span className="ecorp-line"></span>

            <span>NETWORK-01</span>

          </div>


          <h1 className="users-title">
            Users
          </h1>


          <p className="users-description">
            Customer management and billing
          </p>

        </div>


        <div className="users-count">

          <span className="users-count-label">
            ACTIVE RECORDS
          </span>

          <span className="users-count-value">
            {users.length
              .toString()
              .padStart(4, "0")}
          </span>

        </div>

      </header>


      {/* Toolbar */}

      <section className="users-toolbar">

        <div className="search-wrapper">

          <span className="search-label">
            SEARCH
          </span>

          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>


        <div className="toolbar-actions">

          <button
            className={
              showUnpaid
                ? "toolbar-btn active"
                : "toolbar-btn"
            }
            onClick={toggleFilter}
          >
            {showUnpaid
              ? "SHOW ALL"
              : "UNPAID ONLY"}
          </button>


          <button
            className="toolbar-btn add-btn"
            onClick={handleAddUser}
          >
            <span>+</span>
            ADD USER
          </button>


          <button
            className="toolbar-btn reset-btn"
            onClick={handleReset}
          >
            RESET
          </button>

        </div>

      </section>


      {/* Add / Edit Form */}

      {showForm && (

        <section className="form-section">

          <div className="form-section-header">

            <div>

              <span className="form-section-index">
                {selectedUser ? "EDIT" : "NEW"}
              </span>

              <span className="form-section-title">
                {selectedUser
                  ? "USER RECORD"
                  : "CREATE USER RECORD"}
              </span>

            </div>


            <button
              className="close-form-btn"
              onClick={() => {

                setShowForm(false);

                setSelectedUser(null);

              }}
            >
              ×
            </button>

          </div>


          <AddUserForm
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setShowForm={setShowForm}
          />

        </section>

      )}


      {/* Results Information */}

      <div className="results-header">

        <div>

          <span className="results-index">
            01
          </span>

          <span className="results-title">
            CUSTOMER RECORDS
          </span>

        </div>


        <span className="results-count">

          {filteredUsers.length} RECORD
          {filteredUsers.length !== 1
            ? "S"
            : ""}

        </span>

      </div>


      {/* Users */}

      {filteredUsers.length > 0 ? (

        <div className="users-container">

          {filteredUsers.map((user) => (

            <UserCard
              key={user.id}

              name={user.name}
              email={user.email}
              phone={user.phone}
              plan={user.plan}
              bill={user.bill}
              paid={user.paid}

              onMarkPaid={() =>
                markAsPaid(user.id)
              }

              onDelete={() =>
                deleteUser(user.id)
              }

              onEdit={() =>
                handleEdit(user)
              }
            />

          ))}

        </div>

      ) : (

        <div className="empty-state">

          <span className="empty-code">
            404
          </span>

          <h2>
            NO RECORDS FOUND
          </h2>

          <p>
            No customer records match your current
            search or filter.
          </p>

          <button
            onClick={() => {

              setSearchTerm("");

              setShowUnpaid(false);

            }}
          >
            CLEAR FILTERS
          </button>

        </div>

      )}

    </div>
  );
}

export default Users;