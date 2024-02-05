// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-9426c.firebaseapp.com",
  projectId: "mern-blog-9426c",
  storageBucket: "mern-blog-9426c.appspot.com",
  messagingSenderId: "1094887916307",
  appId: "1:1094887916307:web:ec2170a227cb308daa50e6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
