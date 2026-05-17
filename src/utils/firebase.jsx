import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYISYaljXGKEdySsJKt9iuZ5t_uiOCUKc",
  authDomain: "zerozeroone-f036b.firebaseapp.com",
  projectId: "zerozeroone-f036b",
  storageBucket: "zerozeroone-f036b.firebasestorage.app",
  messagingSenderId: "702428868976",
  appId: "1:702428868976:web:d0ca88849fbddbb403dfb5",
  measurementId: "G-WTVZTNLMR5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); 