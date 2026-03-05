import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { signup, googleLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signup(email, password, name); // ✅ capture return
      console.log("Registered User:");
      console.log("Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("UID:", user.uid);

      alert("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
      console.log("Google User:", user);
      alert("Login with Google successful!");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-yellow-500 text-white py-3 rounded-lg"
        >
          Register
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white py-3 rounded-lg mt-2"
        >
          Register / Login with Google
        </button>
      </form>
    </div>
  );
}

export default Register;