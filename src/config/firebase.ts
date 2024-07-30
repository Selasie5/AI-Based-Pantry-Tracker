// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

//Make environment variables accessible
const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "pantry-tracker-ea8d9.firebaseapp.com",
  projectId: "pantry-tracker-ea8d9",
  storageBucket: "pantry-tracker-ea8d9.appspot.com",
  messagingSenderId: "495158829105",
  appId: "1:495158829105:web:210b778923aae0476eb510",
  measurementId: "G-JCVP3PMQGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const analytics = getAnalytics(app);