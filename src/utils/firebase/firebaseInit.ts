import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //cSpell:disable
  apiKey: "AIzaSyDr7YGPCY5kj1Htl9k0HGpHaC0Dx5dRrmM",
  authDomain: "meeting-scheduler-seuronao.firebaseapp.com",
  projectId: "meeting-scheduler-seuronao",
  storageBucket: "meeting-scheduler-seuronao.appspot.com",
  messagingSenderId: "987382229706",
  appId: "1:987382229706:web:037f223964a5c4f0f4a233",
  measurementId: "G-XPTX0Q5J8W",
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
  connectFirestoreEmulator(store, "localhost", 9000);
}

export { app, auth, store };
