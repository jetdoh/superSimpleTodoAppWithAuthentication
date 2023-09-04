import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDVSzTPAiYZY6bj2wa-jRZcHgRvtP_uMOs",
  authDomain: "authentication-firebase-15a37.firebaseapp.com",
  projectId: "authentication-firebase-15a37",
  storageBucket: "authentication-firebase-15a37.appspot.com",
  messagingSenderId: "606755609980",
  appId: "1:606755609980:web:c38c62a58a41c5e4e798f9",
  measurementId: "G-P8KG843XZF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };