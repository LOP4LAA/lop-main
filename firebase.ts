import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAK7ha2uREZW_s9DSs7wGbDonaRcX-gudo",
  authDomain: "bethel-lop-273ad.firebaseapp.com",
  projectId: "bethel-lop-273ad",
  storageBucket: "bethel-lop-273ad.appspot.com",
  messagingSenderId: "220883238002",
  appId: "1:220883238002:web:d62544f6cbab282b0b96eb",
  measurementId: "G-9W9T26PGNB",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
