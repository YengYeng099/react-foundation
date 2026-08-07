// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxHfwJQ_FNgjmck-saO0UNJ-0knYeZEuQ",
  authDomain: "react-foundation-45228.firebaseapp.com",
  projectId: "react-foundation-45228",
  storageBucket: "react-foundation-45228.firebasestorage.app",
  messagingSenderId: "194277572376",
  appId: "1:194277572376:web:b0ac07057b093f6481686d",
  measurementId: "G-BWV5QLM923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
export {auth};