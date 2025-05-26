import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoWWLU32SVnbjblBmEMPSPfuWvzeLPXKE",
  authDomain: "clone-b3c11.firebaseapp.com",
  projectId: "clone-b3c11",
  storageBucket: "clone-b3c11.appspot.com",
  messagingSenderId: "942028226040",
  appId: "1:942028226040:web:70fa6cdcff71f8d465ea0d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
