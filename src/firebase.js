import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey:            "AIzaSyAsBsTkZqVyLPy_CLIeiD_22MBiazsICHI",
  authDomain:        "wanderecho.firebaseapp.com",
  databaseURL:       "https://wanderecho-default-rtdb.firebaseio.com",
  projectId:         "wanderecho",
  storageBucket:     "wanderecho.firebasestorage.app",
  messagingSenderId: "262610819150",
  appId:             "1:262610819150:web:13858e0bcaf6459349cb1f",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

export const signInAnon = () => signInAnonymously(auth);
