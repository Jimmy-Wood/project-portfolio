import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap around parts of the app that need access to auth state
export function AuthProvider(props) {
  const { children } = props;
  const [globalUser, setGlobalUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle user signup
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Function to handle user login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Function to handle user logout
  function logout() {
    setGlobalUser(null);
    setGlobalData(null);
    return signOut(auth);
  }

  // Function reset password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const value = {
    globalUser,
    globalData,
    setGlobalData,
    isLoading,
    signup,
    login,
    logout,
    resetPassword,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("CURRENT USER:", user);
      setGlobalUser(user);
      // If no user, empty user state and return
      if (!user) {
        console.log("No user logged in");
        return;
      }

      //If there is a user, check user data from db, if found fetch and upate global state
      try {
        setIsLoading(true);

        //Create reference to user document in Firestore
        const docRef = doc(db, "users", user.uid);
        //Fetch user data from Firestore and snapshot it
        const docSnap = await getDoc(docRef);

        let firebaseData = {};
        if (docSnap.exists()) {
          firebaseData = docSnap.data();
          console.log("Found user data");
        }
        setGlobalData(firebaseData);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
