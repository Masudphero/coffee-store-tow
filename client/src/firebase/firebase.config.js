// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPVTY2yN7D8x89WXtA8lgnXCeadcQ7MdA",
  authDomain: "coffee-store-tow.firebaseapp.com",
  projectId: "coffee-store-tow",
  storageBucket: "coffee-store-tow.appspot.com",
  messagingSenderId: "318619700298",
  appId: "1:318619700298:web:24dff37c1c4d3723472ab3",
  measurementId: "G-DGRB5R8GVM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Google login

export default app;