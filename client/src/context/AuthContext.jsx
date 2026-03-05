import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ SignUp with name
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    console.log("Signup User:", {
      name: userCredential.user.displayName,
      email: userCredential.user.email,
      uid: userCredential.user.uid,
    });
    return userCredential.user;
  };

  // ✅ Login with email/password
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // ✅ Google login
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    console.log("Google User:", {
      name: result.user.displayName,
      email: result.user.email,
      uid: result.user.uid,
    });
    return result.user;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, signup, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};