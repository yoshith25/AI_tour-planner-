// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzpKLsLM8g4CvGCIUfsGW9A3w6IqIeB9Q",
  authDomain: "book-inventory-1bccd.firebaseapp.com",
  projectId: "book-inventory-1bccd",
  storageBucket: "book-inventory-1bccd.appspot.com",
  messagingSenderId: "22411061587",
  appId: "1:22411061587:web:9f198bf1371c1ab01d59a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);