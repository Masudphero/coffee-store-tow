import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ must match path

function Navbar() {
  const { user, logout } = useAuth(); // ✅ এখন কাজ করবে
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-sm px-6">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">Coffee Store</Link>
      </div>

      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li><Link to="/addcoffee">Add Coffee</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <span className="mr-2">Hi, {user.displayName || user.email}</span>
            <button onClick={logout} className="btn btn-error btn-sm">Logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/signin")} className="btn btn-primary">Sign In</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;