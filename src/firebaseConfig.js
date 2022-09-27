import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPNQEBkQwjWbCqlScZX8ECeK9oyHKARBk",
    authDomain: "todo-2115e.firebaseapp.com",
    projectId: "todo-2115e",
    storageBucket: "todo-2115e.appspot.com",
    messagingSenderId: "405663729281",
    appId: "1:405663729281:web:bbfa013cb68a4f1defef80",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
