// js/firebase-config.js
// =========================================================
// GANTI DENGAN KONFIGURASI FIREBASE KAMU
// Buat project di https://console.firebase.google.com
// Aktifkan: Realtime Database + Authentication (Anonymous)
// =========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDB_ayhOCMG-puycVH_9UCAb0OdpcIvFiw",
  authDomain: "sendymanga-4419f.firebaseapp.com",
  databaseURL: "https://sendymanga-4419f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "sendymanga-4419f",
  storageBucket: "sendymanga-4419f.firebaseapp.com",
  messagingSenderId: "27391753411",
  appId: "1:27391753411:web:6cf4dc0eb771c95b593676",
  measurementId: "G-X9MW7WPB2T"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

let _uid = null;
let _authPromise = null;

export async function ensureAuth() {
  if (_uid) return _uid;
  // Reuse in-flight auth promise so parallel calls don't race
  if (!_authPromise) {
    _authPromise = (async () => {
      if (auth.currentUser) {
        _uid = auth.currentUser.uid;
        return _uid;
      }
      const cred = await signInAnonymously(auth);
      _uid = cred.user.uid;
      return _uid;
    })();
  }
  return _authPromise;
}

export function getCurrentUID() { return _uid; }
