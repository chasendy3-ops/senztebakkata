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
  apiKey: "AIzaSyAGHxagjcJN_M6BlyCmUGZrsdmC7HAtbkY",
  authDomain: "senztebakkata.firebaseapp.com",
  databaseURL: "https://senztebakkata-default-rtdb.asia-southeast1-firebase.app",
  projectId: "senztebakkata",
  storageBucket: "senztebakkata.firebasestorage.app",
  messagingSenderId: "708353652404",
  appId: "1:708353652404:web:524a81fa87ec7abbcac9e1",
  measurementId: "G-JEWXJHR0D3"
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
