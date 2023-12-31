// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYJ-WrC5Kaxsgino95UZptz7TCYi5_EcQ",
  authDomain: "mern-book-inventory-b3c13.firebaseapp.com",
  projectId: "mern-book-inventory-b3c13",
  storageBucket: "mern-book-inventory-b3c13.appspot.com",
  messagingSenderId: "410907682162",
  appId: "1:410907682162:web:f838077e5370faaeb529eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;