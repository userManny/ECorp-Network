## 🌐 Live Demo

- 🔗 [Live App](https://e-corp-network.vercel.app/)
- 💻 [GitHub Repo](https://github.com/your-username/ecorp-network)


# 🌐 ECorp Network

A React-based web application designed to manage customers of an Internet Service Provider (ISP), including tracking subscription plans, billing status, and payments. The platform provides a centralized dashboard for monitoring total users, revenue, and pending dues. It enables efficient user management with real-time updates and insights.
---

## 🚀 Features

### 🧭 Navigation & Routing
- Built using **React Router**
- Pages:
  - `/dashboard` → Dashboard view
  - `/users` → Users management page
- Default route redirects to dashboard

---

### 👥 Users Page
- Display users in card format
- Search users by name
- Filter unpaid users
- Mark users as **Paid**
- Dynamic data rendering

---

### 📊 Dashboard
- Shows:
  - Total Users
  - Total Revenue
  - Pending Amount
- Updates automatically when user data changes

---

### 🔄 State Management (Important)
- **State Lifting implemented**
- `users` state is managed in `App.jsx`
- Shared across:
  - Users page (read + update)
  - Dashboard (read only)

---

### 🌐 API Integration
- Fetch users from API
- Transform API data into app-specific structure
- Fallback to dummy data if API fails

---

## 🧠 Key Concepts Used

### 🔹 React Concepts
- Functional Components
- Props & State
- useState, useEffect
- Conditional Rendering
- Component Reusability

---

### 🔹 Advanced Concepts
- State Lifting (Single Source of Truth)
- Data Transformation
- Controlled Inputs (Search)
- Derived State (Dashboard stats)

---

### 🔹 Routing
- React Router v6
- `<Routes>` and `<Route>`
- Navigation using `<Link>`
- Default route handling

---

## 🏗️ Project Structure

'''
src/
│
├── Components/
│ ├── Navbar/
│ ├── UserCard/
│ └── DashboardStats/
│
├── pages/
│ ├── Users/
│ └── Dashboard/
│
├── data/
│ └── dummyUsers.js
│
├── App.jsx
└── main.jsx

'''


---

## 🔄 Data Flow

App.jsx (state owner)  
↓  
Users.jsx (update state)  
↓  
Dashboard.jsx (read state)  

---

## ⚙️ Installation

```bash
git clone <https://github.com/userManny/ECorp-Network.git>
cd ecorp-network
npm install
npm run dev

## 📌 How It Works

- App loads → API fetch runs  
- Users state stored in `App.jsx`  
- Data passed to **Users** and **Dashboard**  
- Updating user (mark as paid) updates entire app  

---

## ⚠️ Important Learnings

- React does **NOT** share state automatically  
- Re-render happens when:
  - State changes  
  - Props change  
  - Parent re-renders  
- Route change causes **mount/unmount**  

---

## 🔥 Future Improvements

- Add / Edit / Delete users (CRUD)  
- Authentication system  
- Backend integration  
- Global state (Context API)  
- Charts for dashboard  

---

## 🧑‍💻 Author

**Maneesh Kumar**