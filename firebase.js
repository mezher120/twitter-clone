// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-921c8.firebaseapp.com",
  projectId: "twitter-clone-921c8",
  storageBucket: "twitter-clone-921c8.appspot.com",
  messagingSenderId: "381132323729",
  appId: "1:381132323729:web:3d3401767679fe8909b830"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // si no tiene muchas apps que inicie la app sino que la agarre la app
const db = getFirestore(); // la db
const storage = getStorage();   // el localstorage?

export {app, db, storage};