import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMD6AMI3B3lco05y93QR-JiVeoUrl2-Tg",
  authDomain: "movie-explorer-5673a.firebaseapp.com",
  projectId: "movie-explorer-5673a",
  storageBucket: "movie-explorer-5673a.firebasestorage.app",
  messagingSenderId: "12222764079",
  appId: "1:12222764079:web:ff5ea67112b02cb919a2da",
  measurementId: "G-S601KXQ0J9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);