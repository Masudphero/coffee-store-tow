// src/components/Signin.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signin() {
  const { login, signup, googleLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false); // toggle signup/login
  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const userCredential = await signup(email, password);
        // update displayName
        await userCredential.user.updateProfile({ displayName: name });
        alert("Registration successful!");
      } else {
        await login(email, password);
        alert("Login successful!");
      }

      resetForm();          // ✅ Reset form after success
      navigate("/");        // ✅ Redirect to home
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleLogin();
      alert(`${isRegister ? "Registration" : "Login"} with Google successful!`);

      resetForm();          // ✅ Reset form after Google login
      navigate("/");        // ✅ Redirect to home
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col gap-6 transform hover:scale-[1.02] transition-all"
      >
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center">
          {isRegister ? "Register" : "Sign In"}
        </h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-yellow-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-yellow-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-yellow-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <button
          type="submit"
          className="bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
        >
          {isRegister ? "Register" : "Sign In"}
        </button>

        <button
          type="button"
          onClick={handleGoogleAuth}
          className="bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          {isRegister ? "Register" : "Sign In"} with Google
        </button>

        <p className="text-center text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-yellow-600 font-semibold cursor-pointer hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Sign In" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signin;