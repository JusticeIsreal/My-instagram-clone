// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe13DUiXiTGg486wcQTcA8eg8C8V7sXCQ",
  authDomain: "instagram-clone-app-34eff.firebaseapp.com",
  projectId: "instagram-clone-app-34eff",
  storageBucket: "instagram-clone-app-34eff.appspot.com",
  messagingSenderId: "149681657805",
  appId: "1:149681657805:web:f3a31ffb4b1007b014d684",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const db2 = getFirestore(app);
const storage = getStorage();

export { app, db, storage ,db2};
