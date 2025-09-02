
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyCBZjmJgKP9iR4rTahn4sVO5gNrZpRs5Ag",
  authDomain: "sikkim-serenity.firebaseapp.com",
  projectId: "sikkim-serenity",
  storageBucket: "sikkim-serenity.firebasestorage.app",
  messagingSenderId: "898453498191",
  appId: "1:898453498191:web:7e03d1638717c13ec4fd3a",
  measurementId: "G-K1RVEYK2WT",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check
if (typeof window !== 'undefined') {
  // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
  // key is the counterpart to the secret key you set in the Firebase console.
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LcyMLsrAAAAAJTiPX_jdt2XmdAOz51pmG49cTaE'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
  });
}

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
