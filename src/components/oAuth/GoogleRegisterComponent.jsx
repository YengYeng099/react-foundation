import {GoogleAuthProvider,onAuthStateChanged,signInWithPopup,signOut} from "firebase/auth"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../Firebase/config.js";
import { toast } from "react-toastify";
export const GoogleRegisterComponent = () => {
  const navigate = useNavigate();
  // setup login, popup, logout
  const [error, setError] = useState();
  // pending
  const [pending, setIsPending] = useState(false);
  // data (user credential)
  const [user, setUser] = useState(null);
  // create provider
  const provider = new GoogleAuthProvider();
  provider.addScope("email");

  // useEffect tracking on user credential
  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        throw new Error("unsubscribe user");
      }
    });
    return () => unsubscriber();
  }, []);

  // setup login with google
  const loginWithGoogle = async () => {
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("login unsuccessfully");
      }
      const user = res.user;
      console.log("Google Info: ", user);
    } catch (error) {
      setError(error);
      console.log(error.message);
      setIsPending(false);
    }
  };

  //logout features
  const googleLogout = async () => {
    setIsPending(false);
    setError(null);
    try {
      await signOut(auth);
      setIsPending(true);
      console.log("Logout successfully!");
    } catch (error) {
      setError(error);
      console.log(error.message);
      setIsPending(false);
    }
  };

  return (
    <button
      className="w-full mt-4 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
      onClick={loginWithGoogle}
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        className="w-5 h-5 mr-2"
      />
      Register with Google
    </button>
  );
};
