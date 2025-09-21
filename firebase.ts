import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALylUeTNqcmGWZtari2HVK1PmZxGcnapE",
  authDomain: "criptoi.firebaseapp.com",
  projectId: "criptoi",
  storageBucket: "criptoi.firebasestorage.app",
  messagingSenderId: "980267702058",
  appId: "1:980267702058:web:7916b8c352cfd49e103053",
  measurementId: "G-2ZQ5VT6L88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
 const auth = getAuth(app);

export { auth, db, analytics };