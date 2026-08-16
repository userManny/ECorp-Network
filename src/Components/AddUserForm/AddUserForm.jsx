import { useState, useEffect } from "react";
import "./AddUserForm.css";
import PLAN_DETAILS from "../../constants/plans";
import { useUsers } from "../../context/UserContext";

function AddUserForm({
  selectedUser,
  setSelectedUser,
  setShowForm,
}) {

  // Get shared user data from Context
  const { users, setUsers } = useUsers();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("Basic");


  // Load selected user data when editing
  useEffect(() => {

    if (selectedUser) {

      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
      setPlan(selectedUser.plan);

    } else {

      setName("");
      setEmail("");
      setPhone("");
      setPlan("Basic");

    }

  }, [selectedUser]);


  function handleSubmit(e) {

    e.preventDefault();

    const selectedPlan = PLAN_DETAILS[plan];


    // Update existing user
    if (selectedUser) {

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              name,
              email,
              phone,
              plan,
              bill: selectedPlan.bill,
            }
          : user
      );

      setUsers(updatedUsers);

    }


    // Create new user
    else {

      const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        plan,
        bill: selectedPlan.bill,
        paid: false,
      };

      setUsers((prev) => [
        ...prev,
        newUser
      ]);

    }


    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setPlan("Basic");

    setSelectedUser(null);
    setShowForm(false);
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="add-user-form"
    >

      {/* Name */}

      <div className="form-field">

        <label htmlFor="name">
          CUSTOMER NAME
        </label>

        <input
          id="name"
          type="text"
          placeholder="Enter customer name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

      </div>


      {/* Email */}

      <div className="form-field">

        <label htmlFor="email">
          EMAIL ADDRESS
        </label>

        <input
          id="email"
          type="email"
          placeholder="customer@example.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

      </div>


      {/* Phone */}

      <div className="form-field">

        <label htmlFor="phone">
          PHONE NUMBER
        </label>

        <input
          id="phone"
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          required
        />

      </div>


      {/* Plan */}

      <div className="form-field">

        <label htmlFor="plan">
          SUBSCRIPTION PLAN
        </label>

        <select
          id="plan"
          value={plan}
          onChange={(e) =>
            setPlan(e.target.value)
          }
        >

          <option value="Basic">
            Basic — 100 Mbps — ₹1,500
          </option>

          <option value="Premium">
            Premium — 200 Mbps — ₹2,500
          </option>

          <option value="Pro">
            Pro — 300 Mbps — ₹3,500
          </option>

        </select>

      </div>


      {/* Selected Plan Preview */}

      <div className="plan-preview">

        <div>

          <span className="preview-label">
            SELECTED PLAN
          </span>

          <span className="preview-value">
            {plan.toUpperCase()}
          </span>

        </div>


        <div>

          <span className="preview-label">
            MONTHLY BILL
          </span>

          <span className="preview-bill">
            ₹
            {PLAN_DETAILS[plan].bill.toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

      </div>


      {/* Submit */}

      <button
        type="submit"
        className="submit-btn"
      >

        <span>
          {selectedUser
            ? "UPDATE RECORD"
            : "CREATE RECORD"}
        </span>

        <span className="submit-arrow">
          →
        </span>

      </button>

    </form>
  );
}

export default AddUserForm;