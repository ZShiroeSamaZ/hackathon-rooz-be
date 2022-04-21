const admin = require("firebase-admin");
const firebase = require("firebase/app");
const { getAuth, connectAuthEmulator } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyAJZDpqObl-WE53V1XRGAf9G7KrsfcplSg",
  authDomain: "hackathon-x-rooz.firebaseapp.com",
  projectId: "hackathon-x-rooz",
  storageBucket: "hackathon-x-rooz.appspot.com",
  messagingSenderId: "925652625591",
  appId: "1:925652625591:web:2aeba992e9b6851c410532",
};

admin.initializeApp();
const db = admin.firestore();

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

if (process.env.FIREBASE_AUTH_EMULATOR_HOST)
  connectAuthEmulator(auth, "http://localhost:9099");
module.exports = { admin, db, auth };
