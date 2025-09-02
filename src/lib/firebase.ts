
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBZjmJgKP9iR4rTahn4sVO5gNrZpRs5Ag",
  authDomain: "sikkim-serenity.firebaseapp.com",
  projectId: "sikkim-serenity",
  storageBucket: "sikkim-serenity.firebasestorage.app",
  messagingSenderId: "898453498191",
  appId: "1:898453498191:web:7e03d1638717c13ec4fd3a",
  measurementId: "G-K1RVEYK2WT"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
