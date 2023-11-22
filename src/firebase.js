import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDs_-b0BDoJqpTDK6jXGuZylXLsnstv0B0",
  authDomain: "elegant-authentication.firebaseapp.com",
  projectId: "elegant-authentication",
  storageBucket: "elegant-authentication.appspot.com",
  messagingSenderId: "600515184673",
  appId: "1:600515184673:web:55c4fdc77a8d76afa53b60",
  measurementId: "G-K55KNS43PJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
