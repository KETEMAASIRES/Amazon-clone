import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAoWWLU32SVnbjblBmEMPSPfuWvzeLPXKE",
//   authDomain: "clone-b3c11.firebaseapp.com",
//   projectId: "clone-b3c11",
//   storageBucket: "clone-b3c11.appspot.com",
//   messagingSenderId: "942028226040",
//   appId: "1:942028226040:web:70fa6cdcff71f8d465ea0d",
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(app);

export const db = firebase.firestore(app);
