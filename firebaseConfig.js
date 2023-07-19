import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
    getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, getDoc
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuV5onuCaxH3fRiRIiNKo8su-3aagz93s",
    authDomain: "social-media-85b20.firebaseapp.com",
    projectId: "social-media-85b20",
    storageBucket: "social-media-85b20.appspot.com",
    messagingSenderId: "159678614150",
    appId: "1:159678614150:web:7d23e6e6792e53a0c29f07"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {
    auth,
    app,
    db,
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getAuth,
    createUserWithEmailAndPassword,
    query,
    where,
    getDocs,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL
};