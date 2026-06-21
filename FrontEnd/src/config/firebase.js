import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATc2M5dnk3ulEmbL4QqS-3Lp1Udkz1DS4",
  authDomain: "gogrocery-c8a2c.firebaseapp.com",
  projectId: "gogrocery-c8a2c",
  storageBucket: "gogrocery-c8a2c.firebasestorage.app",
  messagingSenderId: "258437382087",
  appId: "1:258437382087:web:2f7b26f194492b095aa3e2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();