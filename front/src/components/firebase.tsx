// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEwlySNwVOH_EWd8m1xfBYdFPQigLWNz8",
  authDomain: "tify-noti.firebaseapp.com",
  databaseURL: "https://tify-noti-default-rtdb.firebaseio.com",
  projectId: "tify-noti",
  storageBucket: "tify-noti.appspot.com",
  messagingSenderId: "640317946389",
  appId: "1:640317946389:web:d596e3392afd6dde43ec1c",
  measurementId: "G-E0PQPBR467"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const authService = getAuth();