// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr_gM99hZK0odvgxydcKGLEbxg9C6InCY",
  authDomain: "chatapp-cf296.firebaseapp.com",
  projectId: "chatapp-cf296",
  storageBucket: "chatapp-cf296.appspot.com",
  messagingSenderId: "128029374520",
  appId: "1:128029374520:web:a6639c8b558534995ccecd",
  measurementId: "G-RD36QLKW25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
