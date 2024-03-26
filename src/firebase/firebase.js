// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpI2ikv8P8fqLHwF5l95PtTuAsVjrNDV8",
  authDomain: "metro-events-3980c.firebaseapp.com",
  projectId: "metro-events-3980c",
  storageBucket: "metro-events-3980c.appspot.com",
  messagingSenderId: "995850792586",
  appId: "1:995850792586:web:b260531cc51d7ae9934773"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const signIn = signInWithEmailAndPassword;

export const timestampToDateString = (timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

export { signIn, app, auth, firestore };