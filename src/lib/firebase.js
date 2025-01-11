// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkfqzmLawGY8VQFwEFcBdUqIvti5xVOLY",
  authDomain: "rating-2ea11.firebaseapp.com",
  databaseURL: "https://rating-2ea11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rating-2ea11",
  storageBucket: "rating-2ea11.firebasestorage.app",
  messagingSenderId: "254788972210",
  appId: "1:254788972210:web:4aa9b2fd378f0578ef63ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };