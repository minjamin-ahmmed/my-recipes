// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtZuCHimZS27_BxmcUH-T3j8p7NzZf8nE",
  authDomain: "my-recipes-a1697.firebaseapp.com",
  projectId: "my-recipes-a1697",
  storageBucket: "my-recipes-a1697.firebasestorage.app",
  messagingSenderId: "1072474085430",
  appId: "1:1072474085430:web:65fcfec7d69ac1c9e26097",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
