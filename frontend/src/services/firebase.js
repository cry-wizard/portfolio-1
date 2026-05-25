import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQ7uF4T1I5lFEDTJM6uPq56C0nR7CQxAk",
  authDomain: "portfolio-79732.firebaseapp.com",
  projectId: "portfolio-79732",
  storageBucket: "portfolio-79732.firebasestorage.app",
  messagingSenderId: "371727788071",
  appId: "1:371727788071:web:5be20f82a6bebc27924602",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
