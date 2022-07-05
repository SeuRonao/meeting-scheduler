import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //cSpell:disable
  apiKey: "AIzaSyBy7IVsd4_-RepmlUOZWyQwwh9xcqvSZ0U",
  authDomain: "prontuario-eletronico-seuronao.firebaseapp.com",
  projectId: "prontuario-eletronico-seuronao",
  storageBucket: "prontuario-eletronico-seuronao.appspot.com",
  messagingSenderId: "588029789235",
  appId: "1:588029789235:web:798d0cb032e1a8717c8f46",
  measurementId: "G-R3F33YQXC3",
  //cSpell:enable
};

const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
const auth = getAuth(app);
// Get Firestore instance
const store = getFirestore(app);

// If the environment is development or testing, just use the emulator.
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(store, "http://localhost", 9000);
  console.log("Connected to Firebase emulators...");
}

export { app, auth };
