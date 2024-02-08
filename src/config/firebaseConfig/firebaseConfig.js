import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTD3rJ-aqxudUl5v5bChXqaeTK15DGxU4",
  authDomain: "lms-012.firebaseapp.com",
  projectId: "lms-012",
  storageBucket: "lms-012.appspot.com",
  messagingSenderId: "1055848760693",
  appId: "1:1055848760693:web:4be2542a9755f4affbbf3c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app, "gs://lms-012.appspot.com");
